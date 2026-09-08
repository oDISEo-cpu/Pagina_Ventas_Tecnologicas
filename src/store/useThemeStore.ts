import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'light' | 'dark';

interface ThemeState {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'light',
      
      toggleTheme: () => set((state) => {
        const newTheme = state.theme === 'light' ? 'dark' : 'light';
        // Aplicar clase al document
        if (newTheme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
        return { theme: newTheme };
      }),
      
      setTheme: (theme) => set(() => {
        // Aplicar clase al document
        if (theme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
        return { theme };
      }),
    }),
    {
      name: 'iphonelecheria-theme',
      onRehydrateStorage: () => {
        return (state) => {
          // Aplicar tema guardado al cargar
          if (state?.theme === 'dark') {
            document.documentElement.classList.add('dark');
          }
        };
      },
    }
  )
);
