import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Order } from '../types';
import { supabaseOrdersService } from '../services/supabaseOrdersService';

export type { Order };

interface OrdersState {
  orders: Order[];
  loading: boolean;
  initialized: boolean;
  initialize: () => Promise<void>;
  addOrder: (orderData: Omit<Order, 'id' | 'createdAt'>) => Promise<Order>;
  updateOrderStatus: (orderId: string, status: Order['status']) => Promise<void>;
  getUserOrders: (userId: string) => Order[];
}

export const useOrdersStore = create<OrdersState>()(
  persist(
    (set, get) => ({
      orders: [],
      loading: false,
      initialized: false,

      initialize: async () => {
        if (get().initialized) return;
        
        set({ loading: true });
        const orders = await supabaseOrdersService.getAll();
        set({ orders, loading: false, initialized: true });
      },

      addOrder: async (orderData) => {
        const newOrder = await supabaseOrdersService.add(orderData);
        set((state) => ({ orders: [...state.orders, newOrder] }));
        return newOrder;
      },

      updateOrderStatus: async (orderId, status) => {
        await supabaseOrdersService.updateStatus(orderId, status);
        set((state) => ({
          orders: state.orders.map((o) =>
            o.id === orderId ? { ...o, status } : o
          ),
        }));
      },

      getUserOrders: (userId) => {
        return get().orders.filter((o) => o.userId === userId);
      },
    }),
    {
      name: 'iphonelecheria-orders',
      partialize: (state) => ({
        orders: state.orders,
        initialized: state.initialized,
      }),
    }
  )
);
