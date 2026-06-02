/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { bankAccountService, withdrawalService } from "@/services";
import { toast } from "sonner";

export const useBankAccounts = (params?: Record<string, string>) => {
  return useQuery({
    queryKey: ["bank-accounts", params],
    queryFn: async () => {
      const res = await bankAccountService.getAll(params);
      if (!res.status) throw new Error(res.message || "Error");
      return res;
    },
  });
};

export const useWalletWithdrawals = (params?: Record<string, string>) => {
  return useQuery({
    queryKey: ["wallet-withdrawals", params],
    queryFn: async () => {
      const res = await withdrawalService.getAll(params);
      if (!res.status) throw new Error(res.message || "Error");
      return res;
    },
  });
};

export const useAddBankAccount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Record<string, unknown>) => bankAccountService.create(data),
    onSuccess: (res) => {
      if (!res.status) throw new Error(res.message || "Error");
      toast.success("Rekening berhasil ditambahkan!");
      queryClient.invalidateQueries({ queryKey: ["bank-accounts"] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Gagal menambahkan rekening");
    },
  });
};

export const useRequestWalletWithdrawal = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Record<string, unknown>) => withdrawalService.request(data),
    onSuccess: (res) => {
      if (!res.status) throw new Error(res.message || "Error");
      toast.success("Permintaan penarikan berhasil dibuat!");
      queryClient.invalidateQueries({ queryKey: ["wallet-withdrawals"] });
      queryClient.invalidateQueries({ queryKey: ["auth-me"] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Gagal melakukan penarikan dana");
    },
  });
};
