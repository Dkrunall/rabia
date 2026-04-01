"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { MessageCircle, Menu, X } from "lucide-react";
import clsx from "clsx";

export function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const links = [
        { title: "Home", href: "#" },
        { title: "Riders", href: "#riders" },
        { title: "Shows", href: "#shows" },
    ];

    return (
        <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-2xl transition-all duration-500">
            {/* Desktop & Mobile Main Pill */}
            <div className={clsx(
                "glass-panel rounded-full flex items-center justify-between px-6 py-3 border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)] transition-all duration-500",
                scrolled ? "bg-black/60 backdrop-blur-2xl" : "bg-white/[0.02] backdrop-blur-lg"
            )}>
                
                {/* Logo */}
                <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-[var(--accent-primary)] animate-pulse shadow-[0_0_10px_var(--accent-primary)]" />
                    <Link href="/">
                        <span className="text-xs md:text-sm font-bold tracking-[0.3em] text-white uppercase font-body hover:text-[var(--accent-secondary)] transition-colors">
                            DJ RABIA
                        </span>
                    </Link>
                </div>

                {/* Center Links (Desktop only) */}
                <nav className="hidden md:flex gap-8 items-center absolute left-1/2 -translate-x-1/2">
                    {links.map((link, i) => (
                        <Link key={i} href={link.href} className="text-[10px] md:text-xs uppercase font-bold tracking-[0.2em] text-white/50 hover:text-white transition-colors">
                            {link.title}
                        </Link>
                    ))}
                </nav>

                {/* Right Actions */}
                <div className="hidden md:flex items-center gap-4">
                    <a href="https://wa.me/something" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 group border border-white/10 px-4 py-1.5 rounded-full hover:bg-[var(--accent-primary)]/10 hover:border-[var(--accent-primary)] transition-all">
                        <MessageCircle className="w-3.5 h-3.5 text-white group-hover:text-[var(--accent-primary)]" />
                        <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-white group-hover:text-[var(--accent-primary)]">Book</span>
                    </a>
                </div>

                {/* Mobile Menu Toggle */}
                <button 
                    className="md:hidden text-white/80 p-2"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
            </div>

            {/* Mobile Dropdown */}
            <div className={clsx(
                "md:hidden absolute top-full left-0 w-full mt-4 glass-panel rounded-3xl overflow-hidden transition-all duration-500 ease-in-out border border-white/10",
                mobileMenuOpen ? "opacity-100 max-h-[300px] pointer-events-auto" : "opacity-0 max-h-0 pointer-events-none border-transparent"
            )}>
                <div className="p-6 flex flex-col gap-4 bg-black/80 backdrop-blur-3xl">
                    {links.map((link, i) => (
                        <Link 
                            key={i} 
                            href={link.href} 
                            onClick={() => setMobileMenuOpen(false)}
                            className="text-xs uppercase font-bold tracking-[0.2em] text-white/70 hover:text-[var(--accent-primary)] py-2 border-b border-white/5"
                        >
                            {link.title}
                        </Link>
                    ))}
                    <a href="https://wa.me/something" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between mt-2 pt-2 group">
                        <span className="text-xs uppercase tracking-[0.2em] font-bold text-[var(--accent-primary)]">Book Now</span>
                        <MessageCircle className="w-4 h-4 text-[var(--accent-primary)]" />
                    </a>
                </div>
            </div>

        </header>
    );
}
