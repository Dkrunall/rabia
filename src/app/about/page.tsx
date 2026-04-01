import React from "react";

export default function About() {
    return (
        <div className="relative min-h-screen pr-24 py-12 flex flex-col justify-center">
            <div className="container mx-auto">
                <div className="max-w-4xl">
                    <span className="text-xl font-bold text-[#B84D6B] mb-4 block">our story</span>
                    <h1 className="truus-heading text-[10vw] md:text-[8vw] text-black mb-12">
                        we build<br />
                        truus values.
                    </h1>

                    <div className="grid md:grid-cols-2 gap-12 mt-12">
                        <div className="space-y-6">
                            <h3 className="text-2xl font-black text-black">Design First</h3>
                            <p className="text-xl text-black/60 font-medium leading-relaxed">
                                By focusing on bold typography and organic movement, we create experiences that are impossible to ignore. Every pixel is intentional.
                            </p>
                        </div>
                        <div className="space-y-6">
                            <h3 className="text-2xl font-black text-black">Code Second</h3>
                            <p className="text-xl text-black/60 font-medium leading-relaxed">
                                Technology is the vehicle, but design is the engine. We use Next.js and GSAP to bring these static concepts to life with fluid motion.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
