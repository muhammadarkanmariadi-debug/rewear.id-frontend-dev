import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShoppingBag, ShieldCheck } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-surface-container-low pt-16 pb-24 lg:pt-24 lg:pb-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          <div className="flex flex-col justify-center space-y-6 text-center lg:text-left z-10">
            <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary w-fit mx-auto lg:mx-0">
              <ShieldCheck className="h-4 w-4 mr-2" />
              100% Aman dengan Escrow
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
              Gaya Lama, <span className="text-primary italic">Nilai Baru.</span>
            </h1>
            
            <p className="max-w-[600px] text-lg text-muted-foreground mx-auto lg:mx-0">
              Platform jual beli pakaian preloved terpercaya di Indonesia. Temukan fashion berkualitas dengan harga terjangkau, transaksi 100% dilindungi sistem Escrow.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start">
              <Link 
                href="/products" 
                className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3.5 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                <ShoppingBag className="mr-2 h-4 w-4" />
                Mulai Belanja
              </Link>
              <Link 
                href="/seller" 
                className="inline-flex items-center justify-center rounded-md border border-input bg-background px-8 py-3.5 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                Jual Sekarang
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
          
          {/* Collage Images */}
          <div className="relative mx-auto w-full max-w-[500px] lg:max-w-none h-[400px] lg:h-[500px]">
            <div className="absolute right-0 top-0 w-2/3 h-4/5 rounded-2xl overflow-hidden shadow-2xl border-4 border-background z-20">
              <Image 
                src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&q=80" 
                alt="Vintage fashion rack"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
            <div className="absolute left-0 bottom-0 w-3/5 h-3/5 rounded-2xl overflow-hidden shadow-xl border-4 border-background z-10 translate-y-8 lg:translate-x-8">
              <Image 
                src="https://images.unsplash.com/photo-1489987707023-af8p3c9c9f69?w=600&q=80" 
                alt="Denim streetwear"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 30vw"
              />
            </div>
            <div className="absolute bottom-1/4 right-1/4 translate-x-12 translate-y-12 w-24 h-24 rounded-full bg-verified-green/10 flex items-center justify-center z-30 backdrop-blur-md border border-verified-green/20">
              <div className="text-center ">
                <p className="font-bold text-white block leading-tight text-lg">10k+</p>
                <p className="text-[10px] font-medium text-white">Terjual</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
