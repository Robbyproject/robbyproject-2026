"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Bot, User as UserIcon, Sparkles } from "lucide-react";
import CardSpotlight from "@/components/ui/CardSpotlight"; 

export default function ChatBot({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hi! I'm Robby's AI Assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      let replyText = "I'm just a demo bot right now. Please contact Robby directly!";
      const lowerInput = userMsg.text.toLowerCase();
      if (lowerInput.includes("hello") || lowerInput.includes("hi")) replyText = "Hello there! Welcome to the portfolio.";
      if (lowerInput.includes("contact")) replyText = "You can contact Robby via the Contact page.";
      if (lowerInput.includes("project")) replyText = "Robby has worked on many amazing projects. Check the Projects tab!";
      setMessages((prev) => [...prev, { role: "bot", text: replyText }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          // 👇 PERBAIKAN UKURAN RESPONSIF DI SINI
          className="
            fixed 
            z-[90] 
            bg-[#121212] 
            rounded-2xl 
            overflow-hidden 
            shadow-2xl
            
            /* MOBILE */
            bottom-4 left-4 right-4 
            h-[60vh] w-auto

            /* DESKTOP (lg:) */
            lg:bottom-28 lg:right-10 lg:left-auto 
            lg:w-[400px] lg:h-[500px]
          "
        >
          <CardSpotlight 
            color="rgba(255, 255, 255, 0.1)" 
            className="w-full h-full bg-[#121212] border border-white/10 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/5 bg-black/20 backdrop-blur-md relative z-20">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-zinc-700 to-zinc-900 flex items-center justify-center border border-white/10">
                   <Bot size={16} className="text-zinc-300" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">AI Assistant</h3>
                  <p className="text-[10px] text-zinc-500 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> Online
                  </p>
                </div>
              </div>
              <button onClick={onClose} className="p-2 text-zinc-500 hover:text-white transition-colors hover:bg-white/5 rounded-full">
                <X size={18} />
              </button>
            </div>

            {/* Chat Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 relative z-20 custom-scrollbar">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`flex items-end gap-2 max-w-[80%] ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 border border-white/5 ${msg.role === "user" ? "bg-white text-black" : "bg-zinc-800 text-zinc-400"}`}>
                        {msg.role === "user" ? <UserIcon size={12} /> : <Bot size={12} />}
                    </div>
                    <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${msg.role === "user" ? "bg-zinc-200 text-black rounded-br-none font-medium" : "bg-zinc-800/80 text-zinc-300 border border-white/5 rounded-bl-none"}`}>
                      {msg.text}
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                   <div className="flex items-end gap-2">
                      <div className="w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center border border-white/5"><Bot size={12} className="text-zinc-400" /></div>
                      <div className="bg-zinc-800/80 border border-white/5 px-4 py-3 rounded-2xl rounded-bl-none flex gap-1">
                          <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce"></span>
                          <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce delay-75"></span>
                          <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce delay-150"></span>
                      </div>
                   </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-white/5 bg-black/20 backdrop-blur-md relative z-20">
              <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex items-center gap-2">
                <div className="relative flex-1">
                    <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message..." className="w-full bg-zinc-900/50 border border-zinc-700/50 text-white text-sm rounded-full py-2.5 pl-4 pr-10 focus:outline-none focus:border-zinc-500 transition-colors placeholder:text-zinc-600" />
                    <Sparkles size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600" />
                </div>
                <button type="submit" disabled={!input.trim()} className="p-2.5 bg-white text-black rounded-full hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                  <Send size={16} />
                </button>
              </form>
            </div>
          </CardSpotlight>
        </motion.div>
      )}
    </AnimatePresence>
  );
}