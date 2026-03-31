import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei';
import { Settings, Cpu } from 'lucide-react';
import { PanelHeader } from '../components/HUD/PanelHeader';
import { TechBadge } from '../components/HUD/TechBadge';
import { IndustrialMold } from '../components/Three/IndustrialMold';

interface MoldSectionProps {
  moldProgress: number;
  isMobile: boolean;
}

export const MoldSection: React.FC<MoldSectionProps> = ({ moldProgress, isMobile }) => {
  return (
    <section className="panel bg-slate-300 relative overflow-hidden flex flex-col items-center justify-center">
      <PanelHeader number="03" title="Ferramentaria RA Polymers" />
      
      <div className="industrial-bg-grid absolute inset-0 z-0 opacity-20"></div>
      
      <div className="absolute inset-0 z-0">
        <Canvas 
          shadows={false} 
          dpr={[1, 1.5]} 
          gl={{ 
            antialias: true,
            powerPreference: "high-performance"
          }}
          eventSource={document.getElementById('root') || undefined}
        >
          <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={45} />
          <ambientLight intensity={1.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2.5} />
          <Environment preset="city" />
          <Suspense fallback={null}>
            <IndustrialMold progress={isMobile ? 1 : moldProgress} />
          </Suspense>
          <ContactShadows position={[0, -4, 0]} opacity={0.3} scale={20} blur={2} far={4.5} />
        </Canvas>
      </div>

      <div className="relative z-10 pointer-events-none w-full flex flex-col md:absolute md:inset-0 md:-translate-y-0 justify-between md:justify-center gap-12 pt-8 pb-16 px-6 md:p-0">
        <div 
          className="flex flex-col justify-center md:absolute md:top-1/2 md:left-0 md:-translate-y-1/2 md:px-24 transition-all duration-[600ms] ease-out w-full md:w-1/2"
          style={{ 
            opacity: moldProgress > 0.15 ? 1 : 0,
            transform: `translateX(${moldProgress > 0.15 ? '0%' : '-50%'})`
          }}
        >
          <div className="max-w-lg">
            <TechBadge icon={Settings}>Zero Tolerância</TechBadge>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-black mt-4 lg:mt-6 mb-4 leading-none uppercase tracking-tighter text-slate-900 drop-shadow-lg">
              Domínio <br /> <span className="text-ra-blue">Absoluto</span>
            </h2>
            <p className="text-slate-600 text-base lg:text-lg leading-relaxed font-light backdrop-blur-sm bg-white/40 p-6 rounded-2xl border-l-4 border-ra-blue shadow-2xl">
              Da concepção à injeção final. Elimine falhas de terceiros com nossa ferramentaria proprietária focada em maximizar o seu lucro por ciclo.
            </p>
          </div>
        </div>

        <div 
          className="flex flex-col justify-center items-start md:items-end md:absolute md:top-1/2 md:right-0 md:-translate-y-1/2 md:px-24 transition-all duration-[600ms] ease-out w-full md:w-1/2 md:text-right"
          style={{ 
            opacity: moldProgress > 0.15 ? 1 : 0,
            transform: `translateX(${moldProgress > 0.15 ? '0%' : '-50%'})`
          }}
        >
          <div className="max-w-lg">
            <TechBadge icon={Cpu}>Alta Performance</TechBadge>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-black mt-4 lg:mt-6 mb-4 leading-none uppercase tracking-tighter text-slate-900 drop-shadow-lg">
              Ciclos <br /> <span className="text-ra-blue">Extremos</span>
            </h2>
            <p className="text-slate-600 text-base lg:text-lg leading-relaxed font-light backdrop-blur-sm bg-white/40 p-6 rounded-2xl border-l-4 md:border-l-0 md:border-r-4 border-ra-blue inline-block shadow-2xl">
              Otimização térmica e usinagem CNC submilimétrica. Moldes projetados para rodar milhões de ciclos ininterruptos com precisão nanométrica.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
