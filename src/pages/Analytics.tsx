import React from 'react';
import { useStore } from '../store/useStore';
import { translations } from '../i18n/translations';
import { GlassCard } from '../components/ui/Glass';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, AreaChart, Area, Cell, PieChart, Pie } from 'recharts';
import { TrendingUp, Smartphone, Globe, Globe2 } from 'lucide-react';

const MOCK_DATA = [
  { name: 'Mon', scans: 45 },
  { name: 'Tue', scans: 52 },
  { name: 'Wed', scans: 78 },
  { name: 'Thu', scans: 61 },
  { name: 'Fri', scans: 95 },
  { name: 'Sat', scans: 124 },
  { name: 'Sun', scans: 89 },
];

const DEVICE_DATA = [
  { name: 'iPhone', value: 400 },
  { name: 'Android', value: 300 },
  { name: 'Desktop', value: 100 },
];

const COLORS = ['#667eea', '#764ba2', '#f093fb'];

export const Analytics = () => {
  const { language, history } = useStore();
  const t = translations[language];

  const totalScans = history.reduce((acc, curr) => acc + curr.totalScans, 0);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">{t.analyticsTitle}</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title={t.totalScans} value={totalScans.toString()} icon={<TrendingUp />} trend="+12% vs last week" />
        <StatCard title="Active Links" value={history.length.toString()} icon={<Globe2 />} />
        <StatCard title="Conversion Rate" value="4.2%" icon={<TrendingUp />} trend="+0.5%" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <GlassCard className="lg:col-span-8 p-8">
          <h2 className="text-xl font-bold mb-8">{t.scansOverTime}</h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_DATA}>
                <defs>
                  <linearGradient id="colorScans" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#667eea" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#667eea" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#ffffff40" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '16px', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="scans" stroke="#667eea" fillOpacity={1} fill="url(#colorScans)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard className="lg:col-span-4 p-8">
          <h2 className="text-xl font-bold mb-8">{t.deviceDistribution}</h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={DEVICE_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {DEVICE_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
             {DEVICE_DATA.map((item, i) => (
               <div key={item.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                    <span className="text-white/60">{item.name}</span>
                  </div>
                  <span className="font-bold">{item.value}</span>
               </div>
             ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, trend }: { title: string, value: string, icon: React.ReactNode, trend?: string }) => (
  <GlassCard className="p-6">
    <div className="flex items-start justify-between mb-4">
      <div className="p-3 bg-white/5 rounded-2xl text-primary">{icon}</div>
      {trend && <span className="text-xs font-bold text-green-400 bg-green-400/10 px-2 py-1 rounded-lg">{trend}</span>}
    </div>
    <p className="text-sm text-white/40 font-medium mb-1">{title}</p>
    <h3 className="text-3xl font-bold">{value}</h3>
  </GlassCard>
);
