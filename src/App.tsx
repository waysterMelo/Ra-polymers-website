/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from './utils/cn';

// Sections
import { Home } from './sections/Home';
import RaPolymersOverview from './sections/RaPolymersOverview';
import { Clients } from './sections/Clients';
import { MoldSection } from './sections/MoldSection';
import { Engineering } from './sections/Engineering';
import { Contact } from './sections/Contact';

// Components
import { NavArrows } from './components/Navigation/NavArrows';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const moldPanelRef = useRef<HTMLElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [moldProgress, setMoldProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Handle Resize & Mobile Detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Custom Cursor Logic
  useEffect(() => {
    if (isMobile) return;
    
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [isMobile]);

  // Cursor scale on hover buttons/links
  useEffect(() => {
    if (isMobile) return;

    const handleEnter = () => {
      if (cursorRef.current) {
        gsap.to(cursorRef.current, { scale: 2.5, borderColor: '#0f172a', duration: 0.3 });
      }
    };
    const handleLeave = () => {
      if (cursorRef.current) {
        gsap.to(cursorRef.current, { scale: 1, borderColor: 'var(--color-ra-blue)', duration: 0.3 });
      }
    };

    const interactives = document.querySelectorAll('a, button');
    interactives.forEach(el => {
      el.addEventListener('mouseenter', handleEnter);
      el.addEventListener('mouseleave', handleLeave);
    });

    return () => {
      interactives.forEach(el => {
        el.removeEventListener('mouseenter', handleEnter);
        el.removeEventListener('mouseleave', handleLeave);
      });
    };
  }, [isMobile]);

  // GSAP Scroll Animation
  useEffect(() => {
    if (isMobile || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray('.panel');
      
      const scrollTween = gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 0.5, // Smoother response
          snap: {
            snapTo: 1 / (sections.length - 1),
            duration: { min: 0.2, max: 0.6 },
            delay: 0.05,
            ease: "power2.inOut"
          },
          anticipatePin: 1,
          end: () => `+=${containerRef.current?.scrollWidth || window.innerWidth * 5}`,
          onUpdate: (self) => {
            setScrollProgress(self.progress);
          }
        }
      });

      if (moldPanelRef.current) {
        ScrollTrigger.create({
          trigger: moldPanelRef.current,
          start: "left center",  // Inicia animação quando o lado esquerdo do painel chega ao centro
          end: "+=500",          // Scroll adicional para atuar em eventuais recálculos
          containerAnimation: scrollTween,
          onEnter: () => {
            // Animação inicia assim que entra (sem atraso) de forma orgânica e mais lenta
            gsap.to({ val: 0 }, {
              val: 1,
              duration: 5,  // 5 segundos para fechar bem devagar e aproveitar o momento
              ease: "power2.inOut",
              onUpdate: function() {
                setMoldProgress(this.targets()[0].val);
              }
            });
          },
          onLeaveBack: () => {
            // Voltou para seção anterior - reseta o molde
            gsap.to({ val: 1 }, {
              val: 0,
              duration: 2,
              ease: "power2.out",
              onUpdate: function() {
                setMoldProgress(this.targets()[0].val);
              }
            });
          }
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <div className="relative min-h-screen bg-slate-300">
      <div ref={cursorRef} className="custom-cursor" />

      <div className="fixed top-0 left-0 w-full h-1 z-50 bg-white/5">
        <div 
          className="h-full bg-ra-blue shadow-[0_0_10px_#0f4a8a]" 
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      <NavArrows 
        isMobile={isMobile} 
        scrollProgress={scrollProgress} 
        containerRef={containerRef} 
      />

      <main ref={containerRef} className={cn(isMobile ? "flex flex-col" : "horizontal-scroll-container")}>
        <Home />
        <RaPolymersOverview />
        <Clients />
        <MoldSection 
          moldPanelRef={moldPanelRef as React.RefObject<HTMLElement>} 
          moldProgress={moldProgress} 
          isMobile={isMobile} 
        />
        <Engineering />
        <Contact />
      </main>
    </div>
  );
}
