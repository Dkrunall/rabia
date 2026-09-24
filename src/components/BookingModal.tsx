"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";

export function BookingModal() {
    const dialog = useRef<HTMLDialogElement>(null);
    const [opened, setOpened] = useState(false);
    const [date, setDate] = useState("");
    const [city, setCity] = useState("");
    const [eventType, setEventType] = useState("Club headline");
    const [capacity, setCapacity] = useState("300–800");
    const [notes, setNotes] = useState("");
    useEffect(() => {
        const open = () => setOpened(true);
        window.addEventListener("open-booking-modal", open);
        return () => window.removeEventListener("open-booking-modal", open);
    }, []);
    useEffect(() => {
        if (!opened) return;
        const element = dialog.current;
        element?.showModal();
        const previous = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => { element?.close(); document.body.style.overflow = previous; };
    }, [opened]);
    const message = "Hello, I would like to enquire about booking DJ Rabia.\n\nDate: " + (date || "To be confirmed") + "\nCity / venue: " + (city || "To be confirmed") + "\nEvent: " + eventType + "\nCapacity: " + capacity + "\nNotes: " + (notes || "None");
    return <dialog ref={dialog} className="ed-booking" aria-labelledby="booking-title" onClose={() => setOpened(false)} onClick={event => { if (event.target === event.currentTarget) setOpened(false); }}><div className="ed-booking-content"><button className="ed-booking-close" aria-label="Close booking form" onClick={() => setOpened(false)} autoFocus><X /></button><span className="ed-eyebrow">A GREAT NIGHT STARTS HERE</span><h2 id="booking-title">Book <em>Rabia.</em></h2><p>Tell us about your event. We’ll take it from there.</p><form onSubmit={event => { event.preventDefault(); window.location.href = "mailto:darshak@andfriends.in?subject=" + encodeURIComponent("Booking enquiry — DJ Rabia" + (city ? " / " + city : "")) + "&body=" + encodeURIComponent(message); }}><div className="ed-booking-fields"><label>Event date<input type="date" value={date} onChange={event => setDate(event.target.value)} /></label><label>City / venue<input type="text" placeholder="Where’s the night happening?" value={city} onChange={event => setCity(event.target.value)} /></label><label>Event type<select value={eventType} onChange={event => setEventType(event.target.value)}>{["Club headline", "Festival", "Private event", "International tour", "Corporate showcase"].map(option => <option key={option}>{option}</option>)}</select></label><label>Venue capacity<select value={capacity} onChange={event => setCapacity(event.target.value)}>{["Up to 300", "300–800", "800–2,500", "2,500+"].map(option => <option key={option}>{option}</option>)}</select></label></div><label className="ed-notes-label">Anything else?<textarea rows={3} value={notes} placeholder="Lineup, timings, sound system, or any questions…" onChange={event => setNotes(event.target.value)} /></label><div className="ed-booking-actions"><button className="ed-button" type="submit">Continue in email <ArrowUpRight size={18} /></button><a href={"https://wa.me/919594691939?text=" + encodeURIComponent(message)} target="_blank" rel="noopener noreferrer" className="ed-text-link">Use WhatsApp <ArrowUpRight size={17} /></a></div><p className="ed-booking-hint">Opens a draft in your email app or WhatsApp. Review and send your enquiry there.</p></form><a className="ed-booking-email" href="mailto:darshak@andfriends.in">darshak@andfriends.in</a></div></dialog>;
}
export function openBookingModal() { window.dispatchEvent(new CustomEvent("open-booking-modal")); }
