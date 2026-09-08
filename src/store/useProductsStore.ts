import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '../types';
import { products as defaultProducts } from '../lib/products';

interface ProductsState {
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'slug'>) => void;
  updateProduct: (id: number, updates: Partial<Product>) => void;
  deleteProduct: (id: number) => void;
  getProductById: (id: number) => Product | undefined;
  resetToDefaults: () => void;
}

export const useProductsStore = create<ProductsState>()(
  persist(
    (set, get) => ({
      products: defaultProducts,

      addProduct: (productData) => {
        const newId = Math.max(...get().products.map((p) => p.id), 0) + 1;
        const slug = productData.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '');

        const newProduct: Product = {
          ...productData,
          id: newId,
          slug: `${slug}-${newId}`,
        };

        set((state) => ({ products: [...state.products, newProduct] }));
      },

      updateProduct: (id, updates) => {
        set((state) => ({
          products: state.products.map((p) => (p.id === id ? { ...p, ...updates } : p)),
        }));
      },

      deleteProduct: (id) => {
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        }));
      },

      getProductById: (id) => {
        return get().products.find((p) => p.id === id);
      },

      resetToDefaults: () => {
        set({ products: defaultProducts });
      },
    }),
    { name: 'products-storage' }
  )
);
