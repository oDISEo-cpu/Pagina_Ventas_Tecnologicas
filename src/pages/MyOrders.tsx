import { motion } from 'framer-motion';
import { Package, Calendar, DollarSign, CheckCircle, Clock, Truck, XCircle } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { useOrdersStore } from '../store/useOrdersStore';
import { formatPrice } from '../lib/utils';
import { Link } from 'react-router-dom';

export default function MyOrders() {
  const user = useAuthStore((state) => state.user);
  const getUserOrders = useOrdersStore((state) => state.getUserOrders);

  if (!user) {
    return (
      <div className="min-h-screen pt-20 pb-16 bg-apple-bg flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-apple-dark mb-4">Debes iniciar sesión</h2>
          <Link to="/login" className="px-6 py-3 bg-apple-blue text-white rounded-xl hover:bg-blue-700 transition-colors">
            Iniciar Sesión
          </Link>
        </div>
      </div>
    );
  }

  const orders = getUserOrders(user.id);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'confirmed':
        return <CheckCircle className="w-5 h-5 text-blue-500" />;
      case 'shipped':
        return <Truck className="w-5 h-5 text-purple-500" />;
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5" />;
    }
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      pending: 'Pendiente',
      confirmed: 'Confirmado',
      shipped: 'Enviado',
      delivered: 'Entregado',
      cancelled: 'Cancelado',
    };
    return labels[status] || status;
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-yellow-50 text-yellow-700 border-yellow-200',
      confirmed: 'bg-blue-50 text-blue-700 border-blue-200',
      shipped: 'bg-purple-50 text-purple-700 border-purple-200',
      delivered: 'bg-green-50 text-green-700 border-green-200',
      cancelled: 'bg-red-50 text-red-700 border-red-200',
    };
    return colors[status] || 'bg-gray-50 text-gray-700 border-gray-200';
  };

  return (
    <div className="pt-20 pb-16 min-h-screen bg-apple-bg">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-apple-dark mb-2">Mis Pedidos</h1>
          <p className="text-apple-gray">Historial de tus compras en iPhoneLechería</p>
        </motion.div>

        {orders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-2xl p-12 text-center"
          >
            <Package className="w-16 h-16 text-apple-gray mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-apple-dark mb-2">No tienes pedidos aún</h2>
            <p className="text-apple-gray mb-6">Cuando realices tu primera compra, aparecerá aquí</p>
            <Link
              to="/products"
              className="inline-block px-6 py-3 bg-apple-blue text-white rounded-xl hover:bg-blue-700 transition-colors"
            >
              Ver Productos
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {orders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl p-6 shadow-sm"
              >
                {/* Order Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-4 border-b">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-mono text-apple-gray">#{order.id}</span>
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        {getStatusLabel(order.status)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-apple-gray">
                      <Calendar className="w-3 h-3" />
                      {new Date(order.createdAt).toLocaleDateString('es-VE', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-lg font-bold text-apple-dark">
                      <DollarSign className="w-5 h-5" />
                      {formatPrice(order.total)}
                    </div>
                    <div className="text-xs text-apple-gray">
                      Pago: {order.paymentMethod}
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="space-y-3">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-apple-dark">{item.product.name}</h3>
                        <div className="text-sm text-apple-gray">
                          Cantidad: {item.quantity} × {formatPrice(item.price)}
                        </div>
                      </div>
                      <div className="text-right font-semibold text-apple-dark">
                        {formatPrice(item.quantity * item.price)}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Summary */}
                <div className="mt-4 pt-4 border-t space-y-2">
                  <div className="flex justify-between text-sm text-apple-gray">
                    <span>Subtotal</span>
                    <span>{formatPrice(order.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-apple-gray">
                    <span>Envío</span>
                    <span>{formatPrice(order.shipping)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-apple-dark pt-2">
                    <span>Total</span>
                    <span>{formatPrice(order.total)}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
