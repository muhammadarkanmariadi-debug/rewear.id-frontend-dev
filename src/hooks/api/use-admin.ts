/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminService } from "@/services";
import { toast } from "sonner";

// --- Queries ---

export const useAdminUsers = (params?: Record<string, string | number>) => {
  return useQuery({
    queryKey: ["admin-users", params],
    queryFn: async () => {
      const res = await adminService.getUsers(params);
      if (!res.status) throw new Error(res.message || "Error");
      return res;
    },
  });
};

export const useAdminProducts = (params?: Record<string, string | number>) => {
  return useQuery({
    queryKey: ["admin-products", params],
    queryFn: async () => {
      const res = await adminService.getProducts(params);
      if (!res.status) throw new Error(res.message || "Error");
      return res;
    },
  });
};

export const useAdminDisputes = (params?: Record<string, string | number>) => {
  return useQuery({
    queryKey: ["admin-disputes", params],
    queryFn: async () => {
      const res = await adminService.getDisputes(params);
      if (!res.status) throw new Error(res.message || "Error");
      return res;
    },
  });
};

export const useAdminDisputeDetail = (id: string) => {
  return useQuery({
    queryKey: ["admin-dispute-detail", id],
    queryFn: async () => {
      const res = await adminService.getDisputeDetail(id);
      if (!res.status) throw new Error(res.message || "Error");
      return res;
    },
    enabled: !!id,
  });
};

export const useAdminWithdrawals = (params?: Record<string, string | number>) => {
  return useQuery({
    queryKey: ["admin-withdrawals", params],
    queryFn: async () => {
      const res = await adminService.getWithdrawals(params);
      if (!res.status) throw new Error(res.message || "Error");
      return res;
    },
  });
};

export const useAdminSellerVerifications = (params?: Record<string, string | number>) => {
  return useQuery({
    queryKey: ["admin-seller-verifications", params],
    queryFn: async () => {
      const res = await adminService.getSellerVerifications(params);
      if (!res.status) throw new Error(res.message || "Error");
      return res;
    },
  });
};

export const useAdminReportsTransactions = (params?: Record<string, string | number>) => {
  return useQuery({
    queryKey: ["admin-reports-transactions", params],
    queryFn: async () => {
      const res = await adminService.getReportsTransactions(params);
      if (!res.status) throw new Error(res.message || "Error");
      return res;
    },
  });
};

export const useAdminReportsOverview = (params?: Record<string, string | number>) => {
  return useQuery({
    queryKey: ["admin-reports-overview", params],
    queryFn: async () => {
      const res = await adminService.getReportsOverview(params);
      if (!res.status) throw new Error(res.message || "Error");
      return res;
    },
  });
};

// --- Mutations ---

export const useBanUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => adminService.banUser(id),
    onSuccess: (res) => {
      if (!res.status) throw new Error(res.message || "Error");
      toast.success("Pengguna berhasil di-ban.");
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Gagal melakukan ban pengguna.");
    },
  });
};

export const useUnbanUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => adminService.unbanUser(id),
    onSuccess: (res) => {
      if (!res.status) throw new Error(res.message || "Error");
      toast.success("Pengguna berhasil di-unban.");
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Gagal melakukan unban pengguna.");
    },
  });
};

export const useDeleteAdminProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, reason }: { id: string; reason: string }) => adminService.deleteProduct(id, reason),
    onSuccess: (res) => {
      if (!res.status) throw new Error(res.message || "Error");
      toast.success("Produk berhasil dihapus.");
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Gagal menghapus produk.");
    },
  });
};

export const useResolveDispute = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, resolution_type, admin_notes }: { id: string; resolution_type: "refund" | "release"; admin_notes: string }) =>
      adminService.resolveDispute(id, resolution_type, admin_notes),
    onSuccess: (res) => {
      if (!res.status) throw new Error(res.message || "Error");
      toast.success("Sengketa berhasil diselesaikan.");
      queryClient.invalidateQueries({ queryKey: ["admin-disputes"] });
      queryClient.invalidateQueries({ queryKey: ["admin-dispute-detail"] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Gagal menyelesaikan sengketa.");
    },
  });
};

export const useApproveWithdrawal = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => adminService.approveWithdrawal(id),
    onSuccess: (res) => {
      if (!res.status) throw new Error(res.message || "Error");
      toast.success("Penarikan dana berhasil disetujui.");
      queryClient.invalidateQueries({ queryKey: ["admin-withdrawals"] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Gagal menyetujui penarikan dana.");
    },
  });
};

export const useRejectWithdrawal = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, reason }: { id: string; reason: string }) => adminService.rejectWithdrawal(id, reason),
    onSuccess: (res) => {
      if (!res.status) throw new Error(res.message || "Error");
      toast.success("Penarikan dana ditolak.");
      queryClient.invalidateQueries({ queryKey: ["admin-withdrawals"] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Gagal menolak penarikan dana.");
    },
  });
};

export const useVerifySeller = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => adminService.verifySeller(id),
    onSuccess: (res) => {
      if (!res.status) throw new Error(res.message || "Error");
      toast.success("Verifikasi penjual berhasil disetujui.");
      queryClient.invalidateQueries({ queryKey: ["admin-seller-verifications"] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Gagal menyetujui verifikasi.");
    },
  });
};
