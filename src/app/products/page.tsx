import React from "react";
import { Star } from "lucide-react";

export default function Products() {
    const cases = [
        { title: "Digital First", client: "Hema", color: "bg-[#EBD3F3]" },
        { title: "App Launch", client: "Douwe Egberts", color: "bg-[#B84D6B] text-white" },
        { title: "Social Wave", client: "Red Bull", color: "bg-[#F0EFEA]" },
    ];

    return (
        <div className="relative min-h-screen pr-24 py-12 flex flex-col justify-center">
            <div className="container mx-auto">
                <div className="flex justify-between items-end mb-16">
                    <h1 className="truus-heading text-[10vw] md:text-[8vw] text-black">
                        all our<br />cases.
                    </h1>
                    <div className="mb-6 flex gap-4">
                        <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center font-bold">
                            +
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {cases.map((item, i) => (
                        <div key={i} className={`p-8 rounded-[32px] aspect-square flex flex-col justify-between shadow-sm cursor-pointer hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${item.color}`}>
                            <div className="flex justify-between items-start">
                                <span className="font-bold text-sm uppercase tracking-widest">{item.client}</span>
                                <Star className="w-5 h-5 fill-current" />
                            </div>
                            <h3 className="text-4xl font-black leading-none">{item.title}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
