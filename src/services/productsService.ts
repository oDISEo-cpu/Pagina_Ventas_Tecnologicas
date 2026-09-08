import { db, storage, isFirebaseConfigured } from '../lib/firebase';
import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc 
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
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

// Servicio de productos híbrido (Firebase + localStorage fallback)
export const productsService = {
  // Obtener todos los productos
  async getAll(): Promise<Product[]> {
    if (isFirebaseConfigured() && db) {
      try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const products: Product[] = [];
        querySnapshot.forEach((doc) => {
          products.push({ id: parseInt(doc.id), ...doc.data() } as Product);
        });
        return products;
      } catch (error) {
        console.error('Error obteniendo productos de Firebase:', error);
        return getFromLocalStorage();
      }
    }
    return getFromLocalStorage();
  },

  // Agregar producto
  async add(productData: Omit<Product, 'id' | 'slug'>): Promise<Product> {
    const slug = generateSlug(productData.name);

    if (isFirebaseConfigured() && db) {
      try {
        const docRef = await addDoc(collection(db, 'products'), {
          ...productData,
          slug
        });
        return { id: parseInt(docRef.id), ...productData, slug } as Product;
      } catch (error) {
        console.error('Error agregando producto a Firebase:', error);
        return addToLocalStorage(productData, slug);
      }
    }
    return addToLocalStorage(productData, slug);
  },

  // Actualizar producto
  async update(id: number, data: Partial<Product>): Promise<void> {
    if (isFirebaseConfigured() && db) {
      try {
        const updateData = { ...data };
        if (data.name) {
          updateData.slug = generateSlug(data.name);
        }
        await updateDoc(doc(db, 'products', id.toString()), updateData);
        return;
      } catch (error) {
        console.error('Error actualizando producto en Firebase:', error);
        updateInLocalStorage(id, data);
        return;
      }
    }
    updateInLocalStorage(id, data);
  },

  // Eliminar producto
  async delete(id: number): Promise<void> {
    if (isFirebaseConfigured() && db) {
      try {
        await deleteDoc(doc(db, 'products', id.toString()));
        return;
      } catch (error) {
        console.error('Error eliminando producto de Firebase:', error);
        deleteFromLocalStorage(id);
        return;
      }
    }
    deleteFromLocalStorage(id);
  },

  // Subir imagen
  async uploadImage(file: File, productId?: number): Promise<string> {
    if (isFirebaseConfigured() && storage) {
      try {
        const fileName = `${productId || Date.now()}_${file.name}`;
        const storageRef = ref(storage, `products/${fileName}`);
        const snapshot = await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);
        return downloadURL;
      } catch (error) {
        console.error('Error subiendo imagen a Firebase:', error);
        return fileToBase64(file);
      }
    }
    // Fallback: convertir a base64
    return fileToBase64(file);
  }
};

// Funciones auxiliares para localStorage
function getFromLocalStorage(): Product[] {
  const stored = localStorage.getItem('iphonelecheria-products');
  if (stored) {
    const data = JSON.parse(stored);
    return data.products || [];
  }
  // Si no hay datos, inicializar con productos por defecto
  localStorage.setItem('iphonelecheria-products', JSON.stringify({
    products: initialProducts,
    initialized: true
  }));
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
    products: updatedProducts,
    initialized: true
  }));
  
  return newProduct;
}

function updateInLocalStorage(id: number, data: Partial<Product>): void {
  const products = getFromLocalStorage();
  const updatedProducts = products.map((p) =>
    p.id === id ? { ...p, ...data, slug: data.name ? generateSlug(data.name) : p.slug } : p
  );
  
  localStorage.setItem('iphonelecheria-products', JSON.stringify({
    products: updatedProducts,
    initialized: true
  }));
}

function deleteFromLocalStorage(id: number): void {
  const products = getFromLocalStorage();
  const updatedProducts = products.filter((p) => p.id !== id);
  
  localStorage.setItem('iphonelecheria-products', JSON.stringify({
    products: updatedProducts,
    initialized: true
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
