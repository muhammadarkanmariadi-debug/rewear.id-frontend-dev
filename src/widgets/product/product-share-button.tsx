"use client";

import { useState } from "react";
import { Share2, X, Link as LinkIcon, Check } from "lucide-react";
import QRCode from "react-qr-code";
import { Product } from "@/entities";

interface ProductShareButtonProps {
  product: Product;
}

export function ProductShareButton({ product }: ProductShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const productUrl = typeof window !== "undefined" 
    ? `${window.location.origin}/products/${product.slug}`
    : `https://rewear.id/products/${product.slug}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(productUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareText = `Lihat ${product.title} di rewear.id!`;

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="flex justify-center items-center bg-surface-container hover:bg-accent border border-border rounded-xl w-12 h-12 font-semibold text-foreground transition-all shrink-0"
        title="Bagikan Produk"
      >
        <Share2 className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <div className="bg-card border border-border w-full max-w-md rounded-3xl shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 pb-4 border-b border-border flex items-center justify-between">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <Share2 className="w-5 h-5 text-primary" />
                Bagikan Produk
              </h3>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-muted rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* QR Code */}
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="bg-white p-4 rounded-xl border border-border shadow-sm">
                  <QRCode 
                    value={productUrl} 
                    size={180}
                    level="H"
                  />
                </div>
                <p className="text-sm font-medium text-muted-foreground">Scan QR Code untuk membuka</p>
              </div>

              {/* URL Link */}
              <div className="flex items-center gap-2 bg-muted/50 p-2 rounded-lg border border-border">
                <div className="bg-background p-2 rounded-md border border-border">
                  <LinkIcon className="w-4 h-4 text-muted-foreground" />
                </div>
                <input 
                  type="text" 
                  readOnly 
                  value={productUrl} 
                  className="flex-1 bg-transparent border-none text-sm outline-none text-muted-foreground px-2"
                />
                <button 
                  onClick={handleCopyLink}
                  className="px-4 py-2 bg-foreground text-background text-xs font-bold rounded-md hover:bg-foreground/90 transition-colors"
                >
                  {copied ? <Check className="w-4 h-4" /> : "Salin"}
                </button>
              </div>

              {/* Social Media */}
              <div className="pt-4 border-t border-border">
                <p className="text-sm font-semibold mb-3 text-center">Atau bagikan via</p>
                <div className="flex justify-center gap-4">
                  <a 
                    href={`https://wa.me/?text=${encodeURIComponent(shareText + " " + productUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 flex items-center justify-center rounded-full bg-green-500/10 text-green-600 hover:bg-green-500/20 transition-colors"
                  >
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                  </a>
                  <a 
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-600/10 text-blue-600 hover:bg-blue-600/20 transition-colors"
                  >
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  </a>
                  <a 
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(productUrl)}&text=${encodeURIComponent(shareText)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 flex items-center justify-center rounded-full bg-neutral-500/10 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-500/20 transition-colors"
                  >
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
