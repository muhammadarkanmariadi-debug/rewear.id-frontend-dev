import { z } from "zod";

export const addressSchema = z.object({
  recipientName: z.string().min(3, "Nama penerima minimal 3 karakter"),
  recipientLabel: z.string().min(1, "Label alamat diperlukan (cth: Rumah/Kantor)"),
  phoneNumber: z.string().min(10, "Nomor telepon minimal 10 digit").regex(/^[0-9]+$/, "Hanya boleh berisi angka"),
  fullAddress: z.string().min(10, "Alamat lengkap minimal 10 karakter"),
  provinceId: z.number({ message: "Provinsi harus dipilih" }).min(1),
  cityId: z.number({ message: "Kota harus dipilih" }).min(1),
  district: z.string({ message: "Kecamatan diperlukan" }).min(1, "Kecamatan diperlukan"),
  postalCode: z.string({ message: "Kode pos diperlukan" }).min(1, "Kode pos diperlukan"),
});
export type AddressFormValues = z.infer<typeof addressSchema>;

// Schema Autentikasi
export const loginSchema = z.object({
  email: z.string().min(1, "Email tidak boleh kosong").email("Format email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});
export type LoginFormValues = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  name: z.string().min(3, "Nama minimal 3 karakter"),
  email: z.string().min(1, "Email tidak boleh kosong").email("Format email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
  password_confirmation: z.string().min(6, "Konfirmasi password diperlukan")
}).refine((data) => data.password === data.password_confirmation, {
  message: "Konfirmasi password tidak cocok",
  path: ["password_confirmation"],
});
export type RegisterFormValues = z.infer<typeof registerSchema>;

// Schema Fitur Penjual
export const bankAccountSchema = z.object({
  bank_name: z.string().min(2, "Nama bank minimal 2 karakter"),
  account_number: z.string().min(5, "Nomor rekening minimal 5 digit").regex(/^[0-9]+$/, "Nomor rekening harus berupa angka"),
  account_holder_name: z.string().min(3, "Nama pemilik rekening minimal 3 karakter"),
});
export type BankAccountFormValues = z.infer<typeof bankAccountSchema>;

export const withdrawalSchema = z.object({
  bank_account_id: z.string().min(1, "Rekening tujuan harus dipilih"),
  amount: z.number().min(50000, "Minimal penarikan adalah Rp50.000"),
});
export type WithdrawalFormValues = z.infer<typeof withdrawalSchema>;

export const productSchema = z.object({
  name: z.string().min(5, "Nama produk minimal 5 karakter"),
  description: z.string().min(20, "Deskripsi minimal 20 karakter"),
  price: z.number().min(1000, "Harga minimal Rp1.000"),
  stock: z.number().min(1, "Stok minimal 1"),
  condition: z.enum(["new", "used_like_new", "used_good", "used_fair"], { error: "Kondisi barang harus dipilih" }),
  weight: z.number().min(1, "Berat harus diisi (dalam gram)"),
  category_id: z.string().min(1, "Kategori harus dipilih")
});
export type ProductFormValues = z.infer<typeof productSchema>;
