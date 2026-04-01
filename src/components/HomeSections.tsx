"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { Download, Instagram, Youtube, Twitter, Disc3, ArrowUpRight } from "lucide-react";

export function HeroSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        if (!textRef.current) return;
        gsap.fromTo(textRef.current,
            { y: 100, opacity: 0, scale: 0.9 },
            { y: 0, opacity: 1, scale: 1, duration: 2, ease: "power4.out", delay: 0.5 }
        );
    }, []);

    return (
        <section ref={sectionRef} className="cinematic-section relative">
            {/* Cinematic Background */}
            <div className="absolute inset-0 bg-black opacity-40 mix-blend-luminosity">
                <Image src="/img/r10.JPG" alt="Rabia Background" fill className="object-cover object-center filter grayscale" priority sizes="100vw" />
            </div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/50" />

            <div className="absolute top-16 left-0 right-0 z-10 flex flex-col items-center md:relative md:top-auto md:justify-center md:mt-20 w-full px-4">
                <div className="border border-white/20 px-4 py-1.5 rounded-full font-bold text-[10px] tracking-[0.4em] uppercase inline-flex items-center gap-3 bg-black/50 backdrop-blur-md text-white/80 mb-8 self-center shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)] animate-pulse shadow-[0_0_10px_var(--accent-primary)]" />
                    Press Kit
                </div>

                <h1 ref={textRef} className="truus-heading text-[15vw] md:text-[18vw] font-black uppercase tracking-tighter text-white drop-shadow-2xl m-0 leading-none text-center mix-blend-difference">
                    RABI<span className="text-[var(--accent-primary)]">A</span>
                </h1>

                <p className="text-sm md:text-xl text-white/60 font-medium tracking-[0.5em] -mt-4 md:-mt-[8vw] uppercase text-center mx-auto">
                    The Ultimate Techno Experience
                </p>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
                <span className="text-[9px] uppercase tracking-[0.3em] font-bold">Scroll to discover</span>
                <div className="w-[1px] h-12 bg-white/30 overflow-hidden">
                    <div className="w-full h-1/2 bg-[var(--accent-primary)] animate-pulse" />
                </div>
            </div>
        </section>
    );
}

export function BiographySection() {
    return (
        <section className="cinematic-section py-24 md:py-32 px-6 md:px-12 relative" id="biography">
            <div className="max-w-[1800px] mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
                {/* Left Side: Image */}
                <div className="relative aspect-[3/4] md:aspect-square w-full max-w-xl mx-auto overflow-hidden group">
                    <Image src="/img/r11.JPG" alt="Visionary Artist" fill className="object-cover object-top filter grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100" sizes="(max-width: 768px) 100vw, 50vw" />
                    <div className="absolute inset-0 bg-[var(--accent-primary)]/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                    {/* Corner accents */}
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[var(--accent-primary)] opacity-50" />
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[var(--accent-primary)] opacity-50" />
                </div>

                {/* Right Side: Content */}
                <div className="flex flex-col gap-8 flex-grow">
                    <span className="text-[var(--accent-primary)] font-bold tracking-[0.5em] uppercase text-[10px]">
                        [ Origin ]
                    </span>

                    <h3 className="text-3xl md:text-5xl lg:text-[4.7rem] font-black tracking-tighter text-white uppercase truus-heading break-words">
                        Visionary<br className="hidden md:block" /> <span className="text-stroke-white hover-glow transition-all duration-300">Artist</span>
                    </h3>

                    <p className="text-base md:text-xl text-white/50 font-medium leading-relaxed font-body max-w-xl border-l border-white/10 pl-6 py-2">
                        My journey began on the dance floor.
                        For the past 8 years in PR, I&apos;ve honed the ability to read crowds and respond instinctively,
                        crafting sets that shape the future of techno.
                    </p>
                </div>
            </div>
        </section>
    );
}

export function RabiaZonersSection() {
    const genres = [
        { name: "Techno", color: "var(--accent-primary)" },
        { name: "Afro", color: "var(--accent-secondary)" },
        { name: "House", color: "white" },
        { name: "Melodic Tech", color: "var(--accent-primary)" },
        { name: "Afro House", color: "var(--accent-secondary)" },
    ];

    const images = [
        "/img/r10.JPG",
        "/img/r12.JPG",
        "/img/r13.JPG",
    ];

    return (
        <section className="py-24 md:py-32 relative px-6 md:px-12 border-y border-white/5 bg-[#050505]/20 backdrop-blur-md">
            <div className="max-w-[1800px] mx-auto w-full flex flex-col gap-16 relative z-10">

                {/* Header & Badges */}
                <div className="flex flex-col gap-6 w-full lg:w-1/2">
                    <span className="text-[var(--accent-primary)] font-bold tracking-[0.5em] uppercase text-[10px]">
                        [ Rabia Zoners ]
                    </span>

                    <h3 className="text-3xl md:text-5xl lg:text-[4.7rem] font-black tracking-tighter text-white uppercase truus-heading break-words">
                        Signature <br /><span className="text-stroke-white">Soundscapes</span>
                    </h3>

                    <div className="flex flex-wrap gap-3 mt-4">
                        {genres.map((g, i) => (
                            <div key={i} className="glass-panel px-5 py-2.5 rounded-full border border-white/10 flex items-center gap-3 group hover:border-white/40 transition-all cursor-pointer">
                                <span className="w-1.5 h-1.5 rounded-full animate-pulse shadow-xl" style={{ backgroundColor: g.color, boxShadow: `0 0 10px ${g.color}` }} />
                                <span className="text-xs uppercase font-bold tracking-[0.2em] text-white/70 group-hover:text-white transition-colors">
                                    {g.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Photo Collage */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full">
                    {images.map((img, i) => (
                        <div key={i} className={`relative overflow-hidden group rounded-2xl ${i === 1 ? "aspect-square mt-0 md:mt-12" : "aspect-[3/4]"}`}>
                            <Image src={img} alt={`Live Archive ${i + 1}`} fill className="object-cover object-center filter grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100" sizes="(max-width: 768px) 100vw, 33vw" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-white">Live Archive #{i + 1}</span>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}

export function VisualsSection() {
    const images = [
        "/img/r2.JPG",
        "/img/r3.JPG",
        "/img/r4.JPG",
        "/img/r5.JPG",
        "/img/r6.JPG",
        "/img/r7.JPG",
        "/img/r9.JPG",
        "/img/r11.JPG",
        "/img/r15.JPG",
    ];

    return (
        <section className="py-24 relative overflow-hidden bg-transparent border-y border-white/5" id="visuals">
            <div className="absolute inset-0 bg-[#050505]/40 backdrop-blur-sm pointer-events-none" />

            <div className="max-w-[1800px] w-full mx-auto px-6 md:px-12 mb-16 flex justify-between items-center relative z-10">
                <span className="text-[var(--accent-secondary)] font-bold tracking-[0.5em] uppercase text-[10px]">
                    [ Live Energy & Moments ]
                </span>
                <span className="text-xs uppercase font-medium tracking-[0.3em] text-white/40 hidden md:block">
                    Archive
                </span>
            </div>

            <div className="marquee-container group w-full h-[400px] md:h-[600px] relative z-10">
                <div className="marquee-content group-hover:[animation-play-state:paused] gap-4 md:gap-8 px-4" style={{ animationDuration: '40s' }}>
                    {[...images, ...images].map((img, i) => (
                        <div key={i} className="relative h-full aspect-[4/5] md:aspect-[3/4] overflow-hidden rounded-2xl shrink-0 group/img filter grayscale hover:grayscale-0 transition-all duration-700 cursor-none border border-white/5">
                            <Image src={img} alt={`Live Show ${i}`} fill className="object-cover object-center scale-105 group-hover/img:scale-100 transition-transform duration-1000" sizes="(max-width: 768px) 50vw, 25vw" loading="lazy" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Center overlay glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--accent-secondary)] rounded-full blur-[200px] opacity-5 pointer-events-none z-0" />
        </section>
    );
}

export function EventsSection() {
    const clubs = ["Opa!", "Baglami", "Waikiki", "Takumi", "Akina", "Vamos"];

    return (
        <section className="py-32 relative overflow-hidden flex flex-col justify-center border-y border-white/5" id="shows">
            <div className="absolute inset-0 bg-[#050505]/40 backdrop-blur-sm pointer-events-none" />
            <div className="max-w-[1800px] w-full mx-auto px-6 md:px-12 mb-16 flex justify-between items-center relative z-10">
                <span className="text-[var(--accent-primary)] font-bold tracking-[0.5em] uppercase text-[10px]">
                    [ Global Stages ]
                </span>
                <span className="text-xs uppercase font-medium tracking-[0.3em] text-white/40">
                    Recent
                </span>
            </div>

            <div className="w-full flex flex-col gap-6 md:gap-12 relative z-10">
                <div className="marquee-container opacity-90 hover:opacity-100 transition-opacity">
                    <div className="marquee-content gap-12 md:gap-24">
                        {[...clubs, ...clubs].map((club, i) => (
                            <span key={i} className="text-6xl md:text-9xl font-black uppercase tracking-tighter text-transparent text-stroke-white truus-heading hover:text-stroke-accent hover:text-[var(--accent-primary)] transition-all duration-500 cursor-none">
                                {club}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="marquee-container opacity-40 hover:opacity-100 transition-opacity" style={{ lineHeight: 0.9 }}>
                    <div className="marquee-content gap-12 md:gap-24" style={{ animationDirection: 'reverse', animationDuration: '40s' }}>
                        {[...clubs, ...clubs].reverse().map((club, i) => (
                            <span key={i} className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-white truus-heading hover:text-[var(--accent-secondary)] transition-colors duration-500 cursor-none">
                                {club}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Background huge glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-[var(--accent-primary)] rounded-[100%] blur-[150px] opacity-5 pointer-events-none" />
        </section>
    );
}

export function ReleasesSection() {
    const tracks = [
        { title: "Neon Genesis", duration: "6:42", label: "Drumcode" },
        { title: "Velocity", duration: "7:15", label: "Afterlife" },
        { title: "Dark Matter", duration: "5:58", label: "EXHALE" },
        { title: "Cyberia", duration: "6:10", label: "Terminal M" }
    ];

    return (
        <section className="py-24 md:py-32 relative px-6 md:px-12">
            <div className="max-w-[1200px] mx-auto w-full flex flex-col relative z-10">
                <div className="flex justify-between items-end mb-16 border-b border-white/10 pb-8">
                    <h2 className="text-3xl md:text-5xl lg:text-[4.7rem] font-black tracking-tighter text-white uppercase truus-heading">
                        Sonic<br /><span className="text-[var(--accent-primary)]">Arsenal</span>
                    </h2>
                    <span className="text-white/40 font-bold tracking-[0.4em] uppercase text-[10px]">
                        [ Discography ]
                    </span>
                </div>

                <div className="flex flex-col gap-4 w-full">
                    {tracks.map((track, i) => (
                        <div key={i} className="group flex flex-col md:flex-row md:items-center justify-between p-6 bg-white/[0.01] border border-white/5 hover:bg-white/[0.03] hover:border-[var(--accent-primary)]/40 transition-all duration-300">

                            <div className="flex items-center gap-6">
                                <span className="font-mono text-xl md:text-3xl font-black text-white/10 group-hover:text-[var(--accent-primary)] transition-colors w-12 text-center">
                                    0{i + 1}
                                </span>

                                <div className="flex flex-col">
                                    <span className="text-xl md:text-3xl font-black text-white/80 group-hover:text-white uppercase tracking-tighter truus-heading transition-colors">
                                        {track.title}
                                    </span>
                                    <span className="text-[10px] md:text-xs text-[var(--accent-secondary)] uppercase font-bold tracking-[0.3em] mt-1 opacity-80">
                                        {track.label}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between md:justify-end gap-8 mt-4 md:mt-0 ml-18 md:ml-0">
                                {/* Simulated Equalizer */}
                                <div className="flex gap-1 items-end h-6 opacity-0 group-hover:opacity-100 transition-opacity">
                                    {[1, 2, 3, 4, 5].map((bar) => (
                                        <div key={bar} className="eq-bar w-1 bg-[var(--accent-primary)]" style={{ animationDuration: `${0.3 + (bar * 0.1)}s`, animationDelay: `${bar * 0.1}s` }} />
                                    ))}
                                </div>
                                <span className="font-mono text-sm text-white/40 group-hover:text-white transition-colors min-w-[3rem] text-right">
                                    {track.duration}
                                </span>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export function RidersSection() {
    return (
        <section className="py-24 md:py-32 relative px-6 md:px-12 border-y border-white/5" id="riders">
            <div className="absolute inset-0 bg-[#050505]/60 backdrop-blur-md pointer-events-none" />
            <div className="max-w-[1800px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 relative z-10">

                {/* Tech Rider */}
                <div className="flex flex-col">
                    <div className="flex justify-between items-center mb-12">
                        <span className="text-[var(--accent-secondary)] font-bold tracking-[0.4em] uppercase text-[10px]">
                            [ Tech Rider ]
                        </span>
                        <span className="text-[8px] uppercase tracking-[0.3em] bg-white/10 px-3 py-1 border border-white/10 rounded-full">
                            Promoter Provides All
                        </span>
                    </div>

                    <div className="flex flex-col gap-4">
                        {[
                            "1 DJM 900 Nexus 2",
                            "2 CDJ 2000 Nexus 2",
                            "1 Stage Monitor"
                        ].map((item, i) => (
                            <div key={i} className="flex flex-col pb-4 border-b border-white/5 group">
                                <span className="text-[10px] font-mono text-white/20 mb-1">0{i + 1}</span>
                                <span className="text-xl md:text-2xl font-black uppercase tracking-tighter text-white/70 group-hover:text-[var(--accent-secondary)] transition-colors truus-heading">
                                    {item}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="flex gap-6 mt-10">
                        <div className="p-4 bg-[var(--accent-secondary)]/5 border-l-2 border-[var(--accent-secondary)] w-1/2">
                            <h4 className="text-[9px] uppercase tracking-widest font-bold text-[var(--accent-secondary)] mb-2">Sound Check</h4>
                            <p className="text-xs text-white/50 leading-relaxed font-mono">Require slot in non-op hours with engineer.</p>
                        </div>
                        <div className="p-4 bg-[var(--accent-primary)]/5 border-l-2 border-[var(--accent-primary)] w-1/2">
                            <h4 className="text-[9px] uppercase tracking-widest font-bold text-[var(--accent-primary)] mb-2">Emergency</h4>
                            <p className="text-xs text-white/50 leading-relaxed font-mono">Technician must be present at all times.</p>
                        </div>
                    </div>
                </div>

                {/* Hospitality Rider */}
                <div className="flex flex-col">
                    <span className="text-[var(--accent-primary)] font-bold tracking-[0.4em] uppercase text-[10px] mb-12 block">
                        [ Hospitality ]
                    </span>

                    <div className="flex flex-col gap-8 h-full">
                        <div className="p-8 border border-white/10 bg-white/[0.01] hover:border-[var(--accent-primary)]/50 transition-colors group rounded-xl">
                            <h4 className="text-2xl font-black uppercase tracking-tighter text-white mb-6 flex items-center justify-between truus-heading">
                                Travel & Stay
                                <span className="text-[var(--accent-primary)] opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                            </h4>
                            <ul className="space-y-4 text-sm font-mono text-white/50 tracking-wide">
                                <li className="flex gap-4"><span className="text-[var(--accent-primary)]/50">01</span> Flights under <span className="text-white">Saniya</span></li>
                                <li className="flex gap-4"><span className="text-[var(--accent-primary)]/50">02</span> 4/5 Star Hotel (King Room)</li>
                                <li className="flex gap-4"><span className="text-[var(--accent-primary)]/50">03</span> 5000 INR Meal Allowance</li>
                                <li className="flex gap-4"><span className="text-[var(--accent-primary)]/50">04</span> Ground Transfer (Innova Crysta)</li>
                            </ul>
                        </div>

                        <div className="p-8 border border-white/10 bg-[var(--accent-primary)]/[0.02] hover:bg-[var(--accent-primary)]/[0.08] transition-colors rounded-xl">
                            <h4 className="text-xl font-bold uppercase tracking-[0.2em] text-[var(--accent-primary)] mb-4 text-xs">
                                Venue Requirements
                            </h4>
                            <ul className="flex flex-wrap gap-4">
                                <li className="px-4 py-2 border border-white/10 text-[10px] font-bold tracking-widest uppercase text-white rounded-full bg-white/5">1x Grey Goose</li>
                                <li className="px-4 py-2 border border-white/10 text-[10px] font-bold tracking-widest uppercase text-white rounded-full bg-white/5">4x Red Bull</li>
                                <li className="px-4 py-2 border border-white/10 text-[10px] font-bold tracking-widest uppercase text-white rounded-full bg-white/5">2x Waters</li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}

export function FooterSection() {
    return (
        <footer className="pt-24 pb-8 md:pt-32 md:pb-12 px-6 md:px-12 relative overflow-hidden flex flex-col justify-end min-h-[70vh]">
            {/* Background huge glow */}
            <div className="absolute bottom-0 right-1/4 w-[800px] h-[400px] bg-[var(--accent-primary)] rounded-[100%] blur-[200px] opacity-[0.06] pointer-events-none" />
            <div className="absolute bottom-0 left-1/4 w-[600px] h-[300px] bg-[var(--accent-secondary)] rounded-[100%] blur-[200px] opacity-[0.04] pointer-events-none" />

            <div className="max-w-[1800px] mx-auto w-full flex flex-col relative z-10 h-full">

                {/* Main Call To Action Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-24 flex-grow items-center">

                    {/* Massive Typography Left */}
                    <div className="lg:col-span-8 flex flex-col">
                        <span className="text-[10px] text-white/30 tracking-[0.4em] uppercase font-bold mb-6 block border-l border-[var(--accent-primary)] pl-4">
                            Let&apos;s Make It Happen
                        </span>
                        <h2 className="text-[14vw] lg:text-[10vw] font-black uppercase truus-heading tracking-tighter text-white">
                            Book<br />
                            <a href="mailto:darshak.shetty@peninsulagrand.co.in" className="text-stroke-accent hover:text-[var(--accent-primary)] transition-all duration-500 cursor-pointer flex items-center gap-4 group">
                                Artist
                                <ArrowUpRight className="w-12 h-12 lg:w-24 lg:h-24 text-[var(--accent-primary)] opacity-0 group-hover:opacity-100 group-hover:-translate-y-4 group-hover:translate-x-4 transition-all duration-500" />
                            </a>
                        </h2>
                    </div>

                    {/* Contact Details Right */}
                    <div className="lg:col-span-4 flex flex-col gap-12 lg:items-end justify-center">
                        <a href="mailto:darshak.shetty@peninsulagrand.co.in" className="flex flex-col group lg:text-right">
                            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[var(--accent-primary)] mb-2 group-hover:text-white transition-colors">Management Email</span>
                            <span className="text-sm md:text-lg font-bold tracking-widest text-white group-hover:text-[var(--accent-primary)] transition-colors">
                                darshak.shetty@<br />peninsulagrand.co.in
                            </span>
                        </a>

                        <a href="tel:+919594691939" className="flex flex-col group lg:text-right">
                            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[var(--accent-secondary)] mb-2 group-hover:text-white transition-colors">Direct Line</span>
                            <span className="text-2xl md:text-3xl font-black tracking-tighter truus-heading text-white group-hover:text-[var(--accent-secondary)] transition-colors">
                                +91 9594 691939
                            </span>
                        </a>

                        <a href="https://drive.google.com/drive/folders/18JGyjN8uICNcoXvTnmijQX70EYcn7Tj3?usp=sharing" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-white text-black px-6 py-4 font-black uppercase tracking-widest text-[10px] hover:bg-[var(--accent-primary)] hover:text-white transition-colors self-start lg:self-end mt-4">
                            <Download className="w-4 h-4" />
                            Download EPK
                        </a>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/10 w-full flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-mono">
                        © {new Date().getFullYear()} DJ RABIA. All Rights Reserved.<br className="md:hidden" /> <span className="hidden md:inline">|</span> Terms apply to all bookings.
                    </div>

                    <div className="flex gap-4">
                        {[
                            { icon: <Instagram className="w-4 h-4" />, url: "#" },
                            { icon: <Youtube className="w-4 h-4" />, url: "#" },
                            { icon: <Twitter className="w-4 h-4" />, url: "#" },
                            { icon: <Disc3 className="w-4 h-4" />, url: "#" },
                        ].map((social, i) => (
                            <a key={i} href={social.url} className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center text-white/40 hover:text-[var(--accent-primary)] hover:border-[var(--accent-primary)] transition-all bg-white/[0.01]">
                                {social.icon}
                            </a>
                        ))}
                    </div>
                </div>

            </div>
        </footer>
    );
}

