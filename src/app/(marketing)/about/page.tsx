import { Leaf, ShieldCheck, RefreshCw, Users } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Tentang Kami | rewear.id",
  description:
    "Pelajari lebih lanjut tentang misi rewear.id, platform jual-beli pakaian preloved terpercaya untuk mendukung fashion yang berkelanjutan.",
};

const values = [
  {
    icon: Leaf,
    title: "Ramah Lingkungan",
    description:
      "Kami percaya pada kekuatan sirkular ekonomi. Setiap pakaian preloved yang dibeli berarti satu pakaian lebih sedikit di tempat pembuangan akhir.",
  },
  {
    icon: ShieldCheck,
    title: "100% Aman & Terpercaya",
    description:
      "Transparansi dan keamanan adalah prioritas kami. Dengan sistem Escrow, dana Anda aman sampai barang diterima sesuai dengan deskripsi.",
  },
  {
    icon: RefreshCw,
    title: "Gaya Lama, Nilai Baru",
    description:
      "Visi kami adalah memberikan kehidupan kedua pada pakaian berkualitas, memungkinkan Anda tampil gaya tanpa harus menguras dompet.",
  },
  {
    icon: Users,
    title: "Komunitas Peduli",
    description:
      "rewear.id bukan hanya platform, tapi rumah bagi komunitas yang peduli pada masa depan planet ini melalui pilihan fashion yang cerdas.",
  },
];

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-16 md:py-24">
      {/* Hero / Intro Section */}
      <div className="max-w-3xl mx-auto text-center mb-20 md:mb-32">
        <p className="text-sm font-medium text-muted-foreground tracking-widest uppercase mb-4">
          Tentang Kami
        </p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-8">
          Mendefinisikan ulang cara kita{" "}
          <span className="text-muted-foreground">mengkonsumsi fashion.</span>
        </h1>
        <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
          rewear.id didirikan dengan satu misi sederhana: membuat fashion
          berkelanjutan menjadi mudah, aman, dan dapat diakses oleh semua orang.
          Kami adalah jembatan antara gaya dan tanggung jawab lingkungan.
        </p>
      </div>

      {/* Stats/Highlight Section */}
      <div className="max-w-5xl mx-auto mb-20 md:mb-32 rounded-3xl border border-border/60 bg-surface-container-low p-8 md:p-16 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          &quot;Sustainable fashion bukan lagi sekadar tren, melainkan sebuah
          keharusan.&quot;
        </h2>
        <p className="text-muted-foreground mb-10 max-w-2xl mx-auto">
          Melalui platform jual-beli preloved kami, kami bertujuan untuk
          memperpanjang usia pakai setiap helai benang, mengurangi jejak karbon,
          dan membangun komunitas yang sadar akan pentingnya gaya hidup
          berkelanjutan.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8 border-t border-border/40">
          <div>
            <p className="text-4xl font-bold text-foreground mb-2">1M+</p>
            <p className="text-sm font-medium text-muted-foreground">
              Pakaian Diselamatkan
            </p>
          </div>
          <div>
            <p className="text-4xl font-bold text-foreground mb-2">500k</p>
            <p className="text-sm font-medium text-muted-foreground">
              Anggota Aktif
            </p>
          </div>
          <div>
            <p className="text-4xl font-bold text-foreground mb-2">100%</p>
            <p className="text-sm font-medium text-muted-foreground">
              Pembayaran Aman
            </p>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="max-w-5xl mx-auto mb-20 md:mb-32">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
          Nilai-Nilai Kami
        </h2>
        <div className="grid sm:grid-cols-2 gap-6 md:gap-10">
          {values.map((value) => (
            <div
              key={value.title}
              className="group p-8 rounded-2xl border border-border/60 hover:border-foreground/20 transition-colors bg-background"
            >
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-6">
                <value.icon className="w-6 h-6 text-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-3">{value.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-3xl mx-auto text-center p-8 md:p-12 rounded-3xl border border-border/60 bg-foreground text-background">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Mari bergabung dengan gerakan ini.
        </h2>
        <p className="text-muted/80 mb-8 max-w-xl mx-auto">
          Mulai jual pakaian yang sudah tidak Anda pakai, atau temukan harta karun
          preloved berikutnya. Setiap langkah kecil sangat berarti.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/products"
            className="flex h-11 items-center justify-center rounded-full bg-background px-8 text-sm font-medium text-foreground hover:bg-background/90 transition-colors w-full sm:w-auto"
          >
            Mulai Belanja
          </Link>
          <Link
            href="/products/new"
            className="flex h-11 items-center justify-center rounded-full border border-background/20 px-8 text-sm font-medium hover:bg-background/10 transition-colors w-full sm:w-auto"
          >
            Jual Pakaian
          </Link>
        </div>
      </div>
    </div>
  );
}
