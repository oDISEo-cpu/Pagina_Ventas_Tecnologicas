import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '../types';
import { products as initialProducts } from '../lib/products';

interface ProductsState {
  products: Product[];
  initialized: boolean;
  initialize: () => void;
  addProduct: (product: Omit<Product, 'id' | 'slug'>) => void;
  updateProduct: (id: number, data: Partial<Product>) => void;
  deleteProduct: (id: number) => void;
  getProductBySlug: (slug: string) => Product | undefined;
}

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .substring(0, 50);
}

export const useProductsStore = create<ProductsState>()(
  persist(
    (set, get) => ({
      products: [],
      initialized: false,

      initialize: () => {
        if (!get().initialized) {
          set({ products: initialProducts, initialized: true });
        }
      },

      addProduct: (productData) => {
        const products = get().products;
        const maxId = products.reduce((max, p) => Math.max(max, p.id), 0);
        const newProduct: Product = {
          ...productData as Product,
          id: maxId + 1,
          slug: generateSlug(productData.name),
        };
        set({ products: [...products, newProduct] });
      },

      updateProduct: (id, data) => {
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id ? { ...p, ...data, slug: data.name ? generateSlug(data.name) : p.slug } : p
          ),
        }));
      },

      deleteProduct: (id) => {
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        }));
      },

      getProductBySlug: (slug) => {
        return get().products.find((p) => p.slug === slug);
      },
    }),
    {
      name: 'iphonelecheria-products',
      // Only persist if initialized
      partialize: (state) => ({
        products: state.products,
        initialized: state.initialized,
      }),
    }
  )
);
