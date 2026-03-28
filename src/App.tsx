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
import { About } from './sections/About';
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
          scrub: 0.1, // Much more immediate response
          snap: {
            snapTo: 1 / (sections.length - 1),
            duration: { min: 0.1, max: 0.3 },
            delay: 0,
            ease: "power1.inOut"
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
          start: "left 30%", // Start earlier
          end: "right 70%",
          containerAnimation: scrollTween,
          onEnter: () => {
            gsap.to({ val: 0 }, {
              val: 1,
              duration: 3.5, // Even slower for dramatic appreciation
              ease: "power2.inOut",
              onUpdate: function() {
                setMoldProgress(this.targets()[0].val);
              }
            });
          },
          onLeave: () => {
            gsap.to({ val: 1 }, {
              val: 0,
              duration: 2,
              ease: "power2.out",
              onUpdate: function() {
                setMoldProgress(this.targets()[0].val);
              }
            });
          },
          onEnterBack: () => {
            gsap.to({ val: 0 }, {
              val: 1,
              duration: 3.5,
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

  return (
    <div className="relative min-h-screen bg-ra-dark">
      <div ref={cursorRef} className="custom-cursor" />

      <div className="fixed top-0 left-0 w-full h-1 z-50 bg-white/5">
        <div 
          className="h-full bg-ra-blue shadow-[0_0_10px_#0066ff]" 
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
        <About isMobile={isMobile} />
        <Clients />
        <MoldSection 
          moldPanelRef={moldPanelRef} 
          moldProgress={moldProgress} 
          isMobile={isMobile} 
        />
        <Engineering />
        <Contact />
      </main>
    </div>
  );
}
