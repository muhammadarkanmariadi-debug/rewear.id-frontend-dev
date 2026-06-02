"use client";
import { Product } from "@/entities/product";
import { formatRupiah } from "@/shared/utils/format";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShieldCheck } from "lucide-react";

import { useState } from "react";
import { bookmarkService } from "@/services";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(product.is_bookmarked ?? false);
  const [loading, setLoading] = useState(false);


  const handleBookmark = async (e: React.MouseEvent) => {
    e.preventDefault(); // prevent next/link redirect
    if (loading) return;

    setLoading(true);
    const prev = isBookmarked;
    setIsBookmarked(!prev);
    

    try {
      const res = await bookmarkService.toggle(product.id);
      if (!res.status) setIsBookmarked(prev);
    } catch {
      setIsBookmarked(prev);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col bg-card hover:shadow-md border border-border/60 hover:border-foreground/20 rounded-2xl h-full overflow-hidden transition-all duration-300"
    >
      {/* Image Container */}
      <div className="relative bg-surface-container w-full aspect-[3/4] overflow-hidden">
        <Image
          src={product.images?.[0]?.image_url || '/images/hero.png'}
          alt={product.title || 'image'}
          fill
          className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        {/* Gradient overlay bottom */}
        <div className="bottom-0 absolute inset-x-0 bg-gradient-to-t from-black/20 to-transparent h-16" />

        {/* Top badges */}
        <div className="top-2.5 right-2.5 left-2.5 absolute flex justify-between items-center">
          <span className="bg-background/90 backdrop-blur-sm px-2 py-1 border border-border/50 rounded-md font-bold text-[9px] text-foreground uppercase tracking-[0.12em]">
            {product.condition === "new_with_tag" ? "Baru" : "Preloved"}
          </span>
          <span
            className="bg-green-500/90 backdrop-blur-sm p-1.5 rounded-full text-white"
            title="Dilindungi Escrow"
          >
            <ShieldCheck className="w-3 h-3" />
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 gap-3 p-3.5">
        {/* Title row */}
        <div className="flex justify-between items-start gap-2">
          <div className="flex-1 min-w-0">
            <p className="mb-0.5 font-semibold text-[10px] text-muted-foreground/70 uppercase tracking-[0.15em]">
              {product.brand || "Unbranded"}
            </p>
            <h3 className="font-medium text-foreground text-sm line-clamp-2 leading-snug">
              {product.title}
            </h3>
          </div>
          <button
            onClick={handleBookmark}
            disabled={loading}
            className={`flex justify-center items-center mt-0.5 rounded-full w-7 h-7 transition-colors shrink-0 ${isBookmarked
                ? "bg-red-50 text-red-500 hover:bg-red-100"
                : "text-muted-foreground/50 hover:bg-red-50/10 hover:text-red-400"
              }`}
          >
            <Heart className={`w-3.5 h-3.5 ${isBookmarked || product.is_bookmarked === true ? "fill-current" : ""}`} />
          </button>
        </div>

        {/* Price & Size */}
        <div className="flex justify-between items-end mt-auto">
          <div>
            <p className="mb-0.5 text-[10px] text-muted-foreground/60">
              Ukuran {product.size}
            </p>
            <p className="font-semibold text-foreground text-base tracking-tight">
              {formatRupiah(product.price)}
            </p>
          </div>
        </div>

        {/* Seller */}
        {product.seller && (
          <div className="flex items-center gap-2 pt-3 border-border/50 border-t">
            <div className="relative border border-border/60 rounded-full w-4.5 h-4.5 overflow-hidden shrink-0">
              <Image
                src={product.seller.avatar_url || "https://i.pravatar.cc/150?img=11"}
                alt={product.seller.name}
                fill
                sizes="18px"
                className="object-cover"
              />
            </div>
            <span className="text-[11px] text-muted-foreground/70 truncate">
              {product.seller.name}
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}