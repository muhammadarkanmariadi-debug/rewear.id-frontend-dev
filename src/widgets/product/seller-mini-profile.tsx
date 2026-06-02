import { User } from "@/entities/user";
import Image from "next/image";
import { ShieldCheck } from "lucide-react";

interface SellerMiniProfileProps {
  seller: User;
}

export function SellerMiniProfile({ seller }: SellerMiniProfileProps) {
  return (
    <div className="border border-border rounded-xl p-5 bg-card">
      <div className="flex items-center gap-3">
        <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-surface-container-high shrink-0">
          <Image 
            src={seller.avatar_url || "https://i.pravatar.cc/150"} 
            alt={seller.name} 
            fill 
            sizes="48px"
            className="object-cover"
          />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <h4 className="font-bold text-base leading-none max-w-[200px] truncate">{seller.name}</h4>
            {seller.is_seller_verified     && (
              <ShieldCheck className="w-4 h-4 text-green-500 shrink-0" />
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-1">Anggota sejak {new Date(seller.created_at).getFullYear()}</p>
        </div>
      </div>
    </div>
  );
}
