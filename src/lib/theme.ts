import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Theme = 'light' | 'dark' | 'system';
export type AccentColor = 'indigo' | 'blue' | 'purple' | 'pink' | 'rose' | 'orange';

interface ThemeState {
  theme: Theme;
  accentColor: AccentColor;
  setTheme: (theme: Theme) => void;
  setAccentColor: (color: AccentColor) => void;
}

export const useTheme = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'system',
      accentColor: 'indigo',
      setTheme: (theme) => set({ theme }),
      setAccentColor: (accentColor) => set({ accentColor }),
    }),
    {
      name: 'theme-storage',
    }
  )
);

export const accentColors = {
  indigo: {
    light: 'from-indigo-500 to-indigo-600',
    dark: 'from-indigo-400 to-indigo-500',
    bg: 'bg-indigo-500',
    text: 'text-indigo-500',
    border: 'border-indigo-500',
    hover: 'hover:bg-indigo-600',
    focus: 'focus:ring-indigo-500',
  },
  blue: {
    light: 'from-blue-500 to-blue-600',
    dark: 'from-blue-400 to-blue-500',
    bg: 'bg-blue-500',
    text: 'text-blue-500',
    border: 'border-blue-500',
    hover: 'hover:bg-blue-600',
    focus: 'focus:ring-blue-500',
  },
  purple: {
    light: 'from-purple-500 to-purple-600',
    dark: 'from-purple-400 to-purple-500',
    bg: 'bg-purple-500',
    text: 'text-purple-500',
    border: 'border-purple-500',
    hover: 'hover:bg-purple-600',
    focus: 'focus:ring-purple-500',
  },
  pink: {
    light: 'from-pink-500 to-pink-600',
    dark: 'from-pink-400 to-pink-500',
    bg: 'bg-pink-500',
    text: 'text-pink-500',
    border: 'border-pink-500',
    hover: 'hover:bg-pink-600',
    focus: 'focus:ring-pink-500',
  },
  rose: {
    light: 'from-rose-500 to-rose-600',
    dark: 'from-rose-400 to-rose-500',
    bg: 'bg-rose-500',
    text: 'text-rose-500',
    border: 'border-rose-500',
    hover: 'hover:bg-rose-600',
    focus: 'focus:ring-rose-500',
  },
  orange: {
    light: 'from-orange-500 to-orange-600',
    dark: 'from-orange-400 to-orange-500',
    bg: 'bg-orange-500',
    text: 'text-orange-500',
    border: 'border-orange-500',
    hover: 'hover:bg-orange-600',
    focus: 'focus:ring-orange-500',
  },
}; 