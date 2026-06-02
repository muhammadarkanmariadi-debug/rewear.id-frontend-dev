import { useState, useEffect } from "react";
import { authService, userService, addressService } from "@/services";
import { toast } from "sonner";

export function useProfileSettings() {
  const [user, setUser] = useState<any>(null);
  const [addresses, setAddresses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [savingSettings, setSavingSettings] = useState(false);

  const fetchData = async () => {
    try {
      const [userRes, addressesRes] = await Promise.all([
        authService.getMe(),
        addressService.getAll()
      ]);

      if (userRes.status && userRes.data) {
        setUser(userRes.data);
        setName(userRes.data.name || "");
        setPhone(userRes.data.phone || "");
      }

      if (addressesRes.status && addressesRes.data) {
        setAddresses(addressesRes.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSaveProfile = async () => {
    setSavingSettings(true);
    try {
      const res = await userService.updateProfile({
        name,
        phone,
      });
      if (res.status) {
        toast.success("Profil berhasil diperbarui");
        fetchData();
      } else {
        toast.error(res.message || "Gagal memperbarui profil");
      }
    } catch (err) {
      console.error(err);
      toast("Terjadi kesalahan pada server");
    } finally {
      setSavingSettings(false);
    }
  };

  const handleDeleteAddress = async (id: string) => {
    if (!confirm("Hapus alamat ini?")) return;
    try {
      const res = await addressService.remove(id);
      if (res.status) {
        fetchData();
      } else {
        toast("Gagal menghapus alamat");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return {
    user,
    name, setName,
    phone, setPhone,
    savingSettings, handleSaveProfile,
    addresses, loading, fetchData, handleDeleteAddress
  };
}
