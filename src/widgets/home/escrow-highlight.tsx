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
    <section className="relative bg-foreground py-24 overflow-hidden text-background">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-background/10 via-transparent to-transparent opacity-50" />
      
      <div className="z-10 relative mx-auto px-4 md:px-6 container">
        <div className="mb-20 text-center">
          <div className="inline-flex justify-center items-center bg-background/10 backdrop-blur-sm mb-8 px-5 py-2 border border-background/20 rounded-full">
            <ShieldCheck className="mr-2 w-4 h-4" />
            <span className="font-medium text-sm tracking-wide">Sistem Keamanan Tingkat Bank</span>
          </div>
          <h2 className="mb-6 font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight">
            Bebas Penipuan, <span className="opacity-80">Dijamin.</span>
          </h2>
          <p className="mx-auto max-w-2xl text-background/70 text-lg md:text-xl leading-relaxed">
            Dana Anda tersimpan di rekening escrow pihak ketiga. Kami tidak meneruskan pembayaran ke penjual sebelum barang diterima sesuai deskripsi.
          </p>
        </div>

        <div className="relative mx-auto mt-16 px-4 max-w-6xl">
          <div className="pb-12 overflow-x-auto hide-scrollbar">
            <div className="relative py-4 min-w-[900px]">
              {/* Animated Connector Line */}
              <div className="top-1/2 right-10 left-10 absolute bg-background/10 h-0.5 -translate-y-[calc(50%+1rem)]">
                <div className="left-0 absolute inset-y-0 bg-gradient-to-r from-transparent via-background/40 to-transparent w-1/3 animate-[pulse_3s_ease-in-out_infinite]" />
              </div>
              
              <div className="z-10 relative flex justify-between items-start">
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
                      <span className="font-medium text-background/80 group-hover:text-background text-sm text-center leading-tight transition-colors">
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
