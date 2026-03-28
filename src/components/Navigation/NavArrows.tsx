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
      {scrollProgress > 0 && (
        <div 
          className="fixed left-12 top-1/2 -translate-y-1/2 z-40 flex items-center justify-center cursor-pointer group transition-all duration-500"
          onClick={scrollPrev}
        >
          <div className="absolute w-12 h-12 bg-ra-blue/20 rounded-full scale-0 group-hover:scale-150 transition-transform duration-500 blur-md"></div>
          <ChevronLeft size={48} className="text-ra-blue opacity-50 group-hover:opacity-100 transition-opacity" />
        </div>
      )}

      <div 
        className="fixed right-12 top-1/2 -translate-y-1/2 z-40 flex items-center justify-center cursor-pointer group"
        onClick={scrollNext}
      >
        <div className="absolute w-12 h-12 bg-ra-blue/20 rounded-full scale-0 group-hover:scale-150 transition-transform duration-500 blur-md"></div>
        <ChevronRight size={48} className="text-ra-blue opacity-50 group-hover:opacity-100 transition-opacity animate-pulse group-hover:animate-none" />
      </div>
    </>
  );
};
