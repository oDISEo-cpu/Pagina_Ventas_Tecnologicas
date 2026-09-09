# 🚀 Configuración de Supabase para iPhoneLechería

## ✅ ¿Qué es Supabase?

Supabase es una alternativa open-source a Firebase que ofrece:
- ✅ Base de datos PostgreSQL (más potente que Firestore)
- ✅ Autenticación completa
- ✅ Storage para imágenes (1 GB gratis)
- ✅ API REST automática
- ✅ 100% gratis sin tarjeta de crédito

---

## 📋 Pasos para Configurar Supabase

### 1. Crear Cuenta en Supabase

1. Ve a 👉 https://supabase.com/
2. Click en **"Start your project"** o **"Comenzar tu proyecto"**
3. Inicia sesión con GitHub (recomendado) o email
4. ¡Listo! Ya tienes tu cuenta

---

### 2. Crear Nuevo Proyecto

1. Click en **"New Project"** o **"Nuevo Proyecto"**
2. Completa los datos:
   - **Name:** `iphonelecheria`
   - **Database Password:** Crea una contraseña segura (GUÁRDALA)
   - **Region:** Selecciona la más cercana (ej: `South America (São Paulo)`)
3. Click en **"Create new project"**
4. Espera 2-3 minutos mientras se crea el proyecto

---

### 3. Obtener Credenciales

1. En el menú lateral, click en **"⚙️ Settings"** (Configuración)
2. Click en **"API"**
3. Copia estos valores:
   - **Project URL:** `https://xxxxx.supabase.co`
   - **anon public key:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

4. Abre el archivo `src/lib/supabase.ts`
5. Reemplaza los valores:

```typescript
const supabaseUrl = 'https://xxxxx.supabase.co'; // Tu Project URL
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'; // Tu anon public key
```

---

### 4. Crear Tablas en la Base de Datos

1. En el menú lateral, click en **"🗄️ SQL Editor"**
2. Click en **"New query"**
3. Copia y pega el siguiente SQL:

```sql
-- Tabla de usuarios
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  cedula TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de productos
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('iphones', 'accesorios', 'macbooks', 'airpods', 'playstation')),
  price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2),
  storage TEXT,
  color TEXT,
  condition TEXT NOT NULL CHECK (condition IN ('nuevo', 'usado')),
  image TEXT NOT NULL,
  specs TEXT[] DEFAULT '{}',
  description TEXT,
  in_stock BOOLEAN DEFAULT true,
  stock_quantity INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de órdenes
CREATE TABLE orders (
  id TEXT PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  user_name TEXT NOT NULL,
  user_email TEXT NOT NULL,
  user_phone TEXT NOT NULL,
  user_cedula TEXT,
  items JSONB NOT NULL DEFAULT '[]',
  subtotal DECIMAL(10,2) NOT NULL,
  shipping DECIMAL(10,2) NOT NULL DEFAULT 0,
  total DECIMAL(10,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'shipped', 'delivered', 'cancelled')),
  payment_method TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para mejor rendimiento
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);

-- Función para crear usuario automáticamente
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, name, email, phone, cedula, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', ''),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'phone', ''),
    COALESCE(NEW.raw_user_meta_data->>'cedula', ''),
    'user'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para crear usuario automáticamente
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

4. Click en **"Run"** o **"Ejecutar"** (botón verde)
5. Deberías ver: **"Success. No rows returned"**

---

### 5. Crear Bucket de Storage para Imágenes

1. En el menú lateral, click en **"🗄️ Storage"**
2. Click en **"New bucket"**
3. Completa los datos:
   - **Name:** `images`
   - **Public bucket:** ✅ Marcado (público)
4. Click en **"Create bucket"**

---

### 6. Configurar Políticas de Seguridad (RLS)

**IMPORTANTE:** Supabase usa Row Level Security (RLS) para proteger los datos.

#### Habilitar RLS en todas las tablas:

1. Ve a **"🗄️ SQL Editor"**
2. Crea una nueva query
3. Copia y pega:

```sql
-- Habilitar RLS en todas las tablas
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Políticas para users
CREATE POLICY "Users can view their own data"
  ON users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own data"
  ON users FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Admins can view all users"
  ON users FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid() AND users.role = 'admin'
    )
  );

-- Políticas para products
CREATE POLICY "Anyone can view products"
  ON products FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert products"
  ON products FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid() AND users.role = 'admin'
    )
  );

CREATE POLICY "Admins can update products"
  ON products FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid() AND users.role = 'admin'
    )
  );

CREATE POLICY "Admins can delete products"
  ON products FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid() AND users.role = 'admin'
    )
  );

-- Políticas para orders
CREATE POLICY "Users can view their own orders"
  ON orders FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own orders"
  ON orders FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all orders"
  ON orders FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid() AND users.role = 'admin'
    )
  );

CREATE POLICY "Admins can update all orders"
  ON orders FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid() AND users.role = 'admin'
    )
  );

-- Políticas para Storage
CREATE POLICY "Anyone can view images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'images');

CREATE POLICY "Admins can upload images"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'images' AND
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid() AND users.role = 'admin'
    )
  );

CREATE POLICY "Admins can update images"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'images' AND
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid() AND users.role = 'admin'
    )
  );

CREATE POLICY "Admins can delete images"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'images' AND
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid() AND users.role = 'admin'
    )
  );
```

4. Click en **"Run"**

---

### 7. Crear Usuario Administrador

#### Opción A: Desde la aplicación (Recomendado)

1. Despliega la aplicación (ver paso 8)
2. Ve a la página de registro
3. Regístrate con:
   - Email: `admin@iphonelecheria.com`
   - Contraseña: `admin123` (o la que prefieras)
4. Ve a Supabase → **"🗄️ SQL Editor"**
5. Ejecuta este SQL para hacer admin al usuario:

```sql
-- Reemplaza 'TU_EMAIL' con el email que registraste
UPDATE users 
SET role = 'admin' 
WHERE email = 'admin@iphonelecheria.com';
```

#### Opción B: Desde Supabase Auth

1. Ve a **"🔐 Authentication"** → **"Users"**
2. Click en **"Add user"** → **"Create new user"**
3. Completa:
   - **Email:** `admin@iphonelecheria.com`
   - **Password:** `admin123`
   - **Auto Confirm User:** ✅ Marcado
4. Click en **"Create user"**
5. Copia el **UID** del usuario
6. Ve a **"🗄️ SQL Editor"** y ejecuta:

```sql
-- Reemplaza 'USER_UID' con el UID que copiaste
INSERT INTO users (id, name, email, phone, cedula, role)
VALUES (
  'USER_UID',
  'Administrador',
  'admin@iphonelecheria.com',
  '0414-8808810',
  'V-00000000',
  'admin'
);
```

---

### 8. Desplegar la Aplicación

#### Opción A: Vercel (Recomendado)

1. Sube tu código a GitHub
2. Ve a 👉 https://vercel.com/
3. Click en **"Add New Project"**
4. Importa tu repositorio
5. Configura:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
6. Agrega las variables de entorno (opcional, ya están en el código)
7. Click en **"Deploy"**
8. ¡Listo! Tu app estará en `https://tu-proyecto.vercel.app`

#### Opción B: Netlify

1. Ve a 👉 https://www.netlify.com/
2. Click en **"Add new site"** → **"Deploy manually"**
3. Arrastra la carpeta `dist`
4. ¡Listo!

---

## ✅ Checklist Final

- [ ] Cuenta de Supabase creada
- [ ] Proyecto creado en Supabase
- [ ] Credenciales copiadas en `src/lib/supabase.ts`
- [ ] Tablas creadas (users, products, orders)
- [ ] Bucket de Storage creado (`images`)
- [ ] Políticas de seguridad configuradas
- [ ] Usuario administrador creado con `role = 'admin'`
- [ ] Aplicación desplegada

---

## 🎯 Credenciales de Prueba

**Administrador:**
- Email: `admin@iphonelecheria.com`
- Contraseña: `admin123`

---

## 🆘 Solución de Problemas

### Error: "relation already exists"
→ Las tablas ya existen. Puedes ignorar este error o borrar las tablas primero.

### Error: "permission denied"
→ Revisa que las políticas de RLS estén configuradas correctamente.

### Las imágenes no se cargan
→ Verifica que el bucket `images` sea público.

### No puedo hacer admin al usuario
→ Verifica que el email coincida exactamente.

---

## 📊 Límites del Plan Gratuito

| Recurso | Límite Gratis |
|---------|---------------|
| Base de datos | 500 MB |
| Storage | 1 GB |
| Transferencia | 2 GB/mes |
| Usuarios Auth | Ilimitados |
| API Requests | Ilimitados |

**Para iPhoneLechería:** Más que suficiente para miles de productos y usuarios.

---

## 🚀 ¡Listo!

Tu aplicación ahora está conectada a Supabase con:
- ✅ Base de datos PostgreSQL
- ✅ Autenticación segura
- ✅ Storage para imágenes
- ✅ Todo sincronizado en la nube

**URL de tu app:** La que te dio Vercel/Netlify

---

**¿Necesitas ayuda?**
- Documentación de Supabase: https://supabase.com/docs
- Comunidad: https://discord.supabase.com

---

**Desarrollado para iPhoneLechería** 🍎
