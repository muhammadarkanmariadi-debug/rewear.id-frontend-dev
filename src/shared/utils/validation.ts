import { z } from "zod";

export const addressSchema = z.object({
  recipientName: z.string().min(3, "Nama penerima minimal 3 karakter"),
  recipientLabel: z.string().min(1, "Label alamat diperlukan (cth: Rumah/Kantor)"),
  phoneNumber: z.string().min(10, "Nomor telepon minimal 10 digit").regex(/^[0-9]+$/, "Hanya boleh berisi angka"),
  fullAddress: z.string().min(10, "Alamat lengkap minimal 10 karakter"),
});

export type AddressFormValues = z.infer<typeof addressSchema>;
