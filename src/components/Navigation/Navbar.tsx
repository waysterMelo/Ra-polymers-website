import React from 'react';

interface NavbarProps {
  onNavigate: (index: number) => void;
  activeSection: number;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, activeSection }) => {
  return (
    <nav className="fixed top-0 left-0 w-full z-[100] bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate(0)}>
          <div className="bg-[#003B73] text-white px-2 py-1 rounded-lg font-bold text-xl">RA</div>
          <span className="font-black tracking-tighter text-[#003B73] text-2xl">POLYMERS</span>
        </div>
        
        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8 font-bold text-sm tracking-widest text-slate-500 uppercase">
          <button 
            onClick={() => onNavigate(0)} 
            className={`transition-colors hover:text-[#003B73] pb-1 ${activeSection === 0 ? 'text-[#003B73] border-b-2 border-[#003B73]' : ''}`}
          >
            Início
          </button>
          <button 
            onClick={() => onNavigate(1)} 
            className={`transition-colors hover:text-[#003B73] pb-1 ${activeSection === 1 ? 'text-[#003B73] border-b-2 border-[#003B73]' : ''}`}
          >
            Serviços
          </button>
          <button 
            onClick={() => onNavigate(2)} 
            className={`transition-colors hover:text-[#003B73] pb-1 ${activeSection === 2 ? 'text-[#003B73] border-b-2 border-[#003B73]' : ''}`}
          >
            Clientes
          </button>
          <button 
            onClick={() => onNavigate(3)} 
            className={`transition-colors hover:text-[#003B73] pb-1 ${activeSection >= 3 && activeSection < 5 ? 'text-[#003B73] border-b-2 border-[#003B73]' : ''}`}
          >
            Produtos
          </button>
          <button 
            onClick={() => onNavigate(5)} 
            className={`transition-colors hover:text-[#003B73] pb-1 ${activeSection === 5 ? 'text-[#003B73] border-b-2 border-[#003B73]' : ''}`}
          >
            Contato
          </button>
        </div>

        {/* Action Button */}
        <button 
          onClick={() => onNavigate(5)}
          className="bg-[#003B73] text-white px-6 py-3 rounded-md text-xs font-bold uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg hover:shadow-[#003B73]/20"
        >
          Portal do Cliente
        </button>
      </div>
    </nav>
  );
};
