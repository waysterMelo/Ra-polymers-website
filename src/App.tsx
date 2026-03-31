/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { cn } from './utils/cn';

// Sections
import { Home } from './sections/Home';
import RaPolymersOverview from './sections/RaPolymersOverview';
import { Clients } from './sections/Clients';
import { MoldSection } from './sections/MoldSection';
import { Engineering } from './sections/Engineering';
import { Contact } from './sections/Contact';

import { Navbar } from './components/Navigation/Navbar';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const homePanelRef = useRef<HTMLElement>(null);
  const moldPanelRef = useRef<HTMLElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState(0);
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
          scrub: 0.5,
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
            const sectionIndex = Math.round(self.progress * (sections.length - 1));
            setActiveSection(sectionIndex);
          }
        }
      });

      // Transição cinematográfica da Home → segunda seção
      if (homePanelRef.current) {
        const homeContent = homePanelRef.current.querySelector('.home-content');
        if (homeContent) {
          gsap.to(homeContent, {
            opacity: 0,
            scale: 0.92,
            filter: 'blur(8px)',
            ease: 'none',
            scrollTrigger: {
              trigger: homePanelRef.current,
              start: 'left left',
              end: 'right left',
              containerAnimation: scrollTween,
              scrub: true,
            }
          });
        }
      }

      // Mold Section Animation
      if (moldPanelRef.current) {
        ScrollTrigger.create({
          trigger: moldPanelRef.current,
          start: "left center",
          end: "+=500",
          containerAnimation: scrollTween,
          onEnter: () => {
            gsap.to({ val: 0 }, {
              val: 1,
              duration: 5,
              ease: "power2.inOut",
              onUpdate: function() {
                setMoldProgress(this.targets()[0].val);
              }
            });
          },
          onLeaveBack: () => {
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

  const onNavigate = (index: number) => {
    const sections = gsap.utils.toArray('.panel');
    if (isMobile) {
      const target = sections[index] as HTMLElement;
      target?.scrollIntoView({ behavior: 'smooth' });
    } else {
      const totalScroll = containerRef.current?.scrollWidth || window.innerWidth * sections.length;
      const scrollPos = (index / (sections.length - 1)) * (totalScroll - window.innerWidth);
      
      gsap.to(window, {
        scrollTo: { y: scrollPos },
        duration: 1.2,
        ease: "power3.inOut"
      });
    }
  };

  const onExplore = () => onNavigate(1);

  return (
    <div className="relative min-h-screen bg-slate-300">
      <div ref={cursorRef} className="custom-cursor" />

      <Navbar onNavigate={onNavigate} activeSection={activeSection} />

      <div className="fixed top-0 left-0 w-full h-1 z-[110] bg-[#003B73]/10">
        <div 
          className="h-full bg-[#003B73] shadow-[0_0_10px_#003B73]" 
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      <main ref={containerRef} className={cn(isMobile ? "flex flex-col pt-20" : "horizontal-scroll-container")}>
        <Home ref={homePanelRef} onExplore={onExplore} />
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
