import React from 'react';
import { ArrowRight } from 'lucide-react';
import bgHome from '../assets/home.webp';

export const Home: React.FC = () => {
  return (
    <section className="panel relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src={bgHome} 
          alt="Polymers Background" 
          className="w-full h-full object-cover opacity-30 mix-blend-overlay"
          referrerPolicy="no-referrer"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1920";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ra-dark/80 via-ra-dark/40 to-ra-dark"></div>
      </div>
      
      <div className="h-full flex flex-col items-center justify-center px-6 text-center relative z-10">
        <div className="mb-8 animate-pulse">
          <div className="w-24 h-24 border-2 border-ra-blue rounded-lg flex items-center justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-ra-blue/10 transform -skew-x-12 translate-x-full group-hover:translate-x-[-100%] transition-transform duration-1000"></div>
            <span className="text-4xl font-black tracking-tighter text-white">RA</span>
          </div>
        </div>
        
        <h1 className="font-display text-5xl md:text-8xl font-black tracking-tighter uppercase mb-4">
          Ra <span className="text-ra-blue">polymers</span>
        </h1>
        
        <p className="text-sm md:text-lg font-light tracking-[0.3em] text-white/60 uppercase max-w-3xl">
          Soluções Avançadas em Polímeros e Engenharia de Alta Precisão para o Setor Industrial
        </p>
      </div>
      
      <div className="absolute bottom-12 right-12 flex items-center gap-4 text-white/20 animate-bounce">
        <span className="text-[10px] uppercase tracking-widest">Scroll to Explore</span>
        <ArrowRight size={16} />
      </div>
    </section>
  );
};
