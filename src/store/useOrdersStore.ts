import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Order, OrderItem } from '../types';

interface OrdersState {
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'createdAt'>) => void;
  updateOrderStatus: (id: string, status: Order['status']) => void;
  getUserOrders: (userId: string) => Order[];
}

export type { Order } from '../types';

export const useOrdersStore = create<OrdersState>()(
  persist(
    (set, get) => ({
      orders: [],

      addOrder: (orderData) => {
        const newOrder: Order = {
          ...orderData,
          id: `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
          createdAt: new Date().toISOString(),
        };
        set((state) => ({ orders: [newOrder, ...state.orders] }));
      },

      updateOrderStatus: (id, status) => {
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === id ? { ...order, status } : order
          ),
        }));
      },

      getUserOrders: (userId) => {
        return get().orders.filter((order) => order.userId === userId);
      },
    }),
    { name: 'iphonelecheria-orders' }
  )
);
