import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { User } from '../types';

// Servicio de autenticación con Supabase
export const authService = {
  // Registrar usuario
  async register(name: string, email: string, phone: string, cedula: string, password: string): Promise<{ success: boolean; message: string; user?: User }> {
    if (isSupabaseConfigured() && supabase) {
      try {
        // Crear usuario en Supabase Auth
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email,
          password,
        });

        if (authError) throw authError;
        if (!authData.user) throw new Error('No se pudo crear el usuario');

        // Guardar datos adicionales en la tabla users
        const userData = {
          id: authData.user.id,
          name,
          email,
          phone,
          cedula,
          role: 'user',
          created_at: new Date().toISOString()
        };

        const { error: dbError } = await supabase
          .from('users')
          .insert([userData]);

        if (dbError) throw dbError;

        const user: User = {
          id: userData.id,
          name,
          email,
          phone,
          cedula,
          role: 'user',
          createdAt: userData.created_at
        };

        return { success: true, message: 'Cuenta creada exitosamente', user };
      } catch (error: any) {
        console.error('Error en registro:', error);
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
        cedula,
        role: 'user' as const,
        password,
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
    if (isSupabaseConfigured() && supabase) {
      try {
        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (authError) throw authError;
        if (!authData.user) throw new Error('Credenciales inválidas');

        // Obtener datos del usuario desde la tabla users
        const { data: userData, error: dbError } = await supabase
          .from('users')
          .select('*')
          .eq('id', authData.user.id)
          .single();

        if (dbError) throw dbError;

        const user: User = {
          id: userData.id,
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
          cedula: userData.cedula,
          role: userData.role,
          createdAt: userData.created_at
        };

        return { success: true, message: 'Inicio de sesión exitoso', user };
      } catch (error: any) {
        console.error('Error en login:', error);
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
    if (isSupabaseConfigured() && supabase) {
      await supabase.auth.signOut();
    }
  },

  // Escuchar cambios de autenticación
  onAuthChange(callback: (user: User | null) => void) {
    if (isSupabaseConfigured() && supabase) {
      const supabaseClient = supabase;
      return supabaseClient.auth.onAuthStateChange(async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          const { data: userData } = await supabaseClient
            .from('users')
            .select('*')
            .eq('id', session.user.id)
            .single();

          if (userData) {
            const user: User = {
              id: userData.id,
              name: userData.name,
              email: userData.email,
              phone: userData.phone,
              cedula: userData.cedula,
              role: userData.role,
              createdAt: userData.created_at
            };
            callback(user);
          }
        } else if (event === 'SIGNED_OUT') {
          callback(null);
        }
      });
    }
    return { data: { subscription: { unsubscribe: () => {} } } };
  },

  // Obtener todos los usuarios (solo para admin)
  async getAllUsers(): Promise<User[]> {
    if (isSupabaseConfigured() && supabase) {
      try {
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;

        return (data || []).map((userData: any) => ({
          id: userData.id,
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
          cedula: userData.cedula,
          role: userData.role,
          createdAt: userData.created_at
        }));
      } catch (error) {
        console.error('Error obteniendo usuarios de Supabase:', error);
        return [];
      }
    }
    
    // Fallback a localStorage
    const users = JSON.parse(localStorage.getItem('iphonelecheria-users') || '[]');
    return users.map((u: any) => {
      const { password: _, ...userWithoutPassword } = u;
      return userWithoutPassword;
    });
  }
};
