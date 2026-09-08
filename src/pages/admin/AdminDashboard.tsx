import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Package, Users, ShoppingBag, Plus, Edit3, Trash2,
  CheckCircle, Clock, Truck, XCircle, Search, DollarSign,
  Image, Save, ArrowLeft, Eye, X, Instagram, Bell, Mail, MessageCircle, Send
} from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { useOrdersStore, Order } from '../../store/useOrdersStore';
import { useProductsStore } from '../../store/useProductsStore';
import { useInstagramStore } from '../../store/useInstagramStore';
import { formatPrice } from '../../lib/utils';
import { Link, useNavigate } from 'react-router-dom';
import { Product } from '../../types';
import { notificationService, isEmailConfigured } from '../../services/notificationService';

type Tab = 'orders' | 'products' | 'users' | 'instagram' | 'notifications';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const [activeTab, setActiveTab] = useState<Tab>('orders');

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen pt-20 pb-16 bg-apple-bg flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-apple-dark mb-4">Acceso Restringido</h2>
          <p className="text-apple-gray mb-6">Necesitas permisos de administrador</p>
          <Link to="/login" className="px-6 py-3 bg-apple-blue text-white rounded-xl hover:bg-blue-700 transition-colors">
            Iniciar Sesión
          </Link>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'orders' as Tab, label: 'Pedidos', icon: Package },
    { id: 'products' as Tab, label: 'Productos', icon: ShoppingBag },
    { id: 'users' as Tab, label: 'Usuarios', icon: Users },
    { id: 'instagram' as Tab, label: 'Instagram', icon: Instagram },
    { id: 'notifications' as Tab, label: 'Notificaciones', icon: Bell },
  ];

  return (
    <div className="pt-20 pb-16 min-h-screen bg-apple-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <button onClick={() => navigate('/')} className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-3xl sm:text-4xl font-bold text-apple-dark">Panel de Administración</h1>
          </div>
          <p className="text-apple-gray">Gestiona tu tienda iPhoneLechería</p>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-apple-blue text-white shadow-md'
                  : 'bg-white text-apple-dark hover:bg-gray-100'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === 'orders' && <OrdersPanel />}
        {activeTab === 'products' && <ProductsPanel />}
        {activeTab === 'users' && <UsersPanel />}
        {activeTab === 'instagram' && <InstagramPanel />}
        {activeTab === 'notifications' && <NotificationsPanel />}
      </div>
    </div>
  );
}

/* ==================== ORDERS PANEL ==================== */
function OrdersPanel() {
  const orders = useOrdersStore((state) => state.orders);
  const updateOrderStatus = useOrdersStore((state) => state.updateOrderStatus);
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredOrders = filterStatus === 'all'
    ? orders
    : orders.filter((o) => o.status === filterStatus);

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      shipped: 'bg-purple-100 text-purple-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
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

  if (orders.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-12 text-center">
        <Package className="w-16 h-16 text-apple-gray mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-apple-dark mb-2">No hay pedidos aún</h2>
        <p className="text-apple-gray">Los pedidos aparecerán aquí cuando los usuarios realicen compras</p>
      </div>
    );
  }

  return (
    <div>
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4">
          <p className="text-sm text-apple-gray">Total Pedidos</p>
          <p className="text-2xl font-bold text-apple-dark">{orders.length}</p>
        </div>
        <div className="bg-white rounded-xl p-4">
          <p className="text-sm text-apple-gray">Pendientes</p>
          <p className="text-2xl font-bold text-yellow-600">{orders.filter(o => o.status === 'pending').length}</p>
        </div>
        <div className="bg-white rounded-xl p-4">
          <p className="text-sm text-apple-gray">Entregados</p>
          <p className="text-2xl font-bold text-green-600">{orders.filter(o => o.status === 'delivered').length}</p>
        </div>
        <div className="bg-white rounded-xl p-4">
          <p className="text-sm text-apple-gray">Ingresos</p>
          <p className="text-2xl font-bold text-apple-blue">{formatPrice(orders.reduce((sum, o) => sum + o.total, 0))}</p>
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
        {['all', 'pending', 'confirmed', 'shipped', 'delivered', 'cancelled'].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
              filterStatus === status ? 'bg-apple-dark text-white' : 'bg-white text-apple-dark hover:bg-gray-100'
            }`}
          >
            {status === 'all' ? 'Todos' : getStatusLabel(status)}
          </button>
        ))}
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <OrderCard key={order.id} order={order} onUpdateStatus={updateOrderStatus} getStatusColor={getStatusColor} getStatusLabel={getStatusLabel} />
        ))}
      </div>
    </div>
  );
}

function OrderCard({ order, onUpdateStatus, getStatusColor, getStatusLabel }: {
  order: Order;
  onUpdateStatus: (id: string, status: Order['status']) => void;
  getStatusColor: (status: string) => string;
  getStatusLabel: (status: string) => string;
}) {
  const [expanded, setExpanded] = useState(false);
  const [showNotifyModal, setShowNotifyModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<Order['status']>(order.status);
  const [customMessage, setCustomMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [notificationSent, setNotificationSent] = useState<{ type: string; success: boolean } | null>(null);

  const handleStatusChange = (newStatus: Order['status']) => {
    const oldStatus = order.status;
    onUpdateStatus(order.id, newStatus);
    setSelectedStatus(newStatus);
    
    // Solo mostrar modal si el estado cambió
    if (oldStatus !== newStatus) {
      setShowNotifyModal(true);
    }
  };

  const handleSendWhatsApp = () => {
    notificationService.sendWhatsAppNotification(order, selectedStatus, customMessage);
    notificationService.saveNotificationToHistory(order.id, 'whatsapp', selectedStatus, true);
    setNotificationSent({ type: 'whatsapp', success: true });
    setTimeout(() => {
      setShowNotifyModal(false);
      setNotificationSent(null);
      setCustomMessage('');
    }, 2000);
  };

  const handleSendEmail = async () => {
    setSending(true);
    const success = await notificationService.sendEmailNotification(order, selectedStatus);
    notificationService.saveNotificationToHistory(order.id, 'email', selectedStatus, success);
    setSending(false);
    setNotificationSent({ type: 'email', success });
    
    if (success) {
      setTimeout(() => {
        setShowNotifyModal(false);
        setNotificationSent(null);
        setCustomMessage('');
      }, 2000);
    }
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm">
      <div className="p-4 sm:p-6 cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="font-mono text-sm text-apple-gray">#{order.id}</span>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                {getStatusLabel(order.status)}
              </span>
            </div>
            <p className="text-sm text-apple-dark">
              <strong>{order.userName}</strong> · {order.userEmail}
            </p>
            <p className="text-xs text-apple-gray">{order.items.length} productos · {formatPrice(order.total)}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-apple-gray">
              {new Date(order.createdAt).toLocaleDateString('es-VE')}
            </span>
            <select
              onClick={(e) => e.stopPropagation()}
              value={order.status}
              onChange={(e) => handleStatusChange(e.target.value as Order['status'])}
              className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 outline-none focus:ring-2 focus:ring-apple-blue"
            >
              <option value="pending">Pendiente</option>
              <option value="confirmed">Confirmado</option>
              <option value="shipped">Enviado</option>
              <option value="delivered">Entregado</option>
              <option value="cancelled">Cancelado</option>
            </select>
          </div>
        </div>
      </div>

      {/* Notification Modal */}
      <AnimatePresence>
        {showNotifyModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setShowNotifyModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
                {notificationSent ? (
                  <div className="text-center py-8">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                      notificationSent.success ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      {notificationSent.success ? (
                        <CheckCircle className="w-8 h-8 text-green-500" />
                      ) : (
                        <XCircle className="w-8 h-8 text-red-500" />
                      )}
                    </div>
                    <h3 className="text-lg font-semibold text-apple-dark mb-2">
                      {notificationSent.success ? '¡Notificación Enviada!' : 'Error al Enviar'}
                    </h3>
                    <p className="text-sm text-apple-gray">
                      {notificationSent.success
                        ? `Se envió la notificación por ${notificationSent.type === 'whatsapp' ? 'WhatsApp' : 'email'}`
                        : 'No se pudo enviar la notificación'}
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-apple-blue/10 rounded-full flex items-center justify-center">
                        <Bell className="w-5 h-5 text-apple-blue" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-apple-dark">Notificar al Cliente</h3>
                        <p className="text-xs text-apple-gray">Pedido #{order.id} → {getStatusLabel(selectedStatus)}</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-apple-dark mb-2">
                        Mensaje adicional (opcional)
                      </label>
                      <textarea
                        value={customMessage}
                        onChange={(e) => setCustomMessage(e.target.value)}
                        placeholder="Ej: Tu pedido saldrá mañana a las 10am..."
                        className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-apple-blue resize-none"
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <button
                        onClick={handleSendWhatsApp}
                        className="w-full flex items-center justify-center gap-2 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors font-medium"
                      >
                        <MessageCircle className="w-5 h-5" />
                        Notificar por WhatsApp
                      </button>

                      <button
                        onClick={handleSendEmail}
                        disabled={sending || !isEmailConfigured()}
                        className="w-full flex items-center justify-center gap-2 py-3 bg-apple-blue text-white rounded-xl hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {sending ? (
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <Mail className="w-5 h-5" />
                        )}
                        {isEmailConfigured() ? 'Notificar por Email' : 'Email no configurado'}
                      </button>

                      {!isEmailConfigured() && (
                        <p className="text-xs text-apple-gray text-center">
                          💡 Configura EmailJS para enviar emails automáticos
                        </p>
                      )}

                      <button
                        onClick={() => setShowNotifyModal(false)}
                        className="w-full py-2.5 text-sm text-apple-gray hover:text-apple-dark transition-colors"
                      >
                        Cancelar
                      </button>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {expanded && (
        <div className="px-4 sm:px-6 pb-4 sm:pb-6 border-t pt-4">
          {/* Customer Info */}
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-xs font-semibold text-apple-gray mb-2 uppercase">Datos del Cliente</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-apple-gray">Nombre:</span>{' '}
                <span className="font-medium text-apple-dark">{order.userName}</span>
              </div>
              <div>
                <span className="text-apple-gray">Cédula:</span>{' '}
                <span className="font-medium text-apple-dark">{order.userCedula || 'No registrada'}</span>
              </div>
              <div>
                <span className="text-apple-gray">Teléfono:</span>{' '}
                <span className="font-medium text-apple-dark">{order.userPhone}</span>
              </div>
              <div>
                <span className="text-apple-gray">Email:</span>{' '}
                <span className="font-medium text-apple-dark">{order.userEmail}</span>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="space-y-3">
            <p className="text-xs font-semibold text-apple-gray uppercase">Productos</p>
            {order.items.map((item: any, i: number) => (
              <div key={i} className="flex items-center gap-3">
                <img src={item.product.image} alt={item.product.name} className="w-12 h-12 rounded-lg object-cover" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-apple-dark">{item.product.name}</p>
                  <p className="text-xs text-apple-gray">x{item.quantity} · {formatPrice(item.price)} c/u</p>
                </div>
                <p className="text-sm font-semibold">{formatPrice(item.quantity * item.price)}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-3 border-t flex justify-between text-sm">
            <span className="text-apple-gray">Método de pago: {order.paymentMethod}</span>
            <span className="font-semibold">Total: {formatPrice(order.total)}</span>
          </div>
        </div>
      )}
    </div>
  );
}

/* ==================== PRODUCTS PANEL ==================== */
function ProductsPanel() {
  const products = useProductsStore((state) => state.products);
  const deleteProduct = useProductsStore((state) => state.deleteProduct);
  const [search, setSearch] = useState('');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  if (editingProduct) {
    return <ProductForm product={editingProduct} onBack={() => setEditingProduct(null)} />;
  }

  if (showAddForm) {
    return <ProductForm onBack={() => setShowAddForm(false)} />;
  }

  return (
    <div>
      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-apple-gray" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar productos..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-apple-blue"
          />
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-apple-blue text-white rounded-xl hover:bg-blue-700 transition-colors font-medium text-sm"
        >
          <Plus className="w-4 h-4" />
          Añadir Producto
        </button>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-medium text-apple-gray uppercase">Producto</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-apple-gray uppercase hidden sm:table-cell">Categoría</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-apple-gray uppercase">Precio</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-apple-gray uppercase hidden md:table-cell">Stock</th>
                <th className="text-right px-4 py-3 text-xs font-medium text-apple-gray uppercase">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={product.image} alt={product.name} className="w-10 h-10 rounded-lg object-cover" />
                      <div>
                        <p className="font-medium text-apple-dark text-sm">{product.name}</p>
                        <p className="text-xs text-apple-gray">{product.storage || ''} {product.color || ''}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span className="text-sm text-apple-gray capitalize">{product.category}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-semibold text-apple-dark">{formatPrice(product.price)}</span>
                    {product.originalPrice && (
                      <span className="text-xs text-apple-gray line-through ml-2">{formatPrice(product.originalPrice)}</span>
                    )}
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span className={`text-sm ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                      {product.stockQuantity || 0}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setEditingProduct(product)}
                        className="p-2 text-apple-blue hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm('¿Eliminar este producto?')) deleteProduct(product.id);
                        }}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ==================== PRODUCT FORM ==================== */
function ProductForm({ product, onBack }: { product?: Product; onBack: () => void }) {
  const addProduct = useProductsStore((state) => state.addProduct);
  const updateProduct = useProductsStore((state) => state.updateProduct);
  const uploadImage = useProductsStore((state) => state.uploadImage);
  const isEditing = !!product;
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    name: product?.name || '',
    category: product?.category || 'iphones' as Product['category'],
    price: product?.price || 0,
    originalPrice: product?.originalPrice || undefined,
    storage: product?.storage || '',
    color: product?.color || '',
    condition: product?.condition || 'nuevo' as Product['condition'],
    image: product?.image || '',
    specs: product?.specs?.join(', ') || '',
    description: product?.description || '',
    inStock: product?.inStock ?? true,
    stockQuantity: product?.stockQuantity || 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const imageUrl = await uploadImage(file, product?.id);
      setFormData((prev) => ({ ...prev, image: imageUrl }));
    } catch (error) {
      console.error('Error subiendo imagen:', error);
      alert('Error al subir la imagen. Intenta de nuevo.');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const productData = {
      ...formData,
      specs: formData.specs.split(',').map((s) => s.trim()).filter(Boolean),
      originalPrice: formData.originalPrice || undefined,
    };

    if (isEditing && product) {
      await updateProduct(product.id, productData);
    } else {
      await addProduct(productData);
    }
    onBack();
  };

  return (
    <div>
      <button onClick={onBack} className="flex items-center gap-2 text-apple-blue mb-6 hover:underline">
        <ArrowLeft className="w-4 h-4" />
        Volver al listado
      </button>

      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-apple-dark mb-6">
          {isEditing ? 'Editar Producto' : 'Nuevo Producto'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-apple-dark mb-2">Nombre del Producto *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-apple-blue"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-apple-dark mb-2">Categoría *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-apple-blue"
              >
                <option value="iphones">iPhones</option>
                <option value="accesorios">Accesorios</option>
                <option value="macbooks">MacBooks</option>
                <option value="airpods">AirPods</option>
                <option value="playstation">PlayStation</option>
              </select>
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-apple-dark mb-2">Precio (USD) *</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-apple-gray" />
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-apple-blue"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
            </div>

            {/* Original Price */}
            <div>
              <label className="block text-sm font-medium text-apple-dark mb-2">Precio Original (opcional)</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-apple-gray" />
                <input
                  type="number"
                  name="originalPrice"
                  value={formData.originalPrice || ''}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-apple-blue"
                  min="0"
                  step="0.01"
                  placeholder="Para mostrar descuento"
                />
              </div>
            </div>

            {/* Storage */}
            <div>
              <label className="block text-sm font-medium text-apple-dark mb-2">Almacenamiento</label>
              <input
                type="text"
                name="storage"
                value={formData.storage}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-apple-blue"
                placeholder="256GB"
              />
            </div>

            {/* Color */}
            <div>
              <label className="block text-sm font-medium text-apple-dark mb-2">Color</label>
              <input
                type="text"
                name="color"
                value={formData.color}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-apple-blue"
                placeholder="Negro Espacial"
              />
            </div>

            {/* Condition */}
            <div>
              <label className="block text-sm font-medium text-apple-dark mb-2">Condición *</label>
              <select
                name="condition"
                value={formData.condition}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-apple-blue"
              >
                <option value="nuevo">Nuevo</option>
                <option value="usado">Usado Certificado</option>
              </select>
            </div>

            {/* Stock */}
            <div>
              <label className="block text-sm font-medium text-apple-dark mb-2">Stock</label>
              <input
                type="number"
                name="stockQuantity"
                value={formData.stockQuantity}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-apple-blue"
                min="0"
              />
            </div>

            {/* Image */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-apple-dark mb-2">
                <Image className="w-4 h-4 inline mr-1" />
                Imagen del Producto *
              </label>
              
              {/* Tabs para URL o Importar */}
              <div className="flex gap-2 mb-3">
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    !formData.image.startsWith('data:') && !formData.image.startsWith('blob:')
                      ? 'bg-apple-blue text-white'
                      : 'bg-gray-100 text-apple-dark hover:bg-gray-200'
                  }`}
                >
                  URL
                </button>
                <button
                  type="button"
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    formData.image.startsWith('data:') || formData.image.startsWith('blob:')
                      ? 'bg-apple-blue text-white'
                      : 'bg-gray-100 text-apple-dark hover:bg-gray-200'
                  }`}
                >
                  Importar Imagen
                </button>
              </div>

              {/* Input de URL */}
              <input
                type="url"
                name="image"
                value={formData.image.startsWith('data:') || formData.image.startsWith('blob:') ? '' : formData.image}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-apple-blue mb-3"
                placeholder="https://ejemplo.com/imagen.jpg"
              />

              {/* Input de archivo */}
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-apple-blue hover:bg-blue-50 transition-all"
                >
                  {uploading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-apple-blue border-t-transparent rounded-full animate-spin" />
                      <span className="text-sm text-apple-gray">Subiendo imagen...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 text-apple-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-sm text-apple-gray">Click para importar imagen desde tu dispositivo</span>
                    </>
                  )}
                </label>
              </div>

              {/* Preview */}
              {formData.image && (
                <div className="mt-3 relative inline-block">
                  <img src={formData.image} alt="Preview" className="w-32 h-32 object-cover rounded-xl border-2 border-gray-200" />
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Specs */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-apple-dark mb-2">
                Especificaciones (separadas por coma)
              </label>
              <input
                type="text"
                name="specs"
                value={formData.specs}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-apple-blue"
                placeholder="Chip A17 Pro, Cámara 48MP, 5G, USB-C"
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-apple-dark mb-2">Descripción</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-apple-blue resize-none"
                placeholder="Descripción del producto..."
              />
            </div>

            {/* In Stock */}
            <div className="md:col-span-2">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="inStock"
                  checked={formData.inStock}
                  onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                  className="w-5 h-5 rounded border-gray-300 text-apple-blue focus:ring-apple-blue"
                />
                <span className="text-sm font-medium text-apple-dark">Producto disponible en stock</span>
              </label>
            </div>
          </div>

          {/* Submit */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-3 bg-apple-blue text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
            >
              <Save className="w-4 h-4" />
              {isEditing ? 'Guardar Cambios' : 'Crear Producto'}
            </button>
            <button
              type="button"
              onClick={onBack}
              className="px-6 py-3 border border-gray-200 text-apple-dark rounded-xl hover:bg-gray-50 transition-colors font-medium"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ==================== USERS PANEL ==================== */
function UsersPanel() {
  const users = useAuthStore((state) => state.users);
  const orders = useOrdersStore((state) => state.orders);

  return (
    <div>
      <div className="bg-white rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-medium text-apple-gray uppercase">Usuario</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-apple-gray uppercase hidden sm:table-cell">Cédula</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-apple-gray uppercase hidden md:table-cell">Email</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-apple-gray uppercase hidden lg:table-cell">Teléfono</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-apple-gray uppercase">Rol</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-apple-gray uppercase hidden md:table-cell">Pedidos</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-apple-gray uppercase hidden xl:table-cell">Registrado</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {users.map((u) => {
                const userOrders = orders.filter((o) => o.userId === u.id);
                return (
                  <tr key={u.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-apple-blue rounded-full flex items-center justify-center text-white text-sm font-medium">
                          {u.name.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-medium text-apple-dark text-sm">{u.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-apple-gray hidden sm:table-cell">{u.cedula || '-'}</td>
                    <td className="px-4 py-3 text-sm text-apple-gray hidden md:table-cell">{u.email}</td>
                    <td className="px-4 py-3 text-sm text-apple-gray hidden lg:table-cell">{u.phone}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        u.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {u.role === 'admin' ? 'Admin' : 'Cliente'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-apple-dark hidden md:table-cell">
                      {userOrders.length} ({formatPrice(userOrders.reduce((sum, o) => sum + o.total, 0))})
                    </td>
                    <td className="px-4 py-3 text-sm text-apple-gray hidden xl:table-cell">
                      {new Date(u.createdAt).toLocaleDateString('es-VE')}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ==================== INSTAGRAM PANEL ==================== */
function InstagramPanel() {
  const posts = useInstagramStore((state) => state.posts);
  const updatePost = useInstagramStore((state) => state.updatePost);
  const addPost = useInstagramStore((state) => state.addPost);
  const removePost = useInstagramStore((state) => state.removePost);
  const uploadImage = useProductsStore((state) => state.uploadImage);
  
  const [uploadingId, setUploadingId] = useState<number | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [uploadingNew, setUploadingNew] = useState(false);

  const handleImageUpload = async (postId: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingId(postId);
    try {
      const imageUrl = await uploadImage(file);
      updatePost(postId, imageUrl);
    } catch (error) {
      console.error('Error subiendo imagen:', error);
      alert('Error al subir la imagen. Intenta de nuevo.');
    } finally {
      setUploadingId(null);
    }
  };

  const handleAddPost = async () => {
    if (!newImageUrl.trim()) return;
    
    setUploadingNew(true);
    try {
      addPost(newImageUrl);
      setNewImageUrl('');
      setShowAddForm(false);
    } catch (error) {
      console.error('Error agregando post:', error);
    } finally {
      setUploadingNew(false);
    }
  };

  const handleNewImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingNew(true);
    try {
      const imageUrl = await uploadImage(file);
      setNewImageUrl(imageUrl);
    } catch (error) {
      console.error('Error subiendo imagen:', error);
      alert('Error al subir la imagen. Intenta de nuevo.');
    } finally {
      setUploadingNew(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-apple-dark">Galería de Instagram</h2>
          <p className="text-sm text-apple-gray">Administra las imágenes que se muestran en la sección de Instagram</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 px-5 py-2.5 bg-apple-blue text-white rounded-xl hover:bg-blue-700 transition-colors font-medium text-sm"
        >
          <Plus className="w-4 h-4" />
          Agregar Imagen
        </button>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-6 mb-6 shadow-sm"
        >
          <h3 className="font-semibold text-apple-dark mb-4">Agregar nueva imagen</h3>
          
          {/* URL Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-apple-dark mb-2">URL de imagen</label>
            <input
              type="url"
              value={newImageUrl}
              onChange={(e) => setNewImageUrl(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-apple-blue"
              placeholder="https://ejemplo.com/imagen.jpg"
            />
          </div>

          {/* File Upload */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-apple-dark mb-2">O importar desde tu dispositivo</label>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleNewImageUpload}
                className="hidden"
                id="new-instagram-upload"
              />
              <label
                htmlFor="new-instagram-upload"
                className="flex items-center justify-center gap-2 w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-apple-blue hover:bg-blue-50 transition-all"
              >
                {uploadingNew ? (
                  <>
                    <div className="w-5 h-5 border-2 border-apple-blue border-t-transparent rounded-full animate-spin" />
                    <span className="text-sm text-apple-gray">Subiendo imagen...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 text-apple-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm text-apple-gray">Click para importar imagen</span>
                  </>
                )}
              </label>
            </div>
          </div>

          {/* Preview */}
          {newImageUrl && (
            <div className="mb-4">
              <p className="text-sm font-medium text-apple-dark mb-2">Vista previa:</p>
              <img src={newImageUrl} alt="Preview" className="w-32 h-32 object-cover rounded-xl border-2 border-gray-200" />
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={handleAddPost}
              disabled={!newImageUrl.trim() || uploadingNew}
              className="flex items-center gap-2 px-6 py-3 bg-apple-blue text-white rounded-xl hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-4 h-4" />
              Agregar
            </button>
            <button
              onClick={() => {
                setShowAddForm(false);
                setNewImageUrl('');
              }}
              className="px-6 py-3 border border-gray-200 text-apple-dark rounded-xl hover:bg-gray-50 transition-colors font-medium"
            >
              Cancelar
            </button>
          </div>
        </motion.div>
      )}

      {/* Posts Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-xl overflow-hidden shadow-sm group relative">
            <div className="aspect-square relative">
              <img
                src={post.image}
                alt={`Instagram post ${post.id}`}
                className="w-full h-full object-cover"
              />
              
              {/* Overlay con acciones */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                {/* Upload button */}
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(post.id, e)}
                    className="hidden"
                    id={`upload-${post.id}`}
                  />
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
                    {uploadingId === post.id ? (
                      <div className="w-5 h-5 border-2 border-apple-blue border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Image className="w-5 h-5 text-apple-dark" />
                    )}
                  </div>
                </label>

                {/* Delete button */}
                <button
                  onClick={() => {
                    if (confirm('¿Eliminar esta imagen?')) {
                      removePost(post.id);
                    }
                  }}
                  className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                >
                  <Trash2 className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
            
            {/* Info */}
            <div className="p-3">
              <div className="flex items-center gap-4 text-sm text-apple-gray">
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                  {post.likes}
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                  {post.comments}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {posts.length === 0 && (
        <div className="bg-white rounded-xl p-12 text-center">
          <Instagram className="w-16 h-16 text-apple-gray mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-apple-dark mb-2">No hay imágenes</h3>
          <p className="text-apple-gray">Agrega imágenes para mostrar en la sección de Instagram</p>
        </div>
      )}
    </div>
  );
}

/* ==================== NOTIFICATIONS PANEL ==================== */
function NotificationsPanel() {
  const [notifications, setNotifications] = useState<any[]>([]);

  useState(() => {
    setNotifications(notificationService.getNotificationHistory().reverse());
  });

  const getTypeIcon = (type: string) => {
    if (type === 'whatsapp') return <MessageCircle className="w-4 h-4 text-green-500" />;
    return <Mail className="w-4 h-4 text-apple-blue" />;
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      pending: '⏳ Pendiente',
      confirmed: '✅ Confirmado',
      shipped: '🚚 Enviado',
      delivered: '🎉 Entregado',
      cancelled: '❌ Cancelado',
    };
    return labels[status] || status;
  };

  return (
    <div>
      <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
            <Bell className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-apple-dark">Historial de Notificaciones</h2>
            <p className="text-sm text-apple-gray">Registro de todas las notificaciones enviadas a clientes</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-green-50 rounded-xl p-4">
            <p className="text-sm text-green-600 font-medium">WhatsApp</p>
            <p className="text-2xl font-bold text-green-700">
              {notifications.filter(n => n.type === 'whatsapp').length}
            </p>
          </div>
          <div className="bg-blue-50 rounded-xl p-4">
            <p className="text-sm text-blue-600 font-medium">Email</p>
            <p className="text-2xl font-bold text-blue-700">
              {notifications.filter(n => n.type === 'email').length}
            </p>
          </div>
          <div className="bg-purple-50 rounded-xl p-4">
            <p className="text-sm text-purple-600 font-medium">Total</p>
            <p className="text-2xl font-bold text-purple-700">{notifications.length}</p>
          </div>
        </div>
      </div>

      {/* EmailJS Config Status */}
      <div className={`rounded-xl p-4 mb-6 ${isEmailConfigured() ? 'bg-green-50 border border-green-200' : 'bg-yellow-50 border border-yellow-200'}`}>
        <div className="flex items-center gap-3">
          {isEmailConfigured() ? (
            <CheckCircle className="w-5 h-5 text-green-500" />
          ) : (
            <XCircle className="w-5 h-5 text-yellow-500" />
          )}
          <div>
            <p className={`font-medium ${isEmailConfigured() ? 'text-green-700' : 'text-yellow-700'}`}>
              {isEmailConfigured() ? 'EmailJS configurado correctamente' : 'EmailJS no configurado'}
            </p>
            <p className="text-xs text-apple-gray">
              {isEmailConfigured()
                ? 'Las notificaciones por email se envían automáticamente'
                : 'Configura EmailJS en src/services/notificationService.ts para enviar emails'}
            </p>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-xl overflow-hidden shadow-sm">
        {notifications.length === 0 ? (
          <div className="p-12 text-center">
            <Bell className="w-16 h-16 text-apple-gray mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-semibold text-apple-dark mb-2">Sin notificaciones</h3>
            <p className="text-apple-gray">Las notificaciones aparecerán aquí cuando cambies el estado de un pedido</p>
          </div>
        ) : (
          <div className="divide-y">
            {notifications.map((notification) => (
              <div key={notification.id} className="p-4 flex items-center gap-4 hover:bg-gray-50">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  {getTypeIcon(notification.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm text-apple-dark">
                      Pedido #{notification.orderId}
                    </span>
                    <span className="text-xs text-apple-gray">→</span>
                    <span className="text-sm">{getStatusLabel(notification.status)}</span>
                  </div>
                  <p className="text-xs text-apple-gray">
                    Enviado por {notification.type === 'whatsapp' ? 'WhatsApp' : 'Email'} ·{' '}
                    {new Date(notification.timestamp).toLocaleString('es-VE')}
                  </p>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  notification.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {notification.success ? 'Enviado' : 'Error'}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
