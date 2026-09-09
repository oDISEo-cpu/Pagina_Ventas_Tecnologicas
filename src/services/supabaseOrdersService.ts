import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { Order } from '../types';

// Servicio de órdenes con Supabase
export const supabaseOrdersService = {
  // Agregar orden
  async add(orderData: Omit<Order, 'id' | 'createdAt'>): Promise<Order> {
    const newOrder: Order = {
      ...orderData,
      id: `ORD-${Date.now()}`,
      createdAt: new Date().toISOString()
    };

    if (isSupabaseConfigured() && supabase) {
      try {
        const { error } = await supabase
          .from('orders')
          .insert([{
            id: newOrder.id,
            user_id: newOrder.userId,
            user_name: newOrder.userName,
            user_email: newOrder.userEmail,
            user_phone: newOrder.userPhone,
            user_cedula: newOrder.userCedula,
            items: newOrder.items,
            subtotal: newOrder.subtotal,
            shipping: newOrder.shipping,
            total: newOrder.total,
            status: newOrder.status,
            payment_method: newOrder.paymentMethod,
            created_at: newOrder.createdAt
          }]);

        if (error) throw error;
        return newOrder;
      } catch (error) {
        console.error('Error agregando orden a Supabase:', error);
        return newOrder;
      }
    }
    return newOrder;
  },

  // Obtener todas las órdenes
  async getAll(): Promise<Order[]> {
    if (isSupabaseConfigured() && supabase) {
      try {
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        return (data || []).map(this.mapToOrder);
      } catch (error) {
        console.error('Error obteniendo órdenes de Supabase:', error);
        return [];
      }
    }
    return [];
  },

  // Obtener órdenes de un usuario
  async getByUserId(userId: string): Promise<Order[]> {
    if (isSupabaseConfigured() && supabase) {
      try {
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .eq('user_id', userId)
          .order('created_at', { ascending: false });

        if (error) throw error;
        return (data || []).map(this.mapToOrder);
      } catch (error) {
        console.error('Error obteniendo órdenes del usuario:', error);
        return [];
      }
    }
    return [];
  },

  // Actualizar estado de orden
  async updateStatus(orderId: string, status: Order['status']): Promise<void> {
    if (isSupabaseConfigured() && supabase) {
      try {
        const { error } = await supabase
          .from('orders')
          .update({ status })
          .eq('id', orderId);

        if (error) throw error;
        return;
      } catch (error) {
        console.error('Error actualizando orden en Supabase:', error);
        return;
      }
    }
  },

  // Mapear datos de Supabase a Order
  mapToOrder(data: any): Order {
    return {
      id: data.id,
      userId: data.user_id,
      userName: data.user_name,
      userEmail: data.user_email,
      userPhone: data.user_phone,
      userCedula: data.user_cedula,
      items: data.items,
      subtotal: data.subtotal,
      shipping: data.shipping,
      total: data.total,
      status: data.status,
      paymentMethod: data.payment_method,
      createdAt: data.created_at
    };
  }
};
