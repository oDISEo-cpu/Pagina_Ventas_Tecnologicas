import { createClient } from '@supabase/supabase-js';

// Configuración de Supabase para iPhoneLechería
const supabaseUrl = 'https://slctqtpdvvdnojacwnbd.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNsY3RxdHBkdnZkbm9qYWN3bmJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg5Mjc5MTAsImV4cCI6MjEwNDUwMzkxMH0.3BQ_OOjJ_kpqJm3wk4D6RiKTfyO0LgH7Y4v-xz3WdPo';

// Verificar si Supabase está configurado (siempre true ya que las credenciales están configuradas)
export const isSupabaseConfigured = (): boolean => {
  return true;
};

// Crear cliente de Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
