import React from 'react';
import { PanelHeader } from '../components/HUD/PanelHeader';
import logoVale from '../assets/logo-vale.jpg';
import logoAlcoa from '../assets/logo-alcoa.jpg';
import logoRumo from '../assets/logo-rumo.png';
import logoMrs from '../assets/logo-mrs.jpg';
import logoMrn from '../assets/logo-mrn.jpg';

export const Clients: React.FC = () => {
  const clientList = [
    { name: "VALE", logo: logoVale, fallback: "https://upload.wikimedia.org/wikipedia/en/thumb/5/5e/Vale_logo.svg/1200px-Vale_logo.svg.png" },
    { name: "ALCOA", logo: logoAlcoa, fallback: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Alcoa_logo.svg/1200px-Alcoa_logo.svg.png" },
    { name: "RUMO", logo: logoRumo, fallback: "https://upload.wikimedia.org/wikipedia/pt/thumb/a/a4/Logo_Rumo_Log%C3%ADstica.png/250px-Logo_Rumo_Log%C3%ADstica.png" },
    { name: "MRS", logo: logoMrs, fallback: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/MRS_Logistica_logo.svg/1200px-MRS_Logistica_logo.svg.png" },
    { name: "MRN", logo: logoMrn, fallback: "https://www.mrn.com.br/static/media/logo-mrn.6b4b1b3b.png" }
  ];

  const radius = 260; // Base radius for orbit

  return (
    <section className="panel bg-ra-dark relative overflow-hidden flex flex-col items-center justify-center">
      <PanelHeader number="02" title="Nossos Clientes" />
      
      <div className="industrial-bg-grid absolute inset-0 z-0"></div>
      <div className="vignette-overlay absolute inset-0 z-0"></div>

      {/* Orbit Container with Slow Rotation */}
      <div className="relative z-10 flex items-center justify-center w-full h-full animate-orbit">
        
        {/* Decorative Orbit Rings */}
        <div 
          className="absolute rounded-full border border-white/5 pointer-events-none"
          style={{ width: `${(radius * 2) + 120}px`, height: `${(radius * 2) + 120}px` }}
        />
        <div 
          className="absolute rounded-full border border-ra-blue/10 pointer-events-none"
          style={{ width: `${radius * 2}px`, height: `${radius * 2}px` }}
        />
        <div 
          className="absolute rounded-full border border-white/5 pointer-events-none"
          style={{ width: `${(radius * 2) - 80}px`, height: `${(radius * 2) - 80}px` }}
        />

        {/* Central Text Block (Counter-rotated to stay fixed) */}
        <div className="absolute z-20 text-center pointer-events-none animate-counter-orbit">
          <p className="font-mono text-[9px] text-ra-blue tracking-[0.4em] uppercase mb-2">
            Ecossistema Industrial
          </p>
          <h2 className="font-display text-4xl md:text-6xl font-black uppercase tracking-tighter text-ra-blue leading-none">
            Rede de <br /> Confiança
          </h2>
          <p className="font-mono text-[9px] text-white/20 tracking-[0.3em] uppercase mt-4">
            5 parceiros estratégicos
          </p>
        </div>

        {/* Clients Orbit */}
        {clientList.map((client, i) => {
          const angle = (i / clientList.length) * 360 - 90;
          const angleRad = (angle * Math.PI) / 180;
          const x = Math.cos(angleRad) * radius;
          const y = Math.sin(angleRad) * radius;

          return (
            <div 
              key={i}
              className="absolute group flex items-center justify-center"
              style={{ 
                transform: `translate(${x}px, ${y}px)`,
              }}
            >
              {/* Counter-rotation for the individual item to keep it upright */}
              <div className="animate-counter-orbit flex items-center justify-center">
                
                {/* Orbit Line on Hover (Relative to item) */}
                <div 
                  className="absolute origin-left h-[1px] pointer-events-none opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                  style={{ 
                    width: `${radius}px`,
                    background: 'linear-gradient(to right, rgba(255,255,255,0.5), transparent)',
                    transform: `rotate(${angle + 180}deg)`,
                    left: '50%',
                    top: '50%',
                    zIndex: -1
                  }}
                />

                {/* Highly Detailed Silver Coin */}
                <div className="relative transition-all duration-500 group-hover:scale-125 group-hover:-translate-y-2">
                  
                  {/* Milled Edge (Serrilha) */}
                  <div className="absolute inset-[-4px] rounded-full border-[3px] border-dotted border-white/10 opacity-40 group-hover:opacity-100 transition-opacity"></div>

                  <div 
                    className="w-[112px] h-[112px] md:w-[136px] md:h-[136px] rounded-full flex flex-col items-center justify-center relative overflow-hidden"
                    style={{
                      background: 'radial-gradient(circle at 35% 35%, #f0f0f0, #b0b0b0 40%, #7a7a7a 70%, #999 100%)',
                      boxShadow: 'inset 3px 3px 6px rgba(255,255,255,0.8), inset -3px -3px 6px rgba(0,0,0,0.4), 0 12px 40px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.2)'
                    }}
                  >
                    {/* Brushed Metal Texture Overlay */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none bg-[repeating-linear-gradient(45deg,transparent,transparent_1px,rgba(0,0,0,0.1)_1px,rgba(0,0,0,0.1)_2px)]"></div>

                    {/* Coin Shine Reflection */}
                    <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
                      <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-white/30 rounded-full blur-md transform rotate-12"></div>
                      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-black/20 rounded-full blur-md"></div>
                    </div>

                    {/* Company Name in Center (Centered and Engraved Look) */}
                    <div className="absolute inset-0 flex items-center justify-center z-0 opacity-10 pointer-events-none">
                       <span className="font-display text-lg font-black tracking-widest text-black uppercase scale-150 rotate-[-15deg]">
                         {client.name}
                       </span>
                    </div>

                    {/* Engraved Logo */}
                    <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center relative z-10 transition-transform duration-500 group-hover:scale-90">
                      <img 
                        src={client.logo} 
                        alt={client.name} 
                        className="max-h-full max-w-full object-contain"
                        style={{ filter: 'grayscale(1) brightness(0.25) contrast(1.3) drop-shadow(1px 1px 1px rgba(255,255,255,0.2))' }}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          if (target.src.includes(client.fallback) || target.src.includes('placehold.co')) {
                            target.src = `https://placehold.co/200x100/1a1d23/0066ff?text=${client.name}`;
                          } else {
                            target.src = client.fallback;
                          }
                        }}
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Centered Name (High Detail) */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
                       <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-black/60 group-hover:text-black/80 transition-colors bg-white/5 px-2 py-1 rounded backdrop-blur-[1px] border border-black/5">
                         {client.name}
                       </span>
                    </div>

                    {/* Technical Micro-text at border */}
                    <div className="absolute top-4 w-full text-center">
                       <span className="text-[5px] font-mono text-black/30 tracking-[0.5em] uppercase">Industrial Partner • 2026</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

      </div>
    </section>
  );
};
