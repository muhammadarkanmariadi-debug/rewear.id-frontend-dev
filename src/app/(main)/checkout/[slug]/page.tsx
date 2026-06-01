import { notFound } from "next/navigation";
import { productService } from "@/services";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { CheckoutClient } from "./checkout-client";

interface CheckoutPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CheckoutPage({ params }: CheckoutPageProps) {
  const { slug } = await params;
  const res = await productService.getById(slug);
  const product = res.data;

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-6 md:py-10 max-w-7xl">
      <Link href={`/products/${product.slug || product.id}`} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Kembali ke Produk
      </Link>

      <h1 className="text-2xl font-bold tracking-tight mb-8">Checkout Pesanan</h1>

      <CheckoutClient product={product} />

    </div>
  );
}

