import React from 'react';
import { Lock, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';
import { PanelHeader } from '../components/HUD/PanelHeader';

export const Contact: React.FC = () => {
  return (
    <section className="panel bg-slate-300 relative overflow-hidden flex flex-col items-center justify-center">
      <PanelHeader number="05" title="Confiança Industrial" />
      
      <div className="absolute inset-0 bg-pattern -z-10" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1.2px, transparent 1.2px)', backgroundSize: '30px 30px', opacity: 0.2 }}></div>

      <div className="flex-1 flex flex-col items-center justify-between px-6 relative z-10 w-full mb-8 lg:mb-12">
        <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center flex-1 mt-6 lg:mt-0">
          <div>
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-sky-100/70 border border-sky-200/80 rounded-lg mb-8">
              <Lock className="text-ra-blue" size={20} />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-ra-blue">Sigilo Total (NDA)</span>
            </div>
            
            <h2 className="font-display text-4xl lg:text-6xl font-black uppercase tracking-tighter mb-6 lg:mb-8 text-slate-900">
              Seu projeto <br /> em <span className="text-ra-blue">Segurança</span>.
            </h2>
            
            <p className="text-slate-500 text-base lg:text-lg leading-relaxed mb-8 lg:mb-12">
              Entendemos que a inovação é o seu maior ativo. Por isso, o sigilo industrial e a proteção da propriedade intelectual são os pilares da RA Polymers.
            </p>

            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-4 bg-ra-blue text-white font-bold uppercase tracking-widest text-xs rounded hover:bg-slate-800 transition-colors flex items-center gap-3 group">
                Solicitar Cotação
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 border border-slate-300 text-slate-600 font-bold uppercase tracking-widest text-xs rounded hover:bg-slate-300 hover:border-slate-400 transition-colors">
                Portal do Cliente
              </button>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-lg p-8 lg:p-12 rounded-3xl border border-slate-200 shadow-2xl relative overflow-hidden group w-full max-w-lg mx-auto lg:max-w-none">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity hidden sm:block">
              <ShieldCheck size={120} className="text-slate-400" />
            </div>
            
            <div className="relative z-10">
              <h3 className="text-xl text-slate-900 font-bold mb-6 flex items-center gap-3">
                <MapPin className="text-ra-blue" />
                Localização
              </h3>
              <p className="text-slate-600 mb-8 leading-relaxed">
                Distrito Industrial <br />
                São José da Lapa / MG <br />
                Brasil
              </p>
              
              <div className="pt-8 border-t border-slate-200 space-y-4">
                <div className="flex justify-between text-[10px] tracking-widest text-slate-400 uppercase">
                  <span>Email</span>
                  <span className="text-slate-600 font-semibold">contato@rapolymers.com.br</span>
                </div>
                <div className="flex justify-between text-[10px] tracking-widest text-slate-400 uppercase">
                  <span>Telefone</span>
                  <span className="text-slate-600 font-semibold">+55 (31) 3623-XXXX</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer className="w-full flex flex-col md:flex-row justify-between items-center gap-6 text-[9px] uppercase tracking-[0.4em] text-slate-400 mt-16 lg:mt-24 border-t border-slate-300/50 pt-8 pb-4">
          <span className="text-center">© 2026 RA Polymers. All rights reserved.</span>
          <div className="flex gap-6 lg:gap-8 flex-wrap justify-center">
            <a href="#" className="hover:text-ra-blue transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-ra-blue transition-colors">Terms of Service</a>
          </div>
        </footer>
      </div>
    </section>
  );
};
