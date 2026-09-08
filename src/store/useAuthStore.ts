import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../types';

interface StoredUser extends User {
  password: string;
}

interface AuthState {
  user: User | null;
  users: User[];
  isAuthenticated: boolean;
  login: (email: string, password: string) => { success: boolean; message: string };
  register: (name: string, email: string, phone: string, password: string) => { success: boolean; message: string };
  logout: () => void;
  refreshUsers: () => void;
}

const USERS_KEY = 'iphonelecheria-users';

const getStoredUsers = (): StoredUser[] => {
  try {
    const stored = localStorage.getItem(USERS_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  
  // Default admin user
  const defaultAdmin: StoredUser = {
    id: 'admin-001',
    name: 'Administrador',
    email: 'admin@iphonelecheria.com',
    phone: '0414-8808810',
    role: 'admin',
    password: 'admin123',
    createdAt: new Date().toISOString(),
  };
  
  const defaults = [defaultAdmin];
  localStorage.setItem(USERS_KEY, JSON.stringify(defaults));
  return defaults;
};

const saveUsers = (users: StoredUser[]) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

const toPublicUser = (stored: StoredUser): User => {
  const { password: _, ...user } = stored;
  return user;
};

const getPublicUsers = (): User[] => {
  return getStoredUsers().map(toPublicUser);
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      users: getPublicUsers(),
      isAuthenticated: false,

      login: (email, password) => {
        const users = getStoredUsers();
        const found = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
        
        if (found) {
          const publicUser = toPublicUser(found);
          set({ user: publicUser, isAuthenticated: true, users: getPublicUsers() });
          return { success: true, message: 'Inicio de sesión exitoso' };
        }
        
        return { success: false, message: 'Email o contraseña incorrectos' };
      },

      register: (name, email, phone, password) => {
        const users = getStoredUsers();
        
        if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
          return { success: false, message: 'Este email ya está registrado' };
        }

        const newUser: StoredUser = {
          id: `user-${Date.now()}`,
          name,
          email,
          phone,
          role: 'user',
          password,
          createdAt: new Date().toISOString(),
        };

        users.push(newUser);
        saveUsers(users);

        const publicUser = toPublicUser(newUser);
        set({ user: publicUser, isAuthenticated: true, users: getPublicUsers() });
        return { success: true, message: 'Cuenta creada exitosamente' };
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      refreshUsers: () => {
        set({ users: getPublicUsers() });
      },
    }),
    {
      name: 'iphonelecheria-auth',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.refreshUsers();
        }
      },
    }
  )
);
