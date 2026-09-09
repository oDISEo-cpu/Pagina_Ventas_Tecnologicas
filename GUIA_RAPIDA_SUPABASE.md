# 🚀 Guía Rápida - Configuración de Supabase para iPhoneLechería

## ⚡ Configuración en 15 Minutos

### Paso 1: Crear Cuenta en Supabase (2 min)
1. Ve a 👉 https://supabase.com/
2. Click en **"Start your project"**
3. Inicia sesión con GitHub o email

---

### Paso 2: Crear Proyecto (3 min)
1. Click en **"New Project"**
2. Completa:
   - **Name:** `iphonelecheria`
   - **Database Password:** Crea una contraseña (GUÁRDALA)
   - **Region:** `South America (São Paulo)`
3. Click en **"Create new project"**
4. Espera 2-3 minutos

---

### Paso 3: Obtener Credenciales (1 min)
1. Ve a **⚙️ Settings** → **API**
2. Copia:
   - **Project URL:** `https://xxxxx.supabase.co`
   - **anon public key:** `eyJhbGci...`

---

### Paso 4: Configurar la App (1 min)
1. Abre `src/lib/supabase.ts`
2. Reemplaza:

```typescript
const supabaseUrl = 'https://xxxxx.supabase.co'; // Tu URL
const supabaseAnonKey = 'eyJhbGci...'; // Tu key
```

---

### Paso 5: Crear Tablas (3 min)
1. Ve a **🗄️ SQL Editor** → **New query**
2. Copia y pega este SQL:

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
  category TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2),
  storage TEXT,
  color TEXT,
  condition TEXT NOT NULL,
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
  status TEXT NOT NULL DEFAULT 'pending',
  payment_method TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

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

-- Trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

3. Click en **"Run"**

---

### Paso 6: Crear Storage (1 min)
1. Ve a **🗄️ Storage** → **New bucket**
2. Name: `images`
3. ✅ **Public bucket**
4. Click en **"Create bucket"**

---

### Paso 7: Configurar Seguridad (2 min)
1. Ve a **🗄️ SQL Editor** → **New query**
2. Copia y pega:

```sql
-- Habilitar RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Políticas
CREATE POLICY "Anyone can view products" ON products FOR SELECT USING (true);
CREATE POLICY "Admins can manage products" ON products FOR ALL USING (
  EXISTS (SELECT 1 FROM users WHERE users.id = auth.uid() AND users.role = 'admin')
);
CREATE POLICY "Users can view their orders" ON orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create orders" ON orders FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins can manage orders" ON orders FOR ALL USING (
  EXISTS (SELECT 1 FROM users WHERE users.id = auth.uid() AND users.role = 'admin')
);
CREATE POLICY "Users can view their data" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Admins can view all users" ON users FOR SELECT USING (
  EXISTS (SELECT 1 FROM users WHERE users.id = auth.uid() AND users.role = 'admin')
);
```

3. Click en **"Run"**

---

### Paso 8: Crear Admin (2 min)
1. Ve a **🔐 Authentication** → **Users** → **Add user**
2. Email: `admin@iphonelecheria.com`
3. Password: `admin123`
4. ✅ **Auto Confirm User**
5. Click en **"Create user"**
6. Copia el **UID** del usuario
7. Ve a **🗄️ SQL Editor** y ejecuta:

```sql
UPDATE users SET role = 'admin' WHERE email = 'admin@iphonelecheria.com';
```

---

## ✅ ¡Listo!

Tu app está conectada a Supabase. Ahora puedes:
- ✅ Registrarte con usuarios reales
- ✅ Los productos se sincronizan en la nube
- ✅ Las imágenes se guardan en Storage
- ✅ Los pedidos se guardan en la base de datos

---

## 🌐 Desplegar la App

### Opción Rápida: Vercel
1. Sube tu código a GitHub
2. Ve a 👉 https://vercel.com/
3. Importa tu repositorio
4. Click en **"Deploy"**
5. ¡Listo! Tu app estará en `https://tu-proyecto.vercel.app`

---

## 🔐 Credenciales de Prueba

**Administrador:**
- Email: `admin@iphonelecheria.com`
- Contraseña: `admin123`

---

## 📊 Límites Gratis de Supabase

| Recurso | Límite |
|---------|--------|
| Base de datos | 500 MB |
| Storage | 1 GB |
| Transferencia | 2 GB/mes |
| Usuarios | Ilimitados |

**Para iPhoneLechería:** Más que suficiente ✅

---

## 🆘 Problemas Comunes

### "relation already exists"
→ Las tablas ya existen. Ignora el error.

### "permission denied"
→ Revisa que ejecutaste el SQL de seguridad (Paso 7).

### No puedo hacer admin
→ Verifica que el email coincida exactamente.

---

**¿Necesitas ayuda completa?** Lee `SUPABASE_SETUP.md`

---

**¡Tu tienda iPhoneLechería está lista para producción! 🍎🚀**
