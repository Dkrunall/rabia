"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const dotRef = useRef<HTMLDivElement>(null);
    const [enabled, setEnabled] = useState(false);

    useEffect(() => {
        // Only enable on desktop/laptops with a mouse/trackpad (fine pointer)
        if (typeof window === "undefined") return;
        const isFinePointer = window.matchMedia("(pointer: fine)").matches;
        if (!isFinePointer) return;

        setEnabled(true);
        document.body.classList.add("custom-cursor-active");

        const cursor = cursorRef.current;
        const dot = dotRef.current;
        if (!cursor || !dot) return;

        let isVisible = false;

        const moveCursor = (e: MouseEvent) => {
            if (!isVisible) {
                gsap.to([cursor, dot], { opacity: 1, duration: 0.2 });
                isVisible = true;
            }

            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.35,
                ease: "power2.out",
                overwrite: "auto"
            });
            gsap.to(dot, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.08,
                ease: "none",
                overwrite: "auto"
            });
        };

        const handleHover = (e: MouseEvent) => {
            const target = e.target as HTMLElement | null;
            if (!target) return;
            const interactive = target.closest("a, button, input, select, textarea, [data-interactive]");
            if (interactive) {
                gsap.to(cursor, {
                    scale: 1.8,
                    backgroundColor: "rgba(255, 0, 85, 0.12)",
                    borderColor: "var(--accent-primary)",
                    duration: 0.25,
                });
                gsap.to(dot, {
                    scale: 0.5,
                    backgroundColor: "var(--accent-secondary)",
                    duration: 0.25,
                });
            } else {
                gsap.to(cursor, {
                    scale: 1,
                    backgroundColor: "transparent",
                    borderColor: "rgba(255, 255, 255, 0.4)",
                    duration: 0.25,
                });
                gsap.to(dot, {
                    scale: 1,
                    backgroundColor: "#ffffff",
                    duration: 0.25,
                });
            }
        };

        const handleMouseLeave = () => {
            gsap.to([cursor, dot], { opacity: 0, duration: 0.2 });
            isVisible = false;
        };

        window.addEventListener("mousemove", moveCursor, { passive: true });
        window.addEventListener("mouseover", handleHover, { passive: true });
        document.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            document.body.classList.remove("custom-cursor-active");
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mouseover", handleHover);
            document.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    if (!enabled) return null;

    return (
        <>
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 w-8 h-8 rounded-full border border-white/40 pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2 opacity-0 mix-blend-screen transition-colors duration-200"
            />
            <div
                ref={dotRef}
                className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-white pointer-events-none z-[10001] -translate-x-1/2 -translate-y-1/2 opacity-0 shadow-[0_0_8px_#ffffff]"
            />
        </>
    );
}
