"use client";
import { ReactLenis } from "lenis/react";

export default function SmoothScroll({ children, className }) {
  // Kita hapus ref dan forwardRef dari sini untuk mencegah konflik
  return (
    <ReactLenis root={false} className={className} options={{ lerp: 0.1, duration: 1.5 }}>
      {children}
    </ReactLenis>
  );
}