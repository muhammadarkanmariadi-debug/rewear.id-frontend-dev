"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ZigZagRevealProps {
  children: ReactNode;
  index: number;
  className?: string;
  distance?: number;
  duration?: number;
  delayMultiplier?: number;
}

export function ZigZagReveal({
  children,
  index,
  className,
  distance = 100,
  duration = 0.8,
  delayMultiplier = 0.2,
}: ZigZagRevealProps) {
  // Even index comes from left (-distance), odd index comes from right (+distance)
  const isEven = index % 2 === 0;
  const initialX = isEven ? -distance : distance;

  return (
    <motion.div
      initial={{ opacity: 0, x: initialX }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration,
        delay: index * delayMultiplier,
        ease: "easeOut",
      }}
      className={cn("w-full h-full", className)}
    >
      {children}
    </motion.div>
  );
}
