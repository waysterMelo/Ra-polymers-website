/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

// Sections
import { Home } from './sections/Home';
import RaPolymersOverview from './sections/RaPolymersOverview';
import { Clients } from './sections/Clients';
import { MoldSection } from './sections/MoldSection';
import { Engineering } from './sections/Engineering';
import { Contact } from './sections/Contact';

import { Navbar } from './components/Navigation/Navbar';

const SECTION_IDS = ['inicio', 'sobre', 'clientes', 'produtos', 'engenharia', 'contato'];

export default function App() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [moldProgress, setMoldProgress] = useState(0);

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

  // Track active section via IntersectionObserver
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTION_IDS.forEach((id, index) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(index);
          }
        },
        { threshold: 0.35 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach(o => o.disconnect());
  }, []);

  // Trigger mold animation when its section comes in view
  useEffect(() => {
    const moldEl = document.getElementById('produtos');
    if (!moldEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.to({ val: 0 }, {
            val: 1,
            duration: 5,
            ease: "power2.inOut",
            onUpdate: function () {
              setMoldProgress(this.targets()[0].val);
            }
          });
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(moldEl);
    return () => observer.disconnect();
  }, []);

  const onNavigate = (index: number) => {
    const sectionId = SECTION_IDS[index];
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const onExplore = () => onNavigate(1);

  return (
    <div className="relative min-h-screen bg-slate-300">
      <div ref={cursorRef} className="custom-cursor" />

      <Navbar onNavigate={onNavigate} activeSection={activeSection} />

      <main className="flex flex-col">
        <section id="inicio">
          <Home onExplore={onExplore} />
        </section>
        <section id="sobre">
          <RaPolymersOverview />
        </section>
        <section id="clientes">
          <Clients />
        </section>
        <section id="produtos">
          <MoldSection 
            moldProgress={moldProgress} 
            isMobile={isMobile} 
          />
        </section>
        <section id="engenharia">
          <Engineering />
        </section>
        <section id="contato">
          <Contact />
        </section>
      </main>
    </div>
  );
}
