import { createClient } from '@supabase/supabase-js';

// Configuración de Supabase
// Reemplaza estos valores con los de tu proyecto de Supabase
// Obtén tus credenciales en: https://supabase.com/dashboard/
const supabaseUrl = 'TU_SUPABASE_URL_AQUI';
const supabaseAnonKey = 'TU_SUPABASE_ANON_KEY_AQUI';

// Verificar si Supabase está configurado
export const isSupabaseConfigured = () => {
  return supabaseUrl !== 'TU_SUPABASE_URL_AQUI' && supabaseAnonKey !== 'TU_SUPABASE_ANON_KEY_AQUI';
};

// Crear cliente de Supabase
export const supabase = isSupabaseConfigured() 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
