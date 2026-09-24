"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { MessageCircle, Menu, X, Calendar, Sparkles } from "lucide-react";
import clsx from "clsx";
import { openBookingModal } from "./BookingModal";

export function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 40);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const links = [
        { title: "Home", href: "/" },
        { title: "Story", href: "/about" },
        { title: "Music & Tour", href: "/products" },
        { title: "Gallery", href: "/#gallery" },
        { title: "Tech Rider", href: "/#riders" },
    ];

    return (
        <header className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl transition-all duration-500 pointer-events-auto">
            {/* Main Header Capsule */}
            <div className={clsx(
                "rounded-full flex items-center justify-between px-6 py-3.5 border transition-all duration-500",
                scrolled 
                    ? "bg-[#050505]/85 backdrop-blur-2xl border-white/20 shadow-[0_15px_40px_rgba(0,0,0,0.8),0_0_20px_rgba(255,0,85,0.15)]" 
                    : "bg-white/[0.04] backdrop-blur-xl border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
            )}>
                
                {/* Brand Logo */}
                <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent-primary)] animate-pulse shadow-[0_0_12px_var(--accent-primary)]" />
                    <Link href="/" className="group flex items-center gap-2">
                        <span className="text-sm md:text-base font-black tracking-[0.25em] text-white uppercase font-body group-hover:text-[var(--accent-secondary)] transition-colors">
                            DJ RABIA
                        </span>
                        <span className="hidden sm:inline-block text-[9px] font-mono tracking-widest text-white/40 uppercase bg-white/5 px-2 py-0.5 rounded-full border border-white/10">
                            TECHNO
                        </span>
                    </Link>
                </div>

                {/* Desktop Links */}
                <nav className="hidden md:flex gap-7 items-center" aria-label="Main Navigation">
                    {links.map((link, i) => (
                        <Link 
                            key={i} 
                            href={link.href} 
                            className="text-xs uppercase font-bold tracking-[0.2em] text-white/60 hover:text-white transition-colors relative group py-1"
                        >
                            {link.title}
                            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[var(--accent-primary)] transition-all duration-300 group-hover:w-full" />
                        </Link>
                    ))}
                </nav>

                {/* Right Actions */}
                <div className="hidden md:flex items-center gap-3">
                    <button
                        onClick={openBookingModal}
                        className="flex items-center gap-2 bg-[var(--accent-primary)] hover:bg-[#ff1a6b] text-white px-4 py-2 rounded-full font-bold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(255,0,85,0.35)] transition-all hover:scale-105 active:scale-95"
                    >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Book Artist</span>
                    </button>

                    <a
                        href="https://wa.me/919594691939"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full border border-white/10 hover:border-emerald-500/50 hover:bg-emerald-500/10 text-white/80 hover:text-emerald-400 transition-all"
                        aria-label="Direct WhatsApp Message"
                    >
                        <MessageCircle className="w-4 h-4" />
                    </a>
                </div>

                {/* Mobile Hamburger Button */}
                <button 
                    className="md:hidden text-white/90 p-2 rounded-xl bg-white/5 border border-white/10"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                >
                    {mobileMenuOpen ? <X className="w-5 h-5 text-[var(--accent-primary)]" /> : <Menu className="w-5 h-5" />}
                </button>
            </div>

            {/* Mobile Dropdown Drawer */}
            <div className={clsx(
                "md:hidden absolute top-full left-0 w-full mt-3 rounded-3xl overflow-hidden transition-all duration-500 ease-in-out border",
                mobileMenuOpen 
                    ? "opacity-100 max-h-[450px] pointer-events-auto border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.95)]" 
                    : "opacity-0 max-h-0 pointer-events-none border-transparent"
            )}>
                <div className="p-6 flex flex-col gap-3 bg-[#0a0a0e]/95 backdrop-blur-3xl">
                    <div className="flex items-center justify-between pb-3 border-b border-white/10 text-[10px] uppercase font-bold tracking-widest text-white/40">
                        <span>Navigation</span>
                        <Sparkles className="w-3.5 h-3.5 text-[var(--accent-secondary)]" />
                    </div>

                    {links.map((link, i) => (
                        <Link 
                            key={i} 
                            href={link.href} 
                            onClick={() => setMobileMenuOpen(false)}
                            className="text-sm uppercase font-bold tracking-[0.2em] text-white/80 hover:text-[var(--accent-primary)] py-2 border-b border-white/5 flex items-center justify-between"
                        >
                            <span>{link.title}</span>
                            <span className="text-[10px] font-mono text-white/30">0{i + 1}</span>
                        </Link>
                    ))}

                    <div className="pt-2 flex flex-col gap-2.5">
                        <button
                            onClick={() => {
                                setMobileMenuOpen(false);
                                openBookingModal();
                            }}
                            className="w-full py-3 rounded-2xl bg-[var(--accent-primary)] text-white font-bold text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(255,0,85,0.4)] flex items-center justify-center gap-2"
                        >
                            <Calendar className="w-4 h-4" />
                            <span>Book DJ Rabia</span>
                        </button>

                        <a 
                            href="https://wa.me/919594691939" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="w-full py-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2"
                        >
                            <MessageCircle className="w-4 h-4 text-emerald-400" />
                            <span>WhatsApp Management</span>
                        </a>
                    </div>
                </div>
            </div>

        </header>
    );
}
