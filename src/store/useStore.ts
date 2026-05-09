import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Language, Theme } from '../i18n/translations';

export interface QRData {
  id: string;
  type: string;
  content: any;
  title: string;
  category?: string;
  createdAt: number;
  totalScans: number;
  config: {
    fgColor: string;
    bgColor: string;
    level: 'L' | 'M' | 'Q' | 'H';
    size: number;
    margin: boolean;
    logo?: string;
    radius?: number;
  };
  isDynamic?: boolean;
  shortCode?: string;
}

interface AppState {
  language: Language;
  theme: Theme;
  history: QRData[];
  setLanguage: (lang: Language) => void;
  setTheme: (theme: Theme) => void;
  addToHistory: (qr: QRData) => void;
  removeFromHistory: (id: string) => void;
  clearHistory: () => void;
  updateQR: (id: string, data: Partial<QRData>) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      language: 'en',
      theme: 'dark',
      history: [],
      setLanguage: (lang) => set({ language: lang }),
      setTheme: (theme) => set({ theme }),
      addToHistory: (qr) => set((state) => ({ history: [qr, ...state.history] })),
      removeFromHistory: (id) => set((state) => ({ history: state.history.filter((i) => i.id !== id) })),
      clearHistory: () => set({ history: [] }),
      updateQR: (id, data) => set((state) => ({
        history: state.history.map((i) => i.id === id ? { ...i, ...data } : i)
      })),
    }),
    {
      name: 'qr-studio-pro-storage',
    }
  )
);
