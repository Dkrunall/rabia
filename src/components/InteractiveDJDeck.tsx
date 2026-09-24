"use client";

import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, Disc, Sliders, Volume2, Sparkles, Zap, Radio, FastForward } from "lucide-react";
import { TRACKS } from "./AudioPlayer";

export function InteractiveDJDeck() {
    const [selectedTrack, setSelectedTrack] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [bpm, setBpm] = useState(134);
    const [filterCutoff, setFilterCutoff] = useState(2500); // 200Hz to 8000Hz
    const [activePad, setActivePad] = useState<string | null>(null);
    const [jogAngle, setJogAngle] = useState(0);

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const audioCtxRef = useRef<AudioContext | null>(null);
    const masterGainRef = useRef<GainNode | null>(null);
    const filterNodeRef = useRef<BiquadFilterNode | null>(null);
    const loopIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const animFrameRef = useRef<number | null>(null);
    const beatIndexRef = useRef(0);

    const currentTrack = TRACKS[selectedTrack];

    // Initialize Web Audio Engine
    const initAudio = () => {
        if (!audioCtxRef.current) {
            const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
            const ctx = new AudioCtx();
            const gain = ctx.createGain();
            const filter = ctx.createBiquadFilter();

            filter.type = "lowpass";
            filter.frequency.value = filterCutoff;
            filter.Q.value = 4; // Resonant peak

            gain.gain.value = 0.25;

            filter.connect(gain);
            gain.connect(ctx.destination);

            audioCtxRef.current = ctx;
            masterGainRef.current = gain;
            filterNodeRef.current = filter;
        }
        if (audioCtxRef.current.state === "suspended") {
            audioCtxRef.current.resume();
        }
    };

    // Update filter when knob changes
    useEffect(() => {
        if (filterNodeRef.current && audioCtxRef.current) {
            filterNodeRef.current.frequency.setTargetAtTime(filterCutoff, audioCtxRef.current.currentTime, 0.05);
        }
    }, [filterCutoff]);

    // Play synthesized drum kick
    const triggerKick = (customFreq = 145) => {
        initAudio();
        if (!audioCtxRef.current || !filterNodeRef.current) return;
        const ctx = audioCtxRef.current;
        const now = ctx.currentTime;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.frequency.setValueAtTime(customFreq, now);
        osc.frequency.exponentialRampToValueAtTime(35, now + 0.14);

        gain.gain.setValueAtTime(1.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

        osc.connect(gain);
        gain.connect(filterNodeRef.current);

        osc.start(now);
        osc.stop(now + 0.3);
    };

    // Play synthesized hi-hat
    const triggerHat = () => {
        initAudio();
        if (!audioCtxRef.current || !filterNodeRef.current) return;
        const ctx = audioCtxRef.current;
        const now = ctx.currentTime;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(9000, now);

        gain.gain.setValueAtTime(0.4, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

        osc.connect(gain);
        gain.connect(filterNodeRef.current);

        osc.start(now);
        osc.stop(now + 0.09);
    };

    // Play synthesized Acid Synth Pulse
    const triggerAcid = (note = 58) => {
        initAudio();
        if (!audioCtxRef.current || !filterNodeRef.current) return;
        const ctx = audioCtxRef.current;
        const now = ctx.currentTime;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(note, now);

        gain.gain.setValueAtTime(0.5, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.22);

        osc.connect(gain);
        gain.connect(filterNodeRef.current);

        osc.start(now);
        osc.stop(now + 0.25);
    };

    // Play Sub Impact Drop
    const triggerSubDrop = () => {
        initAudio();
        if (!audioCtxRef.current || !filterNodeRef.current) return;
        const ctx = audioCtxRef.current;
        const now = ctx.currentTime;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(120, now);
        osc.frequency.exponentialRampToValueAtTime(28, now + 0.7);

        gain.gain.setValueAtTime(1.5, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

        osc.connect(gain);
        gain.connect(filterNodeRef.current);

        osc.start(now);
        osc.stop(now + 0.85);
    };

    // Techno Loop Engine
    const stepBeat = () => {
        const step = beatIndexRef.current % 4;

        // Kick on every beat
        triggerKick(selectedTrack === 2 ? 160 : 140);

        // Offbeat hi-hat
        setTimeout(() => triggerHat(), ((60 / bpm) * 1000) / 2);

        // Acid bass on steps 0 and 2
        if (step === 0 || step === 2) {
            const notes = [55, 65, 48, 58];
            triggerAcid(notes[selectedTrack]);
        }

        beatIndexRef.current += 1;
        setJogAngle((prev) => (prev + 30) % 360);
    };

    const togglePlay = () => {
        if (isPlaying) {
            if (loopIntervalRef.current) clearInterval(loopIntervalRef.current);
            loopIntervalRef.current = null;
            setIsPlaying(false);
        } else {
            initAudio();
            setIsPlaying(true);
            const intervalMs = (60 / bpm) * 1000;
            stepBeat();
            loopIntervalRef.current = setInterval(stepBeat, intervalMs);
        }
    };

    // Handle BPM Change
    const changeBpm = (newBpm: number) => {
        setBpm(newBpm);
        if (isPlaying) {
            if (loopIntervalRef.current) clearInterval(loopIntervalRef.current);
            const intervalMs = (60 / newBpm) * 1000;
            loopIntervalRef.current = setInterval(stepBeat, intervalMs);
        }
    };

    // Live Visualizer Waveform Canvas Loop
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let phase = 0;

        const render = () => {
            const width = canvas.width = canvas.offsetWidth;
            const height = canvas.height = canvas.offsetHeight;

            ctx.clearRect(0, 0, width, height);

            const numBars = 48;
            const barWidth = width / numBars;

            // Draw Frequency Equalizer Bars
            for (let i = 0; i < numBars; i++) {
                const normalized = i / numBars;
                let barHeight = 6;

                if (isPlaying) {
                    const wave = Math.sin(phase + i * 0.3) * 0.5 + 0.5;
                    const pulse = Math.cos(phase * 1.5 + i * 0.1) * 0.5 + 0.5;
                    const cutoffScale = filterCutoff / 8000;
                    barHeight = (wave * 0.6 + pulse * 0.4) * (height * 0.75) * cutoffScale + 8;
                }

                const gradient = ctx.createLinearGradient(0, height, 0, height - barHeight);
                gradient.addColorStop(0, "rgba(255, 0, 85, 0.9)");
                gradient.addColorStop(0.5, "rgba(0, 240, 255, 0.8)");
                gradient.addColorStop(1, "#ffffff");

                ctx.fillStyle = gradient;
                ctx.fillRect(i * barWidth + 1.5, height - barHeight, barWidth - 3, barHeight);
            }

            // Draw Central Oscilloscope Line
            ctx.beginPath();
            ctx.strokeStyle = isPlaying ? "rgba(0, 240, 255, 0.8)" : "rgba(255, 255, 255, 0.15)";
            ctx.lineWidth = 2;

            for (let x = 0; x < width; x += 4) {
                const y = isPlaying 
                    ? height / 2 + Math.sin(phase * 2 + x * 0.05) * 20 * (filterCutoff / 4000)
                    : height / 2;
                if (x === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.stroke();

            phase += isPlaying ? 0.12 : 0.02;
            animFrameRef.current = requestAnimationFrame(render);
        };

        render();

        return () => {
            if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
        };
    }, [isPlaying, filterCutoff]);

    useEffect(() => {
        return () => {
            if (loopIntervalRef.current) clearInterval(loopIntervalRef.current);
            if (audioCtxRef.current) audioCtxRef.current.close().catch(() => {});
        };
    }, []);

    const triggerHotPad = (name: string, action: () => void) => {
        setActivePad(name);
        action();
        setTimeout(() => setActivePad(null), 250);
    };

    return (
        <section className="py-24 md:py-36 relative px-4 sm:px-6 md:px-12 border-t border-white/5 bg-[#040406]" id="dj-rig">
            <div className="max-w-[1440px] mx-auto w-full relative z-10">

                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/30 text-[var(--accent-primary)] text-[10px] font-bold uppercase tracking-[0.3em] mb-4">
                            <Zap className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                            Live Sound Console
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black uppercase truus-heading tracking-tight text-white leading-none">
                            The Rabia <span className="text-[var(--accent-primary)]">Audio Rig</span>
                        </h2>
                    </div>

                    <p className="text-xs md:text-sm text-white/50 max-w-md font-mono">
                        Experience the live sound engine. Press PLAY to engage the sub-kick groove, tweak the resonant filter cutoff, or trigger hot-cue pads.
                    </p>
                </div>

                {/* Main Interactive DJ Console */}
                <div className="p-6 md:p-10 rounded-3xl bg-[#08080b] border border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_35px_rgba(255,0,85,0.15)] relative overflow-hidden">
                    
                    {/* Console Neon Accent Line */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--accent-primary)] via-[var(--accent-secondary)] to-[var(--accent-primary)]" />

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        
                        {/* Left: Interactive Spinning Jog Wheel & Transport (Span 5) */}
                        <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 rounded-2xl bg-white/[0.015] border border-white/10">
                            
                            {/* Track Info Screen */}
                            <div className="w-full flex items-center justify-between pb-4 mb-6 border-b border-white/10">
                                <div>
                                    <span className="text-[9px] font-mono text-[var(--accent-secondary)] uppercase tracking-widest font-bold">
                                        DECK A • PRO LINK
                                    </span>
                                    <h3 className="text-xl font-black uppercase text-white truus-heading tracking-tight">
                                        {currentTrack.title}
                                    </h3>
                                </div>
                                <div className="text-right">
                                    <span className="text-xs font-mono font-bold text-[var(--accent-primary)] block">
                                        {bpm} BPM
                                    </span>
                                    <span className="text-[9px] text-white/40 font-mono">
                                        {currentTrack.label}
                                    </span>
                                </div>
                            </div>

                            {/* Spinning Illuminated Vinyl / Jog Wheel */}
                            <div 
                                onClick={togglePlay}
                                className="relative w-52 h-52 sm:w-64 sm:h-64 rounded-full border-4 border-white/20 bg-gradient-to-br from-[#121217] via-[#08080a] to-[#14141b] flex items-center justify-center shadow-[inset_0_0_40px_rgba(0,0,0,0.9),0_0_30px_rgba(0,240,255,0.2)] cursor-pointer group hover:border-[var(--accent-secondary)] transition-colors"
                            >
                                {/* Grooved Vinyl Rings */}
                                <div className="absolute inset-4 rounded-full border border-white/10 pointer-events-none" />
                                <div className="absolute inset-8 rounded-full border border-white/5 pointer-events-none" />
                                <div className="absolute inset-12 rounded-full border border-white/10 pointer-events-none" />

                                {/* Rotating Indicator Marker */}
                                <div 
                                    className="absolute inset-0 rounded-full pointer-events-none transition-transform duration-100 ease-linear"
                                    style={{ transform: `rotate(${jogAngle}deg)` }}
                                >
                                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2 h-6 rounded-full bg-[var(--accent-primary)] shadow-[0_0_10px_var(--accent-primary)]" />
                                </div>

                                {/* Center Spindle Button */}
                                <div className="w-24 h-24 rounded-full bg-black border-2 border-white/20 flex flex-col items-center justify-center text-white z-10 shadow-2xl group-hover:scale-105 transition-transform">
                                    {isPlaying ? (
                                        <Pause className="w-8 h-8 text-[var(--accent-primary)] fill-current" />
                                    ) : (
                                        <Play className="w-8 h-8 text-white fill-current ml-1" />
                                    )}
                                    <span className="text-[8px] font-mono uppercase tracking-widest mt-1 text-white/60">
                                        {isPlaying ? "STOP" : "CUE / PLAY"}
                                    </span>
                                </div>
                            </div>

                            {/* Play & Sync Buttons */}
                            <div className="flex items-center gap-4 mt-6 w-full max-w-xs">
                                <button
                                    onClick={togglePlay}
                                    className={`flex-1 py-3 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${
                                        isPlaying 
                                            ? "bg-[var(--accent-primary)] text-white shadow-[0_0_20px_rgba(255,0,85,0.5)]" 
                                            : "bg-white/10 hover:bg-white/20 text-white"
                                    }`}
                                >
                                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                                    <span>{isPlaying ? "Pause Beat" : "Start Beat"}</span>
                                </button>

                                <button
                                    onClick={() => changeBpm(138)}
                                    className="px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono text-xs uppercase tracking-wider transition-colors"
                                >
                                    Sync 138
                                </button>
                            </div>

                        </div>

                        {/* Middle & Right: Mixer Controls, Waveform & Hot Pads (Span 7) */}
                        <div className="lg:col-span-7 flex flex-col gap-6">
                            
                            {/* Live Waveform Canvas */}
                            <div className="p-4 rounded-2xl bg-black/60 border border-white/10">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-[9px] font-mono text-white/50 uppercase tracking-widest flex items-center gap-2">
                                        <Radio className="w-3 h-3 text-[var(--accent-secondary)] animate-pulse" />
                                        Master Frequency Spectrum
                                    </span>
                                    <span className="text-[9px] font-mono text-[var(--accent-secondary)]">
                                        Filter: {Math.round(filterCutoff)} Hz
                                    </span>
                                </div>
                                <canvas 
                                    ref={canvasRef} 
                                    className="w-full h-28 rounded-lg bg-[#050508]" 
                                />
                            </div>

                            {/* Mixer Knobs & Sliders Row */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                
                                {/* Resonant Filter Cutoff Slider */}
                                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col justify-between">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                                            <Sliders className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                                            Master Filter Cutoff
                                        </span>
                                        <span className="text-xs font-mono text-[var(--accent-primary)] font-bold">
                                            {filterCutoff > 5000 ? "OPEN" : `${Math.round(filterCutoff)}Hz`}
                                        </span>
                                    </div>
                                    <input
                                        type="range"
                                        min="300"
                                        max="8000"
                                        step="50"
                                        value={filterCutoff}
                                        onChange={(e) => setFilterCutoff(parseFloat(e.target.value))}
                                        className="w-full h-2 accent-[var(--accent-primary)] bg-white/10 rounded-lg cursor-pointer"
                                    />
                                    <div className="flex justify-between text-[9px] font-mono text-white/30 mt-2">
                                        <span>SUB DUB</span>
                                        <span>NEUTRAL</span>
                                        <span>BRIGHT WIDE</span>
                                    </div>
                                </div>

                                {/* BPM Tempo Slider */}
                                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col justify-between">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                                            <FastForward className="w-3.5 h-3.5 text-[var(--accent-secondary)]" />
                                            Tempo Pitch Control
                                        </span>
                                        <span className="text-xs font-mono text-[var(--accent-secondary)] font-bold">
                                            {bpm} BPM
                                        </span>
                                    </div>
                                    <input
                                        type="range"
                                        min="124"
                                        max="145"
                                        step="1"
                                        value={bpm}
                                        onChange={(e) => changeBpm(parseInt(e.target.value))}
                                        className="w-full h-2 accent-[var(--accent-secondary)] bg-white/10 rounded-lg cursor-pointer"
                                    />
                                    <div className="flex justify-between text-[9px] font-mono text-white/30 mt-2">
                                        <span>124 AFRO</span>
                                        <span>134 TECHNO</span>
                                        <span>145 HARD</span>
                                    </div>
                                </div>

                            </div>

                            {/* 4 Interactive Hot-Cue Performance Pads */}
                            <div>
                                <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block mb-2 font-bold">
                                    Live Performance Pads (Click to Trigger Sound)
                                </span>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                    {[
                                        { name: "SUB KICK", desc: "138 BPM Punch", action: () => triggerKick(150), color: "border-[var(--accent-primary)] text-[var(--accent-primary)]" },
                                        { name: "CLAP / HAT", desc: "Cyber Transient", action: () => triggerHat(), color: "border-[var(--accent-secondary)] text-[var(--accent-secondary)]" },
                                        { name: "ACID BASS", desc: "Hypnotic Hook", action: () => triggerAcid(60), color: "border-purple-400 text-purple-400" },
                                        { name: "SUB DROP", desc: "Impact Boom", action: () => triggerSubDrop(), color: "border-emerald-400 text-emerald-400" },
                                    ].map((pad, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => triggerHotPad(pad.name, pad.action)}
                                            className={`p-4 rounded-xl border text-left transition-all duration-150 active:scale-95 ${
                                                activePad === pad.name 
                                                    ? "bg-white text-black shadow-[0_0_20px_#ffffff] scale-95" 
                                                    : "bg-white/[0.03] hover:bg-white/[0.08] " + pad.color
                                            }`}
                                        >
                                            <span className="text-[11px] font-black uppercase font-mono block">
                                                {pad.name}
                                            </span>
                                            <span className="text-[8px] font-mono text-white/40 block mt-0.5">
                                                {pad.desc}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Track Selector Bar */}
                            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/10">
                                <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider mr-2">
                                    Select Track Preset:
                                </span>
                                {TRACKS.map((t, idx) => (
                                    <button
                                        key={t.id}
                                        onClick={() => {
                                            setSelectedTrack(idx);
                                            changeBpm(t.bpm);
                                        }}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all ${
                                            selectedTrack === idx 
                                                ? "bg-[var(--accent-primary)] text-white font-bold" 
                                                : "bg-white/5 hover:bg-white/10 text-white/60"
                                        }`}
                                    >
                                        0{t.id} {t.title}
                                    </button>
                                ))}
                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
}
