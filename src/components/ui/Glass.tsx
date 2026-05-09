import React from 'react';
import { cn } from '../../lib/utils';
import { motion } from 'motion/react';

interface GlassContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  animate?: boolean;
}

export const GlassCard = ({ children, className, animate = true, ...props }: GlassContainerProps) => {
  const Component = animate ? motion.div : 'div';
  return (
    <Component
      initial={animate ? { opacity: 0, y: 20 } : undefined}
      animate={animate ? { opacity: 1, y: 0 } : undefined}
      className={cn(
        "bg-white dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-3xl shadow-xl dark:shadow-2xl overflow-hidden text-slate-950 dark:text-white",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

export const GlassButton = ({ children, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={cn(
        "px-6 py-3 rounded-2xl font-bold transition-all active:scale-95 bg-white/60 dark:bg-white/10 hover:bg-white/80 dark:hover:bg-white/20 border border-slate-300 dark:border-white/10 backdrop-blur-md shadow-md text-slate-950 dark:text-white",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export const GlassInput = ({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      className={cn(
        "w-full px-5 py-4 rounded-2xl bg-white dark:bg-white/5 border border-slate-300 dark:border-white/10 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-slate-950 dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/30 shadow-sm font-medium",
        className
      )}
      {...props}
    />
  );
};

export const GlassLabel = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <label className={cn("block text-sm font-bold text-slate-700 dark:text-white/60 mb-2 px-1", className)}>
    {children}
  </label>
);
