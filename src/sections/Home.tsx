import React, { forwardRef } from 'react';
import { ChevronRight, Phone } from 'lucide-react';
import bgHome from '../assets/home.webp';

interface HomeProps {
  onExplore?: () => void;
}

export const Home = forwardRef<HTMLElement, HomeProps>(({ onExplore }, ref) => {
  return (
    <section ref={ref} className="panel relative overflow-hidden flex items-center justify-center bg-[#003B73]">

      {/* Background Image with Cinematic Overlay */}
      <div className="absolute inset-0 z-0 opacity-40">
        <img 
          src={bgHome} 
          alt="Industrial Background" 
          className="home-bg-zoom w-full h-full object-cover"
          referrerPolicy="no-referrer"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2000";
          }}
        />
        {/* Subtle dark overlay for better text contrast */}
        <div className="absolute inset-0 bg-slate-900/20"></div>
      </div>

      {/* Central Glassmorphism Card — Style from txt.txt */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 home-fade-up home-content">
        <div className="bg-white/10 backdrop-blur-md p-12 md:p-20 rounded-[2rem] border border-white/20 text-center shadow-2xl">

          <h1 className="text-white text-5xl md:text-8xl font-black mb-6 tracking-tighter uppercase leading-tight">
            Engenharia de <br/><span className="text-blue-400">Alta Precisão</span>
          </h1>

          <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed mb-10">
            Soluções avançadas em polímeros e manufatura algorítmica para os setores mais exigentes da indústria global.
          </p>

          <button 
            onClick={onExplore}
            className="bg-white text-[#003B73] px-10 py-5 rounded-full font-bold uppercase tracking-widest hover:scale-105 transition-transform flex items-center gap-2 mx-auto shadow-xl group cursor-pointer"
          >
            Conheça nossas Soluções 
            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>

        </div>
      </div>

      {/* Footer Industrial — Positioned at bottom of the section */}
      <footer className="absolute bottom-0 left-0 w-full bg-white/5 backdrop-blur-sm border-t border-white/10 py-8 px-12 z-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 grayscale opacity-60">
            <div className="bg-white text-[#003B73] px-2 py-1 rounded font-bold text-sm">RA</div>
            <span className="font-black tracking-tighter text-white text-lg uppercase">Polymers Tech</span>
          </div>
          <div className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] text-center">
            © 2026 RA Polymers Tech. Todos os direitos reservados. Engenharia de Polímeros de Alta Performance.
          </div>
          <div className="flex gap-8">
            <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest hover:text-white cursor-pointer transition-colors">Privacidade</span>
            <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest hover:text-white cursor-pointer transition-colors">Termos</span>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/55313623XXXX" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-5 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center gap-3 group"
      >
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out whitespace-nowrap font-bold uppercase tracking-widest text-xs">
          Falar com Especialista
        </span>
        <Phone size={24} fill="currentColor" />
      </a>

    </section>
  );
});

Home.displayName = 'Home';

