import React from 'react';
import { LucideIcon } from 'lucide-react';

interface TechBadgeProps {
  children: React.ReactNode;
  icon?: LucideIcon;
}

export const TechBadge: React.FC<TechBadgeProps> = ({ children, icon: Icon }) => (
  <div className="flex items-center gap-2 px-3 py-1 bg-white/60 backdrop-blur-sm border border-slate-300 rounded-full text-[10px] font-bold uppercase tracking-wider text-ra-blue shadow-sm font-mono">
    {Icon && <Icon size={12} />}
    {children}
  </div>
);
