/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services";
import { toast } from "sonner";

import { useQuery } from "@tanstack/react-query";

// --- Queries ---

export const useAuthMe = () => {
  return useQuery({
    queryKey: ["auth-me"],
    queryFn: async () => {
      const res = await authService.getMe();
      if (!res.status) throw new Error(res.message || "Error");
      return res;
    },
  });
};

// --- Mutations ---

export const useLogin = () => {
  return useMutation({
    mutationFn: ({ email, password }: Record<string, string>) => authService.login(email, password),
    onSuccess: (res) => {
      if (!res.status) throw new Error(res.message || "Error");
      // Let the component handle redirection and auth state
    },
    onError: (error: any) => {
      toast.error(error.message || "Gagal login.");
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: ({ name, email, password, password_confirmation }: Record<string, string>) => 
      authService.register(name, email, password, password_confirmation),
    onSuccess: (res) => {
      if (!res.status) throw new Error(res.message || "Error");
    },
    onError: (error: any) => {
      toast.error(error.message || "Gagal registrasi.");
    },
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (email: string) => authService.forgotPassword(email),
    onSuccess: (res) => {
      if (!res.status) throw new Error(res.message || "Error");
      toast.success("Tautan reset password telah dikirim ke email Anda.");
    },
    onError: (error: any) => {
      toast.error(error.message || "Gagal mengirim tautan reset password.");
    },
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: (data: Record<string, unknown>) => authService.resetPassword(data),
    onSuccess: (res) => {
      if (!res.status) throw new Error(res.message || "Error");
      toast.success("Password berhasil direset.");
    },
    onError: (error: any) => {
      toast.error(error.message || "Gagal mereset password.");
    },
  });
};
export const useVerifyEmail = () => {
  return useMutation({
    mutationFn: (data: { uId: string, uHash: string, params: Record<string, string> }) => 
      authService.verifyEmail(data.uId, data.uHash, data.params),
    onSuccess: (res) => {
      if (!res.status) throw new Error(res.message || "Error");
      toast.success("Email berhasil diverifikasi!");
    },
    onError: (error: any) => {
      toast.error(error.message || "Gagal memverifikasi email.");
    },
  });
};
