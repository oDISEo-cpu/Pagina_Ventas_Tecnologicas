import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  role: 'user' | 'admin';
  createdAt: string;
}

interface AuthState {
  user: User | null;
  users: User[];
  isAuthenticated: boolean;
  login: (email: string, password: string) => { success: boolean; message: string };
  register: (data: { name: string; email: string; phone: string; password: string }) => { success: boolean; message: string };
  logout: () => void;
  isAdmin: () => boolean;
}

// Admin por defecto
const defaultAdmin: User = {
  id: 'admin-001',
  name: 'Administrador',
  email: 'admin@iphonelecheria.com',
  phone: '0414-8808810',
  password: 'admin123',
  role: 'admin',
  createdAt: new Date().toISOString(),
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      users: [defaultAdmin],
      isAuthenticated: false,

      login: (email, password) => {
        const state = get();
        const found = state.users.find(
          (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
        );
        if (found) {
          set({ user: found, isAuthenticated: true });
          return { success: true, message: 'Inicio de sesión exitoso' };
        }
        return { success: false, message: 'Email o contraseña incorrectos' };
      },

      register: (data) => {
        const state = get();
        const exists = state.users.find(
          (u) => u.email.toLowerCase() === data.email.toLowerCase()
        );
        if (exists) {
          return { success: false, message: 'Este email ya está registrado' };
        }

        const newUser: User = {
          id: `user-${Date.now()}`,
          name: data.name,
          email: data.email,
          phone: data.phone,
          password: data.password,
          role: 'user',
          createdAt: new Date().toISOString(),
        };

        set((state) => ({
          users: [...state.users, newUser],
          user: newUser,
          isAuthenticated: true,
        }));

        return { success: true, message: 'Registro exitoso' };
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      isAdmin: () => {
        return get().user?.role === 'admin';
      },
    }),
    { name: 'auth-storage' }
  )
);
