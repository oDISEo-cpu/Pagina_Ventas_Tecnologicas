import { auth, isFirebaseConfigured } from '../lib/firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { User } from '../types';

// Servicio de autenticación híbrido (Firebase + localStorage fallback)
export const authService = {
  // Registrar usuario
  async register(name: string, email: string, phone: string, password: string): Promise<{ success: boolean; message: string; user?: User }> {
    if (isFirebaseConfigured() && auth) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const firebaseUser = userCredential.user;

        // Guardar datos adicionales en Firestore
        const userData: User = {
          id: firebaseUser.uid,
          name,
          email,
          phone,
          role: 'user',
          createdAt: new Date().toISOString()
        };

        await setDoc(doc(db, 'users', firebaseUser.uid), userData);

        return { success: true, message: 'Cuenta creada exitosamente', user: userData };
      } catch (error: any) {
        return { success: false, message: error.message || 'Error al crear cuenta' };
      }
    } else {
      // Fallback a localStorage
      const users = JSON.parse(localStorage.getItem('iphonelecheria-users') || '[]');
      
      if (users.find((u: any) => u.email === email)) {
        return { success: false, message: 'Este email ya está registrado' };
      }

      const newUser = {
        id: `user-${Date.now()}`,
        name,
        email,
        phone,
        role: 'user' as const,
        password, // Solo en localStorage (no seguro, pero es fallback)
        createdAt: new Date().toISOString()
      };

      users.push(newUser);
      localStorage.setItem('iphonelecheria-users', JSON.stringify(users));

      const { password: _, ...userWithoutPassword } = newUser;
      return { success: true, message: 'Cuenta creada exitosamente', user: userWithoutPassword };
    }
  },

  // Iniciar sesión
  async login(email: string, password: string): Promise<{ success: boolean; message: string; user?: User }> {
    if (isFirebaseConfigured() && auth) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const firebaseUser = userCredential.user;

        // Obtener datos del usuario desde Firestore
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        const userData = userDoc.data() as User;

        return { success: true, message: 'Inicio de sesión exitoso', user: userData };
      } catch (error: any) {
        return { success: false, message: 'Email o contraseña incorrectos' };
      }
    } else {
      // Fallback a localStorage
      const users = JSON.parse(localStorage.getItem('iphonelecheria-users') || '[]');
      const user = users.find((u: any) => u.email === email && u.password === password);

      if (user) {
        const { password: _, ...userWithoutPassword } = user;
        return { success: true, message: 'Inicio de sesión exitoso', user: userWithoutPassword };
      }

      return { success: false, message: 'Email o contraseña incorrectos' };
    }
  },

  // Cerrar sesión
  async logout(): Promise<void> {
    if (isFirebaseConfigured() && auth) {
      await signOut(auth);
    }
    // localStorage se limpia en el store
  },

  // Escuchar cambios de autenticación (solo Firebase)
  onAuthChange(callback: (user: User | null) => void) {
    if (isFirebaseConfigured() && auth) {
      return onAuthStateChanged(auth, async (firebaseUser) => {
        if (firebaseUser) {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          const userData = userDoc.data() as User;
          callback(userData);
        } else {
          callback(null);
        }
      });
    }
    return () => {}; // No-op si no hay Firebase
  }
};
