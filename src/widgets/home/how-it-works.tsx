import { Search, Shield, PackageCheck } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      icon: <Search className="h-8 w-8 text-black" />,
      title: "1. Pilih Produk",
      description: "Eksplorasi ribuan koleksi baju dan celana preloved dari para penjual terpercaya di seluruh Indonesia."
    },
    {
      icon: <Shield className="h-8 w-8 text-black" />,
      title: "2. Bayar Aman",
      description: "Sistem Escrow kami menahan uang Anda sementara hingga barang aman sampai di tangan Anda tanpa cacat."
    },
    {
      icon: <PackageCheck className="h-8 w-8 text-black" />,
      title: "3. Terima Barang",
      description: "Konfirmasi penerimaan barang, barulah uang akan diteruskan ke penjual. Belanja preloved 100% bebas waswas."
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Cara Kerja rewear.id</h2>
          <p className="text-muted-foreground text-lg max-w-[600px] mx-auto">
            Proses jual beli preloved sesimpel dan seaman bertransaksi di e-commerce besar.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 relative">
          {/* Connector Line for Desktop */}
          <div className="hidden md:block absolute top-1/2 left-[15%] right-[15%] h-0.5 bg-border -translate-y-6 -z-10" />

          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center bg-card p-6 rounded-2xl shadow-sm border border-border">
              <div className="h-16 w-16 bg-surface-container-high rounded-full flex items-center justify-center mb-6 shadow-sm ring-4 ring-background">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
