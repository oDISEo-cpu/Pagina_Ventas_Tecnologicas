# iPhoneLechería - E-commerce App

## 🚀 Configuración de Firebase

La aplicación está preparada para usar **Firebase** como base de datos real. Si Firebase no está configurado, funciona con localStorage como fallback.

### Paso 1: Crear proyecto en Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Click en "Agregar proyecto"
3. Nombra tu proyecto (ej: "iphonelecheria")
4. Desactiva Google Analytics (opcional)
5. Click en "Crear proyecto"

### Paso 2: Configurar Authentication

1. En el menú lateral, ve a **Authentication**
2. Click en "Comenzar"
3. En la pestaña "Sign-in method", habilita **Email/Password**

### Paso 3: Configurar Firestore Database

1. En el menú lateral, ve a **Firestore Database**
2. Click en "Crear base de datos"
3. Selecciona "Comenzar en modo de prueba" (puedes cambiar las reglas después)
4. Elige la ubicación más cercana (ej: `southamerica-east1` para Venezuela)

### Paso 4: Configurar Storage (para imágenes)

1. En el menú lateral, ve a **Storage**
2. Click en "Comenzar"
3. Acepta las reglas por defecto (modo prueba)
4. Click en "Listo"

### Paso 5: Obtener credenciales

1. Click en el ícono de engranaje ⚙️ (arriba a la izquierda)
2. Selecciona "Configuración del proyecto"
3. Baja hasta "Tus apps"
4. Click en el ícono de web `</>`
5. Registra tu app con un nombre (ej: "iPhoneLechería Web")
6. Copia las credenciales que aparecen

### Paso 6: Configurar la aplicación

Abre el archivo `src/lib/firebase.ts` y reemplaza los valores:

```typescript
const firebaseConfig = {
  apiKey: "AIzaSy...", // Tu API Key
  authDomain: "tu-proyecto.firebaseapp.com",
  projectId: "tu-proyecto-id",
  storageBucket: "tu-proyecto.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

### Paso 7: Crear usuario administrador

Después de configurar Firebase, necesitas crear el usuario administrador manualmente:

1. Ve a **Authentication** > **Users**
2. Click en "Agregar usuario"
3. Email: `admin@iphonelecheria.com`
4. Contraseña: `admin123` (o la que prefieras)
5. Click en "Agregar usuario"

Luego, en **Firestore Database**:
1. Crea una colección llamada `users`
2. Agrega un documento con el ID igual al UID del usuario que creaste
3. Agrega estos campos:
   - `name`: "Administrador"
   - `email`: "admin@iphonelecheria.com"
   - `phone`: "0414-8808810"
   - `role`: "admin"
   - `createdAt`: timestamp actual

---

## 📦 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── cart/           # Carrito de compras
│   ├── home/           # Componentes de la página principal
│   ├── layout/         # Header, Footer, WhatsApp
│   └── products/       # Cards y filtros de productos
├── lib/                # Utilidades y configuración
│   ├── firebase.ts     # Configuración de Firebase
│   ├── constants.ts    # Constantes del negocio
│   ├── products.ts     # Productos iniciales
│   └── utils.ts        # Funciones auxiliares
├── pages/              # Páginas de la aplicación
│   ├── admin/          # Panel de administración
│   ├── Home.tsx
│   ├── Products.tsx
│   ├── Services.tsx
│   ├── Contact.tsx
│   ├── Login.tsx
│   ├── Register.tsx
│   └── MyOrders.tsx
├── services/           # Servicios con Firebase/localStorage
│   ├── authService.ts
│   ├── productsService.ts
│   └── ordersService.ts
├── store/              # Estados globales (Zustand)
│   ├── useAuthStore.ts
│   ├── useCartStore.ts
│   ├── useOrdersStore.ts
│   └── useProductsStore.ts
└── types/              # Tipos TypeScript
    └── index.ts
```

---

## 🔐 Credenciales de Acceso

### Sin Firebase (localStorage):
- **Admin**: admin@iphonelecheria.com / admin123

### Con Firebase:
- **Admin**: El que creaste manualmente en Firebase Authentication

---

## 🎯 Características

### Para Clientes:
- ✅ Registro e inicio de sesión
- ✅ Catálogo de productos con filtros
- ✅ Carrito de compras
- ✅ Historial de pedidos
- ✅ Checkout con envío por WhatsApp

### Para Administradores:
- ✅ Panel de administración completo
- ✅ Gestión de productos (agregar, editar, eliminar)
- ✅ **Importar imágenes desde dispositivo** o usar URLs
- ✅ Gestión de pedidos (ver, cambiar estado)
- ✅ Gestión de usuarios registrados
- ✅ Estadísticas de ventas

---

## 💾 Almacenamiento de Datos

### Con Firebase (Recomendado):
- **Usuarios**: Firestore collection `users`
- **Productos**: Firestore collection `products`
- **Pedidos**: Firestore collection `orders`
- **Imágenes**: Firebase Storage bucket `products/`

### Sin Firebase (Fallback):
- Todo se guarda en `localStorage` del navegador
- Los datos son locales y no se comparten entre dispositivos
- ⚠️ No recomendado para producción

---

## 🚀 Despliegue

### Opción 1: Firebase Hosting (Recomendado)

```bash
# Instalar Firebase CLI
npm install -g firebase-tools

# Iniciar sesión
firebase login

# Inicializar hosting
firebase init hosting

# Configurar:
# - Public directory: dist
# - Single-page app: Yes
# - GitHub deploys: No

# Construir y desplegar
npm run build
firebase deploy
```

### Opción 2: Vercel

```bash
# Instalar Vercel CLI
npm i -g vercel

# Desplegar
vercel
```

### Opción 3: Netlify

```bash
# Instalar Netlify CLI
npm i -g netlify-cli

# Construir y desplegar
npm run build
netlify deploy --prod
```

---

## 🛠️ Tecnologías

- **React 18** + **TypeScript**
- **Vite** (build tool)
- **Tailwind CSS** (estilos)
- **React Router** (navegación)
- **Zustand** (estado global)
- **Firebase** (backend opcional)
  - Authentication
  - Firestore Database
  - Storage

---

## 📱 Responsive

La aplicación es 100% responsive y funciona en:
- 📱 Móviles (320px+)
- 📱 Tablets (768px+)
- 💻 Laptops (1024px+)
- 🖥️ Desktop (1280px+)

---

## 🎨 Personalización

### Cambiar colores
Edita `src/index.css` y modifica las variables de Tailwind:
```css
@theme {
  --color-apple-blue: #0071E3;
  --color-apple-gray: #86868B;
  /* ... */
}
```

### Cambiar información del negocio
Edita `src/lib/constants.ts`:
```typescript
export const BUSINESS_INFO = {
  name: 'iPhoneLechería',
  address: 'Tu dirección aquí',
  phones: ['Tu teléfono'],
  // ...
};
```

---

## 📞 Soporte

Si necesitas ayuda configurando Firebase o personalizando la aplicación, contacta al desarrollador.

---

## 📝 Licencia

Este proyecto fue creado para iPhoneLechería. Todos los derechos reservados.
