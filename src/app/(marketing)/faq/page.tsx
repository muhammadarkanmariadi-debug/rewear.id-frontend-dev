import { ChevronDown } from "lucide-react";

export const metadata = {
  title: "FAQ - Pertanyaan Umum | rewear.id",
  description:
    "Temukan jawaban untuk pertanyaan yang paling sering diajukan seputar jual-beli pakaian preloved di rewear.id.",
};

const faqCategories = [
  {
    title: "Umum",
    items: [
      {
        q: "Apa itu rewear.id?",
        a: "rewear.id adalah platform jual-beli pakaian bekas (preloved) berkualitas. Kami menghubungkan penjual dan pembeli dengan sistem transaksi aman berbasis escrow, sehingga setiap pihak terlindungi.",
      },
      {
        q: "Bagaimana cara membuat akun?",
        a: 'Klik tombol "Masuk" di pojok kanan atas, pilih "Daftar", lalu isi formulir pendaftaran dengan email dan password Anda. Verifikasi email akan dikirim untuk mengaktifkan akun.',
      },
      {
        q: "Apakah rewear.id gratis digunakan?",
        a: "Ya, mendaftar dan menjelajahi produk di rewear.id sepenuhnya gratis. Biaya layanan kecil dikenakan hanya saat transaksi jual-beli berhasil.",
      },
    ],
  },
  {
    title: "Membeli",
    items: [
      {
        q: "Bagaimana cara membeli produk?",
        a: "Pilih produk yang Anda inginkan, klik tombol checkout, dan ikuti proses pembayaran. Dana Anda akan diamankan oleh sistem escrow hingga barang diterima dalam kondisi sesuai deskripsi.",
      },
      {
        q: "Apa itu sistem Escrow?",
        a: "Escrow adalah sistem perlindungan di mana dana pembeli ditahan oleh platform sampai barang diterima dan dikonfirmasi. Jika ada masalah, dana bisa dikembalikan. Ini menjamin keamanan kedua belah pihak.",
      },
      {
        q: "Bagaimana jika barang tidak sesuai deskripsi?",
        a: "Anda dapat mengajukan sengketa melalui halaman pesanan. Tim kami akan meninjau kasus dan memfasilitasi resolusi, termasuk pengembalian dana jika memang terbukti tidak sesuai.",
      },
    ],
  },
  {
    title: "Menjual",
    items: [
      {
        q: "Bagaimana cara menjual baju?",
        a: 'Pastikan Anda sudah login, lalu klik "Jual Baju" di navigasi. Upload foto produk dengan pencahayaan yang baik, isi deskripsi sejujur mungkin termasuk kondisi dan ukuran, lalu tentukan harga.',
      },
      {
        q: "Kapan saya menerima pembayaran?",
        a: "Dana akan dirilis ke saldo wallet Anda setelah pembeli mengkonfirmasi bahwa barang sudah diterima dengan baik, atau otomatis setelah masa tunggu konfirmasi berakhir.",
      },
      {
        q: "Produk apa saja yang boleh dijual?",
        a: "Semua jenis pakaian bekas layak pakai (atasan, bawahan, outerwear, dll.) dengan kondisi baik. Produk cacat berat, palsu, atau berbahaya tidak diperbolehkan.",
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-16 md:py-24">
      {/* Header */}
      <div className="max-w-2xl mx-auto text-center mb-16">
        <p className="text-sm font-medium text-muted-foreground tracking-widest uppercase mb-3">
          Pusat Bantuan
        </p>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Pertanyaan Umum
        </h1>
        <p className="text-muted-foreground text-lg leading-relaxed">
          Temukan jawaban untuk pertanyaan yang sering diajukan seputar
          rewear.id.
        </p>
      </div>

      {/* FAQ Sections */}
      <div className="max-w-3xl mx-auto space-y-12">
        {faqCategories.map((category) => (
          <section key={category.title}>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-6 border-b border-border/60 pb-3">
              {category.title}
            </h2>
            <div className="space-y-1">
              {category.items.map((item) => (
                <details
                  key={item.q}
                  className="group rounded-xl border border-transparent hover:border-border/60 transition-colors"
                >
                  <summary className="flex items-center justify-between gap-4 cursor-pointer list-none px-5 py-4 text-sm font-medium text-foreground select-none">
                    <span>{item.q}</span>
                    <ChevronDown className="w-4 h-4 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180" />
                  </summary>
                  <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Still need help? */}
      <div className="max-w-md mx-auto text-center mt-20 p-8 rounded-2xl border border-border/60 bg-surface-container-low">
        <h3 className="text-lg font-semibold mb-2">Masih butuh bantuan?</h3>
        <p className="text-sm text-muted-foreground mb-5">
          Tidak menemukan jawaban yang kamu cari? Tim kami siap membantu.
        </p>
        <a
          href="/contact"
          className="inline-flex h-10 items-center justify-center rounded-full bg-foreground px-6 text-sm font-medium text-background hover:bg-foreground/90 transition-colors"
        >
          Hubungi Kami
        </a>
      </div>
    </div>
  );
}
