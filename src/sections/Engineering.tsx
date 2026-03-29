import React from 'react';
import { Activity, Cpu, ShieldCheck } from 'lucide-react';
import { PanelHeader } from '../components/HUD/PanelHeader';
import { TechBadge } from '../components/HUD/TechBadge';
import imgRomi from '../assets/romi.jpg';

export const Engineering: React.FC = () => {
  return (
    <section className="panel bg-ra-dark relative overflow-hidden flex flex-col items-center justify-center p-6 lg:p-10">
      <PanelHeader number="04" title="Engenharia & Performance" />
      
      <div className="industrial-bg-grid absolute inset-0 z-0 opacity-20"></div>
      <div className="vignette-overlay absolute inset-0 z-0"></div>

      <div className="h-full flex items-center justify-center relative z-10 w-full">
        <main className="grid grid-cols-1 lg:grid-cols-3 gap-12 w-full max-w-[1600px] items-center">
          
          {/* Column 1: ROMI Unit A */}
          <div className="flex flex-col items-center justify-center group">
            <div className="relative">
              <div className="absolute inset-0 bg-ra-blue/20 blur-3xl rounded-full scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="glass-panel-hud p-2 border-ra-blue/30 overflow-hidden rounded-xl rotate-[-2deg] group-hover:rotate-0 transition-transform duration-700">
                <img 
                  src={imgRomi} 
                  alt="ROMI Precision Machine A" 
                  className="w-full max-w-[400px] object-cover rounded-lg grayscale group-hover:grayscale-0 transition-all duration-700" 
                />
              </div>
              <div className="absolute -bottom-4 -left-4 font-mono text-[10px] text-ra-blue bg-ra-dark/80 px-3 py-1 border border-ra-blue/20">
                UNIT_ROMI_01
              </div>
            </div>
          </div>

          {/* Column 2: Technical Narrative (Center) */}
          <div className="flex flex-col gap-8 text-center items-center">
            <TechBadge icon={Activity}>Superior Manufacturing</TechBadge>
            
            <h2 className="font-display text-4xl md:text-6xl font-black uppercase tracking-tighter text-white">
              Poder de <br /> <span className="text-ra-blue">Execução</span>
            </h2>
            
            <div className="glass-panel-hud p-8 md:p-10 border-t-2 border-t-ra-blue max-w-lg">
              <p className="text-white/70 text-lg leading-relaxed font-light mb-6">
                Nossa infraestrutura é composta por centros de usinagem ROMI de última geração, garantindo que a complexidade do design nunca comprometa a integridade da peça.
              </p>
              <p className="text-white/50 text-sm leading-relaxed font-light">
                Com tolerâncias na casa dos microns e automação total, transformamos projetos de engenharia em realidade industrial com velocidade e repetibilidade absoluta.
              </p>
              
              <div className="mt-10 grid grid-cols-2 gap-4">
                <div className="flex flex-col items-center p-4 bg-white/5 rounded-lg border border-white/5">
                  <Cpu className="text-ra-blue mb-2" size={20} />
                  <span className="text-[10px] font-mono text-white/40 uppercase">Precisão CNC</span>
                  <span className="text-sm font-bold text-white">±0.002mm</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-white/5 rounded-lg border border-white/5">
                  <ShieldCheck className="text-ra-blue mb-2" size={20} />
                  <span className="text-[10px] font-mono text-white/40 uppercase">Conformidade</span>
                  <span className="text-sm font-bold text-white">100% QA</span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: ROMI Unit B */}
          <div className="flex flex-col items-center justify-center group">
            <div className="relative">
              <div className="absolute inset-0 bg-ra-blue/20 blur-3xl rounded-full scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="glass-panel-hud p-2 border-ra-blue/30 overflow-hidden rounded-xl rotate-[2deg] group-hover:rotate-0 transition-transform duration-700">
                <img 
                  src={imgRomi} 
                  alt="ROMI Precision Machine B" 
                  className="w-full max-w-[400px] object-cover rounded-lg grayscale group-hover:grayscale-0 transition-all duration-700 scale-x-[-1]" 
                />
              </div>
              <div className="absolute -bottom-4 -right-4 font-mono text-[10px] text-ra-blue bg-ra-dark/80 px-3 py-1 border border-ra-blue/20">
                UNIT_ROMI_02
              </div>
            </div>
          </div>

        </main>
      </div>

      {/* Telemetry Footer */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-8 opacity-20 font-mono text-[8px] uppercase tracking-[0.4em] pointer-events-none">
        <span>Cycle_Time: Optimal</span>
        <div className="w-1 h-1 bg-white rounded-full"></div>
        <span>Thermal_Stability: Nominal</span>
        <div className="w-1 h-1 bg-white rounded-full"></div>
        <span>Load_Factor: 85%</span>
      </div>
    </section>
  );
};
