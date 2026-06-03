"use client";

import { cn } from "@/lib/utils";

export function ProductSkeleton({ count = 8, className }: { count?: number; className?: string }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={cn("flex flex-col gap-3 w-full animate-pulse", className)}>
          {/* Image Placeholder */}
          <div className="w-full aspect-[4/5] bg-muted/40 rounded-2xl"></div>
          {/* Content */}
          <div className="space-y-2">
            <div className="h-4 bg-muted/40 rounded w-3/4"></div>
            <div className="h-3 bg-muted/40 rounded w-1/2"></div>
            <div className="h-5 bg-muted/40 rounded w-1/3 mt-2"></div>
          </div>
        </div>
      ))}
    </>
  );
}
