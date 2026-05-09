import React, { useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Generator } from './pages/Generator';
import { useStore } from './store/useStore';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const { language, theme } = useStore();

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [language, theme]);

  return (
    <div className="min-h-screen transition-colors duration-500 overflow-x-hidden bg-white dark:bg-slate-950">
      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-[-1]">
        <div className="absolute top-[-5%] left-[-5%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-5%] right-[-5%] w-[40%] h-[40%] bg-secondary/5 rounded-full blur-[100px]" />
      </div>

      <Navbar />

      <main className="container mx-auto px-6 pt-32 pb-20 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-4 text-slate-950 dark:text-white leading-none">
            {language === 'ar' ? 'كيو آر العراق' : 'QR Iraq'}
          </h1>
          <p className="text-2xl text-primary font-black uppercase tracking-widest max-w-2xl mx-auto">
            {language === 'ar' ? 'الاحترافية في توليد الرموز' : 'Professional QR Generation'}
          </p>
        </motion.div>

        <Generator />
        
        <footer className="mt-20 py-10 border-t border-slate-200 dark:border-white/10 text-center text-slate-500 dark:text-white/20 font-black text-sm uppercase tracking-widest">
          &copy; {new Date().getFullYear()} QR Iraq &bull; Built with precision
        </footer>
      </main>
    </div>
  );
}
