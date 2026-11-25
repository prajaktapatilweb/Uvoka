"use client";

import { useRef, useState, ReactNode } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  enableTilt?: boolean;
}

export function AnimatedCard({
  children,
  className = "",
  delay = 0,
  enableTilt = true,
}: AnimatedCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [sheenPosition, setSheenPosition] = useState({ x: 50, y: 50, opacity: 0 });
  const reduced = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced || !enableTilt || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Subtle tilt: max ~6 degrees
    const rotX = ((y - centerY) / centerY) * -6;
    const rotY = ((x - centerX) / centerX) * 6;

    setRotateX(rotX);
    setRotateY(rotY);
    setSheenPosition({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.15,
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setSheenPosition((prev) => ({ ...prev, opacity: 0 }));
  };

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.65,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      animate={{
        rotateX: enableTilt ? rotateX : 0,
        rotateY: enableTilt ? rotateY : 0,
      }}
      style={{
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      className={`relative rounded-2xl md:rounded-3xl border border-[var(--color-primary)]/40 bg-white/85 backdrop-blur-md transition-shadow duration-300 hover:shadow-[0_16px_40px_rgba(82,33,102,0.08)] hover:border-[var(--color-primary)]/30 ${className}`}
    >
      {/* Dynamic Cursor Light Sheen */}
      {enableTilt && (
        <div
          className="absolute inset-0 rounded-2xl md:rounded-3xl pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${sheenPosition.x}% ${sheenPosition.y}%, rgba(210, 185, 139, 0.18), transparent 65%)`,
            opacity: sheenPosition.opacity,
          }}
          aria-hidden="true"
        />
      )}

      {children}
    </motion.div>
  );
}
