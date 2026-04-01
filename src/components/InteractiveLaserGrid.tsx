"use client";

import React, { useEffect, useRef } from "react";

export function InteractiveLaserGrid() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;
        
        const mouse = { x: -1000, y: -1000, radiusSq: 450 * 450, radius: 450 };

        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };
        const handleMouseLeave = () => {
            mouse.x = -1000;
            mouse.y = -1000;
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseout", handleMouseLeave);
        
        const handleResize = () => {
             width = canvas.width = window.innerWidth;
             height = canvas.height = window.innerHeight;
             init();
        };
        window.addEventListener("resize", handleResize);

        type Particle = {
            x: number;
            y: number;
            originX: number;
            originY: number;
            baseAlpha: number;
            colorRGB: string;
        };

        function createParticle(x: number, y: number): Particle {
            const rand = Math.random();
            let colorRGB = "255, 255, 255";
            let baseAlpha = 0.05;
            
            if (rand > 0.96) {
                colorRGB = "255, 0, 85"; // Magenta
                baseAlpha = 0.5;
            } else if (rand > 0.92) {
                colorRGB = "0, 240, 255"; // Cyan
                baseAlpha = 0.5;
            }
            
            return { x, y, originX: x, originY: y, colorRGB, baseAlpha };
        }

        function drawParticle(p: Particle) {
            ctx!.beginPath();
            ctx!.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
            ctx!.fillStyle = `rgba(${p.colorRGB}, ${p.baseAlpha})`;
            ctx!.fill();
        }

        function updateParticle(p: Particle) {
            const dx = mouse.x - p.x;
            const dy = mouse.y - p.y;
            const distanceSq = dx * dx + dy * dy;
            
            if (distanceSq < mouse.radiusSq) {
                const distance = Math.sqrt(distanceSq);
                const forceDirectionX = dx / distance;
                const forceDirectionY = dy / distance;
                const force = (mouse.radius - distance) / mouse.radius;
                const directionX = forceDirectionX * force * 15;
                const directionY = forceDirectionY * force * 15;
                
                p.x -= directionX;
                p.y -= directionY;

                if (p.baseAlpha > 0.05) {
                    ctx!.beginPath();
                    ctx!.moveTo(p.x, p.y);
                    ctx!.lineTo(mouse.x, mouse.y);
                    const alpha = force * 0.5;
                    ctx!.strokeStyle = `rgba(${p.colorRGB}, ${alpha})`;
                    ctx!.lineWidth = 1.5;
                    ctx!.stroke();
                } else {
                    if (distance < mouse.radius * 0.8) {
                        ctx!.beginPath();
                        ctx!.moveTo(p.x, p.y);
                        ctx!.lineTo(mouse.x, mouse.y);
                        const alpha = force * 0.15;
                        ctx!.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
                        ctx!.lineWidth = 0.5;
                        ctx!.stroke();
                    }
                }
            } else {
                if (p.x !== p.originX) {
                    p.x -= (p.x - p.originX) / 15;
                }
                if (p.y !== p.originY) {
                    p.y -= (p.y - p.originY) / 15;
                }
            }
        }

        let particles: Particle[] = [];
        
        function init() {
            particles = [];
            const spacing = 150; // Ultra high-perf mode
            const rows = Math.ceil(height / spacing);
            const cols = Math.ceil(width / spacing);
            
            for (let i = 0; i <= rows; i++) {
                for (let j = 0; j <= cols; j++) {
                    particles.push(createParticle(j * spacing, i * spacing));
                }
            }
        }

        let animationFrameId: number;

        function animate() {
            ctx!.clearRect(0, 0, width, height);
            
            for (let i = 0; i < particles.length; i++) {
                drawParticle(particles[i]);
                updateParticle(particles[i]);
            }
            
            animationFrameId = requestAnimationFrame(animate);
        }

        init();
        animate();

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseout", handleMouseLeave);
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-[2] pointer-events-none mix-blend-screen opacity-70" />;
}
