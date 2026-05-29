import { HeroSection } from "@/widgets/home/hero-section";
import { HowItWorks } from "@/widgets/home/how-it-works";
import { EscrowHighlight } from "@/widgets/home/escrow-highlight";
import { FeaturedProducts } from "@/widgets/home/featured-products";
import { CategoryBrowse } from "@/widgets/home/category-browse";

import { CTABanner } from "@/widgets/home/cta-banner";

export const metadata = {
  title: "rewear.id - Marketplace Preloved dengan Escrow",
  description: "Gaya Lama, Nilai Baru. Platform jual beli pakaian preloved terpercaya dengan keamanan Escrow 100%.",
};

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <HowItWorks />
      <EscrowHighlight />
      <FeaturedProducts />
      <CategoryBrowse />
      <CTABanner />
    </div>
  );
}
