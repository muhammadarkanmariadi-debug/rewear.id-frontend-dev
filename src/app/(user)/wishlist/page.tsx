import { userService } from "@/services";
import { ProductCard } from "@/widgets/marketplace/product-card";
import { HeartCrack } from "lucide-react";

export default async function WishlistPage() {
  let wishlistedItems = [];
  try {
    const res = await userService.getWishlist();
    // Assuming API returns array of products directly, or wrapped in data
    wishlistedItems = res?.data || [];
  } catch (error) {
    console.error("Failed to load wishlist");
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Wishlist Saya</h1>
        <p className="text-muted-foreground mt-1">Barang-barang yang ingin Anda amankan segera.</p>
      </div>

      {wishlistedItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlistedItems.map((item: any) => (
            <ProductCard
              key={item.product.id}
              product={{
                ...item.product,
                price: parseFloat(item.product.price),     
                is_bookmarked: true,                         
                brand: item.product.brand ?? null,          
                seller: item.product.seller ?? null,         
              }}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 bg-surface-container rounded-full flex items-center justify-center mb-4">
            <HeartCrack className="w-8 h-8 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-bold">Wishlist Anda Kosong</h2>
          <p className="text-muted-foreground mt-2 max-w-sm">Jelajahi berbagai barang menarik di katalog kami dan simpan di sini.</p>
        </div>
      )}
    </div>
  );
}

