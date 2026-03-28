/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState, Suspense, useMemo, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Float, MeshDistortMaterial, Text, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ShieldCheck,
  Cpu,
  Settings,
  ChevronRight,
  MapPin,
  Activity,
  Layers,
  Lock,
  ArrowRight,
  Maximize2
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import logoVale from './logo-vale.jpg';
import logoAlcoa from './logo-alcoa.jpg';
import logoRumo from './logo-rumo.png';
import logoMrs from './logo-mrs.jpg';
import logoMrn from './logo-mrn.jpg';
import bgHome from './home.webp';
import logoRAPolymers from './rapolymers.png';

gsap.registerPlugin(ScrollTrigger);

// Utility for tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- 3D Components ---

const createEDMTexture = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 256; // Reduced from 512 for better performance
  canvas.height = 256;
  const context = canvas.getContext('2d');
  if (context) {
    const imageData = context.createImageData(256, 256);
    for (let i = 0; i < imageData.data.length; i += 4) {
      const val = Math.random() * 255;
      imageData.data[i] = val;
      imageData.data[i + 1] = val;
      imageData.data[i + 2] = val;
      imageData.data[i + 3] = 255;
    }
    context.putImageData(imageData, 0, 0);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(8, 8);
  return texture;
};

interface IndustrialMoldProps {
  progress: number;
  isVisible: boolean;
}

const IndustrialMold = ({ progress, isVisible }: IndustrialMoldProps) => {
  const leftHalf = useRef<THREE.Group>(null);
  const rightHalf = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.PointLight>(null);
  const logoRef = useRef<THREE.Group>(null);

  const easeInOutExpo = (x: number): number => {
    return x === 0
      ? 0
      : x === 1
      ? 1
      : x < 0.5
      ? Math.pow(2, 20 * x - 10) / 2
      : (2 - Math.pow(2, -20 * x + 10)) / 2;
  };

  useFrame((state) => {
    if (!isVisible) return;

    const easedProgress = easeInOutExpo(progress);

    if (leftHalf.current && rightHalf.current) {
      const offset = (1 - easedProgress) * 5;
      leftHalf.current.position.x = -offset;
      rightHalf.current.position.x = offset;

      if (glowRef.current) {
        const pulse = Math.sin(state.clock.elapsedTime * 15) * 0.2 + 0.8;
        glowRef.current.intensity = progress > 0.8 ? (progress - 0.8) * 100 * pulse : 0;
      }

      if (logoRef.current) {
        logoRef.current.scale.setScalar(progress > 0.9 ? (progress - 0.9) * 10 : 0);
        logoRef.current.position.z = 1.2;
      }
    }
  });

  const edmTexture = useMemo(() => createEDMTexture(), []);

  const baseMaterial = <meshPhysicalMaterial color="#94a3b8" metalness={0.85} roughness={0.3} clearcoat={0.1} />;
  const blockMaterial = <meshPhysicalMaterial color="#cbd5e1" metalness={0.95} roughness={0.2} clearcoat={0.3} />;
  const pinMaterial = <meshPhysicalMaterial color="#f8fafc" metalness={1.0} roughness={0.05} clearcoat={0.8} />;
  const darkMetalMaterial = <meshPhysicalMaterial color="#334155" metalness={0.9} roughness={0.5} />;

  const cavityMaterial = (
    <meshPhysicalMaterial
      color="#0f172a"
      metalness={0.9}
      roughness={0.3}
      roughnessMap={edmTexture}
      bumpMap={edmTexture}
      bumpScale={0.002}
      clearcoat={0.8}
      clearcoatRoughness={0.2}
      envMapIntensity={2.5}
    />
  );

  const ejectorPlateMaterial = <meshPhysicalMaterial color="#64748b" metalness={0.7} roughness={0.4} />;

  return (
    <group>
      <group ref={leftHalf} position={[-5, 0, 0]}>
        <mesh position={[-0.5, 0, 0]} castShadow>
          <boxGeometry args={[1, 7.5, 5.5]} />
          {baseMaterial}
        </mesh>
        {[[-3.2, 2.2], [-3.2, -2.2], [3.2, 2.2], [3.2, -2.2]].map(([y, z], i) => (
          <mesh key={`bolt-l-${i}`} position={[-1.01, y, z]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.2, 0.2, 0.1, 16]} />
            {darkMetalMaterial}
          </mesh>
        ))}

        <mesh castShadow>
          <boxGeometry args={[4, 6, 4]} />
          {blockMaterial}
        </mesh>

        {[[-1.8, 0], [1.8, 0]].map(([y, z], i) => (
          <mesh key={`groove-l-${i}`} position={[2, y, z]} rotation={[Math.PI / 2, 0, 0]}>
            <boxGeometry args={[0.1, 4.05, 0.1]} />
            {darkMetalMaterial}
          </mesh>
        ))}

        <mesh position={[-0.8, 0, 0]} castShadow>
          <boxGeometry args={[0.4, 6.5, 4.5]} />
          {ejectorPlateMaterial}
        </mesh>
        <mesh position={[-1.2, 0, 0]} castShadow>
          <boxGeometry args={[0.4, 6.5, 4.5]} />
          {ejectorPlateMaterial}
        </mesh>
        {[[-2.5, 1.5], [-2.5, -1.5], [2.5, 1.5], [2.5, -1.5]].map(([y, z], i) => (
          <mesh key={`return-pin-${i}`} position={[-1, y, z]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.1, 0.1, 0.8, 16]} />
            {pinMaterial}
          </mesh>
        ))}

        {[[-2.8, 1.5], [-2.8, -1.5], [2.8, 1.5], [2.8, -1.5]].map(([y, z], i) => (
          <mesh key={`cool-l-${i}`} position={[0, y, z]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.12, 0.12, 4.05, 16]} />
            {darkMetalMaterial}
          </mesh>
        ))}

        {[[-2.2, 1.4], [-2.2, -1.4], [2.2, 1.4], [2.2, -1.4]].map(([y, z], i) => (
          <mesh key={`guide-${i}`} position={[2, y, z]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.2, 0.2, 1.5, 32]} />
            {pinMaterial}
          </mesh>
        ))}

        {[[-2, 2], [2, 2], [-2, -2], [2, -2]].map(([y, z], i) => (
          <mesh key={`interlock-m-${i}`} position={[2.1, y, z]}>
            <boxGeometry args={[0.2, 0.6, 0.6]} />
            {darkMetalMaterial}
          </mesh>
        ))}

        {[[-0.9, 0.9], [-0.9, -0.9], [0.9, 0.9], [0.9, -0.9], [0, 1.2], [0, -1.2], [1.2, 0], [-1.2, 0]].map(([y, z], i) => (
          <mesh key={`ejector-${i}`} position={[1.5, y, z]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.06, 0.06, 5, 16]} />
            {pinMaterial}
          </mesh>
        ))}
      </group>

      <group ref={rightHalf} position={[5, 0, 0]}>
        <mesh position={[0.5, 0, 0]} castShadow>
          <boxGeometry args={[1, 7.5, 5.5]} />
          {baseMaterial}
        </mesh>
        {[[-3.2, 2.2], [-3.2, -2.2], [3.2, 2.2], [3.2, -2.2]].map(([y, z], i) => (
          <mesh key={`bolt-r-${i}`} position={[1.01, y, z]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.2, 0.2, 0.1, 16]} />
            {darkMetalMaterial}
          </mesh>
        ))}

        <mesh castShadow>
          <boxGeometry args={[4, 6, 4]} />
          {blockMaterial}
        </mesh>

        {[[-1.8, 0], [1.8, 0]].map(([y, z], i) => (
          <mesh key={`groove-r-${i}`} position={[-2, y, z]} rotation={[Math.PI / 2, 0, 0]}>
            <boxGeometry args={[0.1, 4.05, 0.1]} />
            {darkMetalMaterial}
          </mesh>
        ))}

        {[[-2.8, 1.5], [-2.8, -1.5], [2.8, 1.5], [2.8, -1.5]].map(([y, z], i) => (
          <mesh key={`cool-r-${i}`} position={[0, y, z]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.12, 0.12, 4.05, 16]} />
            {darkMetalMaterial}
          </mesh>
        ))}

        {[[-2.2, 1.4], [-2.2, -1.4], [2.2, 1.4], [2.2, -1.4]].map(([y, z], i) => (
          <group key={`bushing-${i}`} position={[-2, y, z]} rotation={[0, 0, Math.PI / 2]}>
            <mesh>
              <cylinderGeometry args={[0.35, 0.35, 0.05, 32]} />
              {darkMetalMaterial}
            </mesh>
            <mesh position={[0, 0.01, 0]}>
              <cylinderGeometry args={[0.22, 0.22, 0.06, 32]} />
              {cavityMaterial}
            </mesh>
          </group>
        ))}

        {[[-2, 2], [2, 2], [-2, -2], [2, -2]].map(([y, z], i) => (
          <mesh key={`interlock-f-${i}`} position={[-2.05, y, z]}>
            <boxGeometry args={[0.1, 0.62, 0.62]} />
            {cavityMaterial}
          </mesh>
        ))}
      </group>

      <group ref={logoRef} scale={0}>
        <Text
          fontSize={1.2}
          color="#0066ff"
          font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYMZhrib2Bg-4.ttf"
          anchorX="center"
          anchorY="middle"
        >
          RA
        </Text>
        <mesh position={[0, 0, -0.1]}>
          <planeGeometry args={[2, 2]} />
          <meshBasicMaterial color="#0066ff" transparent opacity={0.1} />
        </mesh>
      </group>

      <pointLight ref={glowRef} position={[0, 0, 1.5]} color="#0066ff" intensity={0} distance={10} />

      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh position={[0, 0, -2]} scale={1.5}>
          <sphereGeometry args={[1, 32, 32]} />
          <MeshDistortMaterial
            color="#0066ff"
            speed={2}
            distort={0.3}
            radius={1}
            opacity={0.1}
            transparent
          />
        </mesh>
      </Float>
    </group>
  );
};

// --- UI Components ---

const PanelHeader = ({ number, title }: { number: string, title: string }) => (
  <div className="absolute top-12 left-12 z-10 flex items-center gap-4">
    <span className="font-mono text-ra-blue text-sm tracking-widest opacity-50">{number}</span>
    <div className="h-[1px] w-12 bg-ra-blue opacity-30"></div>
    <h2 className="text-xs uppercase tracking-[0.3em] font-semibold text-white/70">{title}</h2>
  </div>
);

const TechBadge = ({ children, icon: Icon }: { children: React.ReactNode, icon?: any }) => (
  <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] uppercase tracking-wider text-ra-cyan/90 font-mono">
    {Icon && <Icon size={12} />}
    {children}
  </div>
);

// Skeleton Loader Component
const CanvasSkeleton = () => (
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="relative w-64 h-64">
      <div className="absolute inset-0 skeleton rounded-full opacity-50"></div>
      <div className="absolute inset-4 skeleton rounded-full opacity-40"></div>
      <div className="absolute inset-8 skeleton rounded-full opacity-30"></div>
    </div>
  </div>
);

// --- Main App ---

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const moldPanelRef = useRef<HTMLElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [moldProgress, setMoldProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isCanvasLoaded, setIsCanvasLoaded] = useState(false);
  const [isMoldPanelVisible, setIsMoldPanelVisible] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const scrollTweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Keyboard navigation with arrow keys
  useEffect(() => {
    if (isMobile) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isTransitioning) return;
      
      const totalSections = 6;
      
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        if (currentSection < totalSections - 1) {
          setIsTransitioning(true);
          goToSection(currentSection + 1);
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        if (currentSection > 0) {
          setIsTransitioning(true);
          goToSection(currentSection - 1);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobile, currentSection, isTransitioning]);

  const goToSection = useCallback((sectionIndex: number) => {
    if (!containerRef.current || !scrollTweenRef.current) return;
    
    const totalSections = 6;
    const progress = sectionIndex / (totalSections - 1);
    
    gsap.to(scrollTweenRef.current, {
      progress: progress,
      duration: 0.8,
      ease: 'power3.inOut',
      onComplete: () => {
        setCurrentSection(sectionIndex);
        setIsTransitioning(false);
      }
    });
  }, []);

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

  // Handle cursor active state on clickable elements
  useEffect(() => {
    if (isMobile || !cursorRef.current) return;

    const handleMouseDown = () => cursorRef.current?.classList.add('active');
    const handleMouseUp = () => cursorRef.current?.classList.remove('active');

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isMobile]);

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
          scrub: 1,
          snap: 1 / (sections.length - 1),
          end: () => `+=${containerRef.current?.scrollWidth || window.innerWidth * 5}`,
          onUpdate: (self) => {
            setScrollProgress(self.progress);
            // Check if mold panel (index 3) is visible
            const moldPanelStart = 3 / (sections.length - 1);
            const moldPanelEnd = 4 / (sections.length - 1);
            setIsMoldPanelVisible(self.progress >= moldPanelStart - 0.1 && self.progress <= moldPanelEnd + 0.1);
          }
        }
      });

      scrollTweenRef.current = scrollTween;

      if (moldPanelRef.current) {
        ScrollTrigger.create({
          trigger: moldPanelRef.current,
          start: "left 60%",
          end: "right 40%",
          containerAnimation: scrollTween,
          onEnter: () => {
            gsap.to({ val: 0 }, {
              val: 1,
              duration: 2.5,
              ease: "power3.inOut",
              onUpdate: function() {
                setMoldProgress(this.targets()[0].val);
              }
            });
          },
          onLeave: () => {
            gsap.to({ val: 1 }, {
              val: 0,
              duration: 1.5,
              ease: "power2.out",
              onUpdate: function() {
                setMoldProgress(this.targets()[0].val);
              }
            });
          },
          onEnterBack: () => {
            gsap.to({ val: 0 }, {
              val: 1,
              duration: 2.5,
              ease: "power3.inOut",
              onUpdate: function() {
                setMoldProgress(this.targets()[0].val);
              }
            });
          },
          onLeaveBack: () => {
            gsap.to({ val: 1 }, {
              val: 0,
              duration: 1.5,
              ease: "power2.out",
              onUpdate: function() {
                setMoldProgress(this.targets()[0].val);
              }
            });
          }
        });
      }
    }, containerRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [isMobile]);

  const handleCanvasLoad = useCallback(() => {
    setIsCanvasLoaded(true);
  }, []);

  // Memoized client list to prevent re-renders
  const clients = useMemo(() => [
    { name: "VALE", logo: logoVale, fallback: "https://upload.wikimedia.org/wikipedia/en/thumb/5/5e/Vale_logo.svg/1200px-Vale_logo.svg.png" },
    { name: "ALCOA", logo: logoAlcoa, fallback: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Alcoa_logo.svg/1200px-Alcoa_logo.svg.png" },
    { name: "RUMO", logo: logoRumo, fallback: "https://upload.wikimedia.org/wikipedia/pt/thumb/a/a4/Logo_Rumo_Log%C3%ADstica.png/250px-Logo_Rumo_Log%C3%ADstica.png" },
    { name: "MRS", logo: logoMrs, fallback: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/MRS_Logistica_logo.svg/1200px-MRS_Logistica_logo.svg.png" },
    { name: "MRN", logo: logoMrn, fallback: "https://www.mrn.com.br/static/media/logo-mrn.6b4b1b3b.png" }
  ], []);

  return (
    <div className="relative min-h-screen bg-ra-dark">
      <div ref={cursorRef} className="custom-cursor" />

      <div className="fixed top-0 left-0 w-full h-1 z-50 bg-white/5">
        <div
          className="h-full bg-gradient-to-r from-ra-blue to-ra-cyan shadow-[0_0_10px_#0066ff]"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      {!isMobile && (
        <div className="fixed left-12 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-8">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className={cn(
                "w-1 h-8 transition-all duration-500",
                currentSection === i ? "bg-gradient-to-b from-ra-blue to-ra-cyan h-12" : "bg-white/10"
              )}
            />
          ))}
        </div>
      )}

      {/* Keyboard navigation hint */}
      {!isMobile && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 text-white/30 text-[9px] uppercase tracking-widest pointer-events-none">
          <span className="px-2 py-1 border border-white/20 rounded">←</span>
          <span>Navigate</span>
          <span className="px-2 py-1 border border-white/20 rounded">→</span>
        </div>
      )}

      {/* Navigation Arrows (Desktop Only) */}
      {!isMobile && (
        <button
          onClick={() => currentSection < 5 && !isTransitioning && goToSection(currentSection + 1)}
          className={cn(
            "fixed right-4 top-1/2 -translate-y-1/2 z-40 p-4 rounded-full",
            "bg-white/5 border border-white/10 backdrop-blur-sm",
            "text-white/40 hover:text-ra-cyan hover:bg-white/10 hover:border-ra-cyan/30",
            "transition-all duration-300 active:scale-95",
            currentSection === 5 ? "opacity-30 cursor-not-allowed" : "opacity-100 cursor-pointer"
          )}
          disabled={currentSection === 5 || isTransitioning}
          aria-label="Next section"
        >
          <ChevronRight size={32} />
        </button>
      )}

      <main ref={containerRef} className={cn(isMobile ? "flex flex-col" : "horizontal-scroll-container")}>

        {/* PANEL 1: IDENTITY & AUTHORITY */}
        <section className="panel relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src={bgHome}
              alt="Polymers Background"
              className="w-full h-full object-cover opacity-30 mix-blend-overlay"
              referrerPolicy="no-referrer"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1920";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-ra-dark/80 via-ra-dark/40 to-ra-dark"></div>
          </div>

          <div className="h-full flex flex-col items-center justify-center px-6 text-center relative z-10">
            <div className="mb-8 animate-pulse">
              <div className="w-24 h-24 border-2 border-ra-blue rounded-lg flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-ra-blue/20 to-ra-cyan/20 transform -skew-x-12 translate-x-full group-hover:translate-x-[-100%] transition-transform duration-1000"></div>
                <span className="text-4xl font-black tracking-tighter text-white">RA</span>
              </div>
            </div>

            <h1 className="text-6xl md:text-9xl font-black tracking-tighter uppercase mb-4">
              Ra <span className="text-transparent bg-clip-text bg-gradient-to-r from-ra-blue to-ra-cyan">polymers</span>
            </h1>

            <p className="text-sm md:text-lg font-light tracking-[0.5em] text-white/60 uppercase max-w-2xl">
              Inovação em Polímeros e Ferramentaria Própria
            </p>
          </div>

          <div className="absolute bottom-12 right-12 flex items-center gap-4 text-white/20 animate-bounce">
            <span className="text-[10px] uppercase tracking-widest hidden md:inline">Scroll or Use Arrow Keys</span>
            <span className="text-[10px] uppercase tracking-widest md:hidden">Scroll to Explore</span>
            <div className="flex gap-1">
              <ChevronRight size={16} className="hidden md:block" />
              <ArrowRight size={16} className="md:hidden" />
            </div>
          </div>
        </section>

        {/* PANEL 2: ABOUT US */}
        <section className="panel relative bg-ra-dark overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-ra-dark via-ra-dark to-ra-grey/20"></div>
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-ra-blue/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-ra-cyan/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3"></div>
          </div>

          <PanelHeader number="02" title="Sobre a RA Polymers" />

          <div className="h-full flex flex-col justify-center px-12 md:px-24 relative z-10">
            <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mx-auto">

              <div className="space-y-10">
                <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-tight">
                  Precisão <br />
                  <span className="text-white/40">Forjada na</span> <br />
                  <span className="text-ra-blue">Experiência</span>
                </h2>

                <div className="w-16 h-1 bg-gradient-to-r from-ra-blue to-ra-cyan"></div>

                <p className="text-white/60 text-lg leading-relaxed max-w-xl font-light">
                  Há mais de duas décadas, a RA Polymers redefine os padrões da indústria de injeção plástica. Nossa jornada é marcada pela busca incessante pela perfeição, unindo tecnologia de ponta a um rigoroso controle de qualidade.
                </p>

                <p className="text-white/60 text-lg leading-relaxed max-w-xl font-light">
                  Não somos apenas fornecedores; somos parceiros estratégicos no desenvolvimento de soluções complexas, desde a concepção do molde até a entrega do produto final.
                </p>

                <div className="flex gap-16 pt-4">
                  <div>
                    <p className="text-5xl font-mono text-white font-bold">20+</p>
                    <p className="text-[10px] uppercase tracking-widest text-ra-cyan mt-2">Anos de Mercado</p>
                  </div>
                  <div>
                    <p className="text-5xl font-mono text-white font-bold">100%</p>
                    <p className="text-[10px] uppercase tracking-widest text-ra-cyan mt-2">Ferramentaria Própria</p>
                  </div>
                </div>
              </div>

              <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-ra-dark via-ra-dark/80 to-transparent z-10"></div>
                <div className="absolute inset-0 flex items-center justify-center bg-white/5">
                  <img
                    src={logoRAPolymers}
                    alt="RA Polymers Logo"
                    className="w-3/4 h-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                </div>

                <div className="absolute inset-4 border border-white/20 z-20 pointer-events-none transition-all duration-700 group-hover:inset-2">
                  <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-ra-blue -translate-x-[1px] -translate-y-[1px]"></div>
                  <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-ra-cyan translate-x-[1px] -translate-y-[1px]"></div>
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-ra-cyan -translate-x-[1px] translate-y-[1px]"></div>
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-ra-blue translate-x-[1px] translate-y-[1px]"></div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* PANEL 3: CLIENTS */}
        <section className="panel relative bg-ra-dark overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?auto=format&fit=crop&q=80&w=1920"
              alt="Industrial Factory"
              className="w-full h-full object-cover opacity-[0.07] mix-blend-luminosity"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-ra-dark via-ra-dark/80 to-ra-dark"></div>
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)]"></div>
          </div>

          <PanelHeader number="03" title="Nossos Clientes" />

          <div className="h-full flex flex-col items-center justify-center px-12 relative z-10">
            <div className="max-w-6xl w-full">
              <div className="text-center mb-20">
                <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4">
                  Parcerias de <span className="text-transparent bg-clip-text bg-gradient-to-r from-ra-blue to-ra-cyan">Valor</span>
                </h2>
                <p className="text-white/40 text-sm tracking-[0.2em] uppercase">Empresas que confiam na nossa precisão industrial</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center">
                {clients.map((client, i) => (
                  <div key={i} className="group glass-panel p-8 flex flex-col items-center justify-center gap-4 hover:bg-white/5 transition-all duration-500 border-white/5 h-48">
                    <div className="h-16 w-full flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-700">
                      <img
                        src={client.logo}
                        alt={client.name}
                        className="max-h-full max-w-full object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          if (target.src.includes(client.fallback) || target.src.includes('placehold.co')) {
                            target.src = `https://placehold.co/200x100/1a1d23/0066ff?text=${client.name}`;
                          } else {
                            target.src = client.fallback;
                          }
                        }}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <span className="text-[10px] font-mono tracking-widest text-white/20 group-hover:text-ra-cyan transition-colors">{client.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* PANEL 4: THE CORE (3D MOLD) */}
        <section ref={moldPanelRef} className="panel bg-ra-grey/30 panel-mold">
          <PanelHeader number="04" title="Ferramentaria de Precisão" />

          <div className="absolute inset-0 z-0">
            {!isCanvasLoaded && <CanvasSkeleton />}
            <Canvas
              shadows
              dpr={[1, 2]}
              eventSource={document.getElementById('root') || undefined}
              frameloop={isMoldPanelVisible ? 'always' : 'never'}
              gl={{ preserveDrawingBuffer: false, antialias: true }}
              onCreated={handleCanvasLoad}
            >
              <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={45} />
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
              <Environment preset="city" />
              <Suspense fallback={null}>
                <IndustrialMold progress={isMobile ? 1 : moldProgress} isVisible={isMoldPanelVisible} />
              </Suspense>
              <ContactShadows position={[0, -4, 0]} opacity={0.4} scale={20} blur={2} far={4.5} />
            </Canvas>
          </div>

          <div className="absolute bottom-24 left-12 md:left-24 z-10 max-w-md">
            <TechBadge icon={Settings}>High Precision Engineering</TechBadge>
            <h2 className="text-4xl md:text-6xl font-black mt-6 mb-4 leading-tight">
              Domínio total <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-ra-blue to-ra-cyan">do projeto.</span>
            </h2>
            <p className="text-white/50 text-sm leading-relaxed">
              Da concepção do molde à produção final. Nossa ferramentaria própria garante que cada milímetro seja respeitado, eliminando falhas de terceiros.
            </p>
          </div>

          <div className="absolute top-1/2 right-12 -translate-y-1/2 hidden lg:flex flex-col gap-4">
            {[
              { label: "TOLERANCE", value: "0.001mm" },
              { label: "MATERIAL", value: "P20 STEEL" },
              { label: "PRESSURE", value: "2500 BAR" },
              { label: "CYCLE", value: "12.4s" }
            ].map((stat, i) => (
              <div key={i} className="glass-panel p-4 w-48 border-l-2 border-l-ra-blue hover:border-ra-cyan transition-colors duration-300">
                <p className="text-[9px] text-white/40 tracking-widest mb-1">{stat.label}</p>
                <p className="text-lg font-mono text-ra-cyan">{stat.value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* PANEL 5: INTELLIGENCE & PERFORMANCE */}
        <section className="panel bg-ra-dark">
          <PanelHeader number="05" title="Engenharia & Performance" />

          <div className="h-full grid grid-cols-1 md:grid-cols-2 items-center px-12 md:px-24 gap-16">
            <div className="space-y-10">
              <TechBadge icon={Activity}>Real-time Telemetry</TechBadge>
              <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">
                A Ciência dos <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-ra-blue to-ra-cyan">Polímeros</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { icon: Layers, title: "Resistência Mecânica", desc: "Testes de tração e impacto em laboratório próprio." },
                  { icon: Cpu, title: "Simulação de Fluxo", desc: "Análise térmica para preenchimento perfeito do molde." },
                  { icon: Activity, title: "Durabilidade", desc: "Ciclos de vida estendidos para alta produtividade." },
                  { icon: Maximize2, title: "Escalabilidade", desc: "Processos otimizados para grandes volumes industriais." }
                ].map((item, i) => (
                  <div key={i} className="group p-6 glass-panel hover:bg-white/5 transition-colors duration-500">
                    <item.icon className="text-ra-cyan mb-4 group-hover:scale-110 transition-transform" size={24} />
                    <h3 className="text-sm font-bold uppercase tracking-wider mb-2 text-white">{item.title}</h3>
                    <p className="text-xs text-white/40 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative h-[400px] md:h-[600px] glass-panel rounded-2xl overflow-hidden border-white/5">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>

              <div className="absolute inset-0 p-8 font-mono text-[10px] text-ra-cyan/60">
                <div className="flex justify-between mb-8">
                  <span>SYSTEM_STATUS: ACTIVE</span>
                  <span>ENCRYPTION: AES-256</span>
                </div>

                <div className="space-y-4">
                  {[80, 45, 92, 60].map((w, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between">
                        <span>DATA_STREAM_{i+1}</span>
                        <span>{w}%</span>
                      </div>
                      <div className="h-1 bg-white/5 w-full">
                        <div className="h-full bg-gradient-to-r from-ra-blue to-ra-cyan/40" style={{ width: `${w}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="absolute bottom-8 left-8 right-8">
                  <div className="h-32 border border-white/10 rounded flex items-end p-2 gap-1">
                    {Array.from({ length: 20 }).map((_, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-gradient-to-t from-ra-blue/30 to-ra-cyan/20"
                        style={{ height: `${Math.random() * 100}%` }}
                      ></div>
                    ))}
                  </div>
                  <p className="mt-4 text-center tracking-[0.5em]">STRUCTURAL_ANALYSIS_COMPLETE</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PANEL 6: TRUST & CONVERSION */}
        <section className="panel bg-[radial-gradient(circle_at_bottom_right,_var(--color-ra-grey)_0%,_transparent_50%)]">
          <PanelHeader number="06" title="Confiança Industrial" />

          <div className="h-full flex flex-col items-center justify-center px-6">
            <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div>
                <div className="inline-flex items-center gap-3 px-4 py-2 bg-ra-blue/10 border border-ra-blue/20 rounded-lg mb-8">
                  <Lock className="text-ra-blue" size={20} />
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-ra-cyan">Sigilo Total (NDA)</span>
                </div>

                <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8">
                  Seu projeto <br /> em <span className="text-transparent bg-clip-text bg-gradient-to-r from-ra-blue to-ra-cyan">Segurança</span>.
                </h2>

                <p className="text-white/50 text-lg leading-relaxed mb-12">
                  Entendemos que a inovação é o seu maior ativo. Por isso, o sigilo industrial e a proteção da propriedade intelectual são os pilares da RA Polymers.
                </p>

                <div className="flex flex-wrap gap-4">
                  <button className="px-8 py-4 bg-ra-blue text-ra-dark font-bold uppercase tracking-widest text-xs rounded flex items-center gap-3 group transition-all duration-200 hover:bg-white active:scale-95 will-change-transform">
                    Solicitar Cotação
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button className="px-8 py-4 border border-white/20 text-white font-bold uppercase tracking-widest text-xs rounded transition-all duration-200 hover:bg-white/10 active:scale-95 will-change-transform">
                    Portal do Cliente
                  </button>
                </div>
              </div>

              <div className="glass-panel p-12 rounded-3xl border-white/10 relative overflow-hidden group hover:border-ra-cyan/30 transition-colors duration-500">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <ShieldCheck size={120} />
                </div>

                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                    <MapPin className="text-ra-cyan" />
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
                <a href="#" className="hover:text-ra-cyan transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-ra-cyan transition-colors">Terms of Service</a>
              </div>
            </footer>
          </div>
        </section>

      </main>
    </div>
  );
}
