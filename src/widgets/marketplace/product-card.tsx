"use client";
import { Product } from "@/entities/product";
import { formatRupiah } from "@/shared/utils/format";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShieldCheck } from "lucide-react";

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    return (
        <Link key={product.id} href={`/products/${product.slug}`} className="group relative bg-card border border-border rounded-xl overflow-hidden hover:border-foreground/30 transition-colors shadow-sm block flex-1 flex flex-col h-full">
            <div className="relative aspect-[4/5] overflow-hidden bg-surface-container shrink-0 w-full">
                <Image
                    src={product.images[0]}
                    alt={product.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />

                {/* Condition Badge */}
                <div className="absolute top-3 left-3 bg-background/95 backdrop-blur-sm px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase shadow-sm border border-border">
                    {product.condition === "baru" ? "Baru dengan Tag" : "Preloved"}
                </div>

                {/* Escrow Badge */}
                <div className="absolute top-3 right-3 bg-green-500 text-white p-1.5 rounded-full shadow-sm" title="Dilindungi Escrow">
                    <ShieldCheck className="w-3.5 h-3.5" />
                </div>
            </div>

            <div className="p-4 flex flex-col flex-grow">
                <div className="flex justify-between items-start gap-2 mb-1 cursor-default">
                    <h3 className="font-semibold text-sm line-clamp-2 leading-tight flex-grow">
                        {product.title}
                    </h3>
                    <button className="text-muted-foreground hover:text-red-500 transition-colors bg-surface-container aspect-square rounded-full p-1.5 shrink-0" onClick={(e) => e.preventDefault()}>
                        <Heart className="w-3.5 h-3.5" />
                    </button>
                </div>

                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">{product.brand || "Unbranded"}</p>

                <div className="mt-auto pt-3">
                    <p className="text-sm font-medium text-muted-foreground">Ukuran {product.size}</p>
                    <p className="text-lg font-bold text-foreground">{formatRupiah(product.price)}</p>
                </div>

                <div className="flex items-center gap-2 mt-4 pt-3 border-t border-border shrink-0">
                    <div className="relative w-5 h-5 rounded-full overflow-hidden border border-border">
                        <Image src={product.seller.avatar_url || 'https://i.pravatar.cc/150?img=11'} alt={product.seller.name} fill sizes="20px" className="object-cover" />
                    </div>
                    <span className="text-xs text-muted-foreground truncate font-medium">{product.seller.name}</span>
                </div>
            </div>
        </Link>
    );
}