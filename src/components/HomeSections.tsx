"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { 
    Download, 
    Instagram, 
    Youtube, 
    Twitter, 
    Disc3, 
    ArrowUpRight, 
    Play, 
    Calendar, 
    Copy, 
    Check, 
    Music, 
    Headphones, 
    Radio, 
    Sliders, 
    Coffee, 
    ShieldCheck, 
    ExternalLink,
    Volume2
} from "lucide-react";
import { openBookingModal } from "./BookingModal";
import { playDJTrack, TRACKS } from "./AudioPlayer";
import { InteractiveGallery } from "./InteractiveGallery";
import { ScrollRevealSection } from "./ScrollRevealSection";

export function HeroSection() {
    const textRef = useRef<HTMLHeadingElement>(null);
    const badgeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (textRef.current) {
            gsap.fromTo(textRef.current,
                { y: 80, opacity: 0, scale: 0.95 },
                { y: 0, opacity: 1, scale: 1, duration: 1.5, ease: "power4.out", delay: 0.2 }
            );
        }
        if (badgeRef.current) {
            gsap.fromTo(badgeRef.current,
                { opacity: 0, y: -20 },
                { opacity: 1, y: 0, duration: 1, delay: 0.1 }
            );
        }
    }, []);

    return (
        <section className="relative min-h-[92vh] md:min-h-screen flex items-center justify-center overflow-hidden px-4 pt-24 pb-16">
            {/* Cinematic Background Image */}
            <div className="absolute inset-0 bg-black opacity-45 mix-blend-luminosity">
                <Image 
                    src="/img/r24.jpg" 
                    alt="DJ Rabia Stage Performance" 
                    fill 
                    className="object-cover filter grayscale" 
                    style={{ objectPosition: "75% 30%" }} 
                    priority 
                    sizes="100vw" 
                />
            </div>

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-[#050505]/70" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,85,0.08)_0%,transparent_70%)]" />

            {/* Content Container */}
            <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">
                
                {/* Status Badge */}
                <div 
                    ref={badgeRef}
                    className="border border-white/20 px-4 py-1.5 rounded-full font-bold text-[10px] tracking-[0.35em] uppercase inline-flex items-center gap-3 bg-black/60 backdrop-blur-xl text-white/90 mb-6 shadow-[0_4px_30px_rgba(0,0,0,0.6)]"
                >
                    <span className="w-2 h-2 rounded-full bg-[var(--accent-primary)] animate-pulse shadow-[0_0_10px_var(--accent-primary)]" />
                    <span>Official Press Kit & Booking • 2026 / 2027</span>
                </div>

                {/* Massive Artist Name */}
                <h1 
                    ref={textRef} 
                    className="truus-heading text-[17vw] md:text-[15vw] font-black uppercase tracking-tighter text-white drop-shadow-2xl m-0 leading-[0.88] select-none"
                >
                    RABI<span className="text-[var(--accent-primary)] text-stroke-accent">A</span>
                </h1>

                {/* Tagline */}
                <p className="text-sm md:text-xl text-white/70 font-medium tracking-[0.45em] uppercase mt-4 md:mt-2 max-w-2xl">
                    Visionary Techno <span className="text-[var(--accent-secondary)]">•</span> Hypnotic Sets <span className="text-[var(--accent-primary)]">•</span> Global Stages
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center justify-center gap-4 mt-8 md:mt-10">
                    {/* Book Artist Button */}
                    <button
                        onClick={openBookingModal}
                        className="flex items-center gap-3 px-8 py-4 rounded-full bg-[var(--accent-primary)] hover:bg-[#ff1a6b] text-white font-black text-xs uppercase tracking-widest transition-all shadow-[0_0_25px_rgba(255,0,85,0.4)] hover:scale-105 active:scale-95"
                    >
                        <Calendar className="w-4 h-4" />
                        <span>Book DJ Rabia</span>
                    </button>

                    {/* Explore Gallery Link */}
                    <Link
                        href="#gallery"
                        className="flex items-center gap-2 px-7 py-4 rounded-full bg-white/5 hover:bg-white/15 border border-white/15 text-white font-bold text-xs uppercase tracking-widest transition-all hover:border-white shadow-lg"
                    >
                        <span>Explore Visual Vault</span>
                    </Link>

                    {/* EPK Link */}
                    <a
                        href="https://drive.google.com/drive/folders/18JGyjN8uICNcoXvTnmijQX70EYcn7Tj3?usp=sharing"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white font-bold text-xs uppercase tracking-widest transition-all"
                    >
                        <Download className="w-3.5 h-3.5" />
                        <span>EPK Folder</span>
                    </a>
                </div>

                {/* Sub Features Indicator */}
                <div className="mt-12 flex flex-wrap justify-center items-center gap-6 md:gap-12 text-[11px] font-mono tracking-widest text-white/40 uppercase">
                    <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-secondary)]" />
                        <span>Peak-Time Techno</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)]" />
                        <span>Melodic & Afro Tech</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <span>Club Residencies</span>
                    </div>
                </div>

            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
                <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-white/70">Scroll To Explore</span>
                <div className="w-[1px] h-8 bg-white/30 overflow-hidden">
                    <div className="w-full h-1/2 bg-[var(--accent-primary)] animate-pulse" />
                </div>
            </div>
        </section>
    );
}

export function BiographySection() {
    const stats = [
        { value: "8+", label: "Years in Nightlife PR & Music Culture" },
        { value: "50+", label: "Premier Club Stages & Residencies" },
        { value: "100k+", label: "Dancers Energized on Dancefloors" },
        { value: "130-140", label: "BPM Signature High-Octane Cadence" },
    ];

    return (
        <section className="py-24 md:py-36 px-6 md:px-12 relative border-t border-white/5" id="biography">
            <div className="max-w-[1800px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                
                {/* Left Column: Image with interactive frame */}
                <div className="lg:col-span-5 relative">
                    <div className="relative aspect-[3/4] w-full max-w-md mx-auto rounded-3xl overflow-hidden group border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
                        <Image 
                            src="/img/r16.jpg" 
                            alt="DJ Rabia Portrait" 
                            fill 
                            className="object-cover object-top filter grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100" 
                            sizes="(max-width: 1024px) 100vw, 40vw" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                        
                        {/* Interactive floating tag */}
                        <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-black/60 backdrop-blur-md border border-white/15">
                            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[var(--accent-primary)] block mb-1">
                                [ Artist Insight ]
                            </span>
                            <p className="text-xs text-white/90 font-medium leading-relaxed">
                                &quot;Reading the dancefloor is an instinct. You don&apos;t just play tracks; you direct collective human energy.&quot;
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Column: Bio Content and Stats */}
                <div className="lg:col-span-7 flex flex-col gap-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/30 text-[var(--accent-primary)] text-[10px] font-bold uppercase tracking-[0.3em] self-start">
                        [ Origin & Story ]
                    </div>

                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter text-white uppercase truus-heading leading-tight">
                        From The Dancefloor <br />
                        <span className="text-stroke-white hover-glow transition-all duration-300">To The DJ Booth</span>
                    </h2>

                    <div className="space-y-5 text-base md:text-lg text-white/65 font-medium leading-relaxed max-w-2xl border-l-2 border-[var(--accent-primary)]/40 pl-6">
                        <p>
                            My journey began on the dance floor. For the past 8 years in PR, I&apos;ve honed the ability to read crowds and respond instinctively, crafting sets that shape the future of techno.
                        </p>
                        <p className="text-sm md:text-base text-white/50">
                            Rooted in pulse-pounding kickdrums, hypnotic basslines, and euphoric melodic builds, DJ RABIA combines precision mixing with infectious stage presence.
                        </p>
                    </div>

                    {/* Interactive Stat Counters */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/10">
                        {stats.map((s, idx) => (
                            <div key={idx} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-[var(--accent-primary)]/30 transition-colors">
                                <span className="text-2xl md:text-3xl font-black text-white font-mono block">
                                    {s.value}
                                </span>
                                <span className="text-[10px] uppercase font-bold tracking-wider text-white/40 block mt-1 leading-snug">
                                    {s.label}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Link to Full Story Page */}
                    <div className="pt-2 flex items-center gap-4">
                        <Link
                            href="/about"
                            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--accent-secondary)] hover:text-white transition-colors group"
                        >
                            <span>Read Full Artist Biography</span>
                            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </Link>
                    </div>

                </div>

            </div>
        </section>
    );
}

export function RabiaZonersSection() {
    const [activeGenreIndex, setActiveGenreIndex] = useState(0);

    const genres = [
        { 
            name: "Techno", 
            color: "var(--accent-primary)", 
            bpm: "134-138 BPM",
            desc: "Driving industrial kicks, dark rolling basslines, and raw peak-time energy that commands underground warehouse floors.",
            trackIndex: 0
        },
        { 
            name: "Melodic Tech", 
            color: "var(--accent-secondary)", 
            bpm: "126-130 BPM",
            desc: "Emotional synth leads, atmospheric pads, and cinematic build-ups engineered for twilight festival sets.",
            trackIndex: 1
        },
        { 
            name: "Afro House", 
            color: "#eab308", 
            bpm: "122-125 BPM",
            desc: "Organic polyrhythms, deep tribal percussion, and soulful grooves with hypnotic low-end warmth.",
            trackIndex: 3
        },
        { 
            name: "Hard Groove", 
            color: "#a855f7", 
            bpm: "136-140 BPM",
            desc: "Relentless percussion, bouncy funk-infused cadence, and fast 90s techno nostalgia with modern clarity.",
            trackIndex: 2
        },
    ];

    const current = genres[activeGenreIndex];

    return (
        <section className="py-24 md:py-36 relative px-6 md:px-12 border-t border-white/5 bg-[#050505]/40 backdrop-blur-md">
            <div className="max-w-[1800px] mx-auto w-full flex flex-col gap-14 relative z-10">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/30 text-[var(--accent-primary)] text-[10px] font-bold uppercase tracking-[0.3em] mb-4">
                            [ Sound Identity ]
                        </div>
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter text-white uppercase truus-heading">
                            Rabia Zoners <br /><span className="text-stroke-white">Signature Soundscapes</span>
                        </h2>
                    </div>

                    <p className="text-xs md:text-sm text-white/50 max-w-md font-medium">
                        Click any genre below to preview the frequency profile and sonic characteristics engineered for each crowd moment.
                    </p>
                </div>

                {/* Genre Selector Tabs */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {genres.map((g, i) => (
                        <button
                            key={i}
                            onClick={() => setActiveGenreIndex(i)}
                            className={`p-6 rounded-2xl border text-left transition-all duration-300 relative overflow-hidden ${
                                activeGenreIndex === i
                                    ? "bg-white/[0.08] border-[var(--accent-primary)] shadow-[0_0_25px_rgba(255,0,85,0.25)] -translate-y-1"
                                    : "bg-white/[0.02] border-white/10 hover:border-white/30 hover:bg-white/[0.04]"
                            }`}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <span 
                                    className="w-2.5 h-2.5 rounded-full animate-pulse"
                                    style={{ backgroundColor: g.color, boxShadow: `0 0 10px ${g.color}` }}
                                />
                                <span className="text-[10px] font-mono text-white/40">{g.bpm}</span>
                            </div>
                            <h3 className="text-xl font-black uppercase text-white truus-heading tracking-tight mb-1">
                                {g.name}
                            </h3>
                            <span className="text-[9px] uppercase tracking-widest text-white/40 font-mono block mt-2">
                                {activeGenreIndex === i ? "● Selected Profile" : "Click to View"}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Active Genre Deep Dive Banner */}
                <div className="p-8 md:p-10 rounded-3xl bg-gradient-to-r from-white/[0.04] to-transparent border border-white/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div className="space-y-2 max-w-3xl">
                        <div className="flex items-center gap-3">
                            <span className="text-xs font-mono font-bold text-[var(--accent-primary)] uppercase tracking-widest">
                                Active Profile: {current.name}
                            </span>
                            <span className="text-white/30">•</span>
                            <span className="text-xs font-mono text-white/50">{current.bpm}</span>
                        </div>
                        <p className="text-base md:text-lg text-white/80 font-medium leading-relaxed">
                            {current.desc}
                        </p>
                    </div>

                    <button
                        onClick={openBookingModal}
                        className="px-6 py-3.5 rounded-full bg-[var(--accent-primary)] hover:bg-[#ff1a6b] text-white text-xs font-bold uppercase tracking-widest transition-all shadow-[0_0_15px_rgba(255,0,85,0.4)] flex items-center gap-2 shrink-0"
                    >
                        <Calendar className="w-4 h-4" />
                        <span>Book for This Sound</span>
                    </button>
                </div>

            </div>
        </section>
    );
}

export function EventsSection() {
    const venues = [
        { name: "Opa!", city: "Mumbai", role: "Headline Set", vibe: "Peak Time Techno Rave", status: "Recent Hit" },
        { name: "Waikiki", city: "Goa", role: "Residency Night", vibe: "Hypnotic Sunset to Twilight", status: "Club Residency" },
        { name: "Baglami", city: "Delhi", role: "Main Stage Guest", vibe: "Melodic & Raw Frequencies", status: "Guest Mix" },
        { name: "Takumi", city: "Mumbai", role: "Underground Special", vibe: "Dark Industrial Techno", status: "Sold Out" },
        { name: "Akina", city: "Bandra", role: "Curated Showcase", vibe: "Afro Tech & Deep House", status: "VIP Night" },
        { name: "Vamos", city: "Goa", role: "Warehouse Closer", vibe: "Hard Groove & Fast Cadence", status: "Archive" },
    ];

    return (
        <section className="py-24 md:py-36 relative px-6 md:px-12 border-t border-white/5" id="shows">
            <div className="max-w-[1800px] mx-auto w-full relative z-10">

                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/30 text-[var(--accent-primary)] text-[10px] font-bold uppercase tracking-[0.3em] mb-4">
                            [ Stage Archive ]
                        </div>
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter text-white uppercase truus-heading">
                            Global Stages <br /><span className="text-stroke-white">& Premier Residencies</span>
                        </h2>
                    </div>

                    <button
                        onClick={openBookingModal}
                        className="self-start md:self-end flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 hover:border-[var(--accent-primary)] hover:bg-[var(--accent-primary)]/10 text-white font-bold text-xs uppercase tracking-widest transition-all"
                    >
                        <Calendar className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                        <span>Book for Your City</span>
                    </button>
                </div>

                {/* Interactive Venues Table */}
                <div className="flex flex-col gap-3">
                    {venues.map((v, i) => (
                        <div 
                            key={i}
                            className="group p-6 rounded-2xl bg-white/[0.015] border border-white/5 hover:border-[var(--accent-primary)]/50 hover:bg-white/[0.04] transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4"
                        >
                            <div className="flex items-center gap-6">
                                <span className="font-mono text-xs md:text-sm font-bold text-white/20 group-hover:text-[var(--accent-primary)] transition-colors w-8">
                                    0{i + 1}
                                </span>
                                <div>
                                    <div className="flex items-center gap-3">
                                        <h3 className="text-2xl md:text-3xl font-black uppercase text-white truus-heading tracking-tight group-hover:text-[var(--accent-secondary)] transition-colors">
                                            {v.name}
                                        </h3>
                                        <span className="text-[10px] uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-white/10 text-white/70 font-mono">
                                            {v.city}
                                        </span>
                                    </div>
                                    <p className="text-xs text-white/50 mt-1 font-mono">
                                        {v.vibe}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between md:justify-end gap-4 ml-14 md:ml-0">
                                <span className={`text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full border ${
                                    v.status === "Sold Out" 
                                        ? "border-red-500/40 text-red-400 bg-red-500/10"
                                        : "border-white/15 text-white/70 bg-white/5"
                                }`}>
                                    {v.status}
                                </span>

                                <button
                                    onClick={openBookingModal}
                                    className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-white/70 hover:text-white hover:bg-white/10 transition-colors border border-transparent hover:border-white/20 flex items-center gap-1.5"
                                >
                                    <span>Inquire Date</span>
                                    <ArrowUpRight className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}

export const ReleasesSection = ScrollRevealSection;
export { ScrollRevealSection };

export function RidersSection() {
    const [activeTab, setActiveTab] = useState<"tech" | "hospitality" | "soundcheck">("tech");
    const [copied, setCopied] = useState(false);

    const techSpecs = [
        "2x Pioneer CDJ 2000 Nexus 2 (or CDJ 3000)",
        "1x Pioneer DJM 900 Nexus 2 Mixer",
        "1x High-Powered Booth Stage Monitor (Independent Volume Control)",
        "Proper Booth Lighting (Dimmer control, non-strobe in booth)",
        "2x RCA / Ethernet Link Cables connected between CDJs"
    ];

    const copySpecs = () => {
        navigator.clipboard.writeText(techSpecs.join("\n"));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section className="py-24 md:py-36 relative px-6 md:px-12 border-t border-white/5 bg-[#050505]/50 backdrop-blur-md" id="riders">
            <div className="max-w-[1600px] mx-auto w-full relative z-10">

                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-secondary)]/10 border border-[var(--accent-secondary)]/30 text-[var(--accent-secondary)] text-[10px] font-bold uppercase tracking-[0.3em] mb-4">
                            [ Performance Rider ]
                        </div>
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter text-white uppercase truus-heading">
                            Technical & <br /><span className="text-[var(--accent-primary)]">Hospitality Specs</span>
                        </h2>
                    </div>

                    {/* Interactive Tab Switcher */}
                    <div className="flex items-center gap-2 bg-white/5 p-1.5 rounded-2xl border border-white/10 self-start md:self-end">
                        <button
                            onClick={() => setActiveTab("tech")}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                                activeTab === "tech" 
                                    ? "bg-[var(--accent-primary)] text-white shadow-[0_0_15px_rgba(255,0,85,0.4)]" 
                                    : "text-white/60 hover:text-white"
                            }`}
                        >
                            <Sliders className="w-3.5 h-3.5" />
                            <span>Tech Rider</span>
                        </button>

                        <button
                            onClick={() => setActiveTab("hospitality")}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                                activeTab === "hospitality" 
                                    ? "bg-[var(--accent-secondary)] text-black shadow-[0_0_15px_rgba(0,240,255,0.4)]" 
                                    : "text-white/60 hover:text-white"
                            }`}
                        >
                            <Coffee className="w-3.5 h-3.5" />
                            <span>Hospitality</span>
                        </button>

                        <button
                            onClick={() => setActiveTab("soundcheck")}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                                activeTab === "soundcheck" 
                                    ? "bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.4)]" 
                                    : "text-white/60 hover:text-white"
                            }`}
                        >
                            <ShieldCheck className="w-3.5 h-3.5" />
                            <span>Sound Check</span>
                        </button>
                    </div>
                </div>

                {/* Tab 1: Tech Rider */}
                {activeTab === "tech" && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in">
                        <div className="lg:col-span-8 p-8 md:p-10 rounded-3xl bg-white/[0.02] border border-white/10 flex flex-col justify-between">
                            <div>
                                <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
                                    <span className="text-xs uppercase font-bold tracking-widest text-[var(--accent-secondary)]">
                                        Standard Club & Festival Setup
                                    </span>
                                    <button
                                        onClick={copySpecs}
                                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-white/80 transition-colors"
                                    >
                                        {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                                        <span>{copied ? "Copied!" : "Copy Specs"}</span>
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    {techSpecs.map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-4 py-3 border-b border-white/5">
                                            <span className="font-mono text-xs text-[var(--accent-primary)] font-bold w-6">
                                                0{idx + 1}
                                            </span>
                                            <span className="text-base md:text-xl font-bold uppercase tracking-tight text-white/90">
                                                {item}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                                <span className="text-xs text-white/50 font-mono">
                                    * Promoter / Venue agrees to provide all equipment in perfect working order.
                                </span>
                                <a
                                    href="https://drive.google.com/drive/folders/18JGyjN8uICNcoXvTnmijQX70EYcn7Tj3?usp=sharing"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--accent-primary)] hover:text-white transition-colors"
                                >
                                    <Download className="w-3.5 h-3.5" />
                                    <span>Download PDF Spec Sheet</span>
                                </a>
                            </div>
                        </div>

                        {/* Tech Safety Card */}
                        <div className="lg:col-span-4 flex flex-col gap-6">
                            <div className="p-8 rounded-3xl bg-[var(--accent-primary)]/[0.04] border border-[var(--accent-primary)]/30 flex flex-col gap-4">
                                <h4 className="text-lg font-black uppercase tracking-tight text-white">Emergency Support</h4>
                                <p className="text-xs text-white/60 leading-relaxed font-mono">
                                    A qualified audio technician familiar with Pioneer DJ gear must be present on site from sound check through set completion.
                                </p>
                            </div>

                            <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 flex flex-col gap-4">
                                <h4 className="text-lg font-black uppercase tracking-tight text-white">Stage Monitor Protocol</h4>
                                <p className="text-xs text-white/60 leading-relaxed font-mono">
                                    High-power booth wedge or stereo pair at ear height, free of distortion with immediate gain control at the mixer.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Tab 2: Hospitality Rider */}
                {activeTab === "hospitality" && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in">
                        <div className="p-8 md:p-10 rounded-3xl bg-white/[0.02] border border-white/10 flex flex-col gap-6">
                            <h3 className="text-2xl font-black uppercase text-white truus-heading tracking-tight flex items-center justify-between">
                                <span>Travel & Accommodation</span>
                                <span className="text-xs text-[var(--accent-secondary)] font-mono">Domestic & Int.</span>
                            </h3>
                            <ul className="space-y-4 font-mono text-sm text-white/70">
                                <li className="flex gap-4 p-3 bg-white/5 rounded-xl border border-white/5">
                                    <span className="text-[var(--accent-secondary)] font-bold">01</span>
                                    <span>Flights: Booked under name <strong className="text-white">Saniya</strong> (Standard Direct where possible)</span>
                                </li>
                                <li className="flex gap-4 p-3 bg-white/5 rounded-xl border border-white/5">
                                    <span className="text-[var(--accent-secondary)] font-bold">02</span>
                                    <span>Hotel: 4 or 5-Star Hotel (King Room, High Floor, Late Checkout)</span>
                                </li>
                                <li className="flex gap-4 p-3 bg-white/5 rounded-xl border border-white/5">
                                    <span className="text-[var(--accent-secondary)] font-bold">03</span>
                                    <span>Meal Allowance: 5,000 INR per diem / proper catering</span>
                                </li>
                                <li className="flex gap-4 p-3 bg-white/5 rounded-xl border border-white/5">
                                    <span className="text-[var(--accent-secondary)] font-bold">04</span>
                                    <span>Ground Transfers: Dedicated Innova Crysta or premium sedan</span>
                                </li>
                            </ul>
                        </div>

                        <div className="p-8 md:p-10 rounded-3xl bg-white/[0.02] border border-white/10 flex flex-col gap-6">
                            <h3 className="text-2xl font-black uppercase text-white truus-heading tracking-tight flex items-center justify-between">
                                <span>Green Room & Stage Drinks</span>
                                <span className="text-xs text-[var(--accent-primary)] font-mono">Booth Provisions</span>
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    { item: "1x Grey Goose / Premium Vodka", desc: "Sealed Bottle" },
                                    { item: "4x Red Bull (Chilled)", desc: "Energy" },
                                    { item: "4x Mineral Waters", desc: "Still & Room Temp" },
                                    { item: "Clean Black Towels", desc: "2x Fresh for Booth" },
                                ].map((drink, i) => (
                                    <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10">
                                        <span className="text-xs font-bold uppercase tracking-wider text-white block">
                                            {drink.item}
                                        </span>
                                        <span className="text-[10px] text-white/40 font-mono mt-1 block">
                                            {drink.desc}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Tab 3: Sound Check */}
                {activeTab === "soundcheck" && (
                    <div className="p-8 md:p-12 rounded-3xl bg-white/[0.02] border border-white/10 max-w-4xl mx-auto flex flex-col gap-6 animate-fade-in">
                        <div className="flex items-center gap-3">
                            <ShieldCheck className="w-6 h-6 text-emerald-400" />
                            <h3 className="text-2xl font-black uppercase text-white truus-heading tracking-tight">
                                Mandatory Sound Check Protocol
                            </h3>
                        </div>
                        <p className="text-sm md:text-base text-white/70 leading-relaxed font-mono">
                            A minimum 45-minute sound check is required prior to club doors opening or during non-operational festival hours. 
                            The artist requires direct testing of sub-bass frequency response, booth monitor delay calibration, and USB Pro DJ Link connectivity.
                        </p>
                        <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                            <span className="text-xs text-white/40 font-mono">Questions? Contact Management directly.</span>
                            <button
                                onClick={openBookingModal}
                                className="px-6 py-2.5 rounded-full bg-[var(--accent-primary)] text-white text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-opacity"
                            >
                                Contact Sound Team
                            </button>
                        </div>
                    </div>
                )}

            </div>
        </section>
    );
}

export function FooterSection() {
    return (
        <footer className="pt-24 pb-16 px-6 md:px-12 relative overflow-hidden flex flex-col justify-end border-t border-white/10 bg-[#020202]">
            {/* Background Ambience */}
            <div className="absolute bottom-0 right-1/4 w-[600px] h-[300px] bg-[var(--accent-primary)] rounded-full blur-[200px] opacity-[0.05] pointer-events-none" />
            <div className="absolute bottom-0 left-1/4 w-[500px] h-[300px] bg-[var(--accent-secondary)] rounded-full blur-[200px] opacity-[0.04] pointer-events-none" />

            <div className="max-w-[1800px] mx-auto w-full relative z-10">

                {/* Massive CTA */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 items-center">
                    <div className="lg:col-span-7">
                        <span className="text-[10px] text-white/40 tracking-[0.4em] uppercase font-bold mb-4 block border-l-2 border-[var(--accent-primary)] pl-3">
                            Worldwide Booking & Representation
                        </span>
                        <h2 className="text-[12vw] lg:text-[8vw] font-black uppercase truus-heading tracking-tighter text-white leading-none">
                            Book <br />
                            <button 
                                onClick={openBookingModal}
                                className="text-stroke-accent hover:text-[var(--accent-primary)] transition-all duration-300 text-left inline-flex items-center gap-4 group"
                            >
                                DJ RABIA
                                <ArrowUpRight className="w-10 h-10 lg:w-20 lg:h-20 text-[var(--accent-primary)] opacity-0 group-hover:opacity-100 group-hover:-translate-y-2 group-hover:translate-x-2 transition-all duration-300" />
                            </button>
                        </h2>
                    </div>

                    <div className="lg:col-span-5 flex flex-col gap-8 lg:items-end justify-center">
                        <div className="flex flex-col lg:text-right">
                            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[var(--accent-primary)] mb-1">
                                Artist Management
                            </span>
                            <a 
                                href="mailto:darshak@andfriends.in" 
                                className="text-base md:text-xl font-bold tracking-wider text-white hover:text-[var(--accent-primary)] transition-colors"
                            >
                                darshak@andfriends.in
                            </a>
                        </div>

                        <div className="flex flex-col lg:text-right">
                            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[var(--accent-secondary)] mb-1">
                                Direct Bookings Hotline
                            </span>
                            <a 
                                href="tel:+919594691939" 
                                className="text-2xl md:text-3xl font-black tracking-tight truus-heading text-white hover:text-[var(--accent-secondary)] transition-colors"
                            >
                                +91 9594 691939
                            </a>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <button
                                onClick={openBookingModal}
                                className="px-6 py-3.5 rounded-full bg-[var(--accent-primary)] text-white font-bold text-xs uppercase tracking-widest hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(255,0,85,0.4)]"
                            >
                                Send Inquiry Form
                            </button>

                            <a 
                                href="https://drive.google.com/drive/folders/18JGyjN8uICNcoXvTnmijQX70EYcn7Tj3?usp=sharing" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-widest transition-colors flex items-center gap-2 border border-white/10"
                            >
                                <Download className="w-4 h-4" />
                                <span>Download EPK</span>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/10 w-full flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-[11px] text-white/40 uppercase tracking-[0.2em] font-mono text-center md:text-left">
                        © {new Date().getFullYear()} DJ RABIA. All Rights Reserved. Managed by Darshak & Friends.
                    </div>

                    {/* Social Media Links */}
                    <div className="flex gap-3">
                        {[
                            { icon: <Instagram className="w-4 h-4" />, url: "https://instagram.com", label: "Instagram" },
                            { icon: <Youtube className="w-4 h-4" />, url: "https://youtube.com", label: "YouTube" },
                            { icon: <Twitter className="w-4 h-4" />, url: "https://twitter.com", label: "Twitter" },
                            { icon: <Disc3 className="w-4 h-4" />, url: "https://soundcloud.com", label: "SoundCloud" },
                        ].map((social, i) => (
                            <a 
                                key={i} 
                                href={social.url} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                aria-label={social.label}
                                className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center text-white/50 hover:text-[var(--accent-primary)] hover:border-[var(--accent-primary)] transition-all bg-white/[0.02]"
                            >
                                {social.icon}
                            </a>
                        ))}
                    </div>
                </div>

            </div>
        </footer>
    );
}

export { InteractiveGallery };
