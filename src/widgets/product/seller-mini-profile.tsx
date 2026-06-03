import { User } from "@/entities/user";
import Image from "next/image";
import { ShieldCheck, MessageCircle } from "lucide-react";
import Link from "next/link";

interface SellerMiniProfileProps {
  seller: User;
}

export function SellerMiniProfile({ seller }: SellerMiniProfileProps) {
  // Format phone to match WA format (e.g. 628...)
  const getWaLink = () => {
    if (!seller.phone) return null;
    let phone = seller.phone.replace(/\D/g, "");
    if (phone.startsWith("0")) phone = "62" + phone.slice(1);
    return `https://wa.me/${phone}`;
  };

  const waLink = getWaLink();

  return (
    <div className="border border-border rounded-xl p-5 bg-card">
      <div className="flex items-center justify-between gap-3 flex-wrap sm:flex-nowrap">
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
              {seller.is_seller_verified && (
                <ShieldCheck className="w-4 h-4 text-green-500 shrink-0" />
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Anggota sejak {new Date(seller.created_at).getFullYear()}</p>
          </div>
        </div>

        {waLink && (
          <Link
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-green-500/10 hover:bg-green-500/20 text-green-600 dark:text-green-500 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors w-full sm:w-auto justify-center"
          >
            <MessageCircle className="w-4 h-4" />
            Chat WA
          </Link>
        )}
      </div>
    </div>
  );
}
