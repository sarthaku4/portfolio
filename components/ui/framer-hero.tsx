import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

export function FramerHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        {
          y: 80,
          opacity: 0,
          rotationX: 10,
          transformPerspective: 1200,
        },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          duration: 1.5,
          ease: "power3.out",
          delay: 0.1,
        }
      );
    }
  }, []);

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden bg-[#0e0e0e] text-white flex flex-col items-center justify-center min-h-[90vh] py-20 mt-16 z-50">
      
      {/* Avatar */}
      <div className="relative w-32 h-32 md:w-44 md:h-44 rounded-full overflow-hidden mb-6 shadow-2xl z-10 border-[6px] border-[#1a1a1a]">
        <img 
          src="/slideshow/sarth-avatar-cropped.jpeg" 
          alt="Sarth Avatar" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Huge Fit-Text */}
      <div className="relative w-full flex justify-center items-center z-0 px-4 mb-12">
        <h1 className="text-[18vw] md:text-[22vw] leading-[0.8] font-black tracking-[-0.06em] text-white m-0 p-0 text-center select-none opacity-90 drop-shadow-2xl">
          SARTH©
        </h1>
      </div>

      {/* Tilted Marquee Strip */}
      <div className="absolute top-[65%] left-0 w-[120%] -translate-x-[5%] -translate-y-1/2 -rotate-3 bg-white text-black py-3 md:py-5 z-20 overflow-hidden shadow-2xl flex items-center border-y border-white/20 will-change-transform">
        <div className="flex whitespace-nowrap animate-marquee items-center gap-6 text-xl md:text-3xl font-bold tracking-tight uppercase px-4">
          {Array(6).fill(0).map((_, i) => (
            <React.Fragment key={i}>
              <span>Multidisciplinary Creator</span>
              <span>·</span>
              <span className="italic font-black text-blue-600">Web Designer</span>
              <span>·</span>
              <span>Photographer</span>
              <span>·</span>
              <span>UI/UX Specialist</span>
              <span>·</span>
              <span>Video Producer</span>
              <span>·</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
