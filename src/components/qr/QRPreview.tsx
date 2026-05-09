import React, { useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { toPng, toSvg } from 'html-to-image';
import { Download, Share2, Printer, Save } from 'lucide-react';
import { GlassButton, GlassCard } from '../ui/Glass';
import { useStore } from '../../store/useStore';
import { translations } from '../../i18n/translations';

export const QRPreview = ({ value, config, onSave }: { value: string, config: any, onSave: () => void }) => {
  const { language } = useStore();
  const t = translations[language];
  const qrRef = useRef<HTMLDivElement>(null);

  const download = async (format: 'png' | 'svg') => {
    if (!qrRef.current) return;
    const fn = format === 'png' ? toPng : toSvg;
    const dataUrl = await fn(qrRef.current, { backgroundColor: config.bgColor });
    const link = document.createElement('a');
    link.download = `qr-code-${Date.now()}.${format}`;
    link.href = dataUrl;
    link.click();
  };

  const handleShare = async () => {
    if (!qrRef.current || !navigator.share) return;
    try {
      const dataUrl = await toPng(qrRef.current);
      const blob = await (await fetch(dataUrl)).blob();
      const file = new File([blob], 'qr-code.png', { type: 'image/png' });
      await navigator.share({
        files: [file],
        title: 'QR Studio Pro',
        text: 'Shared QR Code from QR Studio Pro',
      });
    } catch (err) {
       console.error("Sharing failed", err);
    }
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <div
        ref={qrRef}
        className="p-8 rounded-[40px] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.2)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500 hover:scale-[1.02]"
        style={{ backgroundColor: config.bgColor, padding: config.margin ? '32px' : '0' }}
      >
        <QRCodeSVG
          value={value}
          size={256}
          fgColor={config.fgColor}
          bgColor={config.bgColor}
          level={config.level}
          imageSettings={config.logo ? {
            src: config.logo,
            height: 48,
            width: 48,
            excavate: true,
          } : undefined}
          style={{ borderRadius: `${config.radius || 0}px` }}
        />
      </div>

      <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
        <GlassButton onClick={() => download('png')} className="flex items-center justify-center gap-2 py-4">
          <Download size={18} /> PNG
        </GlassButton>
        <GlassButton onClick={() => download('svg')} className="flex items-center justify-center gap-2 py-4">
          <Download size={18} /> SVG
        </GlassButton>
        <GlassButton onClick={handleShare} className="flex items-center justify-center gap-2 py-4">
          <Share2 size={18} />
        </GlassButton>
        <GlassButton onClick={onSave} className="flex items-center justify-center gap-2 py-4 bg-primary/20 border-primary/30 hover:bg-primary/30">
          <Save size={18} /> {t.save}
        </GlassButton>
      </div>
    </div>
  );
};
