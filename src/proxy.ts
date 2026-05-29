import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/dashboard", "/my-products", "/orders", "/wishlist", "/wallet", "/settings"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if it's a protected route (exact match or sub-routes)
  const isProtected = protectedRoutes.some((route) => 
    pathname === route || pathname.startsWith(`${route}/`)
  );

  // Note: Since auth token is in localStorage (client-side), Next.js middleware (edge worker)
  // doesn't have direct access to it unless we use cookies.
  // For this scaffold, if we switch to cookies later, we can check it here.
  // Example dummy logic:
  
  // const token = request.cookies.get("auth_token")?.value;
  // if (isProtected && !token) {
  //   const loginUrl = new URL("/login", request.url);
  //   loginUrl.searchParams.set("callbackUrl", pathname);
  //   return NextResponse.redirect(loginUrl);
  // }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
