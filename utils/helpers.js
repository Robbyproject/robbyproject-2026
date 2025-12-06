export const playSound = (src = '/click-sound.mp3') => {
    if (typeof window !== 'undefined') {
        const audio = new Audio(src);
        audio.volume = 0.2;
        audio.play().catch(() => {});
    }
};

export const scrollToId = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
};