import type { Metadata } from "next";

import { TransitionProvider } from "@/components/TransitionProvider";
import { Navigation } from "@/components/Navigation";
import { CustomCursor } from "@/components/CustomCursor";
import { InteractiveLaserGrid } from "@/components/InteractiveLaserGrid";
import { SmoothScroll } from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "DJ RABIA | Press Kit & Portfolio",
  description: "Official biography, riders, and gig history for DJ RABIA.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="/compiled.css" />
      </head>
      <body
        className="antialiased selection:bg-pink-200 selection:text-pink-900"
      >
        <SmoothScroll />
        <TransitionProvider>
          <div className="noise-overlay" />
          <div className="mesh-bg" />
          <InteractiveLaserGrid />
          <CustomCursor />
          <Navigation />
          <main className="relative z-10 min-h-screen overflow-x-hidden">
            {children}
          </main>
        </TransitionProvider>
      </body>
    </html>
  );
}
