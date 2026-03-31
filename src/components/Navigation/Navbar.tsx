import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onNavigate: (index: number) => void;
  activeSection: number;
}

const NAV_ITEMS = [
  { label: 'Início', index: 0 },
  { label: 'Sobre Nós', index: 1 },
  { label: 'Clientes', index: 2 },
  { label: 'Produtos', index: 3 },
  { label: 'Engenharia', index: 4 },
  { label: 'Contato', index: 5 },
];

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, activeSection }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavigate = (index: number) => {
    onNavigate(index);
    setMobileOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleNavigate(0)}>
          <div className="bg-[#003B73] text-white px-2 py-1 rounded-lg font-bold text-xl">RA</div>
          <span className="font-black tracking-tighter text-[#003B73] text-2xl">POLYMERS</span>
        </div>
        
        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-6 font-bold text-sm tracking-widest text-slate-500 uppercase">
          {NAV_ITEMS.map((item) => (
            <button 
              key={item.index}
              onClick={() => handleNavigate(item.index)} 
              className={`transition-colors hover:text-[#003B73] pb-1 cursor-pointer ${
                activeSection === item.index 
                  ? 'text-[#003B73] border-b-2 border-[#003B73]' 
                  : ''
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Desktop Action Button */}
        <button 
          onClick={() => handleNavigate(5)}
          className="hidden lg:block bg-[#003B73] text-white px-6 py-3 rounded-md text-xs font-bold uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg hover:shadow-[#003B73]/20 cursor-pointer"
        >
          Portal do Cliente
        </button>

        {/* Mobile Hamburger Button */}
        <button 
          className="lg:hidden p-2 text-[#003B73] cursor-pointer"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-lg border-t border-slate-200 shadow-2xl">
          <div className="flex flex-col px-6 py-4 gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.index}
                onClick={() => handleNavigate(item.index)}
                className={`text-left py-3 px-4 rounded-lg font-bold text-sm uppercase tracking-widest transition-all cursor-pointer ${
                  activeSection === item.index
                    ? 'text-[#003B73] bg-blue-50'
                    : 'text-slate-500 hover:text-[#003B73] hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="mt-3 pt-3 border-t border-slate-200">
              <button 
                onClick={() => handleNavigate(5)}
                className="w-full bg-[#003B73] text-white px-6 py-3 rounded-md text-xs font-bold uppercase tracking-widest hover:bg-slate-800 transition-all cursor-pointer"
              >
                Portal do Cliente
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
