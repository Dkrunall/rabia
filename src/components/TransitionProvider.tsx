"use client";

import React, { useRef } from "react";
import { TransitionRouter } from "next-transition-router";
import gsap from "gsap";

export function TransitionProvider({ children }: { children: React.ReactNode }) {
    const overlayRef = useRef<SVGPathElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    return (
        <TransitionRouter
            auto={true}
            leave={(next) => {
                const overlay = overlayRef.current;
                const wrapper = wrapperRef.current;
                if (!overlay || !wrapper) {
                    next();
                    return;
                }

                // The animation out: slide the wrapper down over the screen
                const tl = gsap.timeline({
                    onComplete: next,
                });

                // Set to display block before animation
                gsap.set(wrapper, { display: "block", top: "100%" });

                tl.to(wrapper, {
                    top: "0%",
                    duration: 0.8,
                    ease: "power4.inOut",
                });
            }}
            enter={(next) => {
                const overlay = overlayRef.current;
                const wrapper = wrapperRef.current;
                if (!overlay || !wrapper) {
                    next();
                    return;
                }

                const tl = gsap.timeline({
                    onComplete: () => {
                        gsap.set(wrapper, { display: "none" });
                        next();
                    },
                });

                // The animation in: slide the wrapper up off the screen
                tl.to(wrapper, {
                    top: "-100%",
                    duration: 0.8,
                    ease: "power4.inOut",
                    delay: 0.1, // brief pause so user sees the color overlay
                });
            }}
        >
            {/* The main content */}
            {children}

            {/* The transition overlay */}
            <div
                ref={wrapperRef}
                className="fixed inset-0 z-[9999] pointer-events-none hidden"
            >
                {/* We can use an SVG shape or just a colored block. 
             Let's use an SVG curve for a premium organic feel. */}
                <svg
                    className="absolute top-0 left-0 w-full h-[150%] pointer-events-none"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                >
                    {/* We'll use our pastel palette for the transition fill */}
                    <path
                        ref={overlayRef}
                        d="M 0 0 L 100 0 L 100 100 Q 50 150 0 100 Z"
                        fill="var(--pastel-pink)"
                    />
                </svg>
            </div>
        </TransitionRouter>
    );
}
