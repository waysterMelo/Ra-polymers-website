import React from 'react';

const clients = [
  { name: 'Global Polymers', icon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5', sector: 'Químico', color: 'teal' },
  { name: 'TechFlow Sys', icon: 'M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z', sector: 'Tecnologia', color: 'indigo' },
  { name: 'AeroDynamics', icon: 'M12 2a10 10 0 100 20 10 10 0 000-20zM12 2a14.5 14.5 0 000 20 14.5 14.5 0 000-20M2 12h20', featured: true, sector: 'Aeroespacial', color: 'blue' },
  { name: 'BioSynth Ind.', icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z', sector: 'Bioquímica', color: 'emerald' },
  { name: 'Quantum Logix', icon: 'M4.5 16.5L12 21l7.5-4.5M4.5 7.5L12 12l7.5-4.5M12 3L4.5 7.5 12 12l7.5-4.5L12 3z', sector: 'Eletrônica', color: 'violet' },
  { name: 'SolarGrid', icon: 'M12 2v20M2 12h20', sector: 'Energia', color: 'amber' },
  { name: 'UrbanInfra', icon: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 7a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75', sector: 'Construção', color: 'slate' },
  { name: 'HeavyMach Group', icon: 'M2 7h20v14H2zM16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16', sector: 'Maquinário', color: 'sky' },
  { name: 'LogiCore Ltd', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4', sector: 'Logística', color: 'orange' },
  { name: 'Volt Dynamics', icon: 'M13 10V3L4 14h7v7l9-11h-7z', sector: 'Automotivo', color: 'rose' },
];

const colorMap: Record<string, { bg: string; text: string; border: string; shadow: string; line: string; sectorText: string }> = {
  teal:    { bg: 'bg-teal-50',    text: 'text-teal-600',    border: 'hover:border-teal-300',    shadow: 'hover:shadow-teal-200/40',    line: 'via-teal-400',    sectorText: 'text-teal-500' },
  indigo:  { bg: 'bg-indigo-50',  text: 'text-indigo-600',  border: 'hover:border-indigo-300',  shadow: 'hover:shadow-indigo-200/40',  line: 'via-indigo-400',  sectorText: 'text-indigo-500' },
  blue:    { bg: 'bg-blue-50',    text: 'text-ra-blue',     border: 'hover:border-blue-300',    shadow: 'hover:shadow-blue-200/40',    line: 'via-ra-blue',     sectorText: 'text-ra-blue' },
  emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'hover:border-emerald-300', shadow: 'hover:shadow-emerald-200/40', line: 'via-emerald-400', sectorText: 'text-emerald-500' },
  violet:  { bg: 'bg-violet-50',  text: 'text-violet-600',  border: 'hover:border-violet-300',  shadow: 'hover:shadow-violet-200/40',  line: 'via-violet-400',  sectorText: 'text-violet-500' },
  amber:   { bg: 'bg-amber-50',   text: 'text-amber-600',   border: 'hover:border-amber-300',   shadow: 'hover:shadow-amber-200/40',   line: 'via-amber-400',   sectorText: 'text-amber-500' },
  slate:   { bg: 'bg-slate-100',  text: 'text-slate-600',   border: 'hover:border-slate-400',   shadow: 'hover:shadow-slate-200/40',   line: 'via-slate-400',   sectorText: 'text-slate-500' },
  sky:     { bg: 'bg-sky-50',     text: 'text-sky-600',     border: 'hover:border-sky-300',     shadow: 'hover:shadow-sky-200/40',     line: 'via-sky-400',     sectorText: 'text-sky-500' },
  orange:  { bg: 'bg-orange-50',  text: 'text-orange-600',  border: 'hover:border-orange-300',  shadow: 'hover:shadow-orange-200/40',  line: 'via-orange-400',  sectorText: 'text-orange-500' },
  rose:    { bg: 'bg-rose-50',    text: 'text-rose-600',    border: 'hover:border-rose-300',    shadow: 'hover:shadow-rose-200/40',    line: 'via-rose-400',    sectorText: 'text-rose-500' },
};

export const Clients: React.FC = () => {
  return (
    <section className="panel relative flex items-center justify-center overflow-hidden bg-slate-300 p-6 lg:p-10">

      {/* Background pattern */}
      <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1.2px, transparent 1.2px)', backgroundSize: '30px 30px', opacity: 0.5 }}></div>

      <div className="relative z-10 w-full max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-5">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-ra-blue/40"></div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border border-slate-200 rounded-full shadow-sm">
              <span className="w-1.5 h-1.5 bg-ra-blue rounded-full animate-pulse"></span>
              <span className="text-ra-blue font-extrabold tracking-[0.3em] text-[9px] uppercase">Rede de Confiança</span>
            </div>
            <div className="h-px w-10 bg-gradient-to-l from-transparent to-ra-blue/40"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tighter">
            Empresas que evoluem{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-ra-blue to-indigo-600">conosco</span>.
          </h2>
          <p className="text-slate-500 max-w-lg mx-auto text-base font-medium leading-relaxed">
            Transformando desafios industriais em vantagens competitivas.
          </p>
        </div>

        {/* Grid de Clientes */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-5">
          {clients.map((client) => {
            const c = colorMap[client.color];
            return (
              <div key={client.name} className="cl-card-wrapper group">
                <div className={`
                  cl-card relative flex flex-col items-center justify-center text-center
                  p-6 h-44 rounded-2xl cursor-default
                  ${c.border} ${c.shadow}
                  ${client.featured ? 'cl-card--featured' : ''}
                `}>
                  {/* Shine sweep */}
                  <div className="cl-shine"></div>

                  {/* Top accent line */}
                  <div className={`absolute top-0 left-[15%] right-[15%] h-[2px] rounded-full transition-all duration-500
                    bg-gradient-to-r from-transparent ${c.line} to-transparent
                    ${client.featured ? 'opacity-70' : 'opacity-0 group-hover:opacity-60'}
                  `}></div>

                  {/* Icon container */}
                  <div className={`
                    relative mb-3 w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-500
                    ${c.bg} ${c.text}
                  `}>
                    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d={client.icon} />
                    </svg>
                  </div>

                  {/* Featured badge */}
                  {client.featured && (
                    <span className="absolute top-3 right-3 text-[6px] font-bold tracking-[0.2em] uppercase text-white bg-ra-blue px-2 py-0.5 rounded-full shadow-md shadow-ra-blue/20">
                      Parceiro
                    </span>
                  )}

                  {/* Name */}
                  <span className="text-[10px] font-extrabold tracking-[0.12em] uppercase text-slate-700 group-hover:text-slate-900 transition-all duration-400">
                    {client.name}
                  </span>

                  {/* Sector */}
                  <span className={`mt-1 text-[8px] font-semibold tracking-[0.1em] uppercase ${c.sectorText} transition-all duration-400`}>
                    {client.sector}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats bar */}
        <div className="mt-12 flex items-center justify-center auto-rows-max">
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 px-6 lg:px-8 py-4 rounded-2xl bg-white border border-slate-200 shadow-lg shadow-slate-200/50">
            <div className="text-center">
              <p className="text-2xl font-black text-slate-900">10+</p>
              <p className="text-[8px] font-bold tracking-[0.2em] uppercase text-slate-400">Clientes</p>
            </div>
            <div className="hidden md:block h-8 w-px bg-slate-200"></div>
            <div className="text-center">
              <p className="text-2xl font-black text-slate-900">98%</p>
              <p className="text-[8px] font-bold tracking-[0.2em] uppercase text-slate-400">Retenção</p>
            </div>
            <div className="hidden md:block h-8 w-px bg-slate-200"></div>
            <div className="text-center">
              <p className="text-2xl font-black text-slate-900">5+</p>
              <p className="text-[8px] font-bold tracking-[0.2em] uppercase text-slate-400">Anos</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
