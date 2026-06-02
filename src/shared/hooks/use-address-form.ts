import { useState, useEffect } from "react";
import { addressService } from "@/services";
import { RegionService } from "@/services/region.service";
import type { Province, City } from "@/entities/shipment";
import { toast } from "sonner";

export function useAddressForm(onSuccess: () => void) {
  const [showModal, setShowModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [provinces, setProvinces] = useState<Province[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [availableCities, setAvailableCities] = useState<City[]>([]);

  const [form, setForm] = useState({
    label: "",
    recipient_name: "",
    phone: "",
    full_address: "",
    province_id: 0,
    city_id: 0,
    district: "",
    postal_code: "",
    is_default: false,
  });

  useEffect(() => {
    async function loadRegions() {
      try {
        const [provs, cits] = await Promise.all([
          RegionService.getProvinces(),
          RegionService.getCities()
        ]);
        setProvinces(provs);
        setCities(cits);
      } catch (err) {
        console.error("Failed to load regions", err);
      }
    }
    loadRegions();
  }, []);

  useEffect(() => {
    if (form.province_id) {
      setAvailableCities(cities.filter(c => c.province_id === form.province_id));
    } else {
      setAvailableCities([]);
    }
  }, [form.province_id, cities]);

  const handleOpen = (address?: any) => {
    if (address) {
      setEditingAddress(address);
      setForm({
        label: address.label || "",
        recipient_name: address.recipient_name || "",
        phone: address.phone || "",
        full_address: address.full_address || "",
        province_id: address.province_id || 0,
        city_id: address.city_id || 0,
        district: address.district || "",
        postal_code: address.postal_code || "",
        is_default: address.is_default || false,
      });
    } else {
      setEditingAddress(null);
      setForm({
        label: "",
        recipient_name: "",
        phone: "",
        full_address: "",
        province_id: 0,
        city_id: 0,
        district: "",
        postal_code: "",
        is_default: false,
      });
    }
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setEditingAddress(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    let finalValue: string | number | boolean = value;

    if (type === "checkbox") {
      finalValue = (e.target as HTMLInputElement).checked;
    } else if (name === "province_id" || name === "city_id") {
      finalValue = Number(value);
      if (name === "province_id" && finalValue !== form.province_id) {
        setForm(prev => ({ ...prev, province_id: finalValue as number, city_id: 0 }));
        return;
      }
    }
    setForm(prev => ({ ...prev, [name]: finalValue }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      let res;
      if (editingAddress) {
        res = await addressService.update(editingAddress.id, form);
      } else {
        res = await addressService.create(form);
      }

      if (res.status) {
        handleClose();
        onSuccess();
      } else {
        toast.error(res.message || "Gagal menyimpan alamat");
      }
    } catch (err) {
      console.error(err);
      toast("Terjadi kesalahan pada server");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    showModal,
    form,
    provinces,
    availableCities,
    isSubmitting,
    handleOpen,
    handleClose,
    handleChange,
    handleSubmit,
  };
}
