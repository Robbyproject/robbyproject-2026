"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import { TextScramble } from "@/components/ui/TextEffects";

export default function About() {
    const [nameIndex, setNameIndex] = useState(0);
    const [isProfileFlipped, setIsProfileFlipped] = useState(false);

    useEffect(() => {
        const nameInt = setInterval(() => setNameIndex(p => (p + 1) % 2), 4000);
        const flipInt = setInterval(() => setIsProfileFlipped(p => !p), 3500);
        return () => { clearInterval(nameInt); clearInterval(flipInt); };
    }, []);

    return (
        <motion.section
            id="about"
            className="py-24 px-6 w-full max-w-[95%] xl:max-w-7xl mx-auto text-center"
            initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
        >
            <h2 className="text-4xl font-extrabold mb-12 relative inline-block">
                About Me
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-red-500 rounded-full"></span>
            </h2>

            <div className="relative bg-[#1a1a1a] rounded-2xl shadow-2xl border border-white/10 overflow-hidden group">
                {/* Banner Image */}
                <div className="relative w-full h-64 md:h-80 overflow-hidden">
                    <Image src="/Mwe.webp" alt="Banner" fill className="object-cover opacity-80 group-hover:scale-105 transition duration-700" unoptimized />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent"></div>
                </div>

                {/* Profile Content */}
                <div className="px-8 pb-10 -mt-24 relative z-10 flex flex-col items-center">
                    <div className="w-48 h-48 [perspective:1000px] mb-4">
                        <motion.div
                            className="relative w-full h-full [transform-style:preserve-3d]"
                            animate={{ rotateY: isProfileFlipped ? 180 : 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="absolute inset-0 [backface-visibility:hidden] rounded-full border-4 border-[#1a1a1a] shadow-xl overflow-hidden">
                                <Image src="/p.jfif" alt="Profile 1" fill className="object-cover" />
                            </div>
                            <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-full border-4 border-[#1a1a1a] shadow-xl overflow-hidden">
                                <Image src="/elen.jfif" alt="Profile 2" fill className="object-cover" />
                            </div>
                        </motion.div>
                    </div>

                    <h3 className="text-4xl font-bold flex items-center gap-3 mb-4">
                        <TextScramble text={["Mikoo Katsu", "Robby Fabian"][nameIndex]} />
                        <FaCheckCircle className="text-blue-500 text-2xl" />
                    </h3>

                    <p className="text-gray-300 max-w-2xl font-sans leading-relaxed text-lg">
                        I&apos;m a designer and developer specializing in designing digital experiences from concept to implementation.
                        My creative journey began in graphic design, where I honed my aesthetics, visual composition, and strong branding.
                    </p>
                </div>
            </div>
        </motion.section>
    );
}