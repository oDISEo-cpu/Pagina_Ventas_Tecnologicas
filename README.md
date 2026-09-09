# 🍎 iPhoneLechería - E-commerce Apple Venezuela

Aplicación web completa de e-commerce para iPhoneLechería, una tienda de productos Apple en Lechería, Venezuela.

## 🌟 Características

### Para Clientes
- ✅ Catálogo de productos con filtros avanzados
- ✅ Carrito de compras con persistencia
- ✅ Registro e inicio de sesión
- ✅ Historial de pedidos con timeline visual
- ✅ Notificaciones por WhatsApp
- ✅ Modo oscuro/claro
- ✅ Diseño responsive (mobile-first)

### Para Administradores
- ✅ Panel de administración completo
- ✅ Gestión de productos (agregar, editar, eliminar)
- ✅ Importar imágenes desde dispositivo
- ✅ Gestión de pedidos con cambio de estado
- ✅ Notificaciones automáticas a clientes
- ✅ Historial de notificaciones
- ✅ Gestión de usuarios
- ✅ Galería de Instagram editable
- ✅ Estadísticas de ventas

## 🛠️ Tecnologías

- **Frontend:** React + TypeScript + Vite
- **Estilos:** Tailwind CSS
- **Animaciones:** Framer Motion
- **Estado:** Zustand
- **Routing:** React Router
- **Backend:** Firebase (Auth, Firestore, Storage, Hosting)
- **Iconos:** Lucide React
- **Formularios:** React Hook Form + Zod

## 📦 Instalación

```bash
# Clonar repositorio
git clone <url>

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build
```

## 🔥 Configuración Firebase

### Guía Rápida (10 minutos)

1. **Crear proyecto en Firebase**
   - Ve a https://console.firebase.google.com/
   - Crea un proyecto llamado `iphonelecheria`

2. **Habilitar servicios**
   - Authentication (Email/Password)
   - Firestore Database
   - Storage

3. **Obtener credenciales**
   - Configuración del proyecto → Tus aplicaciones → Web
   - Copia el objeto `firebaseConfig`

4. **Configurar la app**
   - Abre `src/lib/firebase.ts`
   - Reemplaza las credenciales con las tuyas

5. **Crear usuario admin**
   - Authentication → Users → Agregar usuario
   - Email: `crea algún correo para usarlo como Administrador`
   - Contraseña: `cualquier contraseña con 6 o más caracteres funciona`
   - En Firestore → users → agrega el documento con `role: "admin"`

6. **Desplegar**
   ```bash
   npm install -g firebase-tools
   firebase login
   npm run build
   firebase deploy
   ```

📖 **Guía completa:** `FIREBASE_SETUP.md`
📖 **Guía rápida:** `GUIA_RAPIDA.md`

## 🌐 Despliegue

### Firebase Hosting (Recomendado)
```bash
# Instalar Firebase CLI
npm install -g firebase-tools

# Iniciar sesión
firebase login

# Construir y desplegar
npm run build
firebase deploy
```

Tu app estará en: `https://iphonelecheria.web.app`

### Dominio Personalizado
Puedes agregar un dominio propio como `iphonelecheria.com` siguiendo la guía en `FIREBASE_SETUP.md`

## 🔐 Credenciales de Prueba

**Administrador:**
- Email: `El correo que se creo anteriormente`
- Contraseña: `La contraseña creada`

## 📱 Funcionalidades Principales

### Catálogo de Productos
- 18 productos de referencia precargados
- Filtros por categoría, precio, condición
- Búsqueda en tiempo real
- Tarjetas con hover effects

### Carrito de Compras
- Persistencia en localStorage/Firebase
- Cálculo automático de totales
- Checkout con múltiples métodos de pago
- Envío de pedido por WhatsApp al admin

### Sistema de Notificaciones
- Notificaciones por WhatsApp al cambiar estado
- Notificaciones por email (requiere EmailJS)
- Timeline visual de progreso del pedido
- Historial de notificaciones

### Panel Admin
- Gestión completa de productos
- Importar imágenes desde dispositivo
- Cambio de estado de pedidos
- Notificación automática a clientes
- Gestión de usuarios
- Galería de Instagram editable
- Estadísticas de ventas

## 📂 Estructura del Proyecto

```
iphonelecheria-web/
├── src/
│   ├── components/
│   │   ├── cart/          # Carrito de compras
│   │   ├── home/          # Componentes de inicio
│   │   ├── layout/        # Header, Footer, WhatsApp
│   │   └── products/      # Tarjetas y filtros
│   ├── lib/
│   │   ├── constants.ts   # Constantes del negocio
│   │   ├── firebase.ts    # Configuración Firebase
│   │   ├── products.ts    # Productos de referencia
│   │   └── utils.ts       # Utilidades
│   ├── pages/
│   │   ├── admin/         # Panel de administración
│   │   ├── Home.tsx       # Página de inicio
│   │   ├── Products.tsx   # Catálogo
│   │   ├── Services.tsx   # Servicios
│   │   ├── Contact.tsx    # Contacto
│   │   ├── Login.tsx      # Inicio de sesión
│   │   ├── Register.tsx   # Registro
│   │   └── MyOrders.tsx   # Mis pedidos
│   ├── services/
│   │   ├── authService.ts       # Autenticación
│   │   ├── ordersService.ts     # Pedidos
│   │   ├── productsService.ts   # Productos
│   │   └── notificationService.ts # Notificaciones
│   ├── store/
│   │   ├── useAuthStore.ts      # Estado de autenticación
│   │   ├── useCartStore.ts      # Estado del carrito
│   │   ├── useOrdersStore.ts    # Estado de pedidos
│   │   ├── useProductsStore.ts  # Estado de productos
│   │   ├── useThemeStore.ts     # Estado del tema
│   │   └── useInstagramStore.ts # Estado de Instagram
│   ├── types/
│   │   └── index.ts       # Tipos TypeScript
│   ├── App.tsx            # Componente principal
│   └── main.tsx           # Punto de entrada
├── public/                # Archivos estáticos
├── firebase.json          # Configuración Firebase Hosting
├── .firebaserc            # Configuración de proyecto Firebase
├── FIREBASE_SETUP.md      # Guía completa de Firebase
├── GUIA_RAPIDA.md         # Guía rápida de Firebase
└── package.json           # Dependencias
```

## 🎨 Personalización

### Datos del Negocio
Edita `src/lib/constants.ts`:
```typescript
export const BUSINESS_INFO = {
  name: 'iPhoneLechería',
  instagram: '@iphonelecheria.st',
  address: 'Tu dirección',
  phones: ['0414-8808810'],
  whatsapp: '584148808810',
  // ... más datos
};
```

### Productos de Referencia
Edita `src/lib/products.ts` para cambiar los productos iniciales.

### Colores
Edita `src/index.css` para cambiar la paleta de colores.

## 📊 Base de Datos

### Colecciones Firestore

#### `users`
```typescript
{
  id: string,
  name: string,
  email: string,
  phone: string,
  cedula: string,
  role: 'user' | 'admin',
  createdAt: string
}
```

#### `products`
```typescript
{
  id: number,
  name: string,
  slug: string,
  category: string,
  price: number,
  image: string,
  // ... más campos
}
```

#### `orders`
```typescript
{
  id: string,
  userId: string,
  userName: string,
  userEmail: string,
  userPhone: string,
  userCedula: string,
  items: OrderItem[],
  total: number,
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled',
  createdAt: string
}
```

## 🔒 Seguridad

### Reglas de Firestore (Producción)
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null && isAdmin();
    }
    match /orders/{orderId} {
      allow read: if request.auth != null && (resource.data.userId == request.auth.uid || isAdmin());
      allow create: if request.auth != null;
      allow update: if request.auth != null && isAdmin();
    }
    function isAdmin() {
      return get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
```

## 📱 Screenshots

- Página de inicio con hero carousel
- Catálogo de productos con filtros
- Carrito de compras
- Panel de administración
- Timeline de pedidos
- Modo oscuro/claro

## 🚀 Próximas Mejoras

- [ ] Integración con pasarela de pago
- [ ] Sistema de reseñas y calificaciones
- [ ] Chat en vivo con clientes
- [ ] Programa de lealtad/puntos
- [ ] Cupones de descuento
- [ ] Blog/Noticias
- [ ] Integración con redes sociales
- [ ] App móvil (React Native)

## 📞 Soporte

Para soporte técnico o consultas:
- Email: admin@iphonelecheria.com
- WhatsApp: 0414-8808810
- Instagram: @iphonelecheria.st

## 📄 Licencia

Este proyecto fue desarrollado para iPhoneLechería. Todos los derechos reservados.

---

**Desarrollado con ❤️ para iPhoneLechería** 🍎
