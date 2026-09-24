"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, Plus, Minus } from "lucide-react";
import { openBookingModal } from "./BookingModal";
import { InteractiveGallery } from "./InteractiveGallery";

export const EPK = "https://drive.google.com/drive/folders/18JGyjN8uICNcoXvTnmijQX70EYcn7Tj3?usp=sharing";
const genres = [
    { name: "Techno", tempo: "134–138 BPM", text: "Driving kicks. Rolling basslines. A feeling that stays with you long after the lights come on.", image: "/img/r21.jpg", note: "Raw / hypnotic / after dark" },
    { name: "Melodic Tech", tempo: "126–130 BPM", text: "Atmospheric textures and emotional melodies. A slow build into something bigger than the room.", image: "/img/r20.jpg", note: "Atmospheric / emotive / expansive" },
    { name: "Afro House", tempo: "122–125 BPM", text: "Organic percussion, warm low ends, and rhythms that bring everyone a little closer.", image: "/img/r22.jpg", note: "Organic / soulful / connected" },
    { name: "Hard Groove", tempo: "136–140 BPM", text: "Percussion up front. Relentless rhythm and a rolling groove built to keep the floor moving.", image: "/img/r18.jpg", note: "Percussive / restless / rhythmic" },
];

export function ArtistStory({ expanded = false }: { expanded?: boolean }) {
    return <section className="ed-story ed-section" id="biography">
        <div className="ed-label"><span>01 / THE ARTIST</span><span>Instinct meets intention.</span></div>
        <div className="ed-story-grid">
            <div className="ed-story-photo"><Image src="/img/r16.jpg" alt="Rabia, hands framing her face" fill sizes="(max-width: 700px) 90vw, 34vw" /></div>
            <div className="ed-story-copy"><span className="ed-eyebrow">BEHIND THE BOOTH</span><h2>It starts with<br />a <em>feeling.</em></h2>
                <p>From the dancefloor to the DJ booth. Rabia brings an instinct for reading a room to every set, moving between hypnotic techno, melodic textures, and deep, percussive grooves.</p>
                <p>Eight years in nightlife PR shaped her connection to music and the people who move to it. Today, that connection is at the heart of her sound.</p>
                {expanded ? <p>Rooted in pulse-pounding kickdrums, hypnotic basslines, and euphoric melodic builds, her sets bring precision mixing together with an infectious stage presence. Every room brings a different energy. Every set responds to it.</p> : <Link className="ed-text-link" href="/about">Get to know Rabia <ArrowUpRight size={18} /></Link>}
                <div className="ed-story-foot"><span>TECHNO AT HEART.</span><span>ALWAYS IN MOTION.</span></div>
            </div>
        </div>
    </section>;
}

export function SoundSection() {
    const [selected, setSelected] = useState(0);
    const current = genres[selected];
    return <section className="ed-sound ed-section" id="sound">
        <div className="ed-label"><span>02 / THE SOUND</span><span>Different shades. Same instinct.</span></div>
        <div className="ed-section-heading"><h2>Find your<br /><em>frequency.</em></h2><p>A spectrum of sounds.<br />One connection to the dancefloor.</p></div>
        <div className="ed-sound-grid"><div className="ed-genres" aria-label="Explore sound styles">{genres.map((genre, index) => <button key={genre.name} aria-pressed={selected === index} aria-controls="sound-description" onClick={() => setSelected(index)} className={selected === index ? "is-active" : ""}><span className="ed-index">0{index + 1}</span><span>{genre.name}</span>{selected === index ? <Minus size={20} /> : <Plus size={20} />}</button>)}</div>
            <div className="ed-sound-card" id="sound-description" aria-live="polite"><div className="ed-sound-image"><Image key={current.image} src={current.image} alt={"Rabia — " + current.name + " mood"} fill sizes="(max-width: 700px) 90vw, 42vw" /><span>{current.tempo}</span></div><div className="ed-sound-description"><span className="ed-eyebrow">{current.note}</span><p>{current.text}</p><a href={EPK} target="_blank" rel="noopener noreferrer" className="ed-text-link">Explore the press kit <ArrowUpRight size={18} /></a></div></div>
        </div>
    </section>;
}

function Shows() {
    return <section className="ed-shows ed-section" id="shows"><div className="ed-label"><span>04 / SELECTED STAGES</span><span>From intimate rooms to late nights.</span></div><div className="ed-section-heading"><h2>Made for<br />the <em>dancefloor.</em></h2><button className="ed-text-link" onClick={openBookingModal}>Bring Rabia to your city <ArrowUpRight size={18} /></button></div><div className="ed-venues">{[{ name: "Opa!", city: "Mumbai" }, { name: "Waikiki", city: "Goa" }, { name: "Baglami", city: "Delhi" }, { name: "Takumi", city: "Mumbai" }, { name: "Akina", city: "Bandra" }, { name: "Vamos", city: "Goa" }].map((venue, i) => <div className="ed-venue" key={venue.name}><span className="ed-index">0{i + 1}</span><h3>{venue.name}</h3><span>{venue.city}</span><span className="ed-venue-note">STAGE ARCHIVE</span></div>)}</div></section>;
}

function Rider() {
    return <section className="ed-rider ed-section" id="riders"><div><span className="ed-eyebrow">05 / FOR PROMOTERS</span><h2>Set the<br /><em>stage.</em></h2><a href={EPK} target="_blank" rel="noopener noreferrer" className="ed-text-link">Open full press kit <ArrowUpRight size={18} /></a></div><div className="ed-rider-list"><details open><summary>Technical requirements <Plus size={18} /></summary><ul><li>2 × Pioneer CDJ 2000 Nexus 2 or CDJ 3000</li><li>1 × Pioneer DJM 900 Nexus 2 mixer</li><li>Booth monitor with independent volume control</li><li>Dimmer-controlled booth lighting and connected link cables</li></ul></details><details><summary>Hospitality <Plus size={18} /></summary><p>Premium vodka, 4 chilled Red Bulls, 4 still mineral waters, and 2 fresh black towels. Please confirm travel and green room arrangements with management.</p></details><details><summary>Soundcheck <Plus size={18} /></summary><p>Please allow a minimum 45-minute soundcheck before doors open, including booth monitor calibration and USB Pro DJ Link testing.</p></details></div></section>;
}

export function EditorialFooter() {
    return <footer className="ed-footer ed-section" id="contact"><div className="ed-label"><span>LET’S MAKE A NIGHT OF IT.</span><span>BOOKINGS & ENQUIRIES</span></div><button className="ed-book-large" onClick={openBookingModal}>Let’s connect.<ArrowUpRight aria-hidden="true" /></button><div className="ed-contact-row"><div><span className="ed-eyebrow">ARTIST MANAGEMENT</span><a href="mailto:darshak@andfriends.in">darshak@andfriends.in</a></div><a className="ed-text-link" href="tel:+919594691939">+91 9594 691939 <ArrowUpRight size={18} /></a><a className="ed-text-link" href={EPK} target="_blank" rel="noopener noreferrer">Press kit <ArrowUpRight size={18} /></a></div><div className="ed-footer-bottom"><Link href="/" className="ed-footer-logo" aria-label="Rabia home"><Image src="/rabia.png" alt="Rabia" width={180} height={60} /></Link><span>© {new Date().getFullYear()} DJ Rabia</span><a href="#top">Back to top ↑</a></div></footer>;
}

export function EditorialHome() {
    const home = useRef<HTMLElement>(null);
    const hero = useRef<HTMLElement>(null);
    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const elements = home.current?.querySelectorAll(".ed-section-heading, .ed-story-grid, .ed-venue, .ed-rider-list");
        const observer = new IntersectionObserver(entries => entries.forEach(entry => {
            if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); }
        }), { threshold: 0.08 });
        elements?.forEach(element => { element.classList.add("ed-reveal"); observer.observe(element); });
        return () => { observer.disconnect(); elements?.forEach(element => element.classList.remove("ed-reveal")); };
    }, []);
    return <main ref={home} id="main-content" className="ed-home"><section ref={hero} className="ed-hero" id="top" onPointerMove={event => { if (event.pointerType !== "mouse") return; const box = event.currentTarget.getBoundingClientRect(); event.currentTarget.style.setProperty("--pointer-x", ((event.clientX - box.left) / box.width * 100) + "%"); event.currentTarget.style.setProperty("--pointer-y", ((event.clientY - box.top) / box.height * 100) + "%"); }}><div className="ed-hero-orbit" aria-hidden="true" /><div className="ed-hero-top"><span><i /> DJ & SELECTOR</span><span>OFFICIAL ARTIST PORTFOLIO</span></div><div className="ed-hero-grid"><div className="ed-hero-copy"><span className="ed-eyebrow">IN THE MOMENT. IN THE MUSIC.</span><h1 className="ed-hero-brand"><span className="sr-only">Rabia</span><Image src="/rabia.png" alt="" width={680} height={228} priority /></h1><p>Feel the sound.<br />Live the <em>moment.</em></p><div className="ed-hero-actions"><button className="ed-button" onClick={openBookingModal}>Book Rabia <ArrowUpRight size={19} /></button><a href="#sound" className="ed-text-link">Explore the sound <ArrowDown size={17} /></a></div><div className="ed-hero-note"><div className="ed-wave" aria-hidden="true">{Array.from({length: 26}, (_, i) => <i key={i} style={{height: (8 + ((i * 17) % 29)) + "px", animationDelay: (i * 0.07) + "s"}} />)}</div><span>TECHNO / MELODIC / AFRO HOUSE</span><span>For the ones who feel it.</span></div></div><div className="ed-hero-photo"><Image src="/img/r24.jpg" alt="Rabia in a black leather jacket, seated in the studio" fill priority sizes="(max-width: 700px) 100vw, 50vw" /><div className="ed-floating-note"><span className="ed-note-dot" /> IN HER ELEMENT<span className="ed-note-lines">Raw energy.<br />Real connection.</span></div><a href="#gallery" className="ed-photo-link" aria-label="Explore the photo gallery"><ArrowUpRight size={25} /></a></div></div><div className="ed-hero-bottom"><span>RHYTHM. CONNECTION. ENERGY.</span><a href="#biography">SCROLL TO DISCOVER <ArrowDown size={14} /></a></div></section><div className="ed-ticker" aria-hidden="true"><div>{[0,1,2,3].map(i => <span key={i}>IN THE MUSIC <b>✳</b> IN THE MOMENT <b>✳</b> RABIA <b>✳</b></span>)}</div></div><ArtistStory /><SoundSection /><InteractiveGallery /><Shows /><Rider /><EditorialFooter /></main>;
}
