"use client";
import { useState, useEffect } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

export default function Spotlight({ children, className = "" }) {
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={`relative w-full min-h-screen group ${className}`}
      onMouseMove={handleMouseMove}
    >
      {/* Efek Cahaya Background */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(255,255,255,0.10),
              transparent 80%
            )
          `,
        }}
      />
      
      {/* Konten Website */}
      <div className="relative h-full">{children}</div>
    </div>
  );
}