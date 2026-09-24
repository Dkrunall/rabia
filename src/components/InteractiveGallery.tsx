"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, X, ChevronLeft, ChevronRight } from "lucide-react";
const GALLERY_PHOTOS = [
    { id: 1, src: "/img/r16.jpg", alt: "DJ Rabia Portrait", width: 800, height: 1000 },
    { id: 2, src: "/img/r21.jpg", alt: "DJ Rabia Live Mix", width: 1000, height: 667 },
    { id: 3, src: "/img/r12.JPG", alt: "DJ Rabia Stage", width: 900, height: 1200 },
    { id: 4, src: "/img/r2.JPG", alt: "DJ Rabia Crowd Energy", width: 1200, height: 800 },
    { id: 5, src: "/img/r18.jpg", alt: "DJ Rabia Studio", width: 800, height: 1100 },
    { id: 6, src: "/img/r17.jpg", alt: "DJ Rabia Performance", width: 1000, height: 750 },
    { id: 7, src: "/img/r3.JPG", alt: "DJ Rabia Decks", width: 1200, height: 800 },
    { id: 8, src: "/img/r20.jpg", alt: "DJ Rabia Press", width: 800, height: 1000 },
    { id: 9, src: "/img/r4.JPG", alt: "DJ Rabia Night", width: 1100, height: 750 },
    { id: 10, src: "/img/r22.jpg", alt: "DJ Rabia Lasers", width: 1000, height: 667 },
    { id: 11, src: "/img/r6.JPG", alt: "DJ Rabia Sunrise", width: 1200, height: 800 },
    { id: 12, src: "/img/r24.jpg", alt: "DJ Rabia Editorial", width: 800, height: 1100 },
    { id: 13, src: "/img/r7.JPG", alt: "DJ Rabia Stage Lights", width: 1100, height: 750 },
    { id: 14, src: "/img/r9.JPG", alt: "DJ Rabia Crowd Wave", width: 1200, height: 800 },
    { id: 15, src: "/img/r13.JPG", alt: "DJ Rabia Sound", width: 900, height: 1200 },
    { id: 16, src: "/img/r23.jpg", alt: "DJ Rabia Closing", width: 1000, height: 667 },
];


export function InteractiveGallery() {
    const [filter, setFilter] = useState("All");
    const [expanded, setExpanded] = useState(false);
    const [active, setActive] = useState<number | null>(null);
    const dialog = useRef<HTMLDialogElement>(null);
    const allPhotos = GALLERY_PHOTOS.filter(photo => filter === "All" || (filter === "New shoot" ? photo.src.endsWith(".jpg") : photo.src.endsWith(".JPG")));
    const photos = expanded ? allPhotos : allPhotos.slice(0, 4);
    const current = active === null ? null : GALLERY_PHOTOS[active];
    const isOpen = active !== null;
    useEffect(() => {
        if (!isOpen) return;
        const modal = dialog.current;
        modal?.showModal();
        const previous = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => { modal?.close(); document.body.style.overflow = previous; };
    }, [isOpen]);
    const move = (step: number) => setActive(index => index === null ? null : (index + step + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length);
    return <section className="ed-gallery ed-section" id="gallery"><div className="ed-label"><span>03 / SELECTED FRAMES</span><span>A little closer.</span></div><div className="ed-section-heading"><h2>Beyond<br />the <em>sound.</em></h2><div className="ed-filters" aria-label="Filter photographs">{["All", "New shoot", "Archive"].map(item => <button key={item} aria-pressed={filter === item} onClick={() => { setFilter(item); setExpanded(false); }}>{item}</button>)}</div></div><div className="ed-photo-grid">{photos.map(photo => <button className="ed-gallery-photo" key={photo.id} onClick={() => setActive(GALLERY_PHOTOS.indexOf(photo))} aria-label={"Enlarge photo " + photo.id + " of Rabia"}><span className="ed-gallery-image"><Image src={photo.src} alt={"Rabia — portrait " + String(photo.id).padStart(2,"0")} fill sizes="(max-width: 550px) 90vw, (max-width: 900px) 45vw, 24vw" /><span className="ed-gallery-zoom"><ArrowUpRight size={22} /></span></span><span className="ed-gallery-caption"><span>{photo.src.endsWith(".jpg") ? "THE NEW EDIT" : "FROM THE ARCHIVE"}</span><span>{String(photo.id).padStart(2,"0")}</span></span></button>)}</div>{allPhotos.length > 4 && <button className="ed-gallery-more ed-text-link" aria-expanded={expanded} onClick={() => setExpanded(!expanded)}>{expanded ? "Show fewer frames" : "View all " + allPhotos.length + " frames"}<ArrowUpRight size={18} /></button>}<dialog ref={dialog} className="ed-lightbox" aria-label="Photo gallery viewer" onClose={() => setActive(null)} onClick={event => { if (event.target === event.currentTarget) setActive(null); }} onKeyDown={event => { if(event.key === "ArrowRight") move(1); if(event.key === "ArrowLeft") move(-1); }}>{current && <><button className="ed-lightbox-close" aria-label="Close photo" onClick={() => setActive(null)} autoFocus><X /></button><button className="ed-lightbox-prev" aria-label="Previous photo" onClick={() => move(-1)}><ChevronLeft /></button><div className="ed-lightbox-image"><Image src={current.src} alt={"Rabia — photo " + current.id} fill sizes="90vw" className="object-contain" /></div><button className="ed-lightbox-next" aria-label="Next photo" onClick={() => move(1)}><ChevronRight /></button><p>{String((active ?? 0) + 1).padStart(2,"0")} / {GALLERY_PHOTOS.length}</p></>}</dialog></section>;
}
