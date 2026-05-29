import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center text-center">
      <h2 className="text-4xl font-bold tracking-tight text-primary mb-4">404</h2>
      <p className="text-lg text-muted-foreground mb-8">Halaman tidak ditemukan.</p>
      <Link href="/" className="px-4 py-2 bg-primary text-primary-foreground rounded-md">
        Kembali ke Beranda
      </Link>
    </div>
  );
}
