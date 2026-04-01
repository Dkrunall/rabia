"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const dotRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        const dot = dotRef.current;
        if (!cursor || !dot) return;

        const moveCursor = (e: MouseEvent) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.6,
                ease: "power3.out",
            });
            gsap.to(dot, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1,
            });
        };

        const handleHover = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest("a, button, .magnetic, .bento-tile")) {
                gsap.to(cursor, {
                    scale: 2.5,
                    backgroundColor: "rgba(0, 240, 255, 0.05)",
                    borderColor: "var(--accent-secondary)",
                    duration: 0.3,
                });
            } else {
                gsap.to(cursor, {
                    scale: 1,
                    backgroundColor: "transparent",
                    borderColor: "rgba(255, 255, 255, 0.3)",
                    duration: 0.3,
                });
            }
        };

        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mouseover", handleHover);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mouseover", handleHover);
        };
    }, []);

    return (
        <>
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 w-6 h-6 border border-white/30 rounded-full pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2 transition-[border-color] duration-300"
            />
            <div
                ref={dotRef}
                className="fixed top-0 left-0 w-1 h-1 bg-white rounded-full pointer-events-none z-[10001] -translate-x-1/2 -translate-y-1/2"
            />
        </>
    );
}
