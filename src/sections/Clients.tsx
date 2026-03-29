import React from 'react';
import { PanelHeader } from '../components/HUD/PanelHeader';

export const Clients: React.FC = () => {
  return (
    <section className="panel relative flex flex-col items-center justify-center bg-slate-300 p-6 lg:p-10">
      
      <div className="absolute inset-0 bg-pattern -z-10" style={{ backgroundImage: 'radial-gradient(#e2e8f0 1.2px, transparent 1.2px)', backgroundSize: '30px 30px', opacity: 0.4 }}></div>
      
      <PanelHeader number="02" title="Nossos Clientes" />

      <div className="w-full max-w-7xl mx-auto text-center">
        <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-sky-100/70 border border-sky-200/80 rounded-full mb-4">
                <span className="w-1.5 h-1.5 bg-ra-blue rounded-full animate-pulse"></span>
                <span className="text-sky-600 font-extrabold tracking-[0.3em] text-[9px] uppercase">
                    Rede de Confiança
                </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tighter">
                Empresas que evoluem <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-indigo-600">connosco</span>.
            </h1>
            <p className="text-slate-500 max-w-xl mx-auto text-base font-medium leading-relaxed">
                Transformando desafios industriais em vantagens competitivas.
            </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            
            {/* Client Cards */}
            <div className="client-card-container">
                <div className="client-card p-8 h-48 flex flex-col items-center justify-center text-center">
                    <div className="client-logo-wrapper mb-4">
                        <svg className="w-12 h-12 text-slate-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                        </svg>
                    </div>
                    <span className="client-name text-[9px] font-extrabold tracking-[0.15em] uppercase">Global Polymers</span>
                </div>
            </div>

            <div className="client-card-container">
                <div className="client-card p-8 h-48 flex flex-col items-center justify-center text-center">
                    <div className="client-logo-wrapper mb-4">
                        <svg className="w-12 h-12 text-slate-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                            <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
                        </svg>
                    </div>
                    <span className="client-name text-[9px] font-extrabold tracking-[0.15em] uppercase">TechFlow Sys</span>
                </div>
            </div>

            <div className="client-card-container">
                <div className="client-card p-8 h-48 flex flex-col items-center justify-center text-center border-sky-100 bg-gradient-to-b from-sky-50/30 to-white">
                    <div className="client-logo-wrapper mb-4 opacity-100 filter-none">
                        <svg className="w-12 h-12 text-sky-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 2a14.5 14.5 0 000 20 14.5 14.5 0 000-20" />
                            <path d="M2 12h20" />
                        </svg>
                    </div>
                    <span className="client-name text-[8px] bg-ra-blue text-white px-2 py-0.5 rounded-full mb-2 font-bold uppercase tracking-widest">Parceiro</span>
                    <span className="client-name text-[9px] font-extrabold tracking-[0.15em] text-slate-900 uppercase">AeroDynamics</span>
                </div>
            </div>

            <div className="client-card-container">
                <div className="client-card p-8 h-48 flex flex-col items-center justify-center text-center">
                    <div className="client-logo-wrapper mb-4">
                        <svg className="w-12 h-12 text-slate-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        </svg>
                    </div>
                    <span className="client-name text-[9px] font-extrabold tracking-[0.15em] uppercase">BioSynth Ind.</span>
                </div>
            </div>

            <div className="client-card-container">
                <div className="client-card p-8 h-48 flex flex-col items-center justify-center text-center">
                    <div className="client-logo-wrapper mb-4">
                        <svg className="w-12 h-12 text-slate-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                            <path d="M4.5 16.5L12 21l7.5-4.5M4.5 7.5L12 12l7.5-4.5M12 3L4.5 7.5 12 12l7.5-4.5L12 3z" />
                        </svg>
                    </div>
                    <span className="client-name text-[9px] font-extrabold tracking-[0.15em] uppercase">Quantum Logix</span>
                </div>
            </div>

            <div className="client-card-container">
                <div className="client-card p-8 h-48 flex flex-col items-center justify-center text-center">
                    <div className="client-logo-wrapper mb-4">
                        <svg className="w-12 h-12 text-slate-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                            <path d="M12 2v20M2 12h20" />
                        </svg>
                    </div>
                    <span className="client-name text-[9px] font-extrabold tracking-[0.15em] uppercase">SolarGrid</span>
                </div>
            </div>

            <div className="client-card-container">
                <div className="client-card p-8 h-48 flex flex-col items-center justify-center text-center">
                    <div className="client-logo-wrapper mb-4">
                        <svg className="w-12 h-12 text-slate-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                            <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
                        </svg>
                    </div>
                    <span className="client-name text-[9px] font-extrabold tracking-[0.15em] uppercase">UrbanInfra</span>
                </div>
            </div>

            <div className="client-card-container">
                <div className="client-card p-8 h-48 flex flex-col items-center justify-center text-center">
                    <div className="client-logo-wrapper mb-4">
                        <svg className="w-12 h-12 text-slate-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                            <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                            <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
                        </svg>
                    </div>
                    <span className="client-name text-[9px] font-extrabold tracking-[0.15em] uppercase">HeavyMach Group</span>
                </div>
            </div>

             <div className="client-card-container">
                <div className="client-card p-8 h-48 flex flex-col items-center justify-center text-center">
                    <div className="client-logo-wrapper mb-4">
                        <svg className="w-12 h-12 text-slate-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                            <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                    </div>
                    <span className="client-name text-[9px] font-extrabold tracking-[0.15em] uppercase">LogiCore Ltd</span>
                </div>
            </div>

            <div className="client-card-container">
                <div className="client-card p-8 h-48 flex flex-col items-center justify-center text-center">
                    <div className="client-logo-wrapper mb-4">
                        <svg className="w-12 h-12 text-slate-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                            <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <span className="client-name text-[9px] font-extrabold tracking-[0.15em] uppercase">Volt Dynamics</span>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

