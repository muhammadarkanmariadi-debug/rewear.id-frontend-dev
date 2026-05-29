import { CheckCircle2, Lock, ArrowRightLeft, CreditCard, Box, ShieldCheck, ThumbsUp } from "lucide-react";

export function EscrowHighlight() {
  const steps = [
    { icon: CheckCircle2, label: "Pilih & Deal" },
    { icon: CreditCard, label: "Bayar ke Escrow" },
    { icon: Lock, label: "Dana Ditahan" },
    { icon: Box, label: "Penjual Kirim" },
    { icon: ArrowRightLeft, label: "Barang Diterima" },
    { icon: ThumbsUp, label: "Cek & Konfirmasi" },
    { icon: ShieldCheck, label: "Dana Diteruskan" }
  ];

  return (
    <section className="py-24 bg-foreground text-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-background/10 via-transparent to-transparent opacity-50" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center bg-background/10 border border-background/20 px-5 py-2 rounded-full mb-8 backdrop-blur-sm">
            <ShieldCheck className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium tracking-wide">Sistem Keamanan Tingkat Bank</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Bebas Penipuan, <span className="opacity-80">Dijamin.</span>
          </h2>
          <p className="text-background/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Dana Anda tersimpan di rekening escrow pihak ketiga. Kami tidak meneruskan pembayaran ke penjual sebelum barang diterima sesuai deskripsi.
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto mt-16 px-4">
          <div className="overflow-x-auto pb-12 hide-scrollbar">
            <div className="relative min-w-[900px] py-4">
              {/* Animated Connector Line */}
              <div className="absolute top-1/2 left-10 right-10 h-0.5 bg-background/10 -translate-y-[calc(50%+1rem)]">
                <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-background/40 to-transparent animate-[pulse_3s_ease-in-out_infinite]" />
              </div>
              
              <div className="flex justify-between items-start relative z-10">
                {steps.map((step, idx) => {
                  const isMiddle = idx === 2;
                  const isEnd = idx === 6;
                  
                  return (
                    <div key={idx} className="group flex flex-col items-center gap-5 w-28">
                      <div className={`relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 transform group-hover:-translate-y-2 group-hover:scale-110 ${
                        isMiddle ? 'bg-background text-foreground ring-4 ring-background/30 shadow-[0_0_20px_rgba(255,255,255,0.3)]' : 
                        isEnd ? 'bg-background text-foreground ring-4 ring-background/30 shadow-[0_0_20px_rgba(255,255,255,0.3)]' : 
                        'bg-background/10 border border-background/20 text-background backdrop-blur-md group-hover:bg-background/20'
                      }`}>
                        <step.icon className={`w-6 h-6 ${isMiddle || isEnd ? 'animate-pulse' : ''}`} />
                      </div>
                      <span className="text-sm font-medium text-center leading-tight text-background/80 group-hover:text-background transition-colors">
                        {step.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
