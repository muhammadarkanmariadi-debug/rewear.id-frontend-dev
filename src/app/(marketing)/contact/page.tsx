import { Mail, MessageCircle, MapPin, Clock } from "lucide-react";

export const metadata = {
  title: "Hubungi Kami | rewear.id",
  description:
    "Punya pertanyaan atau butuh bantuan? Hubungi tim rewear.id kapan saja.",
};

const contactChannels = [
  {
    icon: Mail,
    title: "Email",
    description: "Respons dalam 1×24 jam kerja",
    value: "hello@rewear.id",
    href: "mailto:hello@rewear.id",
    action: "Kirim Email",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    description: "Chat langsung dengan tim kami",
    value: "+62 812-3456-7890",
    href: "https://wa.me/6281234567890",
    action: "Chat Sekarang",
  },
];

const infoItems = [
  {
    icon: MapPin,
    label: "Lokasi",
    value: "Malang, Jawa Timur, Indonesia",
  },
  {
    icon: Clock,
    label: "Jam Operasional",
    value: "Senin – Jumat, 09.00 – 17.00 WIB",
  },
];

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-16 md:py-24">
      {/* Header */}
      <div className="max-w-2xl mx-auto text-center mb-16">
        <p className="text-sm font-medium text-muted-foreground tracking-widest uppercase mb-3">
          Kontak
        </p>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Hubungi Kami
        </h1>
        <p className="text-muted-foreground text-lg leading-relaxed">
          Punya pertanyaan, feedback, atau butuh bantuan? Kami dengan senang hati
          akan membantu.
        </p>
      </div>

      {/* Contact Cards */}
      <div className="max-w-3xl mx-auto grid gap-6 sm:grid-cols-2 mb-16">
        {contactChannels.map((channel) => (
          <div
            key={channel.title}
            className="group relative rounded-2xl border border-border/60 p-6 hover:border-foreground/20 transition-colors bg-background"
          >
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mb-4">
              <channel.icon className="w-5 h-5 text-foreground" />
            </div>
            <h2 className="text-base font-semibold mb-1">{channel.title}</h2>
            <p className="text-xs text-muted-foreground mb-3">
              {channel.description}
            </p>
            <p className="text-sm font-medium text-foreground mb-5">
              {channel.value}
            </p>
            <a
              href={channel.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 items-center justify-center rounded-full border border-border px-5 text-sm font-medium hover:bg-muted transition-colors"
            >
              {channel.action}
            </a>
          </div>
        ))}
      </div>

      {/* Additional Info */}
      <div className="max-w-3xl mx-auto">
        <div className="rounded-2xl border border-border/60 bg-surface-container-low p-6 md:p-8">
          <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-6">
            Informasi
          </h3>
          <div className="grid gap-6 sm:grid-cols-2">
            {infoItems.map((item) => (
              <div key={item.label} className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-background border border-border/60 flex items-center justify-center shrink-0 mt-0.5">
                  <item.icon className="w-4 h-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">
                    {item.label}
                  </p>
                  <p className="text-sm font-medium text-foreground">
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ CTA */}
      <div className="max-w-md mx-auto text-center mt-20">
        <p className="text-sm text-muted-foreground mb-4">
          Mungkin pertanyaan kamu sudah pernah dijawab sebelumnya.
        </p>
        <a
          href="/faq"
          className="inline-flex h-10 items-center justify-center rounded-full border border-border px-6 text-sm font-medium hover:bg-muted transition-colors"
        >
          Lihat FAQ
        </a>
      </div>
    </div>
  );
}
