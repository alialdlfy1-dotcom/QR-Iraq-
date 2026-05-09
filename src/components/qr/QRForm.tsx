import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { translations } from '../../i18n/translations';
import { GlassInput, GlassLabel } from '../ui/Glass';

export const QRForm = ({ type, data, onChange }: { type: string, data: any, onChange: (newData: any) => void }) => {
  const { language } = useStore();
  const t = translations[language];

  const update = (field: string, value: string) => {
    onChange({ ...data, [field]: value });
  };

  switch (type) {
    case 'url':
      return (
        <div className="space-y-4">
          <div>
            <GlassLabel>{t.fields.url}</GlassLabel>
            <GlassInput
              placeholder="https://example.com"
              value={data.url || ''}
              onChange={(e) => update('url', e.target.value)}
            />
          </div>
        </div>
      );
    case 'text':
      return (
        <div className="space-y-4">
          <div>
            <GlassLabel>{t.fields.text}</GlassLabel>
            <textarea
              className="w-full px-5 py-4 rounded-2xl bg-white dark:bg-white/5 border border-slate-300 dark:border-white/10 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-slate-950 dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/30 min-h-[120px] font-bold shadow-sm"
              placeholder={t.fields.text}
              value={data.text || ''}
              onChange={(e) => update('text', e.target.value)}
            />
          </div>
        </div>
      );
    case 'whatsapp':
      return (
        <div className="space-y-4">
          <div>
            <GlassLabel>{t.fields.phone}</GlassLabel>
            <GlassInput
              placeholder="+1234567890"
              value={data.phone || ''}
              onChange={(e) => update('phone', e.target.value)}
            />
          </div>
          <div>
            <GlassLabel>{t.fields.message}</GlassLabel>
            <GlassInput
              placeholder="Hello!"
              value={data.message || ''}
              onChange={(e) => update('message', e.target.value)}
            />
          </div>
        </div>
      );
    case 'wifi':
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <GlassLabel>{t.fields.ssid}</GlassLabel>
            <GlassInput
              placeholder="My Network"
              value={data.ssid || ''}
              onChange={(e) => update('ssid', e.target.value)}
            />
          </div>
          <div>
            <GlassLabel>{t.fields.password}</GlassLabel>
            <GlassInput
              type="password"
              placeholder="••••••••"
              value={data.password || ''}
              onChange={(e) => update('password', e.target.value)}
            />
          </div>
          <div>
            <GlassLabel>{t.fields.encryption}</GlassLabel>
            <select
              className="w-full px-5 py-4 rounded-2xl bg-white dark:bg-white/5 border border-slate-300 dark:border-white/10 focus:border-primary outline-none transition-all text-slate-950 dark:text-white appearance-none font-bold shadow-sm"
              value={data.encryption || 'WPA'}
              onChange={(e) => update('encryption', e.target.value)}
            >
              <option value="WPA" className="bg-white dark:bg-slate-900 text-slate-950 dark:text-white">WPA/WPA2</option>
              <option value="WEP" className="bg-white dark:bg-slate-900 text-slate-950 dark:text-white">WEP</option>
              <option value="nopass" className="bg-white dark:bg-slate-900 text-slate-950 dark:text-white">None</option>
            </select>
          </div>
        </div>
      );
    case 'email':
      return (
        <div className="space-y-4">
          <div>
            <GlassLabel>{t.fields.email}</GlassLabel>
            <GlassInput
              placeholder="user@example.com"
              value={data.email || ''}
              onChange={(e) => update('email', e.target.value)}
            />
          </div>
          <div>
            <GlassLabel>{t.fields.subject}</GlassLabel>
            <GlassInput
              placeholder="Subject"
              value={data.subject || ''}
              onChange={(e) => update('subject', e.target.value)}
            />
          </div>
          <div>
            <GlassLabel>{t.fields.body}</GlassLabel>
            <textarea
              className="w-full px-5 py-4 rounded-2xl bg-white dark:bg-white/5 border border-slate-300 dark:border-white/10 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-slate-950 dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/30 min-h-[100px] font-bold shadow-sm"
              placeholder="Message..."
              value={data.body || ''}
              onChange={(e) => update('body', e.target.value)}
            />
          </div>
        </div>
      );
    case 'vcard':
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <GlassLabel>{t.fields.firstName}</GlassLabel>
            <GlassInput value={data.firstName || ''} onChange={(e) => update('firstName', e.target.value)} />
          </div>
          <div>
            <GlassLabel>{t.fields.lastName}</GlassLabel>
            <GlassInput value={data.lastName || ''} onChange={(e) => update('lastName', e.target.value)} />
          </div>
          <div>
            <GlassLabel>{t.fields.phone}</GlassLabel>
            <GlassInput value={data.phone || ''} onChange={(e) => update('phone', e.target.value)} />
          </div>
          <div>
            <GlassLabel>{t.fields.email}</GlassLabel>
            <GlassInput value={data.email || ''} onChange={(e) => update('email', e.target.value)} />
          </div>
        </div>
      );
    default:
      return <div className="text-white/40 italic">Coming soon...</div>;
  }
};
