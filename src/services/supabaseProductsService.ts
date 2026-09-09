import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { Product } from '../types';
import { products as initialProducts } from '../lib/products';

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .substring(0, 50);
}

// Servicio de productos con Supabase
export const supabaseProductsService = {
  // Obtener todos los productos
  async getAll(): Promise<Product[]> {
    if (isSupabaseConfigured() && supabase) {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('id', { ascending: true });

        if (error) throw error;

        // Si no hay productos, insertar los iniciales
        if (!data || data.length === 0) {
          await this.seedInitialProducts();
          const { data: newData } = await supabase
            .from('products')
            .select('*')
            .order('id', { ascending: true });
          return (newData || []).map(this.mapToProduct);
        }

        return data.map(this.mapToProduct);
      } catch (error) {
        console.error('Error obteniendo productos de Supabase:', error);
        return getFromLocalStorage();
      }
    }
    return getFromLocalStorage();
  },

  // Insertar productos iniciales
  async seedInitialProducts(): Promise<void> {
    if (!supabase) return;

    const productsToInsert = initialProducts.map(p => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      category: p.category,
      price: p.price,
      original_price: p.originalPrice || null,
      storage: p.storage || null,
      color: p.color || null,
      condition: p.condition,
      image: p.image,
      specs: p.specs,
      description: p.description,
      in_stock: p.inStock,
      stock_quantity: p.stockQuantity || 0
    }));

    await supabase.from('products').insert(productsToInsert);
  },

  // Agregar producto
  async add(productData: Omit<Product, 'id' | 'slug'>): Promise<Product> {
    const slug = generateSlug(productData.name);

    if (isSupabaseConfigured() && supabase) {
      try {
        const { data, error } = await supabase
          .from('products')
          .insert([{
            name: productData.name,
            slug,
            category: productData.category,
            price: productData.price,
            original_price: productData.originalPrice || null,
            storage: productData.storage || null,
            color: productData.color || null,
            condition: productData.condition,
            image: productData.image,
            specs: productData.specs,
            description: productData.description,
            in_stock: productData.inStock,
            stock_quantity: productData.stockQuantity || 0
          }])
          .select()
          .single();

        if (error) throw error;
        return this.mapToProduct(data);
      } catch (error) {
        console.error('Error agregando producto a Supabase:', error);
        return addToLocalStorage(productData, slug);
      }
    }
    return addToLocalStorage(productData, slug);
  },

  // Actualizar producto
  async update(id: number, updateData: Partial<Product>): Promise<void> {
    if (isSupabaseConfigured() && supabase) {
      try {
        const dbUpdateData: any = {};
        if (updateData.name) dbUpdateData.name = updateData.name;
        if (updateData.name) dbUpdateData.slug = generateSlug(updateData.name);
        if (updateData.category) dbUpdateData.category = updateData.category;
        if (updateData.price !== undefined) dbUpdateData.price = updateData.price;
        if (updateData.originalPrice !== undefined) dbUpdateData.original_price = updateData.originalPrice;
        if (updateData.storage !== undefined) dbUpdateData.storage = updateData.storage;
        if (updateData.color !== undefined) dbUpdateData.color = updateData.color;
        if (updateData.condition) dbUpdateData.condition = updateData.condition;
        if (updateData.image) dbUpdateData.image = updateData.image;
        if (updateData.specs) dbUpdateData.specs = updateData.specs;
        if (updateData.description) dbUpdateData.description = updateData.description;
        if (updateData.inStock !== undefined) dbUpdateData.in_stock = updateData.inStock;
        if (updateData.stockQuantity !== undefined) dbUpdateData.stock_quantity = updateData.stockQuantity;

        const { error } = await supabase
          .from('products')
          .update(dbUpdateData)
          .eq('id', id);

        if (error) throw error;
        return;
      } catch (error) {
        console.error('Error actualizando producto en Supabase:', error);
        updateInLocalStorage(id, updateData);
        return;
      }
    }
    updateInLocalStorage(id, updateData);
  },

  // Eliminar producto
  async delete(id: number): Promise<void> {
    if (isSupabaseConfigured() && supabase) {
      try {
        const { error } = await supabase
          .from('products')
          .delete()
          .eq('id', id);

        if (error) throw error;
        return;
      } catch (error) {
        console.error('Error eliminando producto de Supabase:', error);
        deleteFromLocalStorage(id);
        return;
      }
    }
    deleteFromLocalStorage(id);
  },

  // Subir imagen
  async uploadImage(file: File, productId?: number): Promise<string> {
    if (isSupabaseConfigured() && supabase) {
      try {
        const fileExt = file.name.split('.').pop();
        const fileName = `${productId || Date.now()}_${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `products/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('images')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage
          .from('images')
          .getPublicUrl(filePath);

        return data.publicUrl;
      } catch (error) {
        console.error('Error subiendo imagen a Supabase:', error);
        return fileToBase64(file);
      }
    }
    return fileToBase64(file);
  },

  // Mapear datos de Supabase a Product
  mapToProduct(data: any): Product {
    return {
      id: data.id,
      name: data.name,
      slug: data.slug,
      category: data.category,
      price: data.price,
      originalPrice: data.original_price,
      storage: data.storage,
      color: data.color,
      condition: data.condition,
      image: data.image,
      specs: data.specs || [],
      description: data.description,
      inStock: data.in_stock,
      stockQuantity: data.stock_quantity
    };
  }
};

// Funciones auxiliares para localStorage
function getFromLocalStorage(): Product[] {
  const stored = localStorage.getItem('iphonelecheria-products');
  if (stored) {
    try {
      const data = JSON.parse(stored);
      return data.state?.products || data.products || [];
    } catch {
      return initialProducts;
    }
  }
  return initialProducts;
}

function addToLocalStorage(productData: Omit<Product, 'id' | 'slug'>, slug: string): Product {
  const products = getFromLocalStorage();
  const maxId = products.reduce((max, p) => Math.max(max, p.id), 0);
  const newProduct: Product = {
    ...productData as Product,
    id: maxId + 1,
    slug
  };
  
  const updatedProducts = [...products, newProduct];
  localStorage.setItem('iphonelecheria-products', JSON.stringify({
    state: { products: updatedProducts, initialized: true }
  }));
  
  return newProduct;
}

function updateInLocalStorage(id: number, updateData: Partial<Product>): void {
  const products = getFromLocalStorage();
  const updatedProducts = products.map((p) =>
    p.id === id ? { ...p, ...updateData, slug: updateData.name ? generateSlug(updateData.name) : p.slug } : p
  );
  
  localStorage.setItem('iphonelecheria-products', JSON.stringify({
    state: { products: updatedProducts, initialized: true }
  }));
}

function deleteFromLocalStorage(id: number): void {
  const products = getFromLocalStorage();
  const updatedProducts = products.filter((p) => p.id !== id);
  
  localStorage.setItem('iphonelecheria-products', JSON.stringify({
    state: { products: updatedProducts, initialized: true }
  }));
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
}
