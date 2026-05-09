import React, { useState, useEffect } from 'react';
import { useStore, QRData } from '../store/useStore';
import { translations } from '../i18n/translations';
import { GlassCard, GlassLabel, GlassButton } from '../components/ui/Glass';
import { QRForm } from '../components/qr/QRForm';
import { QRCustomizer } from '../components/qr/QRCustomizer';
import { QRPreview } from '../components/qr/QRPreview';
import { Link2, Type, Phone, Wifi, Mail, MapPin, Contact, MessageSquare, Sparkles } from 'lucide-react';
import { cn, generateId } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

const QR_TYPES = [
  { id: 'url', icon: <Link2 size={20} />, label: 'url' },
  { id: 'text', icon: <Type size={20} />, label: 'text' },
  { id: 'whatsapp', icon: <MessageSquare size={20} />, label: 'whatsapp' },
  { id: 'wifi', icon: <Wifi size={20} />, label: 'wifi' },
  { id: 'email', icon: <Mail size={20} />, label: 'email' },
  { id: 'phone', icon: <Phone size={20} />, label: 'phone' },
  { id: 'vcard', icon: <Contact size={20} />, label: 'vcard' },
];

export const Generator = () => {
  const { language, addToHistory } = useStore();
  const t = translations[language];

  const [activeType, setActiveType] = useState('url');
  const [formData, setFormData] = useState<any>({});
  const [config, setConfig] = useState<any>({
    fgColor: '#000000',
    bgColor: '#ffffff',
    level: 'H',
    size: 256,
    margin: true,
    radius: 0,
  });
  const [qrValue, setQrValue] = useState('https://google.com');

  useEffect(() => {
    let value = '';
    switch (activeType) {
      case 'url': value = formData.url || ''; break;
      case 'text': value = formData.text || ''; break;
      case 'whatsapp': value = `https://wa.me/${formData.phone}?text=${encodeURIComponent(formData.message || '')}`; break;
      case 'wifi': value = `WIFI:S:${formData.ssid};T:${formData.encryption};P:${formData.password};;`; break;
      case 'email': value = `mailto:${formData.email}?subject=${formData.subject}&body=${formData.body}`; break;
      case 'phone': value = `tel:${formData.phone}`; break;
      case 'vcard':
        value = `BEGIN:VCARD\nVERSION:3.0\nN:${formData.lastName};${formData.firstName}\nFN:${formData.firstName} ${formData.lastName}\nEMAIL:${formData.email}\nTEL:${formData.phone}\nEND:VCARD`;
        break;
      default: value = '';
    }
    setQrValue(value || ' ');
  }, [activeType, formData]);

  const handleSave = () => {
    if (!qrValue.trim()) return;
    const newQR: QRData = {
      id: generateId(),
      type: activeType,
      content: formData,
      title: formData.url || formData.text?.substring(0, 20) || activeType,
      createdAt: Date.now(),
      totalScans: 0,
      config: { ...config },
    };
    addToHistory(newQR);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-4">
      {/* Left Column: Configuration */}
      <div className="lg:col-span-7 space-y-8">
        <GlassCard className="p-1">
          <div className="grid grid-cols-4 sm:grid-cols-7 gap-1">
            {QR_TYPES.map((type) => (
              <button
                key={type.id}
                onClick={() => setActiveType(type.id)}
                className={cn(
                  "flex flex-col items-center justify-center p-4 rounded-2xl transition-all gap-2 border-2",
                  activeType === type.id
                    ? "bg-primary border-primary text-white shadow-xl scale-105 z-10"
                    : "bg-white dark:bg-slate-900 border-slate-200 dark:border-white/10 text-slate-400 hover:border-primary/50 hover:text-primary"
                )}
              >
                {type.icon}
                <span className="text-[10px] font-bold uppercase tracking-wider hidden sm:block">
                  {(t.types as any)[type.label]}
                </span>
              </button>
            ))}
          </div>
        </GlassCard>

        <section className="space-y-6">
          <GlassCard className="p-8 border-slate-300 dark:border-white/10 shadow-lg">
            <h2 className="text-2xl font-black mb-6 flex items-center gap-2 text-slate-950 dark:text-white">
               <Sparkles className="text-primary" size={24} />
               {t.generateQr}
            </h2>
            <QRForm type={activeType} data={formData} onChange={setFormData} />
          </GlassCard>
        </section>
      </div>

      {/* Right Column: Preview */}
      <div className="lg:col-span-5">
        <div className="sticky top-32">
          <GlassCard className="p-8 flex flex-col items-center min-h-[500px] justify-center bg-slate-50 dark:bg-white/5 border-slate-300 dark:border-white/10">
            <QRPreview value={qrValue} config={config} onSave={handleSave} />
          </GlassCard>
        </div>
      </div>
    </div>
  );
};
