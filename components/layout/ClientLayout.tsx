"use client";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import LoadingScreen from "@/components/ui/LoadingScreen";

export default function ClientLayout({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Cek apakah user sudah pernah membuka web di sesi ini
    const hasVisited = sessionStorage.getItem("hasVisited");
    
    if (hasVisited) {
      setIsLoading(false); // Matikan loading jika sudah pernah visit
    }
  }, []);

  const handleComplete = () => {
    setIsLoading(false);
    sessionStorage.setItem("hasVisited", "true"); // Simpan tanda bahwa user sudah visit
  };

  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={handleComplete} />}
      </AnimatePresence>
      {children}
    </>
  );
}