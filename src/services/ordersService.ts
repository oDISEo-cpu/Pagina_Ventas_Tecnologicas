import { db, isFirebaseConfigured } from '../lib/firebase';
import { 
  collection, 
  addDoc, 
  getDocs, 
  updateDoc, 
  doc,
  query,
  where,
  orderBy
} from 'firebase/firestore';
import { Order } from '../types';

// Servicio de órdenes híbrido (Firebase + localStorage fallback)
export const ordersService = {
  // Agregar orden
  async add(orderData: Omit<Order, 'id' | 'createdAt'>): Promise<Order> {
    const newOrder: Order = {
      ...orderData,
      id: `ORD-${Date.now()}`,
      createdAt: new Date().toISOString()
    };

    if (isFirebaseConfigured() && db) {
      try {
        await addDoc(collection(db, 'orders'), newOrder);
        return newOrder;
      } catch (error) {
        console.error('Error agregando orden a Firebase:', error);
        // El store maneja la persistencia automáticamente
        return newOrder;
      }
    }
    // El store maneja la persistencia automáticamente
    return newOrder;
  },

  // Obtener todas las órdenes
  async getAll(): Promise<Order[]> {
    if (isFirebaseConfigured() && db) {
      try {
        const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const orders: Order[] = [];
        querySnapshot.forEach((doc) => {
          orders.push(doc.data() as Order);
        });
        return orders;
      } catch (error) {
        console.error('Error obteniendo órdenes de Firebase:', error);
        return [];
      }
    }
    // Si Firebase no está configurado, retornar vacío
    // El store se encargará de persistir las órdenes en localStorage
    return [];
  },

  // Obtener órdenes de un usuario
  async getByUserId(userId: string): Promise<Order[]> {
    if (isFirebaseConfigured() && db) {
      try {
        const q = query(
          collection(db, 'orders'), 
          where('userId', '==', userId),
          orderBy('createdAt', 'desc')
        );
        const querySnapshot = await getDocs(q);
        const orders: Order[] = [];
        querySnapshot.forEach((doc) => {
          orders.push(doc.data() as Order);
        });
        return orders;
      } catch (error) {
        console.error('Error obteniendo órdenes del usuario:', error);
        return [];
      }
    }
    return [];
  },

  // Actualizar estado de orden
  async updateStatus(orderId: string, status: Order['status']): Promise<void> {
    if (isFirebaseConfigured() && db) {
      try {
        // Buscar el documento por ID
        const q = query(collection(db, 'orders'), where('id', '==', orderId));
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
          const docRef = querySnapshot.docs[0].ref;
          await updateDoc(docRef, { status });
        }
        return;
      } catch (error) {
        console.error('Error actualizando orden en Firebase:', error);
        return;
      }
    }
    // El store maneja la persistencia automáticamente
  }
};
