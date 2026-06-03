"use client";

import { cn } from "@/lib/utils";

interface TableSkeletonProps {
  columns?: number;
  rows?: number;
  className?: string;
}

export function TableSkeleton({ columns = 5, rows = 10, className }: TableSkeletonProps) {
  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        <tr key={i} className={cn("animate-pulse border-b border-border/50", className)}>
          {Array.from({ length: columns }).map((_, j) => (
            <td key={j} className="px-6 py-4">
              <div className="flex flex-col gap-2">
                <div className="h-4 bg-muted/50 rounded w-3/4"></div>
                {j === 0 && <div className="h-3 bg-muted/50 rounded w-1/2 mt-1"></div>}
              </div>
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}
