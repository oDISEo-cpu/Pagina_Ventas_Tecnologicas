#!/bin/bash

# Script de configuración rápida para Firebase
# Ejecutar: chmod +x setup-firebase.sh && ./setup-firebase.sh

echo "🔥 Configuración Rápida de Firebase para iPhoneLechería"
echo "======================================================="
echo ""

# Verificar si Firebase CLI está instalado
if ! command -v firebase &> /dev/null; then
    echo "❌ Firebase CLI no está instalado"
    echo "📦 Instalando Firebase CLI..."
    npm install -g firebase-tools
    echo "✅ Firebase CLI instalado"
else
    echo "✅ Firebase CLI ya está instalado"
fi

echo ""

# Login
echo "🔐 Iniciando sesión en Firebase..."
firebase login
echo ""

# Verificar si ya está inicializado
if [ -f "firebase.json" ]; then
    echo "✅ Firebase ya está inicializado"
else
    echo "🔧 Inicializando Firebase..."
    firebase init hosting
fi

echo ""

# Construir la aplicación
echo "🏗️  Construyendo la aplicación..."
npm run build
echo "✅ Aplicación construida"
echo ""

# Preguntar si quiere desplegar
read -p "¿Quieres desplegar ahora? (s/n): " deploy

if [ "$deploy" = "s" ] || [ "$deploy" = "S" ]; then
    echo "🚀 Desplegando a Firebase Hosting..."
    firebase deploy
    echo ""
    echo "✅ ¡Despliegue completado!"
    echo ""
    echo "🌐 Tu aplicación está disponible en:"
    echo "   https://iphonelecheria.web.app"
else
    echo ""
    echo "ℹ️  Para desplegar más tarde, ejecuta:"
    echo "   firebase deploy"
fi

echo ""
echo "======================================================="
echo "📋 Próximos pasos:"
echo "1. Ve a https://console.firebase.google.com/"
echo "2. Selecciona tu proyecto 'iphonelecheria'"
echo "3. Configura Authentication (Email/Password)"
echo "4. Configura Firestore Database"
echo "5. Configura Storage"
echo "6. Copia las credenciales en src/lib/firebase.ts"
echo "7. Crea un usuario administrador"
echo ""
echo "📖 Lee FIREBASE_SETUP.md para instrucciones detalladas"
echo "======================================================="
