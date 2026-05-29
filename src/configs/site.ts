export const siteConfig = {
  name: "rewear.id",
  tagline: "Gaya Lama, Nilai Baru.",
  description:
    "Platform marketplace pakaian preloved terpercaya di Indonesia dengan sistem escrow pembayaran.",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  ogImage: "/og-image.png",
  links: {
    instagram: "https://instagram.com/rewear.id",
    twitter: "https://twitter.com/rewearid",
  },
  creator: "rewear.id Team",
} as const;
