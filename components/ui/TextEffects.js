"use client";
import { useState, useEffect } from "react";

export const TextScramble = ({ text }) => {
    const [display, setDisplay] = useState("");
    const [mounted, setMounted] = useState(false);
    const chars = "アイウエオカキクケコサシスセソ101010";

    useEffect(() => setMounted(true), []);

    useEffect(() => {
        let frame = 0; const queue = [];
        const max = Math.max(display.length, text.length);
        for (let i = 0; i < max; i++) queue.push({ from: display[i] || "", to: text[i] || "", start: Math.random() * 40, end: Math.random() * 40 + 40 });

        const anim = () => {
            let out = ""; let done = 0;
            for (let i = 0; i < queue.length; i++) {
                if (frame >= queue[i].end) { done++; out += queue[i].to; }
                else if (frame >= queue[i].start) out += chars[Math.floor(Math.random() * chars.length)];
                else out += queue[i].from;
            }
            setDisplay(out);
            if (done < queue.length) { frame++; requestAnimationFrame(anim); }
        };
        requestAnimationFrame(anim);
    }, [text]);

    if (!mounted) return <span>{text}</span>;
    return <span>{display}</span>;
};

export const TypingEffect = ({ titles }) => {
    const [text, setText] = useState('');
    const [isDel, setIsDel] = useState(false);
    const [loop, setLoop] = useState(0);

    useEffect(() => {
        const ticker = setTimeout(() => {
            const full = titles[loop % titles.length];
            setText(cur => isDel ? full.substring(0, cur.length - 1) : full.substring(0, cur.length + 1));
            if (!isDel && text === full) setTimeout(() => setIsDel(true), 2000);
            else if (isDel && text === '') { setIsDel(false); setLoop(l => l + 1); }
        }, isDel ? 50 : 100);
        return () => clearTimeout(ticker);
    }, [text, isDel, loop, titles]);

    return <span className="border-r-2 border-white pr-1 animate-pulse">{text}&nbsp;</span>;
};