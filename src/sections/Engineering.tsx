import React from 'react';
import { Activity, Cpu, ShieldCheck } from 'lucide-react';
import { PanelHeader } from '../components/HUD/PanelHeader';
import { TechBadge } from '../components/HUD/TechBadge';
import imgRomi from '../assets/romi.jpg';

export const Engineering: React.FC = () => {
  return (
    <section className="panel bg-slate-300 relative overflow-hidden flex flex-col items-center justify-center p-6 lg:p-10">
      <PanelHeader number="04" title="Engenharia & Performance" />
      
      <div className="absolute inset-0 bg-pattern -z-10" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1.2px, transparent 1.2px)', backgroundSize: '30px 30px', opacity: 0.2 }}></div>

      <div className="h-full flex items-center justify-center relative z-10 w-full">
        <main className="grid grid-cols-1 lg:grid-cols-3 gap-12 w-full max-w-[1600px] items-center">
          
          {/* Column 1: ROMI Unit A */}
          <div className="flex flex-col items-center justify-center group">
            <div className="relative">
              <div className="absolute inset-0 bg-ra-blue/20 blur-3xl rounded-full scale-125 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="bg-white/50 backdrop-blur-md p-2 border border-slate-200 overflow-hidden rounded-xl rotate-[-2deg] group-hover:rotate-0 transition-transform duration-700 shadow-2xl">
                <img 
                  src={imgRomi} 
                  alt="ROMI Precision Machine A" 
                  className="w-full max-w-[400px] object-cover rounded-lg grayscale-0" 
                />
              </div>
              <div className="absolute -bottom-4 -left-4 font-mono text-[10px] text-ra-blue bg-white/80 backdrop-blur-sm px-3 py-1 border border-slate-200/50 rounded-md">
                UNIT_ROMI_01
              </div>
            </div>
          </div>

          {/* Column 2: Technical Narrative (Center) */}
          <div className="flex flex-col gap-8 text-center items-center">
            <TechBadge icon={Activity}>Superior Manufacturing</TechBadge>
            
            <h2 className="font-display text-4xl md:text-6xl font-black uppercase tracking-tighter text-slate-900">
              Poder de <br /> <span className="text-ra-blue">Execução</span>
            </h2>
            
            <div className="bg-white/60 backdrop-blur-lg p-8 md:p-10 border-t-2 border-t-ra-blue max-w-lg rounded-2xl shadow-xl">
              <p className="text-slate-600 text-lg leading-relaxed font-light mb-6">
                Nossa infraestrutura é composta por centros de usinagem ROMI de última geração, garantindo que a complexidade do design nunca comprometa a integridade da peça.
              </p>
              <p className="text-slate-500 text-sm leading-relaxed font-light">
                Com tolerâncias na casa dos microns e automação total, transformamos projetos de engenharia em realidade industrial com velocidade e repetibilidade absoluta.
              </p>
              
              <div className="mt-10 grid grid-cols-2 gap-4">
                <div className="flex flex-col items-center p-4 bg-slate-300/50 rounded-lg border border-slate-200/80">
                  <Cpu className="text-ra-blue mb-2" size={20} />
                  <span className="text-[10px] font-mono text-slate-500 uppercase">Precisão CNC</span>
                  <span className="text-sm font-bold text-slate-800">±0.002mm</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-slate-300/50 rounded-lg border border-slate-200/80">
                  <ShieldCheck className="text-ra-blue mb-2" size={20} />
                  <span className="text-[10px] font-mono text-slate-500 uppercase">Conformidade</span>
                  <span className="text-sm font-bold text-slate-800">100% QA</span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: ROMI Unit B */}
          <div className="flex flex-col items-center justify-center group">
            <div className="relative">
              <div className="absolute inset-0 bg-ra-blue/20 blur-3xl rounded-full scale-125 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="bg-white/50 backdrop-blur-md p-2 border border-slate-200 overflow-hidden rounded-xl rotate-[2deg] group-hover:rotate-0 transition-transform duration-700 shadow-2xl">
                <img 
                  src={imgRomi} 
                  alt="ROMI Precision Machine B" 
                  className="w-full max-w-[400px] object-cover rounded-lg grayscale-0 scale-x-[-1]" 
                />
              </div>
              <div className="absolute -bottom-4 -right-4 font-mono text-[10px] text-ra-blue bg-white/80 backdrop-blur-sm px-3 py-1 border border-slate-200/50 rounded-md">
                UNIT_ROMI_02
              </div>
            </div>
          </div>

        </main>
      </div>

      {/* Telemetry Footer */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-8 opacity-40 font-mono text-[8px] uppercase tracking-[0.4em] pointer-events-none text-slate-500">
        <span>Cycle_Time: Optimal</span>
        <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
        <span>Thermal_Stability: Nominal</span>
        <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
        <span>Load_Factor: 85%</span>
      </div>
    </section>
  );
};
