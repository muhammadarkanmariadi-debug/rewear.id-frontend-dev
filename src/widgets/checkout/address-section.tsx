"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MapPin, Check, X, Edit2 } from "lucide-react";
import { addressSchema, type AddressFormValues } from "@/shared/utils/validation";

interface AddressSectionProps {
  initialData?: AddressFormValues;
}

export function AddressSection({ initialData }: AddressSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [addressData, setAddressData] = useState<AddressFormValues>(
    initialData || {
      recipientName: "Rizky Firmansyah",
      recipientLabel: "Rumah",
      phoneNumber: "08123456789",
      fullAddress: "Jl. Mawar Merah No. 12, Kebayoran Baru, Jakarta Selatan, 12160, DKI Jakarta",
      provinceId: 1,
      cityId: 1,
      district: "Kebayoran Baru",
      postalCode: "12160",
    }
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: addressData,
  });

  const onSubmit = (data: AddressFormValues) => {
    setAddressData(data);
    setIsEditing(false);
  };

  const handleCancel = () => {
    reset(addressData); // reset to original
    setIsEditing(false);
  };

  return (
    <div className="border border-border bg-card rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold flex items-center gap-2">
          <MapPin className="w-5 h-5" /> Alamat Pengiriman
        </h3>
        {!isEditing && (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-surface-container hover:bg-foreground/5 border border-border/50 text-foreground transition-colors flex items-center gap-1"
          >
            <Edit2 className="w-3.5 h-3.5" /> Ubah
          </button>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-surface-container rounded-xl p-4 border border-border/50 flex flex-col gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold uppercase text-muted-foreground mb-1 block">Nama Penerima</label>
              <input
                {...register("recipientName")}
                className="w-full bg-background border border-border rounded-lg p-2.5 text-sm font-medium outline-none focus:border-foreground/30 transition-colors"
                placeholder="cth: Budi Santoso"
              />
              {errors.recipientName && <p className="text-red-500 text-xs mt-1 font-medium">{errors.recipientName.message}</p>}
            </div>
            <div>
              <label className="text-xs font-semibold uppercase text-muted-foreground mb-1 block">Nomor Telepon</label>
              <input
                {...register("phoneNumber")}
                className="w-full bg-background border border-border rounded-lg p-2.5 text-sm font-medium outline-none focus:border-foreground/30 transition-colors"
                placeholder="cth: 08123456789"
              />
              {errors.phoneNumber && <p className="text-red-500 text-xs mt-1 font-medium">{errors.phoneNumber.message}</p>}
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold uppercase text-muted-foreground mb-1 block">Label Alamat</label>
            <input
              {...register("recipientLabel")}
              className="w-full bg-background border border-border rounded-lg p-2.5 text-sm font-medium outline-none focus:border-foreground/30 transition-colors"
              placeholder="cth: Rumah, Kantor, Kosan"
            />
            {errors.recipientLabel && <p className="text-red-500 text-xs mt-1 font-medium">{errors.recipientLabel.message}</p>}
          </div>

          <div>
            <label className="text-xs font-semibold uppercase text-muted-foreground mb-1 block">Alamat Lengkap</label>
            <textarea
              {...register("fullAddress")}
              rows={3}
              className="w-full bg-background border border-border rounded-lg p-2.5 text-sm font-medium outline-none focus:border-foreground/30 transition-colors resize-none"
              placeholder="Detail jalan, patokan, RT/RW..."
            />
            {errors.fullAddress && <p className="text-red-500 text-xs mt-1 font-medium">{errors.fullAddress.message}</p>}
          </div>

          <div className="flex items-center justify-end gap-2 mt-2 pt-4 border-t border-border/50">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
            >
              <X className="w-4 h-4" /> Batal
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 text-sm font-semibold bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-colors flex items-center gap-1.5 disabled:opacity-50"
            >
              <Check className="w-4 h-4" />
              {isSubmitting ? "Menyimpan..." : "Simpan Alamat"}
            </button>
          </div>
        </form>
      ) : (
        <div className="bg-surface-container rounded-xl p-4 border border-border/50 animate-in fade-in duration-300">
          <p className="font-semibold mb-1">
            {addressData.recipientName} <span className="text-muted-foreground font-normal">({addressData.recipientLabel})</span>
          </p>
          <p className="text-sm text-muted-foreground mb-1">{addressData.phoneNumber}</p>
          <p className="text-sm text-muted-foreground">{addressData.fullAddress}</p>
        </div>
      )}
    </div>
  );
}
