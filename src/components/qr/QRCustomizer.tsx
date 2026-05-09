import React from 'react';
import { HexColorPicker } from 'react-colorful';
import { useStore } from '../../store/useStore';
import { translations } from '../../i18n/translations';
import { GlassLabel, GlassCard } from '../ui/Glass';
import { Image, Maximize2, RotateCcw } from 'lucide-react';

export const QRCustomizer = ({ config, onChange }: { config: any, onChange: (newConfig: any) => void }) => {
  const { language } = useStore();
  const t = translations[language];

  const update = (field: string, value: any) => {
    onChange({ ...config, [field]: value });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        update('logo', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <GlassLabel>{t.customization.fgColor}</GlassLabel>
          <div className="flex flex-col items-center gap-4 bg-white/5 p-4 rounded-3xl border border-white/10">
            <HexColorPicker color={config.fgColor} onChange={(c) => update('fgColor', c)} />
            <input
              type="text"
              className="bg-transparent border-b border-white/20 text-center uppercase font-mono tracking-widest outline-none"
              value={config.fgColor}
              onChange={(e) => update('fgColor', e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-4">
          <GlassLabel>{t.customization.bgColor}</GlassLabel>
          <div className="flex flex-col items-center gap-4 bg-white/5 p-4 rounded-3xl border border-white/10">
            <HexColorPicker color={config.bgColor} onChange={(c) => update('bgColor', c)} />
            <input
              type="text"
              className="bg-transparent border-b border-white/20 text-center uppercase font-mono tracking-widest outline-none"
              value={config.bgColor}
              onChange={(e) => update('bgColor', e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
             <GlassLabel className="mb-0">{t.customization.radius}</GlassLabel>
             <span className="text-xs font-mono text-white/50">{config.radius || 0}px</span>
          </div>
          <input
            type="range"
            min="0"
            max="12"
            step="1"
            value={config.radius || 0}
            onChange={(e) => update('radius', Number(e.target.value))}
            className="w-full accent-primary"
          />
        </div>

        <div className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
             <GlassLabel className="mb-0">{t.customization.size}</GlassLabel>
             <span className="text-xs font-mono text-white/50">{config.size}px</span>
          </div>
          <input
            type="range"
            min="128"
            max="512"
            step="32"
            value={config.size}
            onChange={(e) => update('size', Number(e.target.value))}
            className="w-full accent-primary"
          />
        </div>
      </div>

      <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
        <GlassLabel>{t.customization.logo}</GlassLabel>
        <div className="flex items-center gap-4">
          <label className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white/10 border border-dashed border-white/30 rounded-xl cursor-pointer hover:bg-white/20 transition-all">
            <Image size={18} />
            <span className="text-sm font-medium">Select Image</span>
            <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
          </label>
          {config.logo && (
            <button
              onClick={() => update('logo', undefined)}
              className="p-3 bg-red-500/20 text-red-500 rounded-xl hover:bg-red-500/30 transition-all"
            >
              <RotateCcw size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
