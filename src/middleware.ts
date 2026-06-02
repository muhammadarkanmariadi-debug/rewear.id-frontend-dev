import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  const token = request.cookies.get("token")?.value;
  const isAdmin = request.cookies.get("is_admin")?.value === "true";
  const isSeller = request.cookies.get("is_seller")?.value === "true";
  const isSellerVerified = request.cookies.get("is_seller_verified")?.value === "true";

  // 1. Admin Routes
  if (pathname.startsWith("/admin")) {
    if (!token) return NextResponse.redirect(new URL("/login", request.url));
    if (!isAdmin) return NextResponse.redirect(new URL("/", request.url));
    return NextResponse.next();
  }

  // 2. Seller Routes (Dashboard, My Products, Wallet)
  const sellerRoutes = ["/dashboard", "/my-products", "/wallet"];
  if (sellerRoutes.some(route => pathname === route || pathname.startsWith(`${route}/`))) {
    if (!token) return NextResponse.redirect(new URL("/login", request.url));
    if (isAdmin) return NextResponse.redirect(new URL("/admin", request.url));
    if (!isSeller) return NextResponse.redirect(new URL("/", request.url));
    if (!isSellerVerified) return NextResponse.redirect(new URL("/seller-verification", request.url));
    return NextResponse.next();
  }

  // 3. User Routes (Orders, Wishlist, Settings, Seller Verification)
  const userRoutes = ["/orders", "/wishlist", "/settings", "/seller-verification"];
  if (userRoutes.some(route => pathname === route || pathname.startsWith(`${route}/`))) {
    if (!token) return NextResponse.redirect(new URL("/login", request.url));
    return NextResponse.next();
  }

  return NextResponse.next();
}

// Konfigurasi matcher agar middleware berjalan di route yang tepat
export const config = {
  matcher: [
    /*
     * Cocokkan semua request path kecuali:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};