import React from 'react';
import { Lock, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';
import { PanelHeader } from '../components/HUD/PanelHeader';

export const Contact: React.FC = () => {
  return (
    <section className="panel bg-[radial-gradient(circle_at_bottom_right,_var(--color-ra-grey)_0%,_transparent_50%)]">
      <PanelHeader number="05" title="Confiança Industrial" />
      
      <div className="h-full flex flex-col items-center justify-center px-6">
        <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-ra-blue/10 border border-ra-blue/20 rounded-lg mb-8">
              <Lock className="text-ra-blue" size={20} />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-ra-blue">Sigilo Total (NDA)</span>
            </div>
            
            <h2 className="font-display text-4xl md:text-7xl font-black uppercase tracking-tighter mb-8 text-white">
              Seu projeto <br /> em <span className="text-ra-blue">Segurança</span>.
            </h2>
            
            <p className="text-white/50 text-lg leading-relaxed mb-12">
              Entendemos que a inovação é o seu maior ativo. Por isso, o sigilo industrial e a proteção da propriedade intelectual são os pilares da RA Polymers.
            </p>

            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-4 bg-ra-blue text-ra-dark font-bold uppercase tracking-widest text-xs rounded hover:bg-white transition-colors flex items-center gap-3 group">
                Solicitar Cotação
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 border border-white/20 text-white font-bold uppercase tracking-widest text-xs rounded hover:bg-white/10 transition-colors">
                Portal do Cliente
              </button>
            </div>
          </div>

          <div className="glass-panel p-12 rounded-3xl border-white/10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <ShieldCheck size={120} />
            </div>
            
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                <MapPin className="text-ra-blue" />
                Localização
              </h3>
              <p className="text-white/60 mb-8 leading-relaxed">
                Distrito Industrial <br />
                São José da Lapa / MG <br />
                Brasil
              </p>
              
              <div className="pt-8 border-t border-white/10 space-y-4">
                <div className="flex justify-between text-[10px] tracking-widest text-white/30 uppercase">
                  <span>Email</span>
                  <span className="text-white/70">contato@rapolymers.com.br</span>
                </div>
                <div className="flex justify-between text-[10px] tracking-widest text-white/30 uppercase">
                  <span>Telefone</span>
                  <span className="text-white/70">+55 (31) 3623-XXXX</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer className="absolute bottom-8 left-0 w-full px-12 flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] uppercase tracking-[0.4em] text-white/20">
          <span>© 2026 RA Polymers Tech. All rights reserved.</span>
          <div className="flex gap-8">
            <a href="#" className="hover:text-ra-blue transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-ra-blue transition-colors">Terms of Service</a>
          </div>
        </footer>
      </div>
    </section>
  );
};
