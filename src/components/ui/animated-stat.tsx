"use client";

import React from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedStatProps {
  value: number;
  label: string;
  suffix?: string;
  separator?: string;
  index?: number;
  valueClassName?: string;
  labelClassName?: string;
  className?: string;
}

export function AnimatedStat({
  value,
  label,
  suffix = "",
  separator = "",
  index = 0,
  valueClassName,
  labelClassName,
  className,
}: AnimatedStatProps) {
  // Zig-zag effect: left (-100) for even, right (100) for odd
  const isEven = index % 2 === 0;
  const initialX = isEven ? -100 : 100;

  return (
    <motion.div
      initial={{ opacity: 0, x: initialX }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
      className={cn("flex flex-col", className)}
    >
      <p 
        className={cn("font-black leading-none text-foreground", valueClassName)} 
        style={{ fontFamily: "'Integral CF', 'Arial Black', sans-serif" }}
      >
        <CountUp
          end={value}
          suffix={suffix}
          separator={separator}
          duration={2.5}
          enableScrollSpy
          scrollSpyOnce
        />
      </p>
      <p className={cn("text-muted-foreground mt-1", labelClassName)}>
        {label}
      </p>
    </motion.div>
  );
}
