import React from 'react';
import { QrCode, Languages, Sun, Moon } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { translations } from '../../i18n/translations';

export const Navbar = () => {
  const { language, setLanguage, theme, setTheme } = useStore();
  const t = translations[language];

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-xl">
      <div className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-white/20 rounded-3xl px-5 py-3 flex items-center justify-between shadow-2xl transition-colors duration-300">
        <div className="flex items-center gap-3 text-slate-950 dark:text-white">
          <div className="bg-primary p-2 rounded-xl text-white">
            <QrCode size={22} />
          </div>
          <span className="font-black text-lg tracking-tighter uppercase">{t.title}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
            className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 rounded-xl transition-all font-black text-xs uppercase text-slate-950 dark:text-white"
          >
            {language === 'en' ? 'AR' : 'EN'}
          </button>
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 rounded-xl transition-all text-slate-900 dark:text-white"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </nav>
  );
};
