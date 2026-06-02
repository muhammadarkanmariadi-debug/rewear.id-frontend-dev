/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userService } from "@/services";
import { toast } from "sonner";

// --- Queries ---

export const useProfile = (userId: string) => {
  return useQuery({
    queryKey: ["user-profile", userId],
    queryFn: async () => {
      const res = await userService.getProfile(userId);
      if (!res.status) throw new Error(res.message || "Error");
      return res;
    },
    enabled: !!userId,
  });
};

export const useWishlist = (params?: Record<string, string>) => {
  return useQuery({
    queryKey: ["wishlist", params],
    queryFn: async () => {
      const res = await userService.getWishlist(params);
      if (!res.status) throw new Error(res.message || "Error");
      return res;
    },
  });
};

export const useWithdrawals = (params?: Record<string, string>) => {
  return useQuery({
    queryKey: ["user-withdrawals", params],
    queryFn: async () => {
      const res = await userService.getWithdrawals(params);
      if (!res.status) throw new Error(res.message || "Error");
      return res;
    },
  });
};

// --- Mutations ---

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Record<string, unknown>) => userService.updateProfile(data),
    onSuccess: (res) => {
      if (!res.status) throw new Error(res.message || "Error");
      toast.success("Profil berhasil diperbarui.");
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
      queryClient.invalidateQueries({ queryKey: ["auth-me"] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Gagal memperbarui profil.");
    },
  });
};

export const useUploadAvatar = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) => userService.uploadAvatar(formData),
    onSuccess: (res) => {
      if (!res.status) throw new Error(res.message || "Error");
      toast.success("Avatar berhasil diunggah.");
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
      queryClient.invalidateQueries({ queryKey: ["auth-me"] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Gagal mengunggah avatar.");
    },
  });
};

export const useUploadKtp = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) => userService.uploadKtp(formData),
    onSuccess: (res) => {
      if (!res.status) throw new Error(res.message || "Error");
      toast.success("KTP berhasil diunggah dan sedang direview.");
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
      queryClient.invalidateQueries({ queryKey: ["auth-me"] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Gagal mengunggah KTP.");
    },
  });
};

export const useToggleWishlist = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (productId: string) => userService.toggleWishlist(productId),
    onSuccess: (res) => {
      if (!res.status) throw new Error(res.message || "Error");
      toast.success(res.message || "Wishlist diperbarui.");
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Gagal memperbarui wishlist.");
    },
  });
};

export const useRequestWithdrawal = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Record<string, unknown>) => userService.requestWithdrawal(data),
    onSuccess: (res) => {
      if (!res.status) throw new Error(res.message || "Error");
      toast.success("Permintaan penarikan dana berhasil dikirim.");
      queryClient.invalidateQueries({ queryKey: ["user-withdrawals"] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Gagal mengirim permintaan penarikan dana.");
    },
  });
};
