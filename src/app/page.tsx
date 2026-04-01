"use client";

import React, { useEffect, useRef } from "react";
import { HeroSection, BiographySection, RabiaZonersSection, EventsSection, ReleasesSection, VisualsSection, RidersSection, FooterSection } from "@/components/HomeSections";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Optional: Basic fade up for sections on load if wanted
    // GSAP ScrollTrigger could go here for advanced scroll animations
  }, []);

  return (
    <div className="relative w-full min-h-screen font-body selection:bg-[var(--accent-primary)] selection:text-white bg-transparent">
      
      {/* Ambient Deep Glow underneath the entire grid */}
      <div className="ambient-glow" />

      {/* 
        CINEMATIC STACK LAYOUT
        A linear, full-viewport layout optimized for immersion.
      */}
      <main ref={containerRef} className="relative w-full flex flex-col">
        <HeroSection />
        <BiographySection />
        <RabiaZonersSection />
        <EventsSection />
        <ReleasesSection />
        <VisualsSection />
        <RidersSection />
        <FooterSection />
      </main>
      
      {/* Spacer for Floating island nav if exists */}
      <div className="h-16 w-full bg-black/50 backdrop-blur-md" />
    </div>
  );
}
