"use client";
import { useState, useRef, useEffect } from "react";
import { FaPlay, FaPause } from "react-icons/fa";

export default function BackgroundMusic({ src }) {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined" && !audioRef.current) {
            audioRef.current = new Audio(src);
            audioRef.current.loop = true;
            audioRef.current.volume = 0.1;
        }
    }, [src]);

    const toggle = () => {
        if (audioRef.current) {
            isPlaying ? audioRef.current.pause() : audioRef.current.play().catch(() => { });
            setIsPlaying(!isPlaying);
        }
    };
    return (
        <button onClick={toggle} className="fixed bottom-6 left-6 z-50 w-12 h-12 flex items-center justify-center bg-neutral-800/50 text-white rounded-full backdrop-blur-md border border-white/20 hover:bg-neutral-700 transition">
            {isPlaying ? <FaPause size={18} /> : <FaPlay size={18} />}
        </button>
    );
};