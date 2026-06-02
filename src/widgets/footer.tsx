import Link from "next/link";
import { Recycle, Mail, Globe, MessageCircle } from "lucide-react";
import { Label } from "radix-ui";

const footerLinks = {
  public: {
    title: "Public",
    links: [
      { label: "Beranda", href: "/" },
      { label: "Tentang Kami", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  marketplace: {
    title: "Marketplace",
    links: [
      { label: "Jelajahi Produk", href: "/products" },
      { label: "Jual Baju", href: "/products/new" },
    ],
  },

  akun: {
    title: "Akun",
    links: [
      { label: "Masuk", href: "/login" },
      { label: "Daftar", href: "/register" },
    ],
  },
  support: {
    title: "Bantuan",
    links: [
      { label: "FAQ", href: "/faq" },
      { label: "Hubungi Kami", href: "/contact" },
    ],
  },
};

const socialLinks = [
  { icon: Globe, href: "#", label: "Website" },
  { icon: MessageCircle, href: "#", label: "WhatsApp" },
  { icon: Mail, href: "mailto:hello@rewear.id", label: "Email" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-border/60 bg-background">
      {/* Decorative top accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />

      <div className="container mx-auto px-4 md:px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 gap-8 py-12 md:grid-cols-5 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 group mb-4">
              <div className="w-8 h-8 rounded bg-foreground flex items-center justify-center text-background font-bold text-lg group-hover:bg-primary transition-colors">
                R
              </div>
              <span className="font-bold text-xl tracking-tight">
                rewear<span className="text-primary">.id</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mt-3 max-w-[260px]">
              Platform jual-beli pakaian bekas berkualitas. Perpanjang umur fashion, kurangi limbah tekstil.
            </p>
            <div className="flex items-center gap-1 mt-5">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-9 h-9 flex items-center justify-center rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.values(footerLinks).map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-foreground tracking-wide mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center gap-4 border-t border-border/60 py-6 md:flex-row md:justify-between">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} rewear.id &mdash; Gaya Lama, Nilai Baru.
          </p>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Recycle className="w-3.5 h-3.5" />
            <span>Sustainable fashion dimulai dari sini</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
