import { notFound } from "next/navigation";
import { productService } from "@/services";
import { ProductGallery } from "@/widgets/product/product-gallery";
import { SellerMiniProfile } from "@/widgets/product/seller-mini-profile";
import { ShippingEstimator } from "@/widgets/product/shipping-estimator";
import { formatRupiah } from "@/shared/utils/format";
import { ShieldCheck, Heart, Share2, Info, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { BookmarkButton } from "@/widgets/product/bookmark-button";
import { Metadata } from "next";
import { Product } from "@/entities";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const res = await productService.getById(slug);
  const product = res.data;
  
  if (!product) return { title: "Produk Tidak Ditemukan" };
  
  return {
    title: `${product.title} | rewear.id`,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const res = await productService.getById(slug);
  const product:Product = res.data;

  if (!product) {
    notFound();
  }

  return (
    <div className="mx-auto px-4 md:px-6 py-6 md:py-10 max-w-7xl container">
      
      {/* Breadcrumb / Back Navigation */}
      <Link href="/products" className="inline-flex items-center gap-2 mb-6 text-muted-foreground hover:text-foreground text-sm transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Kembali ke Katalog
      </Link>

      <div className="gap-8 lg:gap-12 grid grid-cols-1 lg:grid-cols-12">
        
        {/* L E F T  C O L U M N : Gallery & Description (Spans 7 cols) */}
        <div className="flex flex-col gap-8 lg:col-span-7">
          <ProductGallery 
            images={product?.images?.map((img: any) => img.image_url) || []} 
            alt={product.title || "Produk"} 
          />
          
          {/* Mobile Product Title (Shown only on small screens below gallery) */}
          <div className="lg:hidden">
            <h1 className="mb-2 font-bold text-2xl tracking-tight">{product.title}</h1>
            <p className="mb-4 font-bold text-foreground text-xl">{formatRupiah(Number(product.price || 0))}</p>
          </div>

          <div className="pt-8 border-border border-t">
            <h3 className="flex items-center gap-2 mb-4 font-bold text-lg">
              <Info className="w-5 h-5 text-muted-foreground" /> 
              Informasi Produk
            </h3>
            
            <div className="gap-y-4 grid grid-cols-2 bg-surface-container-low mb-8 p-5 border border-border/50 rounded-xl text-sm">
              <div>
                <p className="mb-1 text-muted-foreground">Kategori</p>
                <p className="font-semibold capitalize">{product.category?.name || "Lainnya"}</p>
              </div>
              <div>
                <p className="mb-1 text-muted-foreground">Merek</p>
                <p className="font-semibold uppercase">{product.brand?.name || "Unbranded"}</p>
              </div>
              <div>
                <p className="mb-1 text-muted-foreground">Ukuran</p>
                <p className="font-semibold">{product.size}</p>
              </div>
              <div>
                <p className="mb-1 text-muted-foreground">Kondisi</p>
                <p className="font-bold text-foreground">
                  {product.condition === "new_with_tag" ? "Baru dengan Tag" : 
                   product.condition === "like_new" ? "Bekas Seperti Baru" :
                   product.condition === "good" ? "Bekas Baik" :
                   product.condition === "fair" ? "Bekas Layak" : "Bekas"}
                </p>
              </div>
            </div>

            <h3 className="mb-3 font-bold text-lg">Deskripsi Produk</h3>
            <div className="dark:prose-invert max-w-none text-muted-foreground prose prose-sm md:prose-base prose-neutral">
              <p className="whitespace-pre-wrap">{product.description}</p>
            </div>
          </div>
        </div>

        {/* R I G H T  C O L U M N : Sticky Action Box (Spans 5 cols) */}
        <div className="relative lg:col-span-5">
          <div className="top-28 sticky flex flex-col gap-6">
            
            {/* Main Action Box */}
            <div className="bg-card shadow-sm p-6 border border-border rounded-2xl">
              <div className="hidden lg:block mb-4">
                <h1 className="mb-2 font-bold text-2xl leading-snug tracking-tight">{product.title}</h1>
                <p className="font-bold text-foreground text-3xl">{formatRupiah(Number(product.price || 0))}</p>
              </div>

              <div className="flex items-start gap-3 bg-green-500/10 mb-6 p-4 border border-green-500/20 rounded-xl">
                <ShieldCheck className="w-6 h-6 text-green-500 shrink-0" />
                <div>
                  <h4 className="mb-0.5 font-bold text-green-600 dark:text-green-500 text-sm">Transaksi Dilakukan via Escrow</h4>
                  <p className="text-green-700/80 text-muted-foreground dark:text-green-400/80 text-xs">Dana hanya diteruskan ke penjual setelah barang Anda terima dan konfirmasi. 100% aman.</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3">
                <Link href={`/checkout/${product.slug || product.id}`} className="flex justify-center items-center bg-foreground hover:bg-foreground/90 shadow-md hover:shadow-lg rounded-xl w-full h-12 font-bold text-background transition-all">
                  Beli Sekarang
                </Link>
                <div className="flex gap-3">
                  <BookmarkButton productId={product.id} initialStatus={product.is_bookmarked ?? false} />
                  <button className="flex justify-center items-center bg-surface-container hover:bg-accent border border-border rounded-xl w-12 h-12 font-semibold text-foreground transition-all shrink-0">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Seller Info */}
            {product.seller && <SellerMiniProfile seller={product.seller} />}

          </div>
        </div>

      </div>
    </div>
  );
}

