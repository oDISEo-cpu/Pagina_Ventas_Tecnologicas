import emailjs from '@emailjs/browser';
import { Order } from '../types';
import { BUSINESS_INFO } from '../lib/constants';

// Configuración de EmailJS
// Para usar esto, necesitas:
// 1. Crear cuenta en https://www.emailjs.com/
// 2. Crear un servicio de email (Gmail, Outlook, etc.)
// 3. Crear una plantilla de email
// 4. Reemplazar las credenciales abajo

const EMAILJS_CONFIG = {
  serviceId: 'YOUR_SERVICE_ID',
  templateId: 'YOUR_TEMPLATE_ID',
  publicKey: 'YOUR_PUBLIC_KEY',
};

// Verificar si EmailJS está configurado
export const isEmailConfigured = () => {
  return (
    EMAILJS_CONFIG.serviceId !== 'YOUR_SERVICE_ID' &&
    EMAILJS_CONFIG.templateId !== 'YOUR_TEMPLATE_ID' &&
    EMAILJS_CONFIG.publicKey !== 'YOUR_PUBLIC_KEY'
  );
};

// Mapeo de estados a mensajes
const STATUS_MESSAGES: Record<string, { emoji: string; text: string; color: string }> = {
  pending: { emoji: '⏳', text: 'Pendiente', color: '#F59E0B' },
  confirmed: { emoji: '✅', text: 'Confirmado', color: '#3B82F6' },
  shipped: { emoji: '🚚', text: 'En camino', color: '#8B5CF6' },
  delivered: { emoji: '🎉', text: 'Entregado', color: '#10B981' },
  cancelled: { emoji: '❌', text: 'Cancelado', color: '#EF4444' },
};

export const notificationService = {
  // Enviar notificación por email
  async sendEmailNotification(order: Order, newStatus: string): Promise<boolean> {
    if (!isEmailConfigured()) {
      console.log('EmailJS no está configurado.');
      return false;
    }

    const statusInfo = STATUS_MESSAGES[newStatus];
    const templateParams = {
      to_email: order.userEmail,
      to_name: order.userName,
      order_id: order.id,
      order_status: statusInfo.text,
      status_emoji: statusInfo.emoji,
      order_total: `$${order.total}`,
      order_date: new Date(order.createdAt).toLocaleDateString('es-VE'),
      business_name: BUSINESS_INFO.name,
      business_phone: BUSINESS_INFO.phones[0],
      business_address: BUSINESS_INFO.address,
    };

    try {
      await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        templateParams,
        EMAILJS_CONFIG.publicKey
      );
      return true;
    } catch (error) {
      console.error('Error enviando email:', error);
      return false;
    }
  },

  // Generar mensaje de WhatsApp
  generateWhatsAppMessage(order: Order, newStatus: string, customMessage?: string): string {
    const statusInfo = STATUS_MESSAGES[newStatus];
    let message = `¡Hola ${order.userName}! 👋\n\n`;
    message += `Te escribimos de *${BUSINESS_INFO.name}* 🍎\n\n`;
    message += `${statusInfo.emoji} *Actualización de tu pedido #${order.id}*\n\n`;
    message += `El estado de tu pedido ha cambiado a: *${statusInfo.text}*\n\n`;

    if (customMessage) {
      message += `📝 *Mensaje del administrador:*\n${customMessage}\n\n`;
    }

    message += `📦 *Resumen de tu pedido:*\n`;
    order.items.forEach((item, index) => {
      message += `${index + 1}. ${item.product.name} x${item.quantity}\n`;
    });
    message += `\n💰 Total: $${order.total}\n\n`;

    if (newStatus === 'delivered') {
      message += `¡Gracias por tu compra! 🎉\n`;
    } else if (newStatus === 'shipped') {
      message += `🚚 Tu pedido está en camino.\n`;
    }

    message += `\n📞 ${BUSINESS_INFO.phones[0]}\n`;
    message += `📍 ${BUSINESS_INFO.address}`;

    return message;
  },

  // Abrir WhatsApp con mensaje
  sendWhatsAppNotification(order: Order, newStatus: string, customMessage?: string): void {
    const message = this.generateWhatsAppMessage(order, newStatus, customMessage);
    const phone = order.userPhone.replace(/[^0-9]/g, '');
    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  },

  // Guardar en historial
  saveNotificationToHistory(orderId: string, type: 'email' | 'whatsapp', status: string, success: boolean): void {
    const notifications = JSON.parse(localStorage.getItem('iphonelecheria-notifications') || '[]');
    notifications.push({
      id: Date.now(),
      orderId,
      type,
      status,
      success,
      timestamp: new Date().toISOString(),
    });
    if (notifications.length > 100) notifications.splice(0, notifications.length - 100);
    localStorage.setItem('iphonelecheria-notifications', JSON.stringify(notifications));
  },

  getNotificationHistory(): any[] {
    return JSON.parse(localStorage.getItem('iphonelecheria-notifications') || '[]');
  },
};
