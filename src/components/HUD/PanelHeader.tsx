import React from 'react';

interface PanelHeaderProps {
  number: string;
  title: string;
}

export const PanelHeader: React.FC<PanelHeaderProps> = ({ number, title }) => (
  <div className="flex items-center gap-4 w-full justify-start mb-10 mt-6 lg:mb-16 md:px-6">
    <span className="font-mono text-ra-blue text-sm font-bold tracking-widest opacity-80">{number}</span>
    <div className="h-[1px] w-12 bg-ra-blue opacity-50"></div>
    <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-slate-700">{title}</h2>
  </div>
);
