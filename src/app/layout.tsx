import type { Metadata } from "next";
import "./globals.css";

import { Navigation } from "@/components/Navigation";
import { BookingModal } from "@/components/BookingModal";



export const metadata: Metadata = {
  metadataBase: new URL("https://djrabia.com"),
  title: "DJ RABIA | Official Techno Press Kit, Tour Dates & Booking",
  description: "Official press kit, discography, technical riders, and gig calendar for DJ RABIA. Experience visionary techno, peak-time sets, and global residencies.",
  keywords: ["DJ Rabia", "Techno DJ", "Female Techno DJ", "Press Kit", "Riders", "EPK", "Mumbai Techno", "Goa Techno", "Underground Techno"],
  openGraph: {
    title: "DJ RABIA | Official Artist Portfolio",
    description: "Peak-time techno, melodic soundscapes, and global residencies. Official biography, riders, and booking console.",
    siteName: "DJ RABIA",
    type: "website",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "DJ RABIA | Official Artist Portfolio",
    description: "Peak-time techno, melodic soundscapes, and global residencies. Official biography, riders, and booking console.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="editorial-site">





        <Navigation />
        {/* Main Content Area */}
        <div className="relative z-10 min-h-screen overflow-x-hidden">
          {children}
        </div>



        {/* Global Booking Modal */}
        <BookingModal />
      </body>
    </html>
  );
}
