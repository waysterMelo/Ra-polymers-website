import React from 'react';
import { LucideIcon } from 'lucide-react';

interface TechBadgeProps {
  children: React.ReactNode;
  icon?: LucideIcon;
}

export const TechBadge: React.FC<TechBadgeProps> = ({ children, icon: Icon }) => (
  <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] uppercase tracking-wider text-ra-blue/80 font-mono">
    {Icon && <Icon size={12} />}
    {children}
  </div>
);
