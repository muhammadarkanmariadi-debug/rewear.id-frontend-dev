import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CTABanner() {
  return (
    <section className="py-12 bg-background mb-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="bg-primary text-primary-foreground rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden flex flex-col items-center text-center">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
          
          <h2 className="text-3xl md:text-5xl font-bold mb-4 relative z-10 w-full max-w-2xl">
            Punya Baju Numpling di Lemari?
          </h2>
          <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 max-w-2xl relative z-10">
            Jadikan gaya lamamu, nilai baru. Mulai jual koleksi pakaian preloved Anda hari ini dan rasakan pengalaman berjualan yang 100% aman berkat teknologi Escrow.
          </p>
          
          <Link 
            href="/seller/register"
            className="inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-xl font-bold hover:bg-neutral-100 transition-colors relative z-10"
          >
            Mulai Jual Bajumu Sekarang
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
