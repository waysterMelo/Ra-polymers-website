import React from 'react';
import { ArrowRight } from 'lucide-react';
import bgHome from '../assets/home.webp';

export const Home: React.FC = () => {
  return (
    <section className="panel relative overflow-hidden bg-slate-300 flex items-center justify-center">

      {/* Background Image with Light Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={bgHome} 
          alt="Polymers Background" 
          className="w-full h-full object-cover opacity-100"
          referrerPolicy="no-referrer"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1920";
          }}
        />
        {/* Soft vignette to frame the image and focus on the center card */}
        <div className="absolute inset-0 bg-slate-900/20"></div>
      </div>

      {/* Central Glassmorphism Card for Perfect Typography Harmony */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6">
        <div className="flex flex-col items-center justify-center text-center bg-white/100 backdrop-blur-md border border-white/60 p-12 md:p-24 rounded-3xl shadow-2xl">

          <div className="mb-8 animate-pulse">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-white shadow-xl rounded-2xl flex items-center justify-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-ra-blue/10 transform -skew-x-12 translate-x-full group-hover:translate-x-[-100%] transition-transform duration-1000"></div>
              <span className="text-3xl md:text-4xl font-black tracking-tighter text-slate-900 z-10">RA</span>
            </div>
          </div>

          <h1 className="font-display text-5xl md:text-8xl font-black tracking-tighter uppercase mb-6 text-slate-900 drop-shadow-sm">
            Ra <span className="text-ra-blue">polymers</span>
          </h1>

          <p className="text-sm md:text-lg font-bold tracking-[0.25em] text-slate-600 uppercase max-w-2xl leading-relaxed">
            Soluções Avançadas em Polímeros e Engenharia de Alta Precisão para o Setor Industrial
          </p>

        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500 animate-bounce">
        <span className="text-[9px] font-bold uppercase tracking-[0.3em]">Scroll to Explore</span>
        <ArrowRight size={20} className="text-ra-blue rotate-90" />
      </div>

    </section>
  );
};
