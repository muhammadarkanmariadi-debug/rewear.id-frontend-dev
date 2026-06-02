import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();

  // Opsi yang sama persis dengan saat cookie dibuat
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: 0,
  };

  // Hapus semua cookie
  cookieStore.set("token", "", options);
  cookieStore.set("is_admin", "", options);
  cookieStore.set("is_seller", "", options);
  cookieStore.set("is_seller_verified", "", options);

  return NextResponse.json({ success: true, message: "Logged out completely" });
}
