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

  return (
    <section className="panel bg-ra-dark relative overflow-hidden flex flex-col items-center justify-center">
      <PanelHeader number="02" title="Nossos Clientes" />
      
      <div className="industrial-bg-grid absolute inset-0 z-0"></div>
      <div className="vignette-overlay absolute inset-0 z-0"></div>

      <div className="h-full flex flex-col items-center justify-center px-12 relative z-10 w-full">
        <div className="text-center mb-24">
          <h2 className="font-display text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">
            Rede de <span className="text-ra-blue">Confiança</span>
          </h2>
          <p className="text-white/40 text-sm tracking-[0.2em] uppercase">Ecossistema Industrial de Alta Performance</p>
        </div>

        <div className="w-full max-w-7xl relative">
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-ra-blue/50 to-transparent -translate-y-1/2 hidden md:block"></div>

          <div className="flex flex-wrap md:flex-nowrap justify-center items-center gap-8 md:gap-16">
            {clientList.map((client, i) => (
              <div 
                key={i} 
                className="relative group cursor-none"
                style={{
                  transform: `translateY(${i % 2 === 0 ? '-20px' : '20px'})`
                }}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-ra-dark border-2 border-ra-blue rounded-full z-0 hidden md:block group-hover:scale-150 transition-transform duration-500"></div>
                
                <div className="glass-panel w-40 h-40 md:w-48 md:h-48 rounded-full flex flex-col items-center justify-center relative z-10 
                              hover:scale-110 hover:-translate-y-4 hover:border-ra-blue/50 hover:bg-white/10 transition-all duration-500 overflow-hidden">
                  <div className="absolute inset-0 bg-ra-blue/0 group-hover:bg-ra-blue/10 transition-colors duration-500"></div>
                  
                  <div className="w-24 h-24 flex items-center justify-center grayscale group-hover:grayscale-0 opacity-50 group-hover:opacity-100 transition-all duration-700 relative z-20">
                    <img 
                      src={client.logo} 
                      alt={client.name} 
                      className="max-h-full max-w-full object-contain mix-blend-screen"
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
                  
                  <span className="absolute bottom-6 text-[10px] font-mono tracking-[0.3em] text-ra-blue opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 z-20">
                    {client.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
