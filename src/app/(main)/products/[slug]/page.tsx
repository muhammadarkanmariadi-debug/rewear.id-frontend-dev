import { notFound } from "next/navigation";
import { MOCK_PRODUCTS } from "@/configs/mock-data";
import { ProductGallery } from "@/widgets/product/product-gallery";
import { SellerMiniProfile } from "@/widgets/product/seller-mini-profile";
import { ShippingEstimator } from "@/widgets/product/shipping-estimator";
import { formatRupiah } from "@/shared/utils/format";
import { ShieldCheck, Heart, Share2, Info, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = MOCK_PRODUCTS.find(p => p.slug === slug);
  
  if (!product) return { title: "Produk Tidak Ditemukan" };
  
  return {
    title: `${product.title} | rewear.id`,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = MOCK_PRODUCTS.find(p => p.slug === slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-6 md:py-10 max-w-6xl">
      
      {/* Breadcrumb / Back Navigation */}
      <Link href="/products" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Kembali ke Katalog
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        
        {/* L E F T  C O L U M N : Gallery & Description (Spans 7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          <ProductGallery images={product.images} alt={product.title} />
          
          {/* Mobile Product Title (Shown only on small screens below gallery) */}
          <div className="lg:hidden">
            <h1 className="text-2xl font-bold tracking-tight mb-2">{product.title}</h1>
            <p className="text-xl font-bold text-foreground mb-4">{formatRupiah(product.price)}</p>
          </div>

          <div className="border-t border-border pt-8">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Info className="w-5 h-5 text-muted-foreground" /> 
              Informasi Produk
            </h3>
            
            <div className="grid grid-cols-2 gap-y-4 mb-8 text-sm p-5 bg-surface-container-low rounded-xl border border-border/50">
              <div>
                <p className="text-muted-foreground mb-1">Kategori</p>
                <p className="font-semibold capitalize">{product.category}</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Merek</p>
                <p className="font-semibold uppercase">{product.brand || "Unbranded"}</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Ukuran</p>
                <p className="font-semibold">{product.size}</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Kondisi</p>
                <p className="font-bold text-foreground">
                  {product.condition === "baru" ? "Baru dengan Tag" : "Bekas"}
                </p>
              </div>
            </div>

            <h3 className="text-lg font-bold mb-3">Deskripsi Produk</h3>
            <div className="prose prose-sm md:prose-base prose-neutral dark:prose-invert max-w-none text-muted-foreground">
              <p className="whitespace-pre-wrap">{product.description}</p>
            </div>
          </div>
        </div>

        {/* R I G H T  C O L U M N : Sticky Action Box (Spans 5 cols) */}
        <div className="lg:col-span-5 relative">
          <div className="sticky top-28 flex flex-col gap-6">
            
            {/* Main Action Box */}
            <div className="border border-border bg-card rounded-2xl p-6 shadow-sm">
              <div className="hidden lg:block mb-4">
                <h1 className="text-2xl font-bold tracking-tight mb-2 leading-snug">{product.title}</h1>
                <p className="text-3xl font-bold text-foreground">{formatRupiah(product.price)}</p>
              </div>

              {/* Escrow Guarantee Banner */}
              <div className="flex items-start gap-3 bg-green-500/10 border border-green-500/20 p-4 rounded-xl mb-6">
                <ShieldCheck className="w-6 h-6 text-green-500 shrink-0" />
                <div>
                  <h4 className="font-bold text-sm text-green-600 dark:text-green-500 mb-0.5">Transaksi Dilakukan via Escrow</h4>
                  <p className="text-xs text-muted-foreground text-green-700/80 dark:text-green-400/80">Dana hanya diteruskan ke penjual setelah barang Anda terima dan konfirmasi. 100% aman.</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3">
                <Link href={`/checkout/${product.slug}`} className="w-full h-12 flex items-center justify-center font-bold text-background bg-foreground hover:bg-foreground/90 rounded-xl transition-all shadow-md hover:shadow-lg">
                  Beli Sekarang
                </Link>
                <div className="flex gap-3">
                  <button className="flex-1 h-12 flex items-center justify-center gap-2 font-semibold text-foreground bg-surface-container hover:bg-accent border border-border rounded-xl transition-all">
                    <Heart className="w-4 h-4" /> Wishlist
                  </button>
                  <button className="w-12 h-12 flex shrink-0 items-center justify-center font-semibold text-foreground bg-surface-container hover:bg-accent border border-border rounded-xl transition-all">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Seller Info */}
            <SellerMiniProfile seller={product.seller} />

            {/* Shipping Info */}
            <ShippingEstimator />

          </div>
        </div>

      </div>
    </div>
  );
}
