import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei';
import { Settings, Cpu } from 'lucide-react';
import { PanelHeader } from '../components/HUD/PanelHeader';
import { TechBadge } from '../components/HUD/TechBadge';
import { IndustrialMold } from '../components/Three/IndustrialMold';

interface MoldSectionProps {
  moldPanelRef: React.RefObject<HTMLElement>;
  moldProgress: number;
  isMobile: boolean;
}

export const MoldSection: React.FC<MoldSectionProps> = ({ moldPanelRef, moldProgress, isMobile }) => {
  return (
    <section ref={moldPanelRef} className="panel bg-ra-grey/30 panel-mold">
      <PanelHeader number="03" title="Ferramentaria RA Polymers" />
      
      <div className="absolute inset-0 z-0">
        <Canvas shadows dpr={[1, 2]} eventSource={document.getElementById('root') || undefined}>
          <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={45} />
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
          <Environment preset="city" />
          <Suspense fallback={null}>
            <IndustrialMold progress={isMobile ? 1 : moldProgress} />
          </Suspense>
          <ContactShadows position={[0, -4, 0]} opacity={0.4} scale={20} blur={2} far={4.5} />
        </Canvas>
      </div>

      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        <div 
          className="absolute top-1/2 left-0 -translate-y-1/2 flex flex-col justify-center px-12 md:px-24 transition-all duration-[600ms] ease-out w-full md:w-1/2 h-full"
          style={{ 
            opacity: moldProgress > 0.15 ? 1 : 0,
            transform: `translateX(${moldProgress > 0.15 ? '0%' : '-50%'})`
          }}
        >
          <div className="max-w-lg">
            <TechBadge icon={Settings}>Zero Tolerância</TechBadge>
            <h2 className="text-4xl md:text-6xl font-black mt-6 mb-4 leading-none uppercase tracking-tighter text-white drop-shadow-2xl">
              Domínio <br /> <span className="text-ra-blue">Absoluto</span>
            </h2>
            <p className="text-white/70 text-lg leading-relaxed font-light backdrop-blur-md bg-ra-dark/40 p-6 rounded-2xl border-l-4 border-ra-blue shadow-2xl">
              Da concepção à injeção final. Elimine falhas de terceiros com nossa ferramentaria proprietária focada em maximizar o seu lucro por ciclo.
            </p>
          </div>
        </div>

        <div 
          className="absolute top-1/2 right-0 -translate-y-1/2 flex flex-col justify-center items-end px-12 md:px-24 transition-all duration-[600ms] ease-out w-full md:w-1/2 h-full text-right"
          style={{ 
            opacity: moldProgress > 0.15 ? 1 : 0,
            transform: `translateX(${moldProgress > 0.15 ? '0%' : '50%'})`
          }}
        >
          <div className="max-w-lg">
            <TechBadge icon={Cpu}>Alta Performance</TechBadge>
            <h2 className="text-4xl md:text-6xl font-black mt-6 mb-4 leading-none uppercase tracking-tighter text-white drop-shadow-2xl">
              Ciclos <br /> <span className="text-ra-blue">Extremos</span>
            </h2>
            <p className="text-white/70 text-lg leading-relaxed font-light backdrop-blur-md bg-ra-dark/40 p-6 rounded-2xl border-r-4 border-ra-blue inline-block shadow-2xl">
              Otimização térmica e usinagem CNC submilimétrica. Moldes projetados para rodar milhões de ciclos ininterruptos com precisão nanométrica.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
