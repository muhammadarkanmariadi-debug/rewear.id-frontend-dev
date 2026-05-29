import { CheckCircle2, Lock, ArrowRightLeft, CreditCard, Box, ShieldCheck, ThumbsUp } from "lucide-react";

export function EscrowHighlight() {
  const steps = [
    { icon: <CheckCircle2 className="w-5 h-5 text-white" />, label: "Pilih & Deal" },
    { icon: <CreditCard className="w-5 h-5 text-white" />, label: "Bayar ke Escrow" },
    { icon: <Lock className="w-5 h-5 text-white" />, label: "Dana Ditahan" },
    { icon: <Box className="w-5 h-5 text-white" />, label: "Penjual Kirim" },
    { icon: <ArrowRightLeft className="w-5 h-5 text-white" />, label: "Barang Diterima" },
    { icon: <ThumbsUp className="w-5 h-5 text-white" />, label: "Cek & Konfirmasi" },
    { icon: <ShieldCheck className="w-5 h-5 text-white" />, label: "Dana Diteruskan" }
  ];

  return (
    <section className="py-20 bg-primary text-primary-foreground border-y-4 border-black">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center bg-white/20 px-4 py-1.5 rounded-full mb-6">
            <ShieldCheck className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">Sistem Keamanan Bank-Grade</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-white">Bebas Penipuan, Dijamin.</h2>
          <p className="text-primary-foreground/80 text-lg max-w-[600px] mx-auto">
            Dana Anda tersimpan dengan aman di rekening pihak ketiga (Escrow) rewear.id. Kami tidak akan meneruskan pembayaran ke penjual sampai Anda menerima barang sesuai deskripsi.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto mt-12 pb-8 overflow-x-auto">
          {/* Connector Line */}
          <div className="absolute top-6 left-8 right-8 h-1 bg-white/20 -z-0 hidden md:block" />
          
          <div className="flex justify-between items-start min-w-[800px] px-4 md:min-w-0">
            {steps.map((step, idx) => (
              <div key={idx} className="flex flex-col items-center gap-4 z-10 w-24">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg ${
                  idx === 2 ? 'bg-amber-500 ring-4 ring-amber-500/30' : 
                  idx === 6 ? 'bg-green-500 ring-4 ring-green-500/30' : 
                  'bg-white/20'
                }`}>
                  {step.icon}
                </div>
                <span className="text-xs font-semibold text-center leading-tight">
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
