/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState, Suspense, useMemo } from 'react';
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
  ChevronLeft,
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
import bgHome from './home.png';
import imgRaPolymers from './rapolymers.png';

gsap.registerPlugin(ScrollTrigger);

// Utility for tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- 3D Components ---

// Generates a subtle procedural noise texture to simulate an EDM (Electrical Discharge Machining) finish
const createEDMTexture = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const context = canvas.getContext('2d');
  if (context) {
    const imageData = context.createImageData(512, 512);
    for (let i = 0; i < imageData.data.length; i += 4) {
      // Create a fine, high-frequency noise
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

const IndustrialMold = ({ progress }: { progress: number }) => {
  const leftHalf = useRef<THREE.Group>(null);
  const rightHalf = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.PointLight>(null);
  const logoRef = useRef<THREE.Group>(null);

  // Easing function for a more "snappy" feel
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
    const easedProgress = easeInOutExpo(progress);
    
    if (leftHalf.current && rightHalf.current) {
      // Closing animation with easing
      const offset = (1 - easedProgress) * 5;
      leftHalf.current.position.x = -offset;
      rightHalf.current.position.x = offset;

      // Glow intensity with pulsation
      if (glowRef.current) {
        const pulse = Math.sin(state.clock.elapsedTime * 15) * 0.2 + 0.8;
        glowRef.current.intensity = progress > 0.8 ? (progress - 0.8) * 100 * pulse : 0;
      }

      // Logo visibility
      if (logoRef.current) {
        logoRef.current.scale.setScalar(progress > 0.9 ? (progress - 0.9) * 10 : 0);
        logoRef.current.position.z = 1.2;
      }
    }
  });

  // Premium Industrial Materials
  const edmTexture = useMemo(() => createEDMTexture(), []);
  
  const baseMaterial = <meshPhysicalMaterial color="#94a3b8" metalness={0.85} roughness={0.3} clearcoat={0.1} />;
  const blockMaterial = <meshPhysicalMaterial color="#cbd5e1" metalness={0.95} roughness={0.2} clearcoat={0.3} />;
  const pinMaterial = <meshPhysicalMaterial color="#f8fafc" metalness={1.0} roughness={0.05} clearcoat={0.8} />;
  const darkMetalMaterial = <meshPhysicalMaterial color="#334155" metalness={0.9} roughness={0.5} />;
  
  // The cavity uses the EDM texture for a highly realistic, premium machined finish
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
      {/* Left Half of the Mold (Core) */}
      <group ref={leftHalf} position={[-5, 0, 0]}>
        {/* Base Plate */}
        <mesh position={[-0.5, 0, 0]} castShadow>
          <boxGeometry args={[1, 7.5, 5.5]} />
          {baseMaterial}
        </mesh>
        {/* Base Plate Bolts */}
        {[[-3.2, 2.2], [-3.2, -2.2], [3.2, 2.2], [3.2, -2.2]].map(([y, z], i) => (
          <mesh key={`bolt-l-${i}`} position={[-1.01, y, z]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.2, 0.2, 0.1, 16]} />
            {darkMetalMaterial}
          </mesh>
        ))}

        {/* Main Block */}
        <mesh castShadow>
          <boxGeometry args={[4, 6, 4]} />
          {blockMaterial}
        </mesh>

        {/* Machining Grooves (Simulated) */}
        {[[-1.8, 0], [1.8, 0]].map(([y, z], i) => (
          <mesh key={`groove-l-${i}`} position={[2, y, z]} rotation={[Math.PI / 2, 0, 0]}>
            <boxGeometry args={[0.1, 4.05, 0.1]} />
            {darkMetalMaterial}
          </mesh>
        ))}

        {/* Ejector Plate Mechanism */}
        <mesh position={[-0.8, 0, 0]} castShadow>
          <boxGeometry args={[0.4, 6.5, 4.5]} />
          {ejectorPlateMaterial}
        </mesh>
        <mesh position={[-1.2, 0, 0]} castShadow>
          <boxGeometry args={[0.4, 6.5, 4.5]} />
          {ejectorPlateMaterial}
        </mesh>
        {/* Ejector Plate Return Pins */}
        {[[-2.5, 1.5], [-2.5, -1.5], [2.5, 1.5], [2.5, -1.5]].map(([y, z], i) => (
          <mesh key={`return-pin-${i}`} position={[-1, y, z]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.1, 0.1, 0.8, 16]} />
            {pinMaterial}
          </mesh>
        ))}

        {/* Cooling Channels (Top/Bottom) */}
        {[[-2.8, 1.5], [-2.8, -1.5], [2.8, 1.5], [2.8, -1.5]].map(([y, z], i) => (
          <mesh key={`cool-l-${i}`} position={[0, y, z]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.12, 0.12, 4.05, 16]} />
            {darkMetalMaterial}
          </mesh>
        ))}

        {/* Guide Pins */}
        {[[-2.2, 1.4], [-2.2, -1.4], [2.2, 1.4], [2.2, -1.4]].map(([y, z], i) => (
          <mesh key={`guide-${i}`} position={[2, y, z]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.2, 0.2, 1.5, 32]} />
            {pinMaterial}
          </mesh>
        ))}

        {/* Side Interlocks (Male) */}
        {[[-2, 2], [2, 2], [-2, -2], [2, -2]].map(([y, z], i) => (
          <mesh key={`interlock-m-${i}`} position={[2.1, y, z]}>
            <boxGeometry args={[0.2, 0.6, 0.6]} />
            {darkMetalMaterial}
          </mesh>
        ))}

        {/* Ejector Pins (Grid around center) */}
        {[[-0.9, 0.9], [-0.9, -0.9], [0.9, 0.9], [0.9, -0.9], [0, 1.2], [0, -1.2], [1.2, 0], [-1.2, 0]].map(([y, z], i) => (
          <mesh key={`ejector-${i}`} position={[1.5, y, z]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.06, 0.06, 5, 16]} />
            {pinMaterial}
          </mesh>
        ))}
      </group>

      {/* Right Half of the Mold (Cavity) */}
      <group ref={rightHalf} position={[5, 0, 0]}>
        {/* Base Plate */}
        <mesh position={[0.5, 0, 0]} castShadow>
          <boxGeometry args={[1, 7.5, 5.5]} />
          {baseMaterial}
        </mesh>
        {/* Base Plate Bolts */}
        {[[-3.2, 2.2], [-3.2, -2.2], [3.2, 2.2], [3.2, -2.2]].map(([y, z], i) => (
          <mesh key={`bolt-r-${i}`} position={[1.01, y, z]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.2, 0.2, 0.1, 16]} />
            {darkMetalMaterial}
          </mesh>
        ))}

        {/* Main Block */}
        <mesh castShadow>
          <boxGeometry args={[4, 6, 4]} />
          {blockMaterial}
        </mesh>

        {/* Machining Grooves (Simulated) */}
        {[[-1.8, 0], [1.8, 0]].map(([y, z], i) => (
          <mesh key={`groove-r-${i}`} position={[-2, y, z]} rotation={[Math.PI / 2, 0, 0]}>
            <boxGeometry args={[0.1, 4.05, 0.1]} />
            {darkMetalMaterial}
          </mesh>
        ))}

        {/* Cooling Channels (Top/Bottom) */}
        {[[-2.8, 1.5], [-2.8, -1.5], [2.8, 1.5], [2.8, -1.5]].map(([y, z], i) => (
          <mesh key={`cool-r-${i}`} position={[0, y, z]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.12, 0.12, 4.05, 16]} />
            {darkMetalMaterial}
          </mesh>
        ))}

        {/* Guide Pin Bushings (Holes) */}
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

        {/* Side Interlocks (Female) */}
        {[[-2, 2], [2, 2], [-2, -2], [2, -2]].map(([y, z], i) => (
          <mesh key={`interlock-f-${i}`} position={[-2.05, y, z]}>
            <boxGeometry args={[0.1, 0.62, 0.62]} />
            {cavityMaterial}
          </mesh>
        ))}

      </group>

      {/* RA Logo appearing on closure */}
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
          <sphereGeometry args={[1, 64, 64]} />
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
  <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] uppercase tracking-wider text-ra-blue/80 font-mono">
    {Icon && <Icon size={12} />}
    {children}
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
      
      // Create the horizontal scroll tween
      const scrollTween = gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (sections.length - 1),
          // Base the end on the total width of all panels
          end: () => `+=${containerRef.current?.scrollWidth || window.innerWidth * 5}`,
          onUpdate: (self) => {
            setScrollProgress(self.progress);
          }
        }
      });

      // Dedicated trigger for the Mold Animation in Panel 2
      // This ensures it closes automatically when the user arrives and opens when they leave
      if (moldPanelRef.current) {
        ScrollTrigger.create({
          trigger: moldPanelRef.current,
          start: "left 30%", // Slightly earlier to feel more responsive
          end: "right 70%",
          containerAnimation: scrollTween,
          onEnter: () => {
            gsap.to({ val: 0 }, {
              val: 1,
              duration: 3, // Reduced from 5s to 3s for better pacing
              ease: "power2.inOut",
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
              duration: 3,
              ease: "power2.inOut",
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

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <div className="relative min-h-screen bg-ra-dark">
      {/* Custom Cursor */}
      <div ref={cursorRef} className="custom-cursor" />

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-50 bg-white/5">
        <div 
          className="h-full bg-ra-blue shadow-[0_0_10px_#0066ff]" 
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      {/* Navigation Arrow Left (Desktop Only) */}
      {!isMobile && scrollProgress > 0 && (
        <div 
          className="fixed left-12 top-1/2 -translate-y-1/2 z-40 flex items-center justify-center cursor-pointer group transition-all duration-500"
          onClick={() => {
            if (containerRef.current) {
              const currentScroll = window.scrollY;
              window.scrollTo({
                top: Math.max(0, currentScroll - window.innerHeight),
                behavior: 'smooth'
              });
            }
          }}
        >
          <div className="absolute w-12 h-12 bg-ra-blue/20 rounded-full scale-0 group-hover:scale-150 transition-transform duration-500 blur-md"></div>
          <ChevronLeft size={48} className="text-ra-blue opacity-50 group-hover:opacity-100 transition-opacity" />
        </div>
      )}

      {/* Navigation Arrow Right (Desktop Only) */}
      {!isMobile && (
        <div 
          className="fixed right-12 top-1/2 -translate-y-1/2 z-40 flex items-center justify-center cursor-pointer group"
          onClick={() => {
            const currentIdx = Math.floor(scrollProgress * 4.9); // Approx calculation based on earlier code
            const totalPanels = 5; // 0 to 4 is 5 panels, plus the 1.5 is 6 total panels, wait let's use the container width
            if (containerRef.current) {
              const panelWidth = window.innerWidth;
              const currentScroll = window.scrollY;
              // If we are using scrollTrigger with pin, scrolling down moves it right.
              window.scrollTo({
                top: currentScroll + window.innerHeight,
                behavior: 'smooth'
              });
            }
          }}
        >
          <div className="absolute w-12 h-12 bg-ra-blue/20 rounded-full scale-0 group-hover:scale-150 transition-transform duration-500 blur-md"></div>
          <ChevronRight size={48} className="text-ra-blue opacity-50 group-hover:opacity-100 transition-opacity animate-pulse group-hover:animate-none" />
        </div>
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
                <div className="absolute inset-0 bg-ra-blue/10 transform -skew-x-12 translate-x-full group-hover:translate-x-[-100%] transition-transform duration-1000"></div>
                <span className="text-4xl font-black tracking-tighter text-white">RA</span>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase mb-4">
              Ra <span className="text-ra-blue">polymers</span>
            </h1>
            
            <p className="text-sm md:text-lg font-light tracking-[0.3em] text-white/60 uppercase max-w-3xl">
              Soluções Avançadas em Polímeros e Engenharia de Alta Precisão para o Setor Industrial
            </p>
          </div>
          
          <div className="absolute bottom-12 right-12 flex items-center gap-4 text-white/20 animate-bounce">
            <span className="text-[10px] uppercase tracking-widest">Scroll to Explore</span>
            <ArrowRight size={16} />
          </div>
        </section>

        {/* PANEL 1.5: SOBRE NÓS (COMMAND CENTER REINVENTION) */}
        <section className="panel bg-ra-dark overflow-hidden relative">
          <PanelHeader number="01.5" title="Centro de Operações" />
          
          <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
            {/* Tech Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_10%,transparent_100%)]"></div>
            {/* Massive Watermark */}
            <div className="absolute text-[20vw] font-black text-white/[0.02] tracking-tighter uppercase select-none whitespace-nowrap">
              Polymers
            </div>
          </div>

          <div className="h-full flex items-center justify-center relative z-10 w-full px-6 md:px-12">
            <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              
              {/* Left Column: Data & Specs */}
              <div className="hidden lg:flex flex-col gap-6">
                <div className="glass-panel p-6 border-l-4 border-ra-blue group hover:bg-white/5 transition-colors">
                  <div className="flex justify-between items-end mb-4">
                    <h3 className="text-xs uppercase tracking-[0.2em] text-white/50 group-hover:text-ra-blue transition-colors">Precisão Estrutural</h3>
                    <span className="text-ra-blue font-mono text-sm">99.9%</span>
                  </div>
                  <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-ra-blue w-[99.9%] relative">
                      <div className="absolute top-0 right-0 w-4 h-full bg-white/50 blur-[2px] animate-pulse"></div>
                    </div>
                  </div>
                </div>

                <div className="glass-panel p-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-5">
                    <Activity size={100} />
                  </div>
                  <h3 className="text-2xl font-black uppercase tracking-widest text-white mb-4">Nosso <span className="text-ra-blue">DNA</span></h3>
                  <p className="text-sm text-white/60 leading-relaxed font-light">
                    Não somos apenas uma indústria; somos um laboratório de alta performance. Desenvolvemos soluções em polímeros que desafiam os limites da engenharia, fundindo ciência dos materiais com usinagem de precisão nanométrica.
                  </p>
                </div>
              </div>

              {/* Center Column: The Core */}
              <div className="flex justify-center items-center relative h-[400px] md:h-[600px]">
                {/* HUD Elements */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-[300px] h-[300px] md:w-[450px] md:h-[450px] border border-ra-blue/20 rounded-full animate-[spin_40s_linear_infinite] relative">
                    {/* Tick marks on the ring */}
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div key={i} className="absolute top-0 left-1/2 w-[1px] h-3 bg-ra-blue/50 -translate-x-1/2" style={{ transformOrigin: `50% ${isMobile ? '150px' : '225px'}`, transform: `rotate(${i * 30}deg)` }}></div>
                    ))}
                  </div>
                  <div className="absolute w-[250px] h-[250px] md:w-[380px] md:h-[380px] border border-white/10 border-dashed rounded-full animate-[spin_30s_linear_infinite_reverse]"></div>
                </div>
                
                {/* Core Image */}
                <div className="relative z-20 group">
                  <div className="absolute inset-0 bg-ra-blue/20 blur-3xl rounded-full scale-150 opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>
                  <img 
                    src={imgRaPolymers} 
                    alt="RA Polymers Core" 
                    className="w-[200px] md:w-[280px] object-contain relative z-10 drop-shadow-[0_0_50px_rgba(0,102,255,0.6)]" 
                  />
                  <div className="absolute bottom-[-40px] left-1/2 -translate-x-1/2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-ra-blue animate-pulse"></span>
                    <span className="text-[9px] font-mono tracking-widest text-ra-blue">SYSTEM_ONLINE</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Mission & Telemetry */}
              <div className="hidden lg:flex flex-col gap-6">
                <div className="glass-panel p-8 relative overflow-hidden">
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-ra-blue to-transparent opacity-50"></div>
                  <h3 className="text-2xl font-black uppercase tracking-widest text-white mb-4">A <span className="text-ra-blue">Missão</span></h3>
                  <p className="text-sm text-white/60 leading-relaxed font-light">
                    Elevar o padrão global de manufatura. Entregamos matrizes e compostos poliméricos que garantem ciclos ininterruptos, minimizando setups e maximizando o retorno sobre o investimento industrial.
                  </p>
                </div>

                <div className="glass-panel p-6 border-r-4 border-white/20">
                  <div className="flex flex-col gap-3 font-mono text-[10px] text-white/40 tracking-widest">
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span>CAPACIDADE DE PRODUÇÃO</span>
                      <span className="text-white/80">ALTA ESCALA</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span>CONTROLE DE QUALIDADE</span>
                      <span className="text-white/80">AUTOMATIZADO</span>
                    </div>
                    <div className="flex justify-between">
                      <span>TEMPO DE RESPOSTA</span>
                      <span className="text-white/80">IMEDIATO</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* PANEL 2: CLIENTS (REINVENTED) */}
        <section className="panel bg-ra-dark/50 relative overflow-hidden">
          <PanelHeader number="02" title="Nossos Clientes" />
          
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-ra-blue)_0%,_transparent_20%)] opacity-5 mix-blend-screen scale-[2] pointer-events-none"></div>

          <div className="h-full flex flex-col items-center justify-center px-12 relative z-10">
            <div className="text-center mb-24">
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">
                Rede de <span className="text-ra-blue">Confiança</span>
              </h2>
              <p className="text-white/40 text-sm tracking-[0.2em] uppercase">Ecossistema Industrial de Alta Performance</p>
            </div>

            <div className="w-full max-w-7xl relative">
              {/* Central horizontal line to connect nodes */}
              <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-ra-blue/50 to-transparent -translate-y-1/2 hidden md:block"></div>

              <div className="flex flex-wrap md:flex-nowrap justify-center items-center gap-8 md:gap-16">
                {[
                  { name: "VALE", logo: logoVale, fallback: "https://upload.wikimedia.org/wikipedia/en/thumb/5/5e/Vale_logo.svg/1200px-Vale_logo.svg.png", delay: 0 },
                  { name: "ALCOA", logo: logoAlcoa, fallback: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Alcoa_logo.svg/1200px-Alcoa_logo.svg.png", delay: 100 },
                  { name: "RUMO", logo: logoRumo, fallback: "https://upload.wikimedia.org/wikipedia/pt/thumb/a/a4/Logo_Rumo_Log%C3%ADstica.png/250px-Logo_Rumo_Log%C3%ADstica.png", delay: 200 },
                  { name: "MRS", logo: logoMrs, fallback: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/MRS_Logistica_logo.svg/1200px-MRS_Logistica_logo.svg.png", delay: 300 },
                  { name: "MRN", logo: logoMrn, fallback: "https://www.mrn.com.br/static/media/logo-mrn.6b4b1b3b.png", delay: 400 }
                ].map((client, i) => (
                  <div 
                    key={i} 
                    className="relative group cursor-none"
                    style={{
                      transform: `translateY(${i % 2 === 0 ? '-20px' : '20px'})`
                    }}
                  >
                    {/* Node Connection Point */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-ra-dark border-2 border-ra-blue rounded-full z-0 hidden md:block group-hover:scale-150 transition-transform duration-500"></div>
                    
                    {/* Magnetic Card */}
                    <div className="glass-panel w-40 h-40 md:w-48 md:h-48 rounded-full flex flex-col items-center justify-center relative z-10 
                                  hover:scale-110 hover:-translate-y-4 hover:border-ra-blue/50 hover:bg-white/10 transition-all duration-500 overflow-hidden">
                      <div className="absolute inset-0 bg-ra-blue/0 group-hover:bg-ra-blue/10 transition-colors duration-500"></div>
                      
                      <div className="w-24 h-24 flex items-center justify-center grayscale group-hover:grayscale-0 opacity-50 group-hover:opacity-100 transition-all duration-700 relative z-20">
                        <img 
                          src={client.logo} 
                          alt={client.name} 
                          className="max-h-full max-w-full object-contain mix-blend-screen"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            if (target.src.includes(client.fallback) || target.src.includes('placehold.co')) {
                              target.src = `https://placehold.co/200x100/1a1d23/0066ff?text=${client.name}`;
                            } else {
                              target.src = client.fallback;
                            }
                          }}
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      
                      <span className="absolute bottom-6 text-[10px] font-mono tracking-[0.3em] text-ra-blue opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 z-20">
                        {client.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* PANEL 3: THE CORE (3D MOLD) */}
        <section ref={moldPanelRef} className="panel bg-ra-grey/30 panel-mold">
          <PanelHeader number="03" title="Ferramentaria de Precisão" />
          
          <div className="absolute inset-0 z-0">
            <Canvas shadows dpr={[1, 2]} eventSource={document.getElementById('root') || undefined}>
              <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={45} />
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
              <Environment preset="city" />
              <Suspense fallback={null}>
                <IndustrialMold progress={isMobile ? 1 : moldProgress} />
              </Suspense>
              <ContactShadows position={[0, -4, 0]} opacity={0.4} scale={20} blur={2} far={4.5} />
            </Canvas>
          </div>

          {/* Central Animated Text Panels (Replaces the static side panels and bottom text) */}
          <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
            {/* Left Panel */}
            <div 
              className="absolute top-1/2 left-0 -translate-y-1/2 flex flex-col justify-center px-12 md:px-24 transition-all duration-[1500ms] ease-out w-full md:w-1/2 h-full"
              style={{ 
                opacity: moldProgress > 0.8 ? 1 : 0,
                transform: `translateX(${moldProgress > 0.8 ? '0%' : '-50%'})`
              }}
            >
              <div className="max-w-md">
                <TechBadge icon={Settings}>Zero Tolerância</TechBadge>
                <h2 className="text-4xl md:text-6xl font-black mt-6 mb-4 leading-none uppercase tracking-tighter text-white drop-shadow-2xl">
                  Domínio <br /> <span className="text-ra-blue">Absoluto</span>
                </h2>
                <p className="text-white/70 text-lg leading-relaxed font-light backdrop-blur-sm bg-ra-dark/30 p-4 rounded-xl border-l-2 border-ra-blue">
                  Da concepção à injeção final. Elimine falhas de terceiros com nossa ferramentaria proprietária focada em maximizar o seu lucro por ciclo.
                </p>
              </div>
            </div>

            {/* Right Panel */}
            <div 
              className="absolute top-1/2 right-0 -translate-y-1/2 flex flex-col justify-center items-end px-12 md:px-24 transition-all duration-[1500ms] ease-out w-full md:w-1/2 h-full text-right"
              style={{ 
                opacity: moldProgress > 0.8 ? 1 : 0,
                transform: `translateX(${moldProgress > 0.8 ? '0%' : '50%'})`
              }}
            >
              <div className="max-w-md">
                <TechBadge icon={Cpu}>Alta Performance</TechBadge>
                <h2 className="text-4xl md:text-6xl font-black mt-6 mb-4 leading-none uppercase tracking-tighter text-white drop-shadow-2xl">
                  Ciclos <br /> <span className="text-ra-blue">Extremos</span>
                </h2>
                <p className="text-white/70 text-lg leading-relaxed font-light backdrop-blur-sm bg-ra-dark/30 p-4 rounded-xl border-r-2 border-ra-blue inline-block">
                  Otimização térmica e usinagem CNC submilimétrica. Moldes projetados para rodar milhões de ciclos ininterruptos com precisão nanométrica.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* PANEL 4: INTELLIGENCE & PERFORMANCE */}
        <section className="panel bg-ra-dark">
          <PanelHeader number="04" title="Engenharia & Performance" />
          
          <div className="h-full grid grid-cols-1 md:grid-cols-2 items-center px-12 md:px-24 gap-12">
            <div className="space-y-8">
              <TechBadge icon={Activity}>Real-time Telemetry</TechBadge>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
                A Ciência dos <br /> <span className="text-ra-blue">Polímeros</span>
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { icon: Layers, title: "Resistência Mecânica", desc: "Testes de tração e impacto em laboratório próprio." },
                  { icon: Cpu, title: "Simulação de Fluxo", desc: "Análise térmica para preenchimento perfeito do molde." },
                  { icon: Activity, title: "Durabilidade", desc: "Ciclos de vida estendidos para alta produtividade." },
                  { icon: Maximize2, title: "Escalabilidade", desc: "Processos otimizados para grandes volumes industriais." }
                ].map((item, i) => (
                  <div key={i} className="group p-6 glass-panel hover:bg-white/5 transition-colors duration-500">
                    <item.icon className="text-ra-blue mb-4 group-hover:scale-110 transition-transform" size={24} />
                    <h3 className="text-sm font-bold uppercase tracking-wider mb-2">{item.title}</h3>
                    <p className="text-xs text-white/40 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative h-[400px] md:h-[600px] glass-panel rounded-2xl overflow-hidden border-white/5">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
              
              {/* Telemetry UI Mockup */}
              <div className="absolute inset-0 p-8 font-mono text-[10px] text-ra-blue/60">
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
                        <div className="h-full bg-ra-blue/40" style={{ width: `${w}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="absolute bottom-8 left-8 right-8">
                  <div className="h-32 border border-white/10 rounded flex items-end p-2 gap-1">
                    {Array.from({ length: 20 }).map((_, i) => (
                      <div 
                        key={i} 
                        className="flex-1 bg-ra-blue/20" 
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

        {/* PANEL 5: TRUST & CONVERSION */}
        <section className="panel bg-[radial-gradient(circle_at_bottom_right,_var(--color-ra-grey)_0%,_transparent_50%)]">
          <PanelHeader number="05" title="Confiança Industrial" />
          
          <div className="h-full flex flex-col items-center justify-center px-6">
            <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-flex items-center gap-3 px-4 py-2 bg-ra-blue/10 border border-ra-blue/20 rounded-lg mb-8">
                  <Lock className="text-ra-blue" size={20} />
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-ra-blue">Sigilo Total (NDA)</span>
                </div>
                
                <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter mb-8">
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

      </main>
    </div>
  );
}
