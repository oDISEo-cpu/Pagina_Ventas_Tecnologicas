# 📋 RESUMEN COMPLETO DEL PROYECTO - iPhoneLechería
## Documento para Contexto de IA - Firebase Hosting Setup

---

## 🏢 INFORMACIÓN DEL NEGOCIO

**Nombre:** iPhoneLechería  
**Tipo:** Tienda de productos Apple y gaming  
**Ubicación:** C.C Grey Plaza, Av. Diego Bautista Urbaneja, Local P2-3, Lechería, Anzoátegui, Venezuela  
**Instagram:** @iphonelecheria.st (93.1K seguidores)  
**WhatsApp:** 0414-8808810  
**Teléfonos:** 0414-8808810 / 0414-1324525  
**Horario:** Lunes a Sábado 9:00 AM - 6:00 PM  
**RIF:** J-41324525-6  
**Métodos de pago:** Bolívares, Zelle, Efectivo, Pago Móvil

---

## 🛠️ STACK TECNOLÓGICO

### Frontend
- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite
- **Routing:** React Router DOM (HashRouter)
- **Estilos:** Tailwind CSS 4
- **Animaciones:** Framer Motion
- **Estado Global:** Zustand (con persistencia en localStorage)
- **Iconos:** Lucide React
- **Formularios:** React Hook Form + Zod
- **Backend:** Firebase (Auth, Firestore, Storage, Hosting)

### Dependencias Principales
```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-router-dom": "^7.1.5",
  "framer-motion": "^12.4.7",
  "zustand": "^5.0.3",
  "lucide-react": "^0.475.0",
  "tailwindcss": "^4.0.0",
  "firebase": "^11.0.0",
  "@emailjs/browser": "^4.0.0",
  "clsx": "^2.1.1",
  "react-hook-form": "^7.54.2",
  "zod": "^3.24.2"
}
```

---

## 📂 ESTRUCTURA DEL PROYECTO

```
iphonelecheria-web/
├── src/
│   ├── components/
│   │   ├── cart/
│   │   │   └── CartDrawer.tsx              # Carrito lateral con checkout
│   │   ├── home/
│   │   │   ├── HeroCarousel.tsx            # Carrusel principal
│   │   │   ├── FeaturedProducts.tsx        # Productos destacados
│   │   │   ├── ServicesSection.tsx         # Sección de servicios
│   │   │   ├── InstagramGrid.tsx           # Galería Instagram
│   │   │   └── TestimonialsSection.tsx     # Testimonios
│   │   ├── layout/
│   │   │   ├── Header.tsx                  # Navbar con tema toggle
│   │   │   ├── Footer.tsx                  # Footer 4 columnas
│   │   │   └── WhatsAppFloat.tsx           # Botón flotante WhatsApp
│   │   └── products/
│   │       └── ProductCard.tsx             # Tarjeta de producto
│   ├── lib/
│   │   ├── constants.ts                    # Datos del negocio
│   │   ├── firebase.ts                     # Configuración Firebase
│   │   ├── products.ts                     # 18 productos de referencia
│   │   ├── testimonials.ts                 # Testimonios mock
│   │   └── utils.ts                        # Utilidades (formatPrice, etc.)
│   ├── pages/
│   │   ├── admin/
│   │   │   └── AdminDashboard.tsx          # Panel admin completo
│   │   ├── Home.tsx                        # Página de inicio
│   │   ├── Products.tsx                    # Catálogo con filtros
│   │   ├── Services.tsx                    # Servicios
│   │   ├── Contact.tsx                     # Contacto con formulario
│   │   ├── Login.tsx                       # Inicio de sesión
│   │   ├── Register.tsx                    # Registro con cédula
│   │   └── MyOrders.tsx                    # Historial de pedidos
│   ├── services/
│   │   ├── authService.ts                  # Autenticación híbrida
│   │   ├── ordersService.ts                # Gestión de pedidos
│   │   ├── productsService.ts              # Gestión de productos
│   │   └── notificationService.ts          # Notificaciones WhatsApp/Email
│   ├── store/
│   │   ├── useAuthStore.ts                 # Estado de autenticación
│   │   ├── useCartStore.ts                 # Estado del carrito
│   │   ├── useOrdersStore.ts               # Estado de pedidos
│   │   ├── useProductsStore.ts             # Estado de productos
│   │   ├── useThemeStore.ts                # Estado tema oscuro/claro
│   │   └── useInstagramStore.ts            # Estado galería Instagram
│   ├── types/
│   │   └── index.ts                        # Tipos TypeScript
│   ├── App.tsx                             # Router principal
│   ├── main.tsx                            # Punto de entrada
│   └── index.css                           # Estilos globales + tema oscuro
├── public/                                 # Archivos estáticos
├── firebase.json                           # Configuración Firebase Hosting
├── .firebaserc                             # Proyecto Firebase
├── FIREBASE_SETUP.md                       # Guía completa Firebase
├── GUIA_RAPIDA.md                          # Guía rápida 10 min
├── README.md                               # Documentación proyecto
└── package.json                            # Dependencias
```

---

## 🎯 FUNCIONALIDADES IMPLEMENTADAS

### 1. Sistema de Autenticación
- ✅ Registro con campos: nombre, email, teléfono, cédula, contraseña
- ✅ Inicio de sesión con email/password
- ✅ Persistencia de sesión
- ✅ Roles: `user` y `admin`
- ✅ Sistema híbrido (Firebase Auth + localStorage fallback)

### 2. Catálogo de Productos
- ✅ 18 productos de referencia precargados
- ✅ Categorías: iPhones, MacBooks, AirPods, PlayStation, Accesorios
- ✅ Filtros: categoría, precio, condición (nuevo/usado), almacenamiento
- ✅ Búsqueda en tiempo real
- ✅ Tarjetas con hover effects, badges, precios
- ✅ Botones: "Agregar al carrito" y "Consultar por WhatsApp"

### 3. Carrito de Compras
- ✅ Drawer lateral con animaciones
- ✅ Persistencia en localStorage
- ✅ Cálculo automático de subtotal, envío, total
- ✅ Métodos de pago: Zelle, Pago Móvil, Efectivo, Bolívares
- ✅ Checkout con confirmación
- ✅ Envío automático de pedido a WhatsApp del admin

### 4. Sistema de Pedidos
- ✅ Creación de pedidos al completar compra
- ✅ Estados: pending, confirmed, shipped, delivered, cancelled
- ✅ Timeline visual de progreso (4 pasos)
- ✅ Historial de pedidos por usuario
- ✅ Gestión de pedidos en panel admin

### 5. Notificaciones
- ✅ **WhatsApp:** Mensaje automático al cliente cuando cambia estado
- ✅ **Email:** Integración con EmailJS (requiere configuración)
- ✅ Modal de notificación al cambiar estado de pedido
- ✅ Mensaje personalizable por el admin
- ✅ Historial de notificaciones en panel admin

### 6. Panel de Administración
- ✅ **Pestaña Pedidos:** Lista completa, cambio de estado, notificaciones
- ✅ **Pestaña Productos:** Agregar, editar, eliminar, importar imágenes
- ✅ **Pestaña Usuarios:** Lista de usuarios registrados con cédula
- ✅ **Pestaña Instagram:** Galería editable, importar imágenes
- ✅ **Pestaña Notificaciones:** Historial completo, estadísticas
- ✅ Estadísticas: total pedidos, ingresos, pedidos pendientes

### 7. Modo Oscuro/Claro
- ✅ Toggle en header (icono sol/luna)
- ✅ Persistencia de preferencia
- ✅ Implementado en todos los componentes principales

### 8. Galería de Instagram
- ✅ 6 imágenes de referencia
- ✅ Admin puede cambiar, agregar, eliminar imágenes
- ✅ Importar imágenes desde dispositivo
- ✅ Likes y comentarios simulados

### 9. Mensaje WhatsApp al Admin
Cuando un usuario compra, se envía automáticamente:
```
🛒 NUEVO PEDIDO RECIBIDO

👤 DATOS DEL CLIENTE:
• Nombre: [nombre]
• Cédula: [cedula]
• Teléfono: [telefono]
• Email: [email]

📦 PRODUCTOS:
1. [producto] x[cantidad]
   Precio: $[precio]
   Subtotal: $[subtotal]

💰 RESUMEN:
• Subtotal: $[subtotal]
• Envío: $[envio]
• TOTAL: $[total]

💳 Método de pago: [metodo]
📅 Fecha: [fecha]
```

### 10. Mensaje de Notificación al Cliente
Cuando el admin cambia estado, se envía:
```
¡Hola [nombre]! 👋

Te escribimos de iPhoneLechería 🍎

[emoji] Actualización de tu pedido #[id]

El estado de tu pedido ha cambiado a: [estado]

📦 Resumen de tu pedido:
1. [producto] x[cantidad]

💰 Total: $[total]

📞 0414-8808810
📍 C.C Grey Plaza, Lechería
```

---

## 🔥 CONFIGURACIÓN FIREBASE

### Estado Actual
- ✅ Firebase instalado (`firebase` package)
- ✅ Archivo de configuración creado (`src/lib/firebase.ts`)
- ✅ Servicios configurados: Auth, Firestore, Storage
- ✅ Sistema híbrido (Firebase + localStorage fallback)
- ⏳ **PENDIENTE:** Configurar credenciales reales
- ⏳ **PENDIENTE:** Crear proyecto en Firebase Console
- ⏳ **PENDIENTE:** Desplegar a Firebase Hosting

### Archivo de Configuración
**Ubicación:** `src/lib/firebase.ts`

```typescript
const firebaseConfig = {
  apiKey: "TU_API_KEY_AQUI",
  authDomain: "TU_AUTH_DOMAIN_AQUI",
  projectId: "TU_PROJECT_ID_AQUI",
  storageBucket: "TU_STORAGE_BUCKET_AQUI",
  messagingSenderId: "TU_MESSAGING_SENDER_ID_AQUI",
  appId: "TU_APP_ID_AQUI"
};
```

### Colecciones Firestore Necesarias

#### 1. `users`
```typescript
{
  id: string,              // UID de Firebase Auth
  name: string,
  email: string,
  phone: string,
  cedula: string,          // Cédula venezolana
  role: 'user' | 'admin',  // ⚠️ CRÍTICO para permisos
  createdAt: string        // ISO timestamp
}
```

#### 2. `products`
```typescript
{
  id: number,
  name: string,
  slug: string,
  category: 'iphones' | 'accesorios' | 'macbooks' | 'airpods' | 'playstation',
  price: number,
  originalPrice?: number,
  storage?: string,
  color?: string,
  condition: 'nuevo' | 'usado',
  image: string,
  specs: string[],
  description: string,
  inStock: boolean,
  stockQuantity?: number
}
```

#### 3. `orders`
```typescript
{
  id: string,
  userId: string,
  userName: string,
  userEmail: string,
  userPhone: string,
  userCedula?: string,
  items: [
    {
      product: Product,
      quantity: number,
      price: number
    }
  ],
  subtotal: number,
  shipping: number,
  total: number,
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled',
  paymentMethod: string,
  createdAt: string
}
```

### Reglas de Seguridad (Para Producción)

#### Firestore Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Usuarios pueden leer/escribir sus propios datos
    match /users/{userId} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Admin puede gestionar todos los usuarios
    match /users/{userId} {
      allow read, write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Todos pueden leer productos, solo admin puede escribir
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Usuarios leen sus órdenes, admin lee todas
    match /orders/{orderId} {
      allow read: if request.auth != null && (
        resource.data.userId == request.auth.uid ||
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin'
      );
      allow create: if request.auth != null && request.resource.data.userId == request.auth.uid;
      allow update: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
```

#### Storage Rules
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /products/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
```

---

## 🔐 CREDENCIALES DE PRUEBA

### Administrador
- **Email:** `admin@iphonelecheria.com`
- **Contraseña:** `admin123`
- **UID:** (se genera al crear en Firebase Auth)
- **Role:** `admin` (debe estar en Firestore)

### Usuario de Prueba
- **Email:** `cliente@test.com`
- **Contraseña:** `cliente123`
- **Role:** `user`

---

## 🌐 DESPLIEGUE FIREBASE HOSTING

### Archivos de Configuración Creados

#### `firebase.json`
```json
{
  "hosting": {
    "public": "dist",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

#### `.firebaserc`
```json
{
  "projects": {
    "default": "iphonelecheria"
  }
}
```

### Comandos para Desplegar

```bash
# 1. Instalar Firebase CLI (si no está instalado)
npm install -g firebase-tools

# 2. Iniciar sesión
firebase login

# 3. Inicializar proyecto (si no se ha hecho)
firebase init hosting
# - Seleccionar proyecto existente: iphonelecheria
# - Directorio público: dist
# - Configurar como SPA: Yes
# - No sobrescribir index.html

# 4. Construir la aplicación
npm run build

# 5. Desplegar
firebase deploy

# O solo hosting
firebase deploy --only hosting
```

### URL Resultante
- **Dominio gratuito:** `https://iphonelecheria.web.app`
- **Dominio alternativo:** `https://iphonelecheria.firebaseapp.com`
- **Dominio personalizado:** `https://iphonelecheria.com` (requiere configuración DNS)

---

## 📊 PRODUCTOS DE REFERENCIA (18 productos)

La aplicación incluye 18 productos precargados en `src/lib/products.ts`:

### iPhones (6)
1. iPhone 17 Pro Max - $1199 (nuevo)
2. iPhone 17 - $899 (nuevo)
3. iPhone 16 Pro Max - $950 (nuevo)
4. iPhone 15 Pro Max - $670 (usado, era $850)
5. iPhone 15 - $550 (usado, era $650)
6. iPhone 14 Pro - $480 (usado, era $600)

### MacBooks (3)
7. MacBook Neo 13" - $800 (nuevo)
8. MacBook Air M3 15" - $1100 (nuevo)
9. MacBook Pro 14" M4 Pro - $1800 (nuevo)

### AirPods (2)
10. AirPods Pro 3 - $260 (nuevo)
11. AirPods 4 - $130 (nuevo)

### PlayStation (2)
12. PlayStation 5 Slim - $740 (nuevo)
13. PlayStation 5 Digital - $620 (nuevo)

### Accesorios (5)
14. Apple Watch Series 10 - $420 (nuevo)
15. Case MagSafe Silicona - $35 (nuevo)
16. Cargador MagSafe 20W - $45 (nuevo)
17. iPad Pro M4 11" - $999 (nuevo)
18. Cable USB-C a Lightning - $15 (nuevo)

---

## 🎨 CARACTERÍSTICAS DE DISEÑO

### Paleta de Colores
- **Azul Apple:** `#0071E3`
- **Gris:** `#86868B`
- **Fondo:** `#F5F5F7`
- **Oscuro:** `#1D1D1F`
- **Modo oscuro:** Fondo negro `#000000`, tarjetas gris oscuro

### Tipografía
- **Fuente:** Inter (400, 500, 600, 700)
- **Estilo:** Minimalista, premium, similar a Apple.com

### Responsive
- **Mobile-first:** Diseño optimizado para móviles
- **Breakpoints:** sm:640px, md:768px, lg:1024px, xl:1280px
- **Grid:** 1 col (móvil), 2 (tablet), 3-4 (desktop)

---

## 🔔 SISTEMA DE NOTIFICACIONES

### WhatsApp (Funcional)
- ✅ Se abre automáticamente con mensaje predefinido
- ✅ Incluye datos del pedido y estado
- ✅ Mensaje personalizable por admin
- ✅ Sin configuración adicional

### Email (Requiere EmailJS)
- ⏳ Requiere crear cuenta en EmailJS
- ⏳ Configurar credenciales en `src/services/notificationService.ts`
- ⏳ Hasta 200 emails gratis/mes

### Historial
- ✅ Todas las notificaciones se guardan en localStorage
- ✅ Panel admin muestra historial completo
- ✅ Estadísticas por tipo (WhatsApp/Email)

---

## 📱 FLUJO COMPLETO DE COMPRA

1. **Usuario se registra** → Ingresa nombre, email, teléfono, cédula, contraseña
2. **Usuario navega catálogo** → Filtra por categoría, precio, condición
3. **Usuario agrega al carrito** → Productos se guardan en localStorage
4. **Usuario hace checkout** → Selecciona método de pago
5. **Pedido se crea** → Se guarda en Firestore/localStorage
6. **WhatsApp se abre** → Mensaje automático al admin con todos los datos
7. **Admin recibe notificación** → Ve pedido en panel admin
8. **Admin cambia estado** → Modal aparece con opciones de notificación
9. **Admin notifica al cliente** → WhatsApp o Email con mensaje personalizado
10. **Cliente ve actualización** → Timeline visual en "Mis Pedidos"

---

## ⚙️ CONFIGURACIÓN PENDIENTE

### Para Firebase
- [ ] Crear proyecto en Firebase Console
- [ ] Habilitar Authentication (Email/Password)
- [ ] Crear Firestore Database
- [ ] Crear Storage
- [ ] Crear colecciones: `users`, `products`, `orders`
- [ ] Obtener credenciales de Firebase
- [ ] Reemplazar credenciales en `src/lib/firebase.ts`
- [ ] Crear usuario administrador con `role: "admin"`
- [ ] Actualizar reglas de seguridad (para producción)
- [ ] Instalar Firebase CLI
- [ ] Ejecutar `firebase login`
- [ ] Ejecutar `firebase deploy`

### Para EmailJS (Opcional)
- [ ] Crear cuenta en https://www.emailjs.com/
- [ ] Crear servicio de email
- [ ] Crear plantilla de email
- [ ] Reemplazar credenciales en `src/services/notificationService.ts`

---

## 📚 DOCUMENTACIÓN DISPONIBLE

- **`GUIA_RAPIDA.md`** → Configuración Firebase en 10 minutos
- **`FIREBASE_SETUP.md`** → Guía completa con troubleshooting
- **`README.md`** → Documentación completa del proyecto
- **`RESUMEN_PROYECTO.md`** → Este documento

---

## 🎯 RESUMEN EJECUTIVO

**Estado del Proyecto:** ✅ Completamente funcional en modo local (localStorage)

**Próximo Paso:** Configurar Firebase para:
1. Base de datos compartida entre dispositivos
2. Autenticación segura
3. Almacenamiento de imágenes
4. Hosting con dominio gratuito

**Tiempo Estimado:** 15-30 minutos para configuración completa

**Costo:** Gratis (plan gratuito de Firebase es suficiente)

**URL Final:** `https://iphonelecheria.web.app`

---

## 📞 CONTACTO

Para soporte o consultas:
- **Email:** admin@iphonelecheria.com
- **WhatsApp:** 0414-8808810
- **Instagram:** @iphonelecheria.st

---

**Documento generado para contexto de IA - Firebase Hosting Setup**  
**Proyecto:** iPhoneLechería E-commerce  
**Fecha:** 2024  
**Versión:** 1.0
