import React from 'react';
import { useStore } from '../store/useStore';
import { translations } from '../i18n/translations';
import { GlassCard, GlassButton } from '../components/ui/Glass';
import { Languages, Sun, Moon, Database, ShieldCheck } from 'lucide-react';

export const Settings = () => {
  const { language, setLanguage, theme, setTheme, clearHistory } = useStore();
  const t = translations[language];

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">{t.settings}</h1>

      <GlassCard className="divide-y divide-white/5">
        <div className="p-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/5 rounded-2xl text-blue-400"><Languages /></div>
            <div>
              <h3 className="font-bold">{t.language}</h3>
              <p className="text-xs text-white/40">Select your preferred interface language</p>
            </div>
          </div>
          <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
            <button
               onClick={() => setLanguage('en')}
               className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${language === 'en' ? 'bg-primary text-white shadow-lg' : 'text-white/40 hover:text-white'}`}
            >
              EN
            </button>
            <button
               onClick={() => setLanguage('ar')}
               className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${language === 'ar' ? 'bg-primary text-white shadow-lg' : 'text-white/40 hover:text-white'}`}
            >
              عربي
            </button>
          </div>
        </div>

        <div className="p-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
             <div className="p-3 bg-white/5 rounded-2xl text-yellow-400">
               {theme === 'dark' ? <Moon /> : <Sun />}
             </div>
             <div>
              <h3 className="font-bold">{t.theme}</h3>
              <p className="text-xs text-white/40">Switch between light and dark modes</p>
            </div>
          </div>
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="w-14 h-8 bg-white/10 rounded-full relative p-1 group transition-all"
          >
            <div className={`w-6 h-6 bg-white rounded-full shadow-lg transition-transform duration-300 ${theme === 'dark' ? 'translate-x-6' : 'translate-x-0'}`} />
          </button>
        </div>

        <div className="p-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
             <div className="p-3 bg-white/5 rounded-2xl text-purple-400"><Database /></div>
             <div>
              <h3 className="font-bold">Local Storage</h3>
              <p className="text-xs text-white/40">Manage your locally stored QR codes</p>
            </div>
          </div>
          <GlassButton onClick={clearHistory} className="bg-red-500/10 text-red-500 border-red-500/20 py-2 px-4 text-sm">
            Wipe All Data
          </GlassButton>
        </div>

        <div className="p-8 flex items-center justify-between opacity-50 cursor-not-allowed">
          <div className="flex items-center gap-4">
             <div className="p-3 bg-white/5 rounded-2xl text-green-400"><ShieldCheck /></div>
             <div>
              <h3 className="font-bold">Sync Account</h3>
              <p className="text-xs text-white/40 italic">Sync content across devices (Coming Soon)</p>
            </div>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest bg-white/10 px-2 py-1 rounded">Locked</span>
        </div>
      </GlassCard>
    </div>
  );
};
