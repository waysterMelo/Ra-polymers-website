import React from 'react';

interface PanelHeaderProps {
  number: string;
  title: string;
}

export const PanelHeader: React.FC<PanelHeaderProps> = ({ number, title }) => (
  <div className="absolute top-12 left-12 z-10 flex items-center gap-4">
    <span className="font-mono text-ra-blue text-sm tracking-widest opacity-50">{number}</span>
    <div className="h-[1px] w-12 bg-ra-blue opacity-30"></div>
    <h2 className="text-xs uppercase tracking-[0.3em] font-semibold text-white/70">{title}</h2>
  </div>
);
