import React, { forwardRef } from 'react';
import bgHome from '../assets/home.webp';

export const Home = forwardRef<HTMLElement>((_, ref) => {
  return (
    <section ref={ref} className="panel relative overflow-hidden flex items-center justify-center bg-slate-950">

      {/* Background Image with Cinematic Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={bgHome} 
          alt="Polymers Background" 
          className="home-bg-zoom w-full h-full object-cover"
          referrerPolicy="no-referrer"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1920";
          }}
        />
        {/* Dark cinematic overlay — stronger for contrast */}
        <div className="absolute inset-0 bg-slate-900/50"></div>
        {/* Radial vignette — dark edges, lighter center for focus */}
        <div className="absolute inset-0 home-vignette"></div>
      </div>

      {/* Central Glassmorphism Card — Premium */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 home-fade-up home-content">
        <div className="home-glass-card flex flex-col items-center justify-center text-center p-12 md:p-24 rounded-3xl">

          {/* Logo RA — custom subtle animation */}
          <div className="mb-8 home-fade-up-delay-1">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-white/90 shadow-2xl rounded-2xl flex items-center justify-center relative overflow-hidden group home-logo-glow">
              <div className="absolute inset-0 bg-ra-blue/10 transform -skew-x-12 translate-x-full group-hover:translate-x-[-100%] transition-transform duration-1000"></div>
              <span className="text-3xl md:text-4xl font-black tracking-tighter text-slate-900 z-10">RA</span>
            </div>
          </div>

          {/* Title with gradient effect */}
          <h1 className="font-display text-5xl md:text-8xl font-black tracking-tighter uppercase mb-6 home-fade-up-delay-2">
            <span className="home-title-gradient">Ra Polymers</span>
          </h1>

          {/* Subtitle — thinner and more spaced */}
          <p className="text-sm md:text-lg font-light tracking-[0.3em] text-white/60 uppercase max-w-2xl leading-relaxed home-fade-up-delay-3">
            Soluções Avançadas em Polímeros e Engenharia de Alta Precisão para o Setor Industrial
          </p>

        </div>
      </div>

    </section>
  );
});

Home.displayName = 'Home';

