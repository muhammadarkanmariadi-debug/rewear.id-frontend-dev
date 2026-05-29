# rewear.id - Modern Preloved Marketplace

Selamat datang di repositori Frontend **rewear.id**, sebuah platform e-commerce Customer-to-Customer (C2C) modern yang dirancang khusus untuk memfasilitasi jual beli barang *preloved* fesyen dengan aman, premium, dan estetik.

Repositori ini berfokus pada hasil rilis MVP *(Minimum Viable Product)* tahap awal dengan batas waktu pengerjaan 3 hari - mengeliminasi fitur-fitur sosial (seperti obrolan & penilaian) agar 100% terfokus pada alur terpenting: **Escrow & Checkout**.

## 🚀 Fitur Utama (MVP)

1. **Jelajah Pintar & Estetik (Beranda & Produk)**
   - Desain *(Monochrome-Premium)* yang menonjolkan visual pakaian *preloved*.
   - Halaman produk dengan dukungan Galeri Gambar *(Gallery Thumbnails)* dan Detail Penjual Esensial bergaya *(Sticky Sidebar)*.
   
2. **Checkout Kilat & Realistis**
   - Halaman Ringkasan Belanja dengan estimasi pengiriman dan tarif tambahan.
   
3. **Escrow Timeline (Keamanan Rekber)**
   - Simulasi Pelacakan Transaksi Escrow di dalam status pemesanan pembeli mulai dari Pembayaran, Ekspedisi, hingga Dana Diteruskan! 
   
4. **Seller Dashboard Terpadu**
   - `/dashboard`: Ringkasan Cepat metrik penjualan.
   - `/my-products`: Inventaris penuh yang memuat tambah-kurang *(CRUD)* katalog baju siap tayang untuk user.
   - `/orders` & `/wallet`: Simulasi penerimaan pesanan dan pencairan saldo transaksi secara mandiri.

## 💻 Tech Stack & Arsitektur

Kami menggunakan arsitektur termodern untuk meraba tingkat performa ekstrem (Fast Refresh < 100ms):

- **Framework:** Next.js 16 (App Router + Turbopack)
- **Engine UI:** React 19 + Tailwind CSS v4 *(Bleeding Edge)*
- **Ikonografi & Gaya:** Lucide React + Konsep *(Shadcn/UI)* Base Components
- **State Management:** Zustand (Autentikasi Lokal Sementara)
- **Data Source:** Murni berjalan `Client-Side/Server-Component` dengan konfigurasi MOCK Data lengkap tanpa ketergantungan Backend Server tahap MVP ini.
- **Konsep Struktur Direktori:** Feature-Sliced Design Pattern (`/src/widgets`, `/src/shared`, `/src/entities`).

## 🛠️ Cara Menjalankan (Getting Started)

Pastikan Anda memiliki [Node.js](https://nodejs.org/en/) v18.17+ yang terinstall di perangkat Anda.

1. **Clone repository ini**
   ```bash
   git clone https://github.com/rewear-id/rewear-frontend.git
   cd rewear.id-frontend
   ```

2. **Hapus cache lokal jika ada kendala saat pergantian arsitektur Next.js (Khusus Windows)**
   ```powershell
   rm -Recurse .next
   ```

3. **Install Dependensi**
   ```bash
   npm install
   ```
   *(Penting: Saat ini kita menggunakan dependensi terbaru seperti npm turbopack).*

4. **Jalankan Development Server**
   ```bash
   npm run dev
   ```
   Aplikasi akan memuat di `http://localhost:3000`.

## 📂 Struktur Direktori Menarik
- **`(main)` Route Group**: Merupakan kumpulan rute Katalog/Publik *(Layout)*. 
- **`(dashboard)` Route Group**: Terlindungi *Middleware Proxy*, memuat dasbor Penjual/Afiliasi dengan *(Layout)* terpisah `dashboard-layout`.

---
*Dibuat untuk MVP 3-Hari Perancangan Aplikasi Marketplace.*
