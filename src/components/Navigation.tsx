"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { openBookingModal } from "./BookingModal";
const links = [{ title: "About", href: "/#biography" }, { title: "Sound", href: "/#sound" }, { title: "Gallery", href: "/#gallery" }, { title: "Shows", href: "/#shows" }];
export function Navigation() {
    const [open, setOpen] = useState(false);
    const toggle = useRef<HTMLButtonElement>(null);
    useEffect(() => { const close = (event: KeyboardEvent) => { if (event.key === "Escape" && open) { setOpen(false); toggle.current?.focus(); } }; window.addEventListener("keydown", close); return () => window.removeEventListener("keydown", close); }, [open]);
    return <header className="ed-header"><a className="ed-skip" href="#main-content">Skip to content</a><Link href="/" className="ed-logo" aria-label="Rabia home"><Image src="/rabia.png" width={150} height={50} alt="Rabia" priority /></Link><nav className="ed-desktop-nav" aria-label="Main navigation">{links.map(link => <Link href={link.href} key={link.title}>{link.title}</Link>)}</nav><div className="ed-header-actions"><button className="ed-header-book" onClick={openBookingModal}>Let’s talk <ArrowUpRight size={16} /></button><button ref={toggle} className="ed-menu-toggle" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button></div>{open && <nav id="mobile-nav" className="ed-mobile-nav" aria-label="Mobile navigation">{links.map(link => <Link href={link.href} key={link.title} onClick={() => setOpen(false)}>{link.title}<ArrowUpRight size={20} /></Link>)}<Link href="/#riders" onClick={() => setOpen(false)}>Press & riders<ArrowUpRight size={20} /></Link></nav>}</header>;
}
