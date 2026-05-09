import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { translations } from '../i18n/translations';
import { GlassCard, GlassButton } from '../components/ui/Glass';
import { motion } from 'motion/react';
import { QrCode, Zap, Shield, Smartphone, ArrowRight, BarChart3, Clock } from 'lucide-react';

export const Home = () => {
  const { language } = useStore();
  const t = translations[language];

  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="relative py-20 flex flex-col items-center text-center">
        <motion.div
           initial={{ scale: 0.8, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           className="bg-primary/20 text-primary px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-6 border border-primary/30"
        >
          {t.subtitle}
        </motion.div>
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-6xl md:text-8xl font-black mb-8 leading-[0.9] tracking-tighter"
        >
          {t.title.split(' ').map((word, i) => (
            <span key={i} className={i === 1 ? "text-primary" : ""}>{word} </span>
          ))}
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="max-w-2xl text-xl text-slate-700 dark:text-white/50 mb-12 font-semibold"
        >
          The ultimate platform to create, customize, and track your QR codes with precision. No registration required – just pure performance.
        </motion.p>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <Link to="/generator">
            <GlassButton className="bg-primary hover:bg-primary/80 border-primary text-white px-10 py-5 text-lg font-bold flex items-center gap-3">
              Get Started <ArrowRight size={20} />
            </GlassButton>
          </Link>
          <Link to="/history">
            <GlassButton className="px-10 py-5 text-lg font-bold">
              View History
            </GlassButton>
          </Link>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <FeatureCard
          icon={<Zap className="text-yellow-400" />}
          title="Instant Generation"
          description="Create QR codes literally in seconds. High performance, zero lag, zero friction."
        />
        <FeatureCard
          icon={<Smartphone className="text-blue-400" />}
          title="Mobile Friendly"
          description="Fully responsive design optimized for scanning and generating on the go."
        />
        <FeatureCard
          icon={<Shield className="text-green-400" />}
          title="Privacy First"
          description="All data stays on your device unless you choose to use our dynamic links."
        />
      </section>

      {/* Stats Counter (Mock) */}
      <section className="py-20 text-center">
        <GlassCard className="p-12 bg-white/5 border-white/10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
             <StatItem label="QR Generated" value="1.2M+" />
             <StatItem label="Active Users" value="50K+" />
             <StatItem label="Total Scans" value="5.8M+" />
             <StatItem label="Countries" value="180+" />
          </div>
        </GlassCard>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <GlassCard className="p-8 hover:bg-white/15 transition-all group">
    <div className="bg-white/5 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-white/40 leading-relaxed">{description}</p>
  </GlassCard>
);

const StatItem = ({ label, value }: { label: string, value: string }) => (
  <div>
    <h4 className="text-3xl md:text-4xl font-black text-primary mb-1">{value}</h4>
    <p className="text-sm text-white/30 font-medium uppercase tracking-widest">{label}</p>
  </div>
);
