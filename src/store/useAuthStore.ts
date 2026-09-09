import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../types';
import { authService } from '../services/supabaseAuthService';

interface AuthState {
  user: User | null;
  users: User[];
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  register: (name: string, email: string, phone: string, cedula: string, password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => Promise<void>;
  loadUsers: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      users: [],
      isAuthenticated: false,

      login: async (email, password) => {
        const result = await authService.login(email, password);
        if (result.success && result.user) {
          set({ user: result.user, isAuthenticated: true });
        }
        return { success: result.success, message: result.message };
      },

      register: async (name, email, phone, cedula, password) => {
        const result = await authService.register(name, email, phone, cedula, password);
        if (result.success && result.user) {
          set({ user: result.user, isAuthenticated: true });
          // Recargar lista de usuarios
          get().loadUsers();
        }
        return { success: result.success, message: result.message };
      },

      logout: async () => {
        await authService.logout();
        set({ user: null, isAuthenticated: false });
      },

      loadUsers: async () => {
        // Cargar usuarios desde Supabase o localStorage
        const users = await authService.getAllUsers();
        set({ users });
      },
    }),
    {
      name: 'iphonelecheria-auth',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
