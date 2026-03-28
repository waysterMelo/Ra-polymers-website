import React from 'react';
import { PanelHeader } from '../components/HUD/PanelHeader';

interface AboutProps {
  isMobile: boolean;
}

export const About: React.FC<AboutProps> = ({ isMobile }) => {
  return (
    <section className="panel bg-ra-dark overflow-hidden relative flex flex-col items-center justify-center p-6 lg:p-10">
      <PanelHeader number="01.5" title="Centro de Operações Industriais" />
      
      <div className="industrial-bg-grid absolute inset-0 z-0"></div>
      <div className="vignette-overlay absolute inset-0 z-0"></div>

      {/* Header Terminal Mockup */}
      <header className="absolute top-0 left-0 w-full p-8 px-10 hidden lg:flex items-center justify-between z-50 pointer-events-none">
        <div className="flex items-center gap-6">
          <span className="font-mono text-ra-blue font-bold text-sm tracking-tighter italic">RA_UNIT_01.5</span>
          <div className="h-4 w-[1px] bg-white/10"></div>
          <span className="font-mono text-[9px] font-bold uppercase tracking-[0.4em] text-white/30">Centro de Operações Industriais</span>
        </div>
        <div className="flex items-center gap-8 opacity-40">
          <span className="font-mono text-[8px] uppercase tracking-widest text-white/40 font-bold">Standard: ISO 9001</span>
        </div>
      </header>

      {/* Main Grid */}
      <main className="grid grid-cols-1 lg:grid-cols-12 gap-12 w-full max-w-[1600px] z-10 items-center h-[85vh] mt-10">
        
        {/* COLUNA ESQUERDA: NARRATIVA TÉCNICA */}
        <div className="lg:col-span-5 flex flex-col gap-8 h-full overflow-y-auto text-scroll-hud pr-8 pb-10 custom-scrollbar">
            
            {/* Card: Engenharia de Materiais 4.0 */}
            <div className="glass-panel-hud p-10 md:p-12">
                <span className="section-tag-hud mb-8">Engenharia de Materiais 4.0</span>
                <h2 className="text-4xl font-extrabold uppercase tracking-tight mb-8 leading-none text-white">
                    Nexus Industrial <br/><span className="text-ra-blue">Alta Performance</span>
                </h2>
                
                <div className="space-y-6 text-[14px] text-white/60 leading-relaxed font-light">
                    <p>
                        A RA Polymers opera no nexo entre a ciência de materiais avançados e a manufatura algorítmica. Desenvolvemos ecossistemas poliméricos de alto desempenho, desenhados para suportar pressões críticas em setores onde a falha não é uma opção: Aeroespacial, Med-Tech e Defesa.
                    </p>
                    <p>
                        Através de moldagem por injeção assistida por Inteligência Artificial e laboratórios de metrologia próprios, asseguramos que cada componente entregue responda a arquiteturas moleculares proprietárias e patentes de precisão absoluta.
                    </p>
                    <p>
                        Mais do que fornecedores, somos a espinha dorsal da vossa eficiência. Colaboramos diretamente com unidades de P&D globais para otimizar o custo operacional (TCO) e garantir a sustentabilidade através da longevidade extrema de cada componente produzido.
                    </p>
                </div>

                <div className="mt-10 pt-8 border-t border-white/10 flex flex-wrap gap-10">
                    <div className="flex flex-col gap-1">
                        <span className="text-xs font-bold text-white tracking-widest font-mono">ISO 9001:2015</span>
                        <span className="text-[9px] text-white/30 uppercase tracking-[0.2em] mt-1">Gestão de Qualidade</span>
                    </div>
                    <div className="w-[1px] h-10 bg-white/10"></div>
                    <div className="flex flex-col gap-1">
                        <span className="text-xs font-bold text-white tracking-widest font-mono">IND_4.0</span>
                        <span className="text-[9px] text-white/30 uppercase tracking-[0.2em] mt-1">Fábrica Inteligente</span>
                    </div>
                </div>
            </div>

            {/* Card: Trajetória Científica */}
            <div className="glass-panel-hud p-10 md:p-12">
                <span className="section-tag-hud mb-6">Trajetória Científica</span>
                <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-wide">Da Prototipagem à Escala Global</h3>
                <p className="text-[14px] text-white/40 leading-relaxed font-light">
                    Nascida sob o rigor do método científico, a RA Polymers evoluiu de uma manufatura de nicho para um centro de operações industriais de alta escala. O nosso percurso é marcado pela transição do fornecimento reativo para a engenharia preditiva, consolidando parcerias estratégicas baseadas em segurança, inovação e excelência técnica inegociável.
                </p>
            </div>
            
        </div>

        {/* COLUNA DIREITA: SISTEMA DE SCANNER INDUSTRIAL */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center relative h-full">
            <div className="relative flex items-center justify-center w-full h-[400px] md:h-[600px]">
                
                <div className="scan-area-hud">
                    {/* Cantos do Scanner */}
                    <div className="frame-corner-hud f-tl-hud"></div>
                    <div className="frame-corner-hud f-tr-hud"></div>
                    <div className="frame-corner-hud f-bl-hud"></div>
                    <div className="frame-corner-hud f-br-hud"></div>

                    {/* Linha do Scanner */}
                    <div className="scanner-line-hud"></div>
                    <div className="scanner-glow-hud"></div>

                    {/* Rótulos de Metrologia Estáticos */}
                    <div className="absolute top-4 left-6 font-mono text-[8px] text-ra-blue/60 uppercase tracking-widest">
                        Surface Scan Active
                    </div>
                    <div className="absolute bottom-4 right-6 font-mono text-[8px] text-ra-blue/60 uppercase tracking-widest">
                        Tolerance: ±0.001mm
                    </div>

                    {/* Logótipo RA POLYMERS */}
                    <div className="logo-core-hud flex-col md:flex-row text-center md:text-left">
                        <div className="flex items-end gap-2 mb-4 md:mb-0">
                            <div className="circle-sm-hud"></div>
                            <div className="circle-lg-hud"></div>
                        </div>
                        <div className="hidden md:block h-16 w-[1px] bg-white/10 mx-8"></div>
                        <div className="flex flex-col">
                            <div className="flex items-center gap-4">
                                <span className="text-4xl md:text-6xl font-black text-white tracking-tighter">RA</span>
                                <span className="text-xl md:text-3xl font-light tracking-[0.3em] text-white/60">POLYMERS</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Detalhe Inferior */}
                <div className="absolute bottom-10 flex items-center gap-3 opacity-20">
                    <div className="w-1.5 h-1.5 bg-ra-blue rounded-full animate-pulse"></div>
                    <span className="font-mono text-[8px] uppercase tracking-[0.5em] text-white">Análise de Conformidade em Curso</span>
                </div>

            </div>
        </div>

      </main>

      {/* Rodapé Terminal */}
      <footer className="absolute bottom-0 left-0 w-full p-8 px-10 hidden md:flex justify-between items-center pointer-events-none opacity-40 z-50">
          <span className="text-[8px] font-bold tracking-[0.8em] uppercase text-white/30 italic">RA POLYMERS &bull; Unidade Estratégica</span>
          <div className="flex gap-10">
              <span className="text-[8px] font-bold uppercase text-white/40 tracking-wider">ISO Certificada</span>
              <span className="text-[8px] font-bold uppercase text-white/40 tracking-wider">&copy; 2024 Industrial Unit</span>
          </div>
      </footer>
    </section>
  );
};
