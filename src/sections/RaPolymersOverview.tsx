import React from 'react';

const RaPolymersOverview: React.FC = () => {
  return (
    <section className="panel relative min-h-screen flex flex-col justify-center blueprint-bg border-b border-outline-variant/10 px-8 py-16 lg:px-20">
      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 z-10">
          <div className="inline-flex items-center gap-2 bg-surface-container-high px-3 py-1 mb-6 border-l-2 border-tertiary">
            <span className="text-[10px] font-bold tracking-[0.2em] text-tertiary uppercase">Operational Status: Nominal</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black font-headline text-on-background leading-tight mb-8">
            RA POLYMERS:<br />
            <span className="text-primary">ALTA PERFORMANCE</span>
          </h1>
          <p className="text-lg text-outline-variant max-w-xl leading-relaxed mb-10 font-body">
            A RA Polymers opera no nexo entre a ciência de materiais avançados e a manufatura algorítmica. Desenvolvemos ecossistemas poliméricos de alto desempenho para aplicações de engenharia de precisão em escala global.
          </p>
          <div className="flex flex-wrap gap-6 mb-12">
            <div className="bg-surface-container border border-outline-variant/20 p-4 technical-bracket">
              <p className="text-[9px] text-outline uppercase tracking-widest mb-1">Standard Reference</p>
              <p className="text-xs font-bold text-on-surface">ISO 9001:2015 - GESTÃO DE QUALIDADE</p>
            </div>
            <div className="bg-surface-container border border-outline-variant/20 p-4 technical-bracket">
              <p className="text-[9px] text-outline uppercase tracking-widest mb-1">Technology Tier</p>
              <p className="text-xs font-bold text-on-surface">IND_4.0 - FÁBRICA INTELIGENTE</p>
            </div>
          </div>
          <div className="flex gap-4">
            <button className="bg-gradient-to-br from-primary to-primary-container text-on-primary px-8 py-4 font-label text-xs font-black uppercase tracking-widest hover:brightness-110 transition-all flex items-center gap-3">
              <span className="material-symbols-outlined text-base">analytics</span>
              Iniciar Auditoria Técnica
            </button>
            <button className="border border-outline-variant/20 bg-surface-container-high/40 backdrop-blur-md px-8 py-4 font-label text-xs font-black uppercase tracking-widest text-primary hover:bg-surface-container transition-all">
              Ficha Técnica
            </button>
          </div>
        </div>
        <div className="lg:col-span-5 relative">
          <div className="relative w-full aspect-square bg-surface-container-low technical-bracket overflow-hidden group">
            <img 
              alt="Industrial polymer processing" 
              className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" 
              data-alt="close-up of advanced industrial machinery processing metallic polymer components, moody cinematic lighting, deep blue and silver tones, high-tech engineering" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjbBrWlK_VcdNxH3KRFZPyaovlhggWtNoJU6ISBCGd29nYJ2LTrkeL0sy9T3CzRwhWojFZm8ZVJX41jNyWiBXSrXEsMFCqzQDLKDW-mz314JKTz78qdS6gfIBwFhjzEK7bnJCM6VoaH03bJm9-RS7Y4cH8rFqgBSpACfpg_0zF4bCEZERy5iZa5p79iUDex1ANobhIrAeodOY7qj74J4lT6pzauss3mH2elPiI0RdI7TBZxI6xVBLr_Id4W_OMjyBSDeimyXLkQl8"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent opacity-60"></div>
            {/* Floating Data Markers */}
            <div className="absolute top-8 right-8 bg-surface-container-highest/80 backdrop-blur px-3 py-2 border-r-2 border-tertiary">
              <p className="text-[10px] text-tertiary font-bold tracking-tighter">DATA FEED</p>
              <p className="text-xs font-mono text-on-surface">XP-992.012</p>
            </div>
          </div>
          {/* Decorative Coordinates */}
          <div className="absolute -bottom-4 -left-4 font-mono text-[8px] text-outline rotate-90 flex gap-4 uppercase">
            <span>Lat: 23.5505 S</span>
            <span>Long: 46.6333 W</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RaPolymersOverview;