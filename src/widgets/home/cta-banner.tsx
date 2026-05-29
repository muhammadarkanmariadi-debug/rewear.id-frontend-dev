import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CTABanner() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="bg-foreground text-background rounded-[2.5rem] p-10 md:p-16 lg:p-20 relative overflow-hidden group">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-background/20 via-transparent to-transparent opacity-60" />
          
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start justify-between relative z-10 w-full">
            {/* Left Column: Heading */}
            <div className="flex-1 max-w-2xl">
              <p className="text-sm font-semibold tracking-widest uppercase mb-6 text-background/60">
                Mulai Perjalanan Anda
              </p>
              
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
                Punya baju <br />
                <span className="text-background/50 italic font-serif">numpuk</span> <br />
                di lemari?
              </h2>
            </div>
            
            {/* Right Column: Content & Action */}
            <div className="flex-1 max-w-xl lg:mt-16">
              <p className="text-lg md:text-xl text-background/80 mb-10 leading-relaxed font-medium">
                Ubah gaya lama menjadi nilai baru. Mulai jual koleksi pakaian preloved Anda hari ini dan rasakan kemudahan bertransaksi 100% aman berkat teknologi Escrow.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Link 
                  href="/products/new"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-background text-foreground px-8 py-4 rounded-full font-bold text-base hover:bg-background/90 transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl"
                >
                  Mulai Jual Pakaian
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/about"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-full font-bold text-base text-background border border-background/30 hover:bg-background/10 transition-colors"
                >
                  Pelajari Lebih Lanjut
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
