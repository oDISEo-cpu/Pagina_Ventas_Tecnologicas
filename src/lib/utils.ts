import { type ClassValue, clsx } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(price);
}

export function generateWhatsAppMessage(items: { name: string; quantity: number; price: number }[], total: number): string {
  let message = '¡Hola iPhoneLechería! 🍎\n\nMe interesa comprar:\n\n';
  items.forEach((item) => {
    message += `• ${item.name} x${item.quantity} - $${item.price * item.quantity}\n`;
  });
  message += `\n💰 Total: $${total}\n\n¿Está disponible?`;
  return encodeURIComponent(message);
}
