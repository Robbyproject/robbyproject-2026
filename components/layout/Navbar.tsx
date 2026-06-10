"use client";
import { Home, User, Briefcase, Mail, MessageCircle } from "lucide-react";
import { scrollToId, playSound } from "@/utils/helpers";

const navItems = [
  { name: "Home", icon: Home, id: "hero" },
  { name: "About", icon: User, id: "about" },
  { name: "Work", icon: Briefcase, id: "galeri" },
  { name: "Contact", icon: Mail, id: "kontak" },
];

export default function Navbar({ onChatToggle }) {
  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <nav className="flex items-center gap-2 px-4 py-3 rounded-full glass shadow-2xl bg-black/50">
        {navItems.map((item) => (
          <button
            key={item.name}
            onClick={() => { playSound(); scrollToId(item.id); }}
            className="p-3 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300 relative group"
          >
            <item.icon size={20} />
            {/* Tooltip */}
            <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 text-[10px] bg-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition duration-300 whitespace-nowrap border border-white/10">
              {item.name}
            </span>
          </button>
        ))}
        
        <div className="w-[1px] h-6 bg-white/10 mx-1"></div>

        <button onClick={() => { playSound(); onChatToggle(); }} className="p-3 rounded-full text-green-400 hover:bg-green-500/10 transition-all relative">
          <MessageCircle size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
        </button>
      </nav>
    </div>
  );
}