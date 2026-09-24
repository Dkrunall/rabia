"use client";

import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Disc, Radio, ChevronUp, ChevronDown } from "lucide-react";

export interface Track {
    id: number;
    title: string;
    genre: string;
    bpm: number;
    duration: string;
    label: string;
    color: string;
}

export const TRACKS: Track[] = [
    { id: 1, title: "Neon Genesis", genre: "Peak-Time Techno", bpm: 134, duration: "6:42", label: "Drumcode", color: "var(--accent-primary)" },
    { id: 2, title: "Velocity", genre: "Melodic Techno", bpm: 128, duration: "7:15", label: "Afterlife", color: "var(--accent-secondary)" },
    { id: 3, title: "Dark Matter", genre: "Raw / Industrial", bpm: 138, duration: "5:58", label: "EXHALE", color: "#a855f7" },
    { id: 4, title: "Cyberia", genre: "Afro Tech / Hypnotic", bpm: 126, duration: "6:10", label: "Terminal M", color: "#22c55e" },
];

export function AudioPlayer() {
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [volume, setVolume] = useState(0.7);
    const [progress, setProgress] = useState(25);
    const [isExpanded, setIsExpanded] = useState(false);

    const audioCtxRef = useRef<AudioContext | null>(null);
    const gainNodeRef = useRef<GainNode | null>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const beatCounterRef = useRef<number>(0);

    const currentTrack = TRACKS[currentTrackIndex];

    // Listen for custom trigger to play a specific track
    useEffect(() => {
        const handlePlayTrack = (e: CustomEvent<{ index: number }>) => {
            if (typeof e.detail?.index === "number") {
                setCurrentTrackIndex(e.detail.index);
                startAudio();
            }
        };

        window.addEventListener("dj-play-track", handlePlayTrack as EventListener);
        return () => {
            window.removeEventListener("dj-play-track", handlePlayTrack as EventListener);
        };
    }, []);

    const initAudioContext = () => {
        if (!audioCtxRef.current) {
            const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
            const ctx = new AudioCtx();
            const gain = ctx.createGain();
            gain.gain.value = isMuted ? 0 : volume * 0.15;
            gain.connect(ctx.destination);
            audioCtxRef.current = ctx;
            gainNodeRef.current = gain;
        }
        if (audioCtxRef.current.state === "suspended") {
            audioCtxRef.current.resume();
        }
    };

    // Synthesize techno kicks and synth pulse using Web Audio API
    const playBeat = () => {
        if (!audioCtxRef.current || !gainNodeRef.current) return;
        const ctx = audioCtxRef.current;
        const out = gainNodeRef.current;
        const now = ctx.currentTime;
        const step = beatCounterRef.current % 4;

        // Sub Techno Kick on every 4 beats
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";

        // Pitch envelope: drops rapidly from 150Hz to 40Hz for punchy kick
        osc.frequency.setValueAtTime(140, now);
        osc.frequency.exponentialRampToValueAtTime(38, now + 0.12);

        gain.gain.setValueAtTime(1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

        osc.connect(gain);
        gain.connect(out);
        osc.start(now);
        osc.stop(now + 0.3);

        // Hi-hat / Cymbal click on the off-beat (steps 1 & 3)
        if (step === 1 || step === 3) {
            const hatOsc = ctx.createOscillator();
            const hatGain = ctx.createGain();
            hatOsc.type = "triangle";
            hatOsc.frequency.setValueAtTime(8000, now);
            hatGain.gain.setValueAtTime(0.3, now);
            hatGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
            hatOsc.connect(hatGain);
            hatGain.connect(out);
            hatOsc.start(now);
            hatOsc.stop(now + 0.09);
        }

        // Bass synth chord / atmospheric drone pulse
        if (step === 0 || step === 2) {
            const bassOsc = ctx.createOscillator();
            const bassGain = ctx.createGain();
            bassOsc.type = "sawtooth";
            const rootFreq = currentTrack.id === 1 ? 55 : currentTrack.id === 2 ? 65 : currentTrack.id === 3 ? 48 : 58;
            bassOsc.frequency.setValueAtTime(rootFreq, now);
            bassGain.gain.setValueAtTime(0.2, now);
            bassGain.gain.exponentialRampToValueAtTime(0.01, now + 0.22);
            bassOsc.connect(bassGain);
            bassGain.connect(out);
            bassOsc.start(now);
            bassOsc.stop(now + 0.24);
        }

        beatCounterRef.current += 1;
    };

    const startAudio = () => {
        initAudioContext();
        setIsPlaying(true);
        if (intervalRef.current) clearInterval(intervalRef.current);

        // Calculate beat interval in ms based on track BPM (4 beats per bar)
        const bpm = TRACKS[currentTrackIndex]?.bpm || 130;
        const beatInterval = (60 / bpm) * 1000;

        playBeat();
        intervalRef.current = setInterval(() => {
            playBeat();
            setProgress((prev) => (prev >= 98 ? 0 : prev + 0.5));
        }, beatInterval);
    };

    const stopAudio = () => {
        setIsPlaying(false);
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    const togglePlay = () => {
        if (isPlaying) {
            stopAudio();
        } else {
            startAudio();
        }
    };

    const handleNext = () => {
        const next = (currentTrackIndex + 1) % TRACKS.length;
        setCurrentTrackIndex(next);
        if (isPlaying) {
            stopAudio();
            setTimeout(() => {
                setCurrentTrackIndex(next);
                startAudio();
            }, 50);
        }
    };

    const handlePrev = () => {
        const prev = (currentTrackIndex - 1 + TRACKS.length) % TRACKS.length;
        setCurrentTrackIndex(prev);
        if (isPlaying) {
            stopAudio();
            setTimeout(() => {
                setCurrentTrackIndex(prev);
                startAudio();
            }, 50);
        }
    };

    const handleVolumeChange = (newVol: number) => {
        setVolume(newVol);
        setIsMuted(newVol === 0);
        if (gainNodeRef.current) {
            gainNodeRef.current.gain.value = newVol * 0.15;
        }
    };

    const toggleMute = () => {
        if (!gainNodeRef.current) return;
        if (isMuted) {
            setIsMuted(false);
            gainNodeRef.current.gain.value = volume * 0.15;
        } else {
            setIsMuted(true);
            gainNodeRef.current.gain.value = 0;
        }
    };

    useEffect(() => {
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
            if (audioCtxRef.current) audioCtxRef.current.close().catch(() => {});
        };
    }, []);

    return (
        <aside 
            aria-label="Interactive DJ Audio Player"
            className="fixed bottom-6 left-6 z-40 pointer-events-auto transition-all duration-300"
        >
            <div className={`glass-panel border border-white/15 bg-black/80 backdrop-blur-2xl rounded-2xl shadow-[0_15px_35px_rgba(0,0,0,0.8),0_0_20px_rgba(255,0,85,0.15)] transition-all overflow-hidden ${
                isExpanded ? "w-[320px] p-4" : "w-[280px] sm:w-[320px] p-3"
            }`}>
                {/* Header Row */}
                <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                        {/* Spinning vinyl or pulse icon */}
                        <div 
                            className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border border-white/10 transition-transform ${
                                isPlaying ? "bg-[var(--accent-primary)]/20 border-[var(--accent-primary)]" : "bg-white/5"
                            }`}
                        >
                            <Disc className={`w-4 h-4 text-white ${isPlaying ? "animate-spin" : ""}`} style={{ animationDuration: "3s" }} />
                        </div>

                        <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)] animate-pulse" />
                                <span className="text-[9px] font-bold uppercase tracking-widest text-[var(--accent-secondary)] truncate">
                                    {currentTrack.genre}
                                </span>
                            </div>
                            <h4 className="text-xs font-bold uppercase tracking-tight text-white truncate">
                                {currentTrack.title}
                            </h4>
                        </div>
                    </div>

                    {/* Equalizer animation when playing */}
                    <div className="flex items-end gap-1 h-5 shrink-0 px-1">
                        {[1, 2, 3, 4].map((bar) => (
                            <div
                                key={bar}
                                className={`w-0.5 rounded-full bg-[var(--accent-primary)] transition-all ${
                                    isPlaying ? "eq-bar" : "h-1 opacity-30"
                                }`}
                                style={{
                                    animationDuration: `${0.3 + bar * 0.15}s`,
                                    height: isPlaying ? undefined : "4px"
                                }}
                            />
                        ))}
                    </div>

                    {/* Expand toggle */}
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="p-1 rounded-md text-white/40 hover:text-white transition-colors"
                        aria-label={isExpanded ? "Collapse audio player" : "Expand audio player"}
                    >
                        {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
                    </button>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-white/10 h-1 rounded-full mt-2.5 overflow-hidden">
                    <div 
                        className="bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] h-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                {/* Controls */}
                <div className="flex items-center justify-between mt-2.5 pt-1">
                    <div className="flex items-center gap-1">
                        <button
                            onClick={handlePrev}
                            aria-label="Previous Track"
                            className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-colors"
                        >
                            <SkipBack className="w-3.5 h-3.5" />
                        </button>
                        
                        <button
                            onClick={togglePlay}
                            aria-label={isPlaying ? "Pause techno groove" : "Play techno groove"}
                            className="w-8 h-8 rounded-full bg-[var(--accent-primary)] text-white flex items-center justify-center shadow-[0_0_12px_rgba(255,0,85,0.5)] hover:scale-105 active:scale-95 transition-all"
                        >
                            {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current ml-0.5" />}
                        </button>

                        <button
                            onClick={handleNext}
                            aria-label="Next Track"
                            className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-colors"
                        >
                            <SkipForward className="w-3.5 h-3.5" />
                        </button>
                    </div>

                    {/* BPM and Label tag */}
                    <div className="text-[10px] font-mono text-white/40 flex items-center gap-2">
                        <span>{currentTrack.bpm} BPM</span>
                        <span>•</span>
                        <span className="text-[var(--accent-primary)]">{currentTrack.label}</span>
                    </div>

                    {/* Volume control */}
                    <div className="flex items-center gap-1.5">
                        <button
                            onClick={toggleMute}
                            aria-label={isMuted ? "Unmute" : "Mute"}
                            className="text-white/60 hover:text-white transition-colors"
                        >
                            {isMuted || volume === 0 ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                        </button>
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.05"
                            value={isMuted ? 0 : volume}
                            onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                            className="w-12 h-1 accent-[var(--accent-primary)] bg-white/20 rounded-lg appearance-none cursor-pointer"
                            aria-label="Volume slider"
                        />
                    </div>
                </div>

                {/* Expanded Tracklist Selector */}
                {isExpanded && (
                    <div className="mt-3 pt-3 border-t border-white/10 flex flex-col gap-1.5 animate-fade-in">
                        <span className="text-[9px] uppercase tracking-widest text-white/40 font-bold block mb-1">
                            Techno Arsenal Preview
                        </span>
                        {TRACKS.map((t, idx) => (
                            <button
                                key={t.id}
                                onClick={() => {
                                    setCurrentTrackIndex(idx);
                                    startAudio();
                                }}
                                className={`flex items-center justify-between p-2 rounded-lg text-left text-xs transition-colors ${
                                    currentTrackIndex === idx ? "bg-white/10 text-white font-bold" : "text-white/60 hover:bg-white/5 hover:text-white"
                                }`}
                            >
                                <div className="flex items-center gap-2">
                                    <Radio className={`w-3 h-3 ${currentTrackIndex === idx ? "text-[var(--accent-primary)]" : "text-white/20"}`} />
                                    <span>{t.title}</span>
                                </div>
                                <span className="font-mono text-[10px] text-white/40">{t.duration}</span>
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </aside>
    );
}

export function playDJTrack(index: number) {
    if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("dj-play-track", { detail: { index } }));
    }
}
