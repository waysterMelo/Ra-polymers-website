import React from 'react';
import { 
  Factory, 
  Settings, 
  Briefcase, 
  Cpu,
  BarChart3,
  Dna,
  Activity,
  Zap,
  Microscope,
  Search,
} from 'lucide-react';

const RaPolymersOverview: React.FC = () => {
  return (
    <section className="panel relative bg-[#F0F4F8] text-slate-800 overflow-y-auto">
      <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
        
        {/* Header de Seção */}
        <div className="max-w-7xl mx-auto px-6 pt-16 pb-12 lg:pt-24 lg:pb-16">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-end">
            <div className="space-y-4 lg:space-y-6">
              <div className="flex items-center gap-3 text-[10px] font-bold tracking-[0.3em] text-blue-600 uppercase">
                <div className="w-10 h-[2px] bg-blue-600"></div> Portfólio de Soluções
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-[#003B73] tracking-tighter uppercase leading-[0.9]">Atendimento Especializado</h2>
            </div>
            <div className="border-l-4 border-blue-100 pl-8 pb-2">
              <p className="text-slate-500 text-lg font-medium leading-relaxed">
                A tecnologia e a marca <span className="text-[#003B73] font-black italic">RA-POLYMERS</span> garantem a qualidade dos nossos produtos. Buscamos atender às necessidades específicas de cada segmento com excelência técnica.
              </p>
            </div>
          </div>
        </div>

        {/* Bento Grid: Segmentos */}
        <div className="max-w-7xl mx-auto px-6 pb-16 lg:pb-32">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Destaque Principal */}
            <div className="md:col-span-2 md:row-span-2 bg-[#003B73] rounded-[2rem] lg:rounded-[3rem] p-8 lg:p-12 text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
                <Settings size={150} />
              </div>
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="bg-white/10 backdrop-blur w-16 h-16 rounded-2xl flex items-center justify-center mb-8 border border-white/20">
                  <Factory size={32} />
                </div>
                <div>
                  <h3 className="text-3xl font-black uppercase tracking-tight mb-4">Diversidade Industrial</h3>
                  <p className="text-blue-100 leading-relaxed text-sm">
                    Desenvolvemos produtos que atendem às exigências e necessidades mais variadas, com foco em alta performance técnica e durabilidade extrema.
                  </p>
                  <div className="flex gap-2 mt-8 flex-wrap">
                    {["Mineração", "Ferrovia", "Automotivo", "Eletro", "Construção"].map(tag => (
                      <span key={tag} className="px-4 py-1.5 bg-white/10 rounded-full text-[9px] font-bold uppercase tracking-widest">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Card: Metal Mecânico */}
            <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/50 hover:-translate-y-2 transition-all">
              <div className="text-blue-600 mb-6"><Settings size={32} /></div>
              <h4 className="font-black text-[#003B73] uppercase tracking-tight mb-2">Metal Mecânico</h4>
              <p className="text-slate-500 text-xs leading-relaxed italic">Componentes de alta resistência para aplicações pesadas.</p>
            </div>

            {/* Card: Eletro-Eletrônico */}
            <div className="bg-blue-50 rounded-[2rem] p-8 border border-blue-100 hover:shadow-xl transition-all">
              <div className="text-blue-600 mb-6"><Cpu size={32} /></div>
              <h4 className="font-black text-[#003B73] uppercase tracking-tight mb-2">Eletro Eletrônico</h4>
              <p className="text-slate-500 text-xs leading-relaxed italic">Polímeros isolantes e de precisão nanométrica.</p>
            </div>

            {/* Card Grande: Terceirização */}
            <div className="md:col-span-2 bg-white rounded-[2rem] lg:rounded-[3rem] p-8 lg:p-10 border border-slate-200 shadow-2xl relative overflow-hidden">
              <div className="absolute -right-20 -bottom-20 text-slate-50 opacity-[0.03]"><BarChart3 size={200} /></div>
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 relative z-10">
                <div className="lg:w-1/3">
                  <div className="bg-blue-600 text-white w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
                    <Briefcase size={28} />
                  </div>
                  <h3 className="text-2xl font-black text-[#003B73] uppercase tracking-tighter leading-none mb-4">Produtividade<br/>As-A-Service</h3>
                </div>
                <div className="lg:w-2/3 space-y-4">
                  <p className="text-slate-500 text-sm leading-relaxed">
                    Para tornar seus clientes mais competitivos, a RA-POLYMERS disponibiliza serviços associados aos seus produtos de forma a melhor atendê-los. A empresa disponibiliza também, serviços de **terceirização de produção**.
                  </p>
                  <div className="bg-slate-50 p-6 rounded-2xl border-l-4 border-blue-600">
                    <p className="text-xs font-bold text-[#003B73] uppercase leading-relaxed tracking-wide">
                      "Com a terceirização de injeção, os clientes poderão reduzir seus custos e aumentar a sua qualidade e produtividade."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Seção: Laboratório & Testes */}
        <div className="bg-[#001D3D] py-16 md:py-24 lg:py-32 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
            <div className="h-full w-full bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:40px_40px]"></div>
          </div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
              
              {/* Lado Esquerdo: Inovação */}
              <div className="flex-1 space-y-6 lg:space-y-8">
                <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-400/20 px-4 py-2 rounded-full text-blue-400 text-[9px] font-bold uppercase tracking-widest">
                  <Zap size={14} /> Inovação Sistêmica
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter uppercase leading-[0.9]">Teste de <br/><span className="text-blue-500 italic underline decoration-blue-500 underline-offset-8 decoration-4">Qualidade</span></h2>
                <p className="text-blue-100/60 text-lg font-light leading-relaxed">
                  Para a RA-POLYMERS, a inovação e o desenvolvimento tecnológico são as bases de todas as atividades. Contamos com grandes pesquisadores totalmente dedicados à inovação e recursos tecnológicos que nos permitem antecipar cenários e aprimorar nossos produtos e processos.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white/5 backdrop-blur-md p-6 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors">
                    <Dna size={24} className="text-blue-400 mb-4" />
                    <h5 className="text-white font-bold uppercase text-xs tracking-tight mb-2">Simulações de Desempenho</h5>
                    <p className="text-blue-100/40 text-[10px] uppercase font-medium">Salas credenciadas para avaliação em tempo real.</p>
                  </div>
                  <div className="bg-white/5 backdrop-blur-md p-6 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors">
                    <Activity size={24} className="text-blue-400 mb-4" />
                    <h5 className="text-white font-bold uppercase text-xs tracking-tight mb-2">Ensaios Mecânicos</h5>
                    <p className="text-blue-100/40 text-[10px] uppercase font-medium">Impacto, elasticidade e resistência extrema.</p>
                  </div>
                </div>
              </div>

              {/* Lado Direito: O Rigor do 100% */}
              <div className="flex-1">
                <div className="bg-gradient-to-br from-blue-600/20 to-blue-900/40 backdrop-blur-3xl p-8 lg:p-12 rounded-[2rem] lg:rounded-[4rem] border border-white/10 shadow-2xl space-y-8 lg:space-y-10 relative group">
                  <div className="absolute top-0 right-0 -m-10 w-40 h-40 bg-blue-500 blur-[100px] opacity-20 hidden md:block"></div>
                  
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-600 text-white p-4 rounded-2xl shadow-xl shadow-blue-500/20">
                      <Microscope size={32} />
                    </div>
                    <div className="h-[2px] flex-1 bg-gradient-to-r from-blue-600 to-transparent"></div>
                  </div>

                  <h3 className="text-3xl font-black text-white uppercase tracking-tighter leading-none">
                    Eliminamos a <br/><span className="text-blue-400">Amostragem.</span>
                  </h3>

                  <p className="text-blue-100/80 text-sm leading-relaxed">
                    A busca pela satisfação das necessidades dos nossos clientes faz com que a RA-POLYMERS realize o **controle de qualidade em 100% dos produtos** produzidos pela empresa, eliminando o processo por amostragem, que as vezes é insuficiente.
                  </p>

                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full border-2 border-blue-500 flex items-center justify-center text-blue-400 font-black text-xs italic">100%</div>
                      <span className="text-[10px] font-bold text-blue-200 uppercase tracking-[0.2em]">Inspeção Integrada à Produção</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full border-2 border-slate-700 flex items-center justify-center text-slate-400">
                         <Search size={18} />
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Acompanhamento Constante de Resultados</span>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/5">
                    <p className="text-[9px] font-bold text-blue-500 uppercase tracking-[0.3em] italic">
                      "Precisão nanométrica integrada à linha de produção automatizada."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RaPolymersOverview;