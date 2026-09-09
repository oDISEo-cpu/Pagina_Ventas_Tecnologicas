# 🚀 Guía Rápida - Firebase para iPhoneLechería

## ⚡ Configuración en 10 Minutos

### Paso 1: Crear Proyecto Firebase (2 min)
1. Ve a 👉 https://console.firebase.google.com/
2. Click en **"Agregar proyecto"**
3. Nombre: `iphonelecheria`
4. Desactiva Google Analytics (opcional)
5. Click **"Crear proyecto"**

---

### Paso 2: Habilitar Servicios (3 min)

#### Authentication
1. Menú lateral → **Authentication** → **Comenzar**
2. Pestaña **"Sign-in method"**
3. Activa **Email/Contraseña**
4. Click **"Guardar"**

#### Firestore Database
1. Menú lateral → **Firestore Database** → **Crear base de datos**
2. Ubicación: `us-central1` o `southamerica-east1`
3. Modo: **"Comenzar en modo de prueba"**
4. Click **"Habilitar"**
5. Crea 3 colecciones vacías:
   - `users`
   - `products`
   - `orders`

#### Storage
1. Menú lateral → **Storage** → **Comenzar**
2. Click **"Siguiente"** → **"Listo"**

---

### Paso 3: Obtener Credenciales (1 min)
1. Menú lateral → **⚙️ Configuración del proyecto**
2. Sección **"Tus aplicaciones"** → Click en **`</>`** (Web)
3. Nombre: `iPhoneLechería Web`
4. **NO** marques Firebase Hosting
5. Click **"Registrar app"**
6. **Copia el código de configuración**

Se verá así:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "iphonelecheria.firebaseapp.com",
  projectId: "iphonelecheria",
  storageBucket: "iphonelecheria.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

---

### Paso 4: Configurar la App (1 min)
1. Abre `src/lib/firebase.ts`
2. Reemplaza los valores con los que copiaste:

```typescript
const firebaseConfig = {
  apiKey: "AIzaSy...", // ← Tu API Key
  authDomain: "iphonelecheria.firebaseapp.com", // ← Tu Auth Domain
  projectId: "iphonelecheria", // ← Tu Project ID
  storageBucket: "iphonelecheria.appspot.com", // ← Tu Storage Bucket
  messagingSenderId: "123456789", // ← Tu Messaging Sender ID
  appId: "1:123456789:web:abc123" // ← Tu App ID
};
```

3. Guarda el archivo

---

### Paso 5: Crear Admin (2 min)

#### Opción A: Desde Firebase Console (Recomendado)
1. **Authentication** → **Users** → **Agregar usuario**
2. Email: `admin@iphonelecheria.com`
3. Contraseña: `admin123`
4. Click **"Agregar usuario"**
5. Copia el **UID** del usuario
6. Ve a **Firestore Database** → Colección `users`
7. Click **"+ Agregar documento"**
8. ID: (el UID que copiaste)
9. Agrega estos campos:
   ```
   name: "Administrador"
   email: "admin@iphonelecheria.com"
   phone: "0414-8808810"
   cedula: "V-00000000"
   role: "admin"  ⚠️ MUY IMPORTANTE
   createdAt: (timestamp actual)
   ```

#### Opción B: Desde la App
1. Regístrate con `admin@iphonelecheria.com`
2. Ve a Firestore → Colección `users`
3. Busca tu documento y cambia `role` a `"admin"`

---

### Paso 6: Desplegar (1 min)

#### En tu terminal:
```bash
# Instalar Firebase CLI (si no lo tienes)
npm install -g firebase-tools

# Iniciar sesión
firebase login

# Construir la app
npm run build

# Desplegar
firebase deploy
```

¡Listo! Tu app estará en: **https://iphonelecheria.web.app**

---

## ✅ Checklist Rápido

- [ ] Proyecto Firebase creado
- [ ] Authentication activado (Email/Password)
- [ ] Firestore Database creado
- [ ] Colecciones creadas: `users`, `products`, `orders`
- [ ] Storage activado
- [ ] Credenciales copiadas en `src/lib/firebase.ts`
- [ ] Usuario admin creado con `role: "admin"`
- [ ] Firebase CLI instalado
- [ ] App desplegada con `firebase deploy`

---

## 🎯 Credenciales de Prueba

**Administrador:**
- Email: `admin@iphonelecheria.com`
- Contraseña: `admin123`

---

## 🆘 Problemas Comunes

### "Permission denied"
→ Verifica que el usuario admin tenga `role: "admin"` en Firestore

### "Failed to deploy"
→ Ejecuta `firebase login` nuevamente

### Las imágenes no cargan
→ Verifica que Storage esté habilitado

---

## 📞 Soporte

- Guía completa: `FIREBASE_SETUP.md`
- Documentación: https://firebase.google.com/docs

---

**¡Tu tienda iPhoneLechería está lista para producción! 🍎🚀**
