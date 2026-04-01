"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";

export function NanoBanana() {
    const bananaRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (!bananaRef.current) return;

        // Premium floating animation
        gsap.to(bananaRef.current, {
            y: -20,
            rotation: 5,
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
        });

        // Mouse movement interaction
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;

            const xRot = ((clientY / innerHeight) - 0.5) * -20;
            const yRot = ((clientX / innerWidth) - 0.5) * 20;

            gsap.to(bananaRef.current, {
                rotationX: xRot,
                rotationY: yRot,
                duration: 0.5,
                ease: "power2.out",
            });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div className="relative flex items-center justify-center w-[400px] h-[400px]" style={{ perspective: "1000px" }}>
            {/* Decorative Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[var(--pastel-pink)] to-[var(--pastel-yellow)] blur-[100px] opacity-40 rounded-full animate-pulse" />

            <svg
                ref={bananaRef}
                viewBox="0 0 400 400"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full drop-shadow-2xl relative z-10"
            >
                {/* Futuristic Tech Banana Shape */}
                <path
                    d="M300 100 C 350 150, 300 300, 200 350 C 100 400, 50 300, 100 200 C 150 100, 200 50, 300 100 Z"
                    fill="url(#gradBanana)"
                    stroke="rgba(255,255,255,0.8)"
                    strokeWidth="4"
                />

                {/* Metallic / Tech Accents */}
                <path
                    d="M 150 250 Q 200 320 250 280"
                    stroke="url(#gradTech)"
                    strokeWidth="12"
                    strokeLinecap="round"
                />
                <circle cx="280" cy="150" r="10" fill="#fff" className="animate-pulse" />
                <circle cx="120" cy="280" r="6" fill="#fff" />

                {/* Pro Badge */}
                <rect x="230" y="200" width="60" height="24" rx="12" fill="rgba(255, 255, 255, 0.9)" />
                <text x="260" y="216" fontFamily="Arial" fontSize="12" fontWeight="bold" fill="#333" textAnchor="middle">
                    PRO
                </text>

                <defs>
                    <linearGradient id="gradBanana" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="var(--pastel-yellow)" />
                        <stop offset="50%" stopColor="#FFE066" />
                        <stop offset="100%" stopColor="var(--pastel-orange)" />
                    </linearGradient>
                    <linearGradient id="gradTech" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="var(--pastel-pink)" />
                        <stop offset="100%" stopColor="var(--pastel-mint)" />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    );
}
