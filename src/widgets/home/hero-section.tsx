"use client";
import Link from "next/link";
import Image from "next/image";
import { ShieldCheck } from "lucide-react";

import { AnimatedStat } from "@/components/ui/animated-stat";

function StarIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 0 C12 6.627 6.627 12 0 12 C6.627 12 12 17.373 12 24 C12 17.373 17.373 12 24 12 C17.373 12 12 6.627 12 0Z" />
    </svg>
  );
}

const STATS = [
  { value: 200, suffix: "+", label: "International Brands", separator: "" },
  { value: 2000, suffix: "+", label: "High-Quality Products", separator: "," },
  { value: 30000, suffix: "+", label: "Happy Customers", separator: "," },
];




export function HeroSection() {
  return (
    <div className="w-full overflow-hidden">
      {/* ═══════════════════════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════════════════════ */}
      <section className="relative bg-background overflow-hidden">

        {/* ── MOBILE < lg ──────────────────────────────────────── */}
        <div className="lg:hidden flex flex-col">
          <div className="px-6 pt-8 pb-0">
            {/* Escrow badge */}
            <div className="inline-flex items-center gap-1.5 rounded-full bg-background/80 backdrop-blur-sm border border-border px-3 py-1.5 text-[11px] font-medium text-foreground shadow-sm mb-5">
              <ShieldCheck className="w-3.5 h-3.5 text-green-500" />
              100% Aman dengan Escrow
            </div>

            <h1
              className="text-[2.4rem] font-black uppercase leading-[0.88] tracking-tight text-foreground"
              style={{ fontFamily: "'Integral CF Bold', 'Arial Black', sans-serif" }}
            >
              Find Clothes<br />That Matches<br />Your Style
            </h1>

            <p className="mt-4 text-[13px] leading-relaxed text-muted-foreground max-w-sm">
              Browse through our diverse range of meticulously crafted garments,
              designed to bring out your individuality and cater to your sense of style.
            </p>

            <div className="mt-6 flex flex-col gap-2.5">
              <Link href="/products" className="inline-flex items-center justify-center rounded-full bg-foreground px-8 py-3.5 text-sm font-semibold text-background hover:bg-foreground/85 transition-colors">
                Shop Now
              </Link>
              <Link href="/login" className="inline-flex items-center justify-center rounded-full border border-foreground/30 bg-transparent px-8 py-3.5 text-sm font-semibold text-foreground hover:bg-foreground/5 transition-colors">
                Jual Sekarang
              </Link>
            </div>

            {/* Stats 2+1 */}
            <div className="mt-8 flex items-stretch border-b border-border pb-5 overflow-hidden">
              <AnimatedStat 
                index={0}
                value={200} 
                suffix="+" 
                label="International Brands" 
                className="flex-1"
                valueClassName="text-2xl"
                labelClassName="text-[11px]"
              />
              <div className="w-px bg-border self-stretch mx-4" />
              <AnimatedStat 
                index={1}
                value={2000} 
                suffix="+" 
                separator=","
                label="High-Quality Products" 
                className="flex-1"
                valueClassName="text-2xl"
                labelClassName="text-[11px]"
              />
            </div>
            <div className="pt-5 mb-4 overflow-hidden">
              <AnimatedStat 
                index={2}
                value={30000} 
                suffix="+" 
                separator=","
                label="Happy Customers" 
                valueClassName="text-2xl"
                labelClassName="text-[11px]"
              />
            </div>
          </div>

          {/* Hero image */}
          <div className="relative w-full" style={{ height: "360px" }}>
            <Image src="/assets/images/hero.png" alt="Fashion model" fill priority className="object-cover object-top" sizes="100vw" />
            
            <StarIcon className="absolute top-8 right-8 w-9 h-9 text-foreground z-10" />
            <StarIcon className="absolute top-[50%] left-[12%] w-5 h-5 text-foreground z-10" />
          </div>
        </div>

        {/* ── TABLET  lg → xl  (1024px – 1279px) ─────────────── */}
        <div className="hidden lg:flex xl:hidden flex-row items-stretch min-h-[560px]">

          {/* Left content — fixed width so image always has room */}
          <div className="flex flex-col justify-center px-10 pt-14 pb-10 w-[50%] shrink-0 z-10">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-background/80 backdrop-blur-sm border border-border px-3 py-1.5 text-[11px] font-medium text-foreground shadow-sm mb-5 w-fit">
              <ShieldCheck className="w-3.5 h-3.5 text-green-500" />
              100% Aman dengan Escrow
            </div>

            <h1
              className="text-[clamp(2.2rem,3.5vw,3.2rem)] font-black uppercase leading-[0.88] tracking-tight text-foreground"
              style={{ fontFamily: "'Integral CF', 'Arial Black', sans-serif" }}
            >
              Find Clothes<br />That Matches<br />Your Style
            </h1>

            <p className="mt-4 text-[13px] leading-relaxed text-muted-foreground max-w-[340px]">
              Browse through our diverse range of meticulously crafted garments,
              designed to bring out your individuality and cater to your sense of style.
            </p>

            <div className="mt-5 flex items-center gap-3 flex-wrap">
              <Link href="/products" className="inline-flex items-center justify-center rounded-full bg-foreground px-7 py-3 text-sm font-semibold text-background hover:bg-foreground/85 transition-colors">
                Shop Now
              </Link>
              <Link href="/seller" className="inline-flex items-center justify-center rounded-full border border-foreground/30 bg-transparent px-7 py-3 text-sm font-semibold text-foreground hover:bg-foreground/5 transition-colors">
                Jual Sekarang
              </Link>
            </div>

            {/* Stats horizontal */}
            <div className="mt-8 flex items-stretch divide-x divide-border overflow-hidden">
              {STATS.map((stat, i) => (
                <AnimatedStat
                  key={stat.label}
                  index={i}
                  value={stat.value}
                  suffix={stat.suffix}
                  separator={stat.separator}
                  label={stat.label}
                  className="pr-5 first:pl-0 [&:not(:first-child)]:pl-5"
                  valueClassName="text-[1.4rem]"
                  labelClassName="text-[10px]"
                />
              ))}
            </div>
          </div>

          {/* Right image — fills remaining space */}
          <div className="relative flex-1 min-w-0">
            <Image
              src="/assets/images/hero.png"
              alt="Fashion model"
              fill
              priority
              className="object-cover object-top"
              sizes="50vw"
            />
          
            <StarIcon className="absolute top-8 right-8 w-9 h-9 text-foreground z-10" />
            <StarIcon className="absolute top-[50%] left-[12%] w-5 h-5 text-foreground z-10" />
          </div>
        </div>

        {/* ── DESKTOP  ≥ xl ────────────────────────────────────── */}
        <div className="hidden xl:block">
          <div className="max-w-screen-2xl mx-auto flex flex-row items-stretch min-h-[620px]">

            {/* Left */}
            <div className="flex flex-col justify-center px-16 2xl:px-24 pt-20 pb-12 w-[50%] shrink-0 z-10">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-background/80 backdrop-blur-sm border border-border px-3 py-1.5 text-[11px] font-medium text-foreground shadow-sm mb-7 w-fit">
                <ShieldCheck className="w-3.5 h-3.5 text-green-500" />
                100% Aman dengan Escrow
              </div>

              <h1
                className="text-[clamp(3rem,4.2vw,4.2rem)] font-black uppercase leading-[0.88] tracking-tight text-foreground"
                style={{ fontFamily: "'Integral CF', 'Arial Black', sans-serif" }}
              >
                Find Clothes<br />That Matches<br />Your Style
              </h1>

              <p className="mt-5 max-w-[420px] text-[13px] leading-relaxed text-muted-foreground">
                Browse through our diverse range of meticulously crafted garments,
                designed to bring out your individuality and cater to your sense of style.
              </p>

              <div className="mt-8 flex items-center gap-4">
                <Link href="/products" className="inline-flex items-center justify-center rounded-full bg-foreground px-9 py-3.5 text-sm font-semibold text-background hover:bg-foreground/85 transition-colors">
                  Shop Now
                </Link>
                <Link href="/seller" className="inline-flex items-center justify-center rounded-full border border-foreground/30 bg-transparent px-9 py-3.5 text-sm font-semibold text-foreground hover:bg-foreground/5 transition-colors">
                  Jual Sekarang
                </Link>
              </div>

              <div className="mt-10 flex items-stretch divide-x divide-border overflow-hidden">
                {STATS.map((stat, i) => (
                  <AnimatedStat
                    key={stat.label}
                    index={i}
                    value={stat.value}
                    suffix={stat.suffix}
                    separator={stat.separator}
                    label={stat.label}
                    className="pr-8 first:pl-0 [&:not(:first-child)]:pl-8"
                    valueClassName="text-[1.75rem]"
                    labelClassName="text-[11px]"
                  />
                ))}
              </div>
            </div>

            {/* Right image */}
            <div className="relative flex-1 min-w-0 overflow-hidden">
              <Image src="/assets/images/hero.png" alt="Fashion model" fill priority className="object-cover object-top" sizes="50vw" />
             
              <StarIcon className="absolute top-10 right-[8%] w-11 h-11 text-foreground z-10" />
              <StarIcon className="absolute top-[52%] left-[8%] w-6 h-6 text-foreground z-10" />
            </div>
          </div>
        </div>
      </section>


    </div>
  );
}