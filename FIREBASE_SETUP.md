# 🚀 Guía Completa de Configuración Firebase para iPhoneLechería

## 📋 Índice
1. [Crear Proyecto en Firebase](#1-crear-proyecto-en-firebase)
2. [Configurar Authentication](#2-configurar-authentication)
3. [Configurar Firestore Database](#3-configurar-firestore-database)
4. [Configurar Storage](#4-configurar-storage)
5. [Obtener Credenciales](#5-obtener-credenciales)
6. [Configurar la Aplicación](#6-configurar-la-aplicación)
7. [Crear Usuario Administrador](#7-crear-usuario-administrador)
8. [Desplegar a Firebase Hosting](#8-desplegar-a-firebase-hosting)
9. [Dominio Personalizado (Opcional)](#9-dominio-personalizado-opcional)

---

## 1. Crear Proyecto en Firebase

### Pasos:
1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Inicia sesión con tu cuenta de Google
3. Click en **"Agregar proyecto"** o **"Add project"**
4. Nombre del proyecto: `iphonelecheria` (o el que prefieras)
5. Puedes desactivar Google Analytics (no es necesario)
6. Click en **"Crear proyecto"**
7. Espera a que se cree (1-2 minutos)

✅ **Resultado:** Tendrás tu proyecto Firebase creado

---

## 2. Configurar Authentication

### Pasos:
1. En el menú lateral izquierdo, click en **"Authentication"**
2. Click en **"Comenzar"** o **"Get started"**
3. Ve a la pestaña **"Sign-in method"** o **"Método de inicio de sesión"**
4. Click en **"Email/Contraseña"** o **"Email/Password"**
5. Activa el primer interruptor **"Habilitar"**
6. Click en **"Guardar"**

✅ **Resultado:** Authentication habilitado con email/password

---

## 3. Configurar Firestore Database

### Pasos:
1. En el menú lateral izquierdo, click en **"Firestore Database"**
2. Click en **"Crear base de datos"** o **"Create database"**
3. Selecciona ubicación:
   - **Recomendado:** `us-central1` (Iowa) o `southamerica-east1` (São Paulo)
4. Selecciona **"Comenzar en modo de prueba"** (para desarrollo)
   - ⚠️ **Importante:** Después deberás cambiar a modo producción con reglas de seguridad
5. Click en **"Habilitar"**
6. Espera a que se cree (1-2 minutos)

### Crear Colecciones:
Una vez creada la base de datos, crea estas colecciones:

#### Colección `users`:
1. Click en **"+ Iniciar colección"**
2. Nombre: `users`
3. Click en **"Siguiente"**
4. No agregues documentos todavía (se crearán automáticamente)

#### Colección `products`:
1. Click en **"+ Iniciar colección"**
2. Nombre: `products`
3. Click en **"Siguiente"**
4. No agregues documentos todavía

#### Colección `orders`:
1. Click en **"+ Iniciar colección"**
2. Nombre: `orders`
3. Click en **"Siguiente"**
4. No agregues documentos todavía

✅ **Resultado:** Firestore Database configurado con 3 colecciones

---

## 4. Configurar Storage

### Pasos:
1. En el menú lateral izquierdo, click en **"Storage"**
2. Click en **"Comenzar"** o **"Get started"**
3. Revisa las reglas de seguridad (modo prueba está bien por ahora)
4. Click en **"Siguiente"**
5. Confirma la ubicación del bucket
6. Click en **"Listo"** o **"Done"**

✅ **Resultado:** Storage habilitado para subir imágenes

---

## 5. Obtener Credenciales

### Pasos:
1. En el menú lateral izquierdo, click en **"⚙️ Configuración del proyecto"** (ícono de engranaje)
2. En la sección **"Tus aplicaciones"**, busca **"Configuración de SDK"**
3. Si no hay una app web registrada:
   - Click en **"Agregar aplicación"** (ícono `</>`)
   - Nombre del alias: `iPhoneLechería Web`
   - **NO** marques "Configurar también Firebase Hosting" (lo haremos después)
   - Click en **"Registrar app"**
4. Copia el objeto de configuración que aparece. Se verá así:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "iphonelecheria.firebaseapp.com",
  projectId: "iphonelecheria",
  storageBucket: "iphonelecheria.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123..."
};
```

✅ **Resultado:** Tienes tus credenciales de Firebase

---

## 6. Configurar la Aplicación

### Pasos:
1. Abre el archivo `src/lib/firebase.ts` en tu editor
2. Reemplaza los valores de `firebaseConfig` con los que copiaste:

```typescript
const firebaseConfig = {
  apiKey: "AIzaSy...", // Tu API Key
  authDomain: "iphonelecheria.firebaseapp.com", // Tu Auth Domain
  projectId: "iphonelecheria", // Tu Project ID
  storageBucket: "iphonelecheria.appspot.com", // Tu Storage Bucket
  messagingSenderId: "123456789", // Tu Messaging Sender ID
  appId: "1:123456789:web:abc123..." // Tu App ID
};
```

3. Guarda el archivo

✅ **Resultado:** Tu aplicación está conectada a Firebase

---

## 7. Crear Usuario Administrador

### Opción A: Desde Firebase Console (Recomendado)

1. Ve a **Firebase Console** → **Authentication** → **Users**
2. Click en **"Agregar usuario"**
3. Ingresa:
   - **Email:** `admin@iphonelecheria.com`
   - **Contraseña:** `admin123` (o la que prefieras)
4. Click en **"Agregar usuario"**
5. Copia el **UID** del usuario (algo como `abc123xyz...`)
6. Ve a **Firestore Database** → Colección `users`
7. Crea un documento con:
   - **ID del documento:** El UID que copiaste
   - **Campos:**
     - `cedula`: "V-00000000"
     - `createdAt`: (timestamp actual)
     - `email`: "admin@iphonelecheria.com"
     - `name`: "Administrador"
     - `phone`: "0414-8808810"
     - `role`: "admin" ⚠️ **MUY IMPORTANTE**

### Opción B: Desde la Aplicación

1. Despliega la aplicación (ver paso 8)
2. Ve a la página de registro
3. Regístrate con `admin@iphonelecheria.com`
4. Ve a Firestore Database
5. Busca el documento del usuario en la colección `users`
6. Edita el campo `role` y cámbialo a `"admin"`

✅ **Resultado:** Usuario administrador creado

---

## 8. Desplegar a Firebase Hosting

### Instalación de Firebase CLI

1. Abre tu terminal
2. Instala Firebase CLI globalmente:

```bash
npm install -g firebase-tools
```

3. Inicia sesión en Firebase:

```bash
firebase login
```

4. Se abrirá tu navegador, inicia sesión con tu cuenta de Google
5. Autoriza el acceso

### Configuración del Proyecto

1. En la raíz de tu proyecto, ejecuta:

```bash
firebase init
```

2. Responde las preguntas:
   - **¿Qué características quieres configurar?** → Selecciona **Hosting** (usa espacio para seleccionar, enter para confirmar)
   - **¿Seleccionar un proyecto existente?** → Yes
   - **Selecciona tu proyecto:** → `iphonelecheria` (o el nombre que le diste)
   - **¿Qué directorio público?** → `dist`
   - **¿Configurar como SPA?** → Yes
   - **¿Sobrescribir index.html?** → No

### Construir y Desplegar

1. Construye la aplicación:

```bash
npm run build
```

2. Despliega a Firebase:

```bash
firebase deploy
```

3. Espera 1-2 minutos
4. ¡Listo! Te dará una URL como: `https://iphonelecheria.web.app`

✅ **Resultado:** Tu aplicación está en línea en Firebase Hosting

---

## 9. Dominio Personalizado (Opcional)

Si quieres usar un dominio propio como `iphonelecheria.com`:

### Pasos:

1. **Compra un dominio** (si no tienes uno):
   - Namecheap: ~$10/año
   - GoDaddy: ~$15/año
   - Google Domains: ~$12/año

2. **En Firebase Console:**
   - Ve a **Hosting**
   - Click en **"Agregar dominio personalizado"**
   - Ingresa tu dominio: `iphonelecheria.com`
   - Firebase te dará registros DNS para agregar

3. **En tu proveedor de dominio:**
   - Agrega los registros DNS que Firebase te dio:
     - Registro A: `151.101.1.195`
     - Registro A: `151.101.65.195`
     - Registro CNAME: `iphonelecheria.web.app`

4. **Espera 24-48 horas** para que se propague el DNS

5. **Verifica el dominio** en Firebase Console

✅ **Resultado:** Tu aplicación accesible en `iphonelecheria.com`

---

## 🔒 Reglas de Seguridad (IMPORTANTE)

Antes de pasar a producción, actualiza las reglas de seguridad:

### Firestore Rules:

Ve a **Firestore Database** → **Rules** y reemplaza con:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Usuarios pueden leer sus propios datos
    match /users/{userId} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Solo admin puede gestionar usuarios
    match /users/{userId} {
      allow read, write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Todos pueden leer productos
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Usuarios pueden leer sus propias órdenes, admin puede leer todas
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

### Storage Rules:

Ve a **Storage** → **Rules** y reemplaza con:

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

## 📊 Comandos Útiles

```bash
# Construir la aplicación
npm run build

# Desplegar a Firebase
firebase deploy

# Desplegar solo hosting
firebase deploy --only hosting

# Ver estado del despliegue
firebase hosting:channel:deploy preview

# Simular localmente
firebase serve
```

---

## 🆘 Solución de Problemas

### Error: "Permission denied" en Firestore
- Verifica que las reglas de seguridad estén configuradas correctamente
- Asegúrate de que el usuario tenga el campo `role: "admin"` en Firestore

### Error: "Failed to deploy"
- Verifica que estás en el directorio correcto
- Ejecuta `firebase login` nuevamente
- Verifica que el proyecto en `firebase.json` sea correcto

### Las imágenes no se cargan
- Verifica que Storage esté habilitado
- Revisa las reglas de Storage
- Verifica la consola del navegador para errores

### El dominio personalizado no funciona
- Espera 24-48 horas para propagación DNS
- Verifica que los registros DNS estén correctos
- Usa `nslookup` o `dig` para verificar DNS

---

## ✅ Checklist Final

- [ ] Proyecto Firebase creado
- [ ] Authentication habilitado (Email/Password)
- [ ] Firestore Database creado (modo prueba)
- [ ] Colecciones creadas: `users`, `products`, `orders`
- [ ] Storage habilitado
- [ ] Credenciales copiadas en `src/lib/firebase.ts`
- [ ] Usuario administrador creado con `role: "admin"`
- [ ] Firebase CLI instalado
- [ ] Proyecto inicializado con `firebase init`
- [ ] Aplicación construida con `npm run build`
- [ ] Aplicación desplegada con `firebase deploy`
- [ ] URL de prueba funcionando: `https://tu-proyecto.web.app`
- [ ] Reglas de seguridad actualizadas (para producción)
- [ ] Dominio personalizado configurado (opcional)

---

## 🎉 ¡Listo!

Tu aplicación iPhoneLechería está:
- ✅ Conectada a Firebase
- ✅ Con base de datos en la nube
- ✅ Con autenticación segura
- ✅ Con almacenamiento de imágenes
- ✅ Desplegada en Firebase Hosting
- ✅ Accesible desde cualquier dispositivo

**URL de prueba:** `https://iphonelecheria.web.app`

---

## 📞 Soporte

Si tienes problemas:
- [Documentación de Firebase](https://firebase.google.com/docs)
- [Firebase Hosting](https://firebase.google.com/docs/hosting)
- [Firestore](https://firebase.google.com/docs/firestore)
- [Authentication](https://firebase.google.com/docs/auth)

---

**Desarrollado para iPhoneLechería** 🍎
