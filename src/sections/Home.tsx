import React from 'react';
import { ChevronRight, Phone } from 'lucide-react';
import bgHome from '../assets/home.webp';

interface HomeProps {
  onExplore?: () => void;
}

export const Home: React.FC<HomeProps> = ({ onExplore }) => {
  return (
    <section className="panel relative overflow-hidden flex flex-col justify-between bg-[#003B73]">

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
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 md:px-6 home-fade-up home-content my-auto pt-10 pb-16">
        <div className="bg-white/10 backdrop-blur-md p-8 md:p-16 rounded-[2rem] border border-white/20 text-center shadow-2xl">

          <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tighter uppercase leading-tight">
            Engenharia de <br/><span className="text-blue-400">Alta Precisão</span>
          </h1>

          <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed mb-10">
            Soluções avançadas em polímeros e manufatura algorítmica para os setores mais exigentes da indústria global.
          </p>

          <button 
            onClick={onExplore}
            className="bg-white text-[#003B73] px-6 py-4 md:px-10 md:py-5 rounded-full font-bold uppercase tracking-widest hover:scale-105 transition-transform flex items-center gap-2 mx-auto shadow-xl group cursor-pointer text-xs md:text-sm"
          >
            Conheça nossas Soluções 
            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>

        </div>
      </div>

      {/* Footer Industrial — Flex relative rather than absolute */}
      <footer className="relative w-full bg-slate-900/30 backdrop-blur-sm border-t border-white/10 py-6 px-6 md:px-12 z-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 grayscale opacity-60">
            <div className="bg-white text-[#003B73] px-2 py-1 rounded font-bold text-sm">RA</div>
            <span className="font-black tracking-tighter text-white text-lg uppercase">Polymers Tech</span>
          </div>
          <div className="text-[9px] md:text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] text-center">
            © 2026 RA Polymers. Todos os direitos reservados.
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
};


