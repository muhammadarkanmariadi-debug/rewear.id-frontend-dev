import {
  Home,
  ShoppingBag,
  Heart,
  MessageCircle,
  User,
  LayoutDashboard,
  Package,
  Wallet,
  Settings,
  Shield,
  Users,
  FileText,
  AlertTriangle,
  BarChart3,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: number;
}

export const mainNavItems: NavItem[] = [
  { label: "Beranda", href: "/", icon: Home },
  { label: "Produk", href: "/products", icon: ShoppingBag },
];

export const dashboardNavItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Produk Saya", href: "/dashboard/products", icon: Package },
  { label: "Pesanan", href: "/orders", icon: ShoppingBag },
  { label: "Chat", href: "/chat", icon: MessageCircle },
  { label: "Wishlist", href: "/wishlist", icon: Heart },
  { label: "Dompet", href: "/wallet", icon: Wallet },
  { label: "Pengaturan", href: "/settings", icon: Settings },
];

export const adminNavItems: NavItem[] = [
  { label: "Dashboard", href: "/admin", icon: Shield },
  { label: "Pengguna", href: "/admin/users", icon: Users },
  { label: "Listing", href: "/admin/listings", icon: FileText },
  { label: "Komplain", href: "/admin/disputes", icon: AlertTriangle },
  { label: "Laporan", href: "/admin/reports", icon: BarChart3 },
];

export const userMenuItems: NavItem[] = [
  { label: "Profil Saya", href: "/settings", icon: User },
  { label: "Pesanan Saya", href: "/orders", icon: ShoppingBag },
  { label: "Wishlist", href: "/wishlist", icon: Heart },
  { label: "Dompet", href: "/wallet", icon: Wallet },
];
