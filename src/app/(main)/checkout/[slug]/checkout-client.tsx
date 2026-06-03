/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Truck, ShieldCheck } from "lucide-react";
import { formatRupiah } from "@/shared/utils/format";
import { addressService, shipmentService, orderService } from "@/services";
import { toast } from "sonner";


interface Address {
  id: number;
  label: string;
  recipient_name: string;
  phone: string;
  full_address: string;
  district: string;
  city_id: number;
  city?: { name: string };
  province?: { name: string };
  is_default: boolean;
}

interface ShippingService {
  service: string;
  description: string;
  cost: number;
  etd: string;
}

interface Seller {
  name: string;
  default_address?: { city_id: number };
}

interface Product {
  id: number;
  title: string;
  price: number;
  weight_grams: number;
  images?: { image_url: string }[];
  seller?: Seller;
}


const COURIER_OPTIONS = [
  { value: "jne", label: "JNE Express" },
  { value: "jnt", label: "J&T Express" },
  { value: "sicepat", label: "SiCepat Ekspres" },
  { value: "pos", label: "POS Indonesia" },
] as const;

const ESCROW_FEE = 3000;

// ---- Component ----
export function CheckoutClient({ product }: { product: Product }) {
  const router = useRouter();

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loadingAddresses, setLoadingAddresses] = useState(true);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);

  const [selectedCourier, setSelectedCourier] = useState<string>("");
  const [shippingServices, setShippingServices] = useState<ShippingService[]>([]);
  const [loadingShipping, setLoadingShipping] = useState(false);
  const [selectedService, setSelectedService] = useState<ShippingService | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load addresses on mount
  useEffect(() => {
    addressService
      .getAll()
      .then((res) => {
        if (!res.status || !res.data) return;
        setAddresses(res.data);
        const primary = res.data.find((a: Address) => a.is_default) ?? res.data[0];
        if (primary) setSelectedAddressId(primary.id);
      })
      .catch(() => toast.error("Gagal memuat daftar alamat."))
      .finally(() => setLoadingAddresses(false));
  }, []);

  // Reset shipping whenever address changes
  useEffect(() => {
    setSelectedCourier("");
    setShippingServices([]);
    setSelectedService(null);
  }, [selectedAddressId]);

  const handleCourierChange = async (courier: string) => {
    if (!selectedAddressId) {
      toast.warning("Pilih alamat pengiriman terlebih dahulu.");
      return;
    }

    const selAddr = addresses.find((a) => a.id === selectedAddressId);
    const destination = selAddr?.city_id ? Number(selAddr.city_id) : null;
    const origin = product.seller?.default_address?.city_id
      ? Number(product.seller.default_address.city_id)
      : null;

    if (!destination) {
      toast.error("Alamat pengiriman tidak memiliki data kota yang valid.");
      return;
    }

    if (!origin) {
      toast.error("Produk tidak memiliki data kota penjual. Hubungi penjual.");
      return;
    }

    setSelectedCourier(courier);
    setSelectedService(null);
    setShippingServices([]);
    setLoadingShipping(true);

    try {
      const res = await shipmentService.getShippingCost({
        origin,
        destination,
        weight: product.weight_grams > 0 ? product.weight_grams : 1000,
        courier,
      });

      const services: ShippingService[] = res.data ?? [];

      if (!res.status || services.length === 0) {
        toast.warning(`Layanan ${courier.toUpperCase()} tidak tersedia untuk tujuan ini.`);
        return;
      }

      setShippingServices(services);
    } catch {
      toast.error("Gagal menghitung ongkos kirim. Silakan coba lagi.");
    } finally {
      setLoadingShipping(false);
    }
  };

  const handleCreateOrder = async () => {
    if (!selectedAddressId) return toast.warning("Pilih alamat pengiriman.");
    if (!selectedCourier) return toast.warning("Pilih kurir pengiriman.");
    if (!selectedService) return toast.warning("Pilih layanan pengiriman.");

    setIsSubmitting(true);
    try {
      // Step 1: Create Order
      const res = await orderService.create({
        product_id: product.id,
        shipping_address_id: selectedAddressId,
        courier: selectedCourier,
        service: selectedService.service,
        shipping_cost: selectedService.cost,
        notes: "",
      });

      if (!res.status || !res.data) {
        toast.error(res.message ?? "Gagal membuat pesanan.");
        setIsSubmitting(false);
        return;
      }

      const orderId = res.data.id ?? res.data.order_id;
      toast.success("Pesanan berhasil dibuat!");
      router.push(`/orders/${orderId}`);
    } catch (error) {
      toast.error("Terjadi kesalahan pada server. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const shippingCost = selectedService?.cost ?? 0;
  const totalPrice = Number(product.price) + shippingCost + ESCROW_FEE;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

      {/* LEFT */}
      <div className="lg:col-span-2 flex flex-col gap-6">

        {/* Alamat */}
        <div className="border border-border bg-card rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5" /> Alamat Pengiriman
          </h3>

          {loadingAddresses ? (
            <p className="text-sm text-muted-foreground animate-pulse">Memuat alamat...</p>
          ) : addresses.length === 0 ? (
            <p className="text-sm">
              Kamu belum memiliki alamat.{" "}
              <Link href="/settings" className="text-primary font-bold underline">
                Tambah di Pengaturan
              </Link>
            </p>
          ) : (
            <div className="space-y-3">
              {addresses.map((a) => (
                <label
                  key={a.id}
                  className={`flex items-start gap-4 p-4 border rounded-xl cursor-pointer transition-colors ${
                    selectedAddressId === a.id
                      ? "border-foreground bg-foreground/5"
                      : "border-border"
                  }`}
                >
                  <input
                    type="radio"
                    name="address"
                    checked={selectedAddressId === a.id}
                    onChange={() => setSelectedAddressId(a.id)}
                    className="mt-1"
                  />
                  <div>
                    <p className="font-bold flex items-center gap-2 text-sm">
                      {a.label}
                      {a.is_default && (
                        <span className="bg-primary/10 text-primary text-xs px-2 rounded-full">
                          Utama
                        </span>
                      )}
                    </p>
                    <p className="text-sm font-medium">
                      {a.recipient_name} - {a.phone}
                    </p>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {a.full_address}, {a.district}, {a.city?.name}, {a.province?.name}
                    </p>
                  </div>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Detail Produk */}
        <div className="border border-border bg-card rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold mb-4">Detail Produk</h3>
          <div className="flex gap-4">
            <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-surface-container shrink-0 border border-border/50">
              <Image
                src={product.images?.[0]?.image_url ?? "https://placehold.co/80x80/e2e8f0/94a3b8?text=?"}
                alt={product.title}
                fill
                sizes="80px"
                className="object-cover"
              />
            </div>
            <div>
              <h4 className="font-semibold text-sm line-clamp-2 mb-1">{product.title}</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Penjual: {product.seller?.name}
              </p>
              <p className="font-bold">{formatRupiah(Number(product.price))}</p>
            </div>
          </div>
        </div>

        {/* Pengiriman */}
        <div className="border border-border bg-card rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <Truck className="w-5 h-5" /> Pilihan Pengiriman
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {COURIER_OPTIONS.map((c) => (
              <label
                key={c.value}
                className={`border rounded-xl p-3 text-center cursor-pointer transition-colors ${
                  selectedCourier === c.value
                    ? "bg-foreground text-background border-foreground font-bold"
                    : "bg-surface-container/50 border-border"
                }`}
              >
                <input
                  type="radio"
                  className="hidden"
                  checked={selectedCourier === c.value}
                  onChange={() => handleCourierChange(c.value)}
                  disabled={loadingShipping}
                />
                <span className="text-sm">{c.label}</span>
              </label>
            ))}
          </div>

          {loadingShipping && (
            <p className="text-sm text-muted-foreground animate-pulse">
              Menghitung ongkos kirim...
            </p>
          )}

          {shippingServices.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-bold mt-4 mb-2">Layanan yang Tersedia</h4>
              {shippingServices.map((s, idx) => (
                <label
                  key={idx}
                  className={`flex justify-between items-center p-4 border rounded-xl cursor-pointer ${
                    selectedService?.service === s.service
                      ? "border-foreground bg-foreground/5"
                      : "border-border"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="service"
                      checked={selectedService?.service === s.service}
                      onChange={() => setSelectedService(s)}
                    />
                    <div>
                      <p className="font-bold text-sm">
                        {s.service}{" "}
                        <span className="text-muted-foreground font-normal">
                          ({s.description})
                        </span>
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Estimasi: {s.etd}
                      </p>
                    </div>
                  </div>
                  <p className="font-bold">{formatRupiah(s.cost)}</p>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* RIGHT: Summary */}
      <div className="lg:col-span-1">
        <div className="sticky top-28 border border-border bg-card rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold mb-4 text-lg">Ringkasan Belanja</h3>

          <div className="flex flex-col gap-3 text-sm mb-6 border-b border-border/50 pb-6">
            <div className="flex justify-between text-muted-foreground">
              <span>Harga Barang</span>
              <span>{formatRupiah(Number(product.price))}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Ongkos Kirim</span>
              <span>{shippingCost > 0 ? formatRupiah(shippingCost) : "-"}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Biaya Escrow</span>
              <span>{formatRupiah(ESCROW_FEE)}</span>
            </div>
          </div>

          <div className="flex justify-between font-bold text-lg mb-6">
            <span>Total Tagihan</span>
            <span>{formatRupiah(totalPrice)}</span>
          </div>

          <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-3 mb-6 flex items-start gap-2">
            <ShieldCheck className="w-5 h-5 text-green-500 shrink-0" />
            <p className="text-xs text-green-700 dark:text-green-400 font-medium leading-relaxed">
              Dana dikunci di sistem Rekber. Diteruskan ke penjual hanya jika barang sesuai.
            </p>
          </div>

          <button
            onClick={handleCreateOrder}
            disabled={isSubmitting || !selectedService}
            className="w-full flex items-center justify-center h-12 bg-foreground text-background font-bold rounded-xl hover:bg-foreground/90 transition-transform active:scale-95 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-background/40 border-t-background rounded-full animate-spin" />
                Memproses...
              </span>
            ) : (
              "Checkout"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}