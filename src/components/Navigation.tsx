"use client";

import React, { useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { Download } from "lucide-react";

export function Navigation() {
    const [isHovered, setIsHovered] = useState(false);

    const links = [
        { title: "Biography", href: "#biography" },
        { title: "Tech Rider", href: "#riders" },
        { title: "Hospitality", href: "#riders" },
        { title: "Shows", href: "#shows" }
    ];

    return (
        <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-auto w-[90%] max-w-[420px]">
            <div
                className="w-full rounded-[2rem] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden bg-white/[0.08] backdrop-blur-2xl border border-white/20 shadow-[0_20px_40px_rgba(0,0,0,0.6),0_0_30px_rgba(255,255,255,0.05)]"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{
                    height: isHovered ? "300px" : "64px",
                }}
            >
                {/* Floating Island Header */}
                <div className="flex items-center justify-between w-full h-[64px] px-6 cursor-pointer group">
                    <div className="flex items-center gap-4">
                        <span className="w-2 h-2 rounded-full bg-[var(--accent-primary)] animate-pulse shadow-[0_0_10px_var(--accent-primary)]" />
                        <span className="text-xs font-bold tracking-[0.3em] text-white uppercase font-body group-hover:text-[var(--accent-secondary)] transition-colors">
                            DJ RABIA
                        </span>
                    </div>
                    
                    <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/40 group-hover:text-white transition-colors">
                        Menu
                    </span>
                </div>

                {/* Expanded Content */}
                <div
                    className={clsx(
                        "transition-all duration-500 w-full px-4 pb-4",
                        isHovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
                    )}
                >
                    <div className="flex flex-col gap-1 w-full pt-3 border-t border-white/10">
                        {links.map((link, i) => (
                            <Link
                                key={i}
                                href={link.href}
                                className="group flex items-center justify-between px-4 py-2 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/10"
                            >
                                <span className="text-xs font-bold text-white/50 group-hover:text-white transition-colors uppercase tracking-[0.2em]">
                                    {link.title}
                                </span>
                                <span className="text-[10px] text-white/20 font-mono group-hover:text-[var(--accent-secondary)] transition-colors">
                                    0{i + 1}
                                </span>
                            </Link>
                        ))}
                    </div>

                    {/* Bookings Action Button */}
                    <div className="w-full pt-1">
                        <Link
                            href="mailto:darshak@andfriends.in"
                            className="w-full flex justify-between items-center px-6 py-3.5 rounded-2xl bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/30 text-white font-bold text-[10px] tracking-[0.2em] uppercase hover:bg-[var(--accent-primary)] hover:border-[var(--accent-primary)] hover:shadow-[0_0_20px_rgba(255,0,85,0.4)] transition-all group"
                        >
                            <span>Book Options</span>
                            <Download className="w-4 h-4 text-[var(--accent-primary)] group-hover:text-white group-hover:-translate-y-1 transition-all" />
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
