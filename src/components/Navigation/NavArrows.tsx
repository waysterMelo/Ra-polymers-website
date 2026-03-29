import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface NavArrowsProps {
  isMobile: boolean;
  scrollProgress: number;
  containerRef: React.RefObject<HTMLDivElement>;
}

export const NavArrows: React.FC<NavArrowsProps> = ({ isMobile, scrollProgress, containerRef }) => {
  if (isMobile) return null;

  const scrollNext = () => {
    if (containerRef.current) {
      const currentScroll = window.scrollY;
      window.scrollTo({
        top: currentScroll + window.innerHeight,
        behavior: 'smooth'
      });
    }
  };

  const scrollPrev = () => {
    if (containerRef.current) {
      const currentScroll = window.scrollY;
      window.scrollTo({
        top: Math.max(0, currentScroll - window.innerHeight),
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      {scrollProgress > 0.01 && (
        <div
          className="fixed left-4 md:left-12 top-1/2 -translate-y-1/2 z-40 flex items-center justify-center cursor-pointer group transition-all duration-500"
          onClick={scrollPrev}
        >
          <div className="absolute w-12 h-12 md:w-14 md:h-14 bg-white/80 shadow-lg rounded-full scale-100 group-hover:scale-110 transition-transform duration-300"></div>
          <ChevronLeft size={40} className="text-ra-blue relative z-10 opacity-90 group-hover:opacity-100 transition-opacity" />
        </div>
      )}

      {scrollProgress < 0.99 && (
        <div
          className="fixed right-4 md:right-12 top-1/2 -translate-y-1/2 z-40 flex items-center justify-center cursor-pointer group transition-all duration-500"
          onClick={scrollNext}
        >
          <div className="absolute w-12 h-12 md:w-14 md:h-14 bg-white/80 shadow-lg rounded-full scale-100 group-hover:scale-110 transition-transform duration-300"></div>
          <ChevronRight size={40} className="text-ra-blue relative z-10 opacity-90 group-hover:opacity-100 transition-opacity animate-pulse group-hover:animate-none" />
        </div>
      )}
    </>
  );};
