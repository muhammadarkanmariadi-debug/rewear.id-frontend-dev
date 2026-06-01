"use client";

import { Heart } from "lucide-react";
import { useState } from "react";
import { bookmarkService } from "@/services";

export function BookmarkButton({ productId, initialStatus }: { productId: string, initialStatus: boolean }) {
  const [isBookmarked, setIsBookmarked] = useState(initialStatus);
  const [loading, setLoading] = useState(false);

  const toggle = async () => {
    if (loading) return;
    setLoading(true);
    const prev = isBookmarked;
    setIsBookmarked(!prev);
    try {
      const res = await bookmarkService.toggle(productId);
      if (!res.status) {
        setIsBookmarked(prev);
      }
    } catch {
      setIsBookmarked(prev);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={toggle}
      disabled={loading}
      className={`flex flex-1 justify-center items-center gap-2 border rounded-xl h-12 font-semibold transition-all ${
        isBookmarked 
          ? "bg-red-50 text-red-500 border-red-200 hover:bg-red-100" 
          : "bg-surface-container hover:bg-accent border-border text-foreground"
      }`}
    >
      <Heart className={`w-4 h-4 ${isBookmarked ? "fill-current" : ""}`} /> 
      {isBookmarked ? 'Disimpan' : 'Wishlist'}
    </button>
  );
}
