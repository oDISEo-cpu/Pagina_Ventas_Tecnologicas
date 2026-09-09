import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '../types';
import { supabaseProductsService } from '../services/supabaseProductsService';
import { products as initialProducts } from '../lib/products';

interface ProductsState {
  products: Product[];
  loading: boolean;
  initialized: boolean;
  initialize: () => Promise<void>;
  addProduct: (product: Omit<Product, 'id' | 'slug'>) => Promise<void>;
  updateProduct: (id: number, data: Partial<Product>) => Promise<void>;
  deleteProduct: (id: number) => Promise<void>;
  uploadImage: (file: File, productId?: number) => Promise<string>;
}

export const useProductsStore = create<ProductsState>()(
  persist(
    (set, get) => ({
      products: initialProducts, // Iniciar con productos por defecto
      loading: false,
      initialized: false,

      initialize: async () => {
        if (get().initialized) return;
        
        set({ loading: true });
        const products = await supabaseProductsService.getAll();
        set({ products, loading: false, initialized: true });
      },

      addProduct: async (productData) => {
        const newProduct = await supabaseProductsService.add(productData);
        set((state) => ({ products: [...state.products, newProduct] }));
      },

      updateProduct: async (id, data) => {
        await supabaseProductsService.update(id, data);
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id ? { ...p, ...data } : p
          ),
        }));
      },

      deleteProduct: async (id) => {
        await supabaseProductsService.delete(id);
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        }));
      },

      uploadImage: async (file, productId) => {
        return await supabaseProductsService.uploadImage(file, productId);
      },
    }),
    {
      name: 'iphonelecheria-products',
      partialize: (state) => ({
        products: state.products,
        initialized: state.initialized,
      }),
    }
  )
);
