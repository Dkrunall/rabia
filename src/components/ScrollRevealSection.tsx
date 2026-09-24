"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { openBookingModal } from "./BookingModal";

const PHRASES = [
    {
        tag: "01 // THE MANIFESTO",
        text: "I don't just play tracks. I conduct collective human energy on the dance floor.",
        highlightWords: ["collective", "human", "energy", "dance", "floor."]
    },
    {
        tag: "02 // THE FOUNDATION",
        text: "Eight years immersed in nightlife culture taught me to read a room in seconds.",
        highlightWords: ["nightlife", "culture", "read", "a", "room"]
    },
    {
        tag: "03 // THE FREQUENCY",
        text: "Now from the DJ booth, I architect driving basslines and hypnotic peak-time sets.",
        highlightWords: ["architect", "driving", "basslines", "hypnotic", "peak-time"]
    },
    {
        tag: "04 // THE DESTINATION",
        text: "From underground club residencies to festival mainstages worldwide.",
        highlightWords: ["underground", "residencies", "festival", "mainstages"]
    }
];

export function ScrollRevealSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // Calculate progress: 0 when container top enters bottom of screen, 1 when container bottom leaves top
            const totalScrollable = rect.height + windowHeight;
            const currentPosition = windowHeight - rect.top;
            const progress = Math.max(0, Math.min(1, currentPosition / totalScrollable));
            
            setScrollProgress(progress);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Split entire manifesto into interactive glowing words
    const words = [
        { text: "MY", highlight: false },
        { text: "JOURNEY", highlight: false },
        { text: "BEGAN", highlight: false },
        { text: "ON", highlight: false },
        { text: "THE", highlight: false },
        { text: "DANCE", highlight: true, color: "var(--accent-primary)" },
        { text: "FLOOR.", highlight: true, color: "var(--accent-primary)" },
        { text: "EIGHT", highlight: false },
        { text: "YEARS", highlight: false },
        { text: "IN", highlight: false },
        { text: "NIGHTLIFE", highlight: true, color: "var(--accent-secondary)" },
        { text: "PR", highlight: true, color: "var(--accent-secondary)" },
        { text: "TAUGHT", highlight: false },
        { text: "ME", highlight: false },
        { text: "HOW", highlight: false },
        { text: "TO", highlight: false },
        { text: "READ", highlight: false },
        { text: "A", highlight: false },
        { text: "ROOM", highlight: true, color: "white" },
        { text: "INSTINCTIVELY.", highlight: true, color: "white" },
        { text: "BEHIND", highlight: false },
        { text: "THE", highlight: false },
        { text: "DECKS,", highlight: true, color: "var(--accent-primary)" },
        { text: "I", highlight: false },
        { text: "SHAPE", highlight: false },
        { text: "THAT", highlight: false },
        { text: "ENERGY", highlight: true, color: "var(--accent-secondary)" },
        { text: "INTO", highlight: false },
        { text: "RELENTLESS,", highlight: true, color: "var(--accent-primary)" },
        { text: "HYPNOTIC", highlight: true, color: "var(--accent-primary)" },
        { text: "PEAK-TIME", highlight: true, color: "white" },
        { text: "TECHNO.", highlight: true, color: "white" },
    ];

    return (
        <section 
            ref={containerRef} 
            className="relative py-28 md:py-44 px-6 md:px-16 border-t border-white/5 bg-[#030305] overflow-hidden"
            id="manifesto"
        >
            {/* Ambient Background Glow that reacts to scroll */}
            <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[220px] pointer-events-none transition-opacity duration-700"
                style={{
                    backgroundColor: "var(--accent-primary)",
                    opacity: 0.04 + scrollProgress * 0.08
                }}
            />

            <div className="max-w-[1300px] mx-auto w-full relative z-10">

                {/* Minimal Header */}
                <div className="flex items-center gap-3 mb-16">
                    <span className="w-2 h-2 rounded-full bg-[var(--accent-primary)] animate-pulse shadow-[0_0_10px_var(--accent-primary)]" />
                    <span className="text-[10px] font-mono text-[var(--accent-primary)] uppercase tracking-[0.35em] font-bold">
                        [ 03 // THE SOUND PHILOSOPHY ]
                    </span>
                </div>

                {/* Massive Scroll-Reveal Text Display */}
                <div className="mb-20">
                    <p className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase truus-heading tracking-tight leading-[1.15] flex flex-wrap gap-x-3 sm:gap-x-5 gap-y-2 md:gap-y-3">
                        {words.map((word, i) => {
                            // Calculate word activation threshold across scroll progress (0.15 to 0.85)
                            const wordProgressThreshold = 0.15 + (i / words.length) * 0.7;
                            const isRevealed = scrollProgress >= wordProgressThreshold;

                            return (
                                <span
                                    key={i}
                                    className="transition-all duration-500 inline-block select-none"
                                    style={{
                                        color: isRevealed 
                                            ? (word.color || "#ffffff") 
                                            : "rgba(255, 255, 255, 0.12)",
                                        textShadow: isRevealed && word.highlight 
                                            ? `0 0 25px ${word.color || "rgba(255, 255, 255, 0.5)"}` 
                                            : "none",
                                        transform: isRevealed ? "translateY(0)" : "translateY(4px)",
                                    }}
                                >
                                    {word.text}
                                </span>
                            );
                        })}
                    </p>
                </div>

                {/* 4 Interactive Key Architectural Pillars */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-12 border-t border-white/10">
                    {[
                        { title: "BPM DYNAMICS", desc: "134 - 140 BPM signature pacing that escalates tension and releases euphoric dancefloor energy." },
                        { title: "SUB-BASS ARCHITECTURE", desc: "Heavy rolling sub-frequencies tuned for world-class Funktion-One and L-Acoustics sound rigs." },
                        { title: "CROWD INTUITION", desc: "Instinctive track selection forged from 8+ years navigating nightlife PR and audience response." },
                        { title: "GLOBAL RESIDENCIES", desc: "Commanding headline dancefloors across Opa!, Waikiki, Baglami, Takumi, and Akina." },
                    ].map((item, idx) => (
                        <div 
                            key={idx}
                            className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-[var(--accent-primary)]/40 hover:bg-white/[0.04] transition-all duration-300 group"
                        >
                            <span className="text-[10px] font-mono text-[var(--accent-primary)] font-bold tracking-widest block mb-2">
                                0{idx + 1}
                            </span>
                            <h4 className="text-base font-black uppercase text-white truus-heading tracking-tight mb-2 group-hover:text-[var(--accent-secondary)] transition-colors">
                                {item.title}
                            </h4>
                            <p className="text-xs text-white/50 leading-relaxed font-mono">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Call to Action Bar */}
                <div className="mt-14 flex flex-wrap items-center justify-between gap-6 pt-8 border-t border-white/5">
                    <div className="flex items-center gap-3">
                        <Sparkles className="w-4 h-4 text-[var(--accent-secondary)]" />
                        <span className="text-xs font-mono text-white/70 uppercase tracking-wider">
                            Available for Worldwide Gigs, Festivals & Curated Residencies
                        </span>
                    </div>

                    <button
                        onClick={openBookingModal}
                        className="flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--accent-primary)] hover:bg-[#ff1a6b] text-white text-xs font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(255,0,85,0.4)] transition-all hover:scale-105 active:scale-95"
                    >
                        <span>Book DJ Rabia</span>
                        <ArrowUpRight className="w-4 h-4" />
                    </button>
                </div>

            </div>
        </section>
    );
}
