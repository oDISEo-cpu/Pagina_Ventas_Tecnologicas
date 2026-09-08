import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag, Trash2, CheckCircle, CreditCard } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { useOrdersStore } from '../../store/useOrdersStore';
import { useAuthStore } from '../../store/useAuthStore';
import { formatPrice, generateWhatsAppMessage } from '../../lib/utils';
import { BUSINESS_INFO } from '../../lib/constants';

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, clearCart, getTotal } = useCartStore();
  const addOrder = useOrdersStore((state) => state.addOrder);
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const total = getTotal();
  const shipping = total > 0 ? 10 : 0;
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('Zelle');

  const handleCheckout = async () => {
    if (!isAuthenticated || !user) {
      closeCart();
      return;
    }

    // Save order
    const orderItems = items.map((item) => ({
      product: item.product,
      quantity: item.quantity,
      price: item.product.price,
    }));

    await addOrder({
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
      userPhone: user.phone,
      userCedula: user.cedula,
      items: orderItems,
      subtotal: total,
      shipping,
      total: total + shipping,
      status: 'pending',
      paymentMethod,
    });

    // Generate detailed WhatsApp message for admin
    const orderDate = new Date().toLocaleString('es-VE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    let adminMessage = `🛒 *NUEVO PEDIDO RECIBIDO*\n\n`;
    adminMessage += `👤 *DATOS DEL CLIENTE:*\n`;
    adminMessage += `• Nombre: ${user.name}\n`;
    adminMessage += `• Cédula: ${user.cedula || 'No registrada'}\n`;
    adminMessage += `• Teléfono: ${user.phone}\n`;
    adminMessage += `• Email: ${user.email}\n\n`;
    
    adminMessage += `📦 *PRODUCTOS:*\n`;
    items.forEach((item, index) => {
      const productName = item.product.name + 
        (item.product.storage ? ` ${item.product.storage}` : '') + 
        (item.product.color ? ` - ${item.product.color}` : '');
      adminMessage += `${index + 1}. ${productName}\n`;
      adminMessage += `   Cantidad: ${item.quantity}\n`;
      adminMessage += `   Precio unitario: $${item.product.price}\n`;
      adminMessage += `   Subtotal: $${item.product.price * item.quantity}\n\n`;
    });

    adminMessage += `💰 *RESUMEN DEL PEDIDO:*\n`;
    adminMessage += `• Subtotal: $${total}\n`;
    adminMessage += `• Envío: $${shipping}\n`;
    adminMessage += `• *TOTAL: $${total + shipping}*\n\n`;
    
    adminMessage += `💳 *Método de pago:* ${paymentMethod}\n`;
    adminMessage += `📅 *Fecha:* ${orderDate}\n\n`;
    adminMessage += `¡Gracias por tu compra! 🎉`;

    const encodedMessage = encodeURIComponent(adminMessage);
    window.open(`${BUSINESS_INFO.whatsappLink}?text=${encodedMessage}`, '_blank');

    setOrderSuccess(true);
    clearCart();

    setTimeout(() => {
      setOrderSuccess(false);
      setShowCheckout(false);
      closeCart();
    }, 3000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/50 z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-50 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-apple-blue" />
                <h2 className="text-lg font-semibold">Mi Carrito</h2>
                <span className="text-sm text-apple-gray">({items.length} items)</span>
              </div>
              <button onClick={closeCart} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Success Message */}
            <AnimatePresence>
              {orderSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="p-6 bg-green-50 border-b border-green-200"
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                    <div>
                      <p className="font-semibold text-green-800">¡Pedido realizado!</p>
                      <p className="text-sm text-green-600">Te contactaremos pronto por WhatsApp</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Checkout Form */}
            <AnimatePresence>
              {showCheckout && !orderSuccess ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 overflow-y-auto p-6"
                >
                  <h3 className="text-lg font-semibold text-apple-dark mb-4">Confirmar Pedido</h3>

                  {/* Order Summary */}
                  <div className="bg-gray-50 rounded-xl p-4 mb-6">
                    <h4 className="font-medium text-sm text-apple-dark mb-3">Resumen del pedido:</h4>
                    {items.map((item) => (
                      <div key={item.product.id} className="flex justify-between text-sm py-1">
                        <span className="text-apple-gray">
                          {item.product.name} x{item.quantity}
                        </span>
                        <span className="font-medium">{formatPrice(item.product.price * item.quantity)}</span>
                      </div>
                    ))}
                    <div className="border-t mt-2 pt-2 flex justify-between">
                      <span className="text-apple-gray text-sm">Envío</span>
                      <span className="text-sm">{formatPrice(shipping)}</span>
                    </div>
                    <div className="flex justify-between font-bold mt-1">
                      <span>Total</span>
                      <span>{formatPrice(total + shipping)}</span>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-apple-dark mb-2">
                      <CreditCard className="w-4 h-4 inline mr-1" />
                      Método de Pago
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {BUSINESS_INFO.paymentMethods.map((method) => (
                        <button
                          key={method}
                          onClick={() => setPaymentMethod(method)}
                          className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                            paymentMethod === method
                              ? 'bg-apple-blue text-white'
                              : 'bg-gray-100 text-apple-dark hover:bg-gray-200'
                          }`}
                        >
                          {method}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* User Info */}
                  {user && (
                    <div className="bg-blue-50 rounded-xl p-4 mb-6">
                      <h4 className="font-medium text-sm text-apple-dark mb-2">Datos de contacto:</h4>
                      <p className="text-sm text-apple-gray">{user.name}</p>
                      <p className="text-sm text-apple-gray">{user.email}</p>
                      <p className="text-sm text-apple-gray">{user.phone}</p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="space-y-3">
                    <button
                      onClick={handleCheckout}
                      className="w-full py-3.5 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492l4.634-1.215A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75c-2.156 0-4.154-.675-5.79-1.826l-.414-.275-2.748.72.735-2.682-.299-.434A9.713 9.713 0 012.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75z"/>
                      </svg>
                      Confirmar y Enviar por WhatsApp
                    </button>
                    <button
                      onClick={() => setShowCheckout(false)}
                      className="w-full py-2.5 text-sm text-apple-gray hover:text-apple-dark transition-colors"
                    >
                      ← Volver al carrito
                    </button>
                  </div>
                </motion.div>
              ) : (
                /* Items */
                <div className="flex-1 overflow-y-auto p-6">
                  {items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                      <ShoppingBag className="w-16 h-16 text-gray-200 mb-4" />
                      <p className="text-apple-gray text-lg font-medium">Tu carrito está vacío</p>
                      <p className="text-sm text-gray-400 mt-1">Agrega productos para comenzar</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {items.map((item) => (
                        <motion.div
                          key={item.product.id}
                          layout
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: -100 }}
                          className="flex gap-4 p-3 bg-gray-50 rounded-xl"
                        >
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-sm truncate">{item.product.name}</h3>
                            <p className="text-xs text-apple-gray mt-0.5">
                              {item.product.storage && `${item.product.storage} `}
                              {item.product.color && `- ${item.product.color}`}
                            </p>
                            <p className="font-semibold text-apple-blue mt-1">{formatPrice(item.product.price)}</p>
                            
                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                  className="w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-100"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                                <button
                                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                  className="w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-100"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>
                              <button
                                onClick={() => removeItem(item.product.id)}
                                className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </AnimatePresence>

            {/* Footer */}
            {items.length > 0 && !showCheckout && (
              <div className="border-t p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-apple-gray">Subtotal</span>
                  <span className="text-xl font-bold">{formatPrice(total)}</span>
                </div>
                <p className="text-xs text-apple-gray">+ Envío calculado al finalizar</p>
                <button
                  onClick={() => {
                    if (!isAuthenticated) {
                      closeCart();
                      // Navigate to login - we'll handle this via a simple redirect
                      window.location.hash = '/login';
                    } else {
                      setShowCheckout(true);
                    }
                  }}
                  className="w-full py-3.5 bg-apple-blue text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
                >
                  {isAuthenticated ? 'Finalizar Compra' : 'Iniciar Sesión para Comprar'}
                </button>
                <button
                  onClick={clearCart}
                  className="w-full py-2.5 text-sm text-apple-gray hover:text-red-500 transition-colors"
                >
                  Vaciar carrito
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
