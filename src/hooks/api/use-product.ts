/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { productService } from "@/services";
import { toast } from "sonner";

// --- Queries ---

export const useProducts = (params?: Record<string, string | number>) => {
  return useQuery({
    queryKey: ["products", params],
    queryFn: async () => {
      const res = await productService.getAll(params);
      if (!res.status) throw new Error(res.message || "Error");
      return res;
    },
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await productService.getCategories();
      if (!res.status) throw new Error(res.message || "Error");
      return res;
    },
    staleTime: 1000 * 60 * 60, // Cache for 1 hour
  });
};

export const useSellerProducts = (params?: Record<string, string | number>) => {
  return useQuery({
    queryKey: ["seller-products", params],
    queryFn: async () => {
      const res = await productService.getSellerProducts(params);
      if (!res.status) throw new Error(res.message || "Error");
      return res;
    },
  });
};

export const useProductDetail = (slug: string) => {
  return useQuery({
    queryKey: ["product-detail", slug],
    queryFn: async () => {
      const res = await productService.getById(slug);
      if (!res.status) throw new Error(res.message || "Error");
      return res;
    },
    enabled: !!slug,
  });
};

// --- Mutations ---

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Record<string, unknown>) => productService.create(data),
    onSuccess: (res) => {
      if (!res.status) throw new Error(res.message || "Gagal membuat produk");
      toast.success("Produk berhasil ditambahkan!");
      queryClient.invalidateQueries({ queryKey: ["seller-products"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Gagal membuat produk");
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Record<string, unknown> }) => productService.update(id, data),
    onSuccess: (res) => {
      if (!res.status) throw new Error(res.message || "Gagal mengubah produk");
      toast.success("Produk berhasil diperbarui!");
      queryClient.invalidateQueries({ queryKey: ["seller-products"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product-detail"] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Gagal memperbarui produk");
    },
  });
};

export const useRemoveProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => productService.remove(id),
    onSuccess: (res) => {
      if (!res.status) throw new Error(res.message || "Gagal menghapus produk");
      toast.success("Produk berhasil dihapus!");
      queryClient.invalidateQueries({ queryKey: ["seller-products"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Gagal menghapus produk");
    },
  });
};
