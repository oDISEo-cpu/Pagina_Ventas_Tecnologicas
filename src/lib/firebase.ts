import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Configuración de Firebase
// Reemplaza estos valores con los de tu proyecto de Firebase
// Obtén tus credenciales en: https://console.firebase.google.com/
const firebaseConfig = {
  apiKey: "TU_API_KEY_AQUI",
  authDomain: "TU_AUTH_DOMAIN_AQUI",
  projectId: "TU_PROJECT_ID_AQUI",
  storageBucket: "TU_STORAGE_BUCKET_AQUI",
  messagingSenderId: "TU_MESSAGING_SENDER_ID_AQUI",
  appId: "TU_APP_ID_AQUI"
};

// Verificar si Firebase está configurado
export const isFirebaseConfigured = () => {
  return firebaseConfig.apiKey !== "TU_API_KEY_AQUI";
};

// Inicializar Firebase solo si está configurado
let app: any = null;
let auth: any = null;
let db: any = null;
let storage: any = null;

if (isFirebaseConfigured()) {
  try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
  } catch (error) {
    console.error('Error inicializando Firebase:', error);
  }
}

export { auth, db, storage };
