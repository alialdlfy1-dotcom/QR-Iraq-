import React from 'react';
import { useStore } from '../store/useStore';
import { translations } from '../i18n/translations';
import { GlassCard, GlassButton } from '../components/ui/Glass';
import { Trash2, ExternalLink, Calendar, Scan } from 'lucide-react';
import { formatDate } from '../lib/utils';
import { QRCodeSVG } from 'qrcode.react';

export const History = () => {
  const { language, history, removeFromHistory, clearHistory } = useStore();
  const t = translations[language];

  if (history.length === 0) {
    return (
      <GlassCard className="p-20 flex flex-col items-center justify-center text-center space-y-4">
        <div className="p-6 bg-white/5 rounded-full">
          <Scan size={48} className="text-white/20" />
        </div>
        <p className="text-xl text-white/40">{t.historyEmpty}</p>
      </GlassCard>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">{t.history}</h1>
        <button
          onClick={clearHistory}
          className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500/20 transition-all text-sm font-bold"
        >
          <Trash2 size={16} /> {t.clearHistory}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {history.map((qr) => (
          <GlassCard key={qr.id} className="p-6 flex flex-col gap-4 group">
            <div className="flex items-start justify-between">
              <div className="p-3 bg-white rounded-2xl shadow-lg">
                <QRCodeSVG
                  value={qr.id}
                  size={80}
                  fgColor={qr.config.fgColor}
                  bgColor="#ffffff"
                />
              </div>
              <button
                onClick={() => removeFromHistory(qr.id)}
                className="p-2 text-white/20 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
              >
                <Trash2 size={18} />
              </button>
            </div>

            <div>
              <h3 className="font-bold text-lg leading-tight line-clamp-1">{qr.title}</h3>
              <div className="flex items-center gap-4 mt-2 text-xs text-white/40 font-medium">
                <span className="flex items-center gap-1">
                   <Calendar size={12} /> {formatDate(qr.createdAt, language)}
                </span>
                <span className="flex items-center gap-1 uppercase tracking-widest text-primary">
                   {qr.type}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-2">
              <GlassButton className="px-3 py-2 text-xs flex items-center justify-center gap-1">
                <ExternalLink size={14} /> Open
              </GlassButton>
              <div className="flex items-center justify-center gap-1 px-3 py-2 bg-white/5 rounded-xl text-xs font-mono">
                <Scan size={14} /> {qr.totalScans}
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};
