"use client";
import Hero from "@/components/sections/Hero";

export default function Home() {
  return (
    /* Hapus px-6, pt-24, dsb dari sini. 
       Biarkan kontainer ini benar-benar bersih agar konten bisa FULL.
    */
    <div className="w-full min-h-screen">
      <Hero />
    </div>
  );
}