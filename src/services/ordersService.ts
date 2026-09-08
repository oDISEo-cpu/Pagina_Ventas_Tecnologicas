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
        return addToLocalStorage(newOrder);
      }
    }
    return addToLocalStorage(newOrder);
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
        return getFromLocalStorage();
      }
    }
    return getFromLocalStorage();
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
        return getFromLocalStorage().filter(o => o.userId === userId);
      }
    }
    return getFromLocalStorage().filter(o => o.userId === userId);
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
        updateInLocalStorage(orderId, status);
        return;
      }
    }
    updateInLocalStorage(orderId, status);
  }
};

// Funciones auxiliares para localStorage
function getFromLocalStorage(): Order[] {
  const stored = localStorage.getItem('iphonelecheria-orders');
  if (stored) {
    const data = JSON.parse(stored);
    return data.orders || [];
  }
  return [];
}

function addToLocalStorage(order: Order): Order {
  const orders = getFromLocalStorage();
  const updatedOrders = [...orders, order];
  
  localStorage.setItem('iphonelecheria-orders', JSON.stringify({
    orders: updatedOrders
  }));
  
  return order;
}

function updateInLocalStorage(orderId: string, status: Order['status']): void {
  const orders = getFromLocalStorage();
  const updatedOrders = orders.map((o) =>
    o.id === orderId ? { ...o, status } : o
  );
  
  localStorage.setItem('iphonelecheria-orders', JSON.stringify({
    orders: updatedOrders
  }));
}
