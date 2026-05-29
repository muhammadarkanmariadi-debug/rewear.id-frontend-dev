import { Search, Shield, PackageCheck } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      icon: Search,
      title: "1. Pilih Produk",
      description: "Eksplorasi ribuan koleksi baju dan celana preloved dari para penjual terpercaya di seluruh Indonesia."
    },
    {
      icon: Shield,
      title: "2. Bayar Aman",
      description: "Sistem Escrow kami menahan uang Anda sementara hingga barang aman sampai di tangan Anda tanpa cacat."
    },
    {
      icon: PackageCheck,
      title: "3. Terima Barang",
      description: "Konfirmasi penerimaan barang, barulah uang akan diteruskan ke penjual. Belanja preloved 100% bebas waswas."
    }
  ];

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-20">
          <p className="text-sm font-medium text-muted-foreground tracking-widest uppercase mb-3">
            Sederhana & Mudah
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Cara Kerja rewear.id</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Proses jual beli preloved sesimpel dan seaman bertransaksi di e-commerce besar. Tiga langkah mudah menuju gaya baru.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10 lg:gap-16 relative mt-12">
          {/* Decorative Connector Line */}
          <div className="hidden md:block absolute top-[3.5rem] left-[16%] right-[16%] h-[2px] bg-gradient-to-r from-transparent via-border to-transparent -z-10" />

          {steps.map((step, index) => (
            <div key={index} className="group flex flex-col items-center text-center">
              <div className="relative mb-8">
                {/* Outer animated ring */}
                <div className="absolute -inset-4 rounded-full border border-border/0 group-hover:border-border/60 bg-transparent transition-all duration-300 transform group-hover:scale-105" />
                
                {/* Icon Container */}
                <div className="relative h-28 w-28 bg-surface-container-low rounded-full flex items-center justify-center border border-border shadow-sm transition-transform duration-300 group-hover:-translate-y-2 group-hover:shadow-md">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-foreground/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <step.icon className="h-10 w-10 text-foreground" strokeWidth={1.5} />
                  
                  {/* Step Number Badge */}
                  <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center font-bold text-sm shadow-md border-2 border-background">
                    {index + 1}
                  </div>
                </div>
              </div>
              
              <h3 className="text-xl font-bold mb-3 tracking-tight group-hover:text-primary transition-colors">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
