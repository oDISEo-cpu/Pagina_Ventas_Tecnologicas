import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Package, Users, ShoppingBag, Plus, Edit3, Trash2,
  CheckCircle, Clock, Truck, XCircle, Search, DollarSign,
  Image, Save, ArrowLeft, Eye
} from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { useOrdersStore, Order } from '../../store/useOrdersStore';
import { useProductsStore } from '../../store/useProductsStore';
import { formatPrice } from '../../lib/utils';
import { Link, useNavigate } from 'react-router-dom';
import { Product } from '../../types';

type Tab = 'orders' | 'products' | 'users';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const isAdmin = useAuthStore((state) => state.isAdmin);
  const [activeTab, setActiveTab] = useState<Tab>('orders');

  if (!user || !isAdmin()) {
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
              onChange={(e) => onUpdateStatus(order.id, e.target.value as Order['status'])}
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

      {expanded && (
        <div className="px-4 sm:px-6 pb-4 sm:pb-6 border-t pt-4">
          <div className="space-y-3">
            {order.items.map((item, i) => (
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
            <span className="text-apple-gray">Tel: {order.userPhone}</span>
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
  const isEditing = !!product;

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const productData = {
      ...formData,
      specs: formData.specs.split(',').map((s) => s.trim()).filter(Boolean),
      originalPrice: formData.originalPrice || undefined,
    };

    if (isEditing && product) {
      updateProduct(product.id, productData);
    } else {
      addProduct(productData);
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

            {/* Image URL */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-apple-dark mb-2">
                <Image className="w-4 h-4 inline mr-1" />
                URL de Imagen *
              </label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-apple-blue"
                placeholder="https://ejemplo.com/imagen.jpg"
                required
              />
              {formData.image && (
                <div className="mt-3">
                  <img src={formData.image} alt="Preview" className="w-24 h-24 object-cover rounded-xl border" />
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
                <th className="text-left px-4 py-3 text-xs font-medium text-apple-gray uppercase hidden sm:table-cell">Email</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-apple-gray uppercase hidden md:table-cell">Teléfono</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-apple-gray uppercase">Rol</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-apple-gray uppercase hidden md:table-cell">Pedidos</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-apple-gray uppercase hidden lg:table-cell">Registrado</th>
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
                    <td className="px-4 py-3 text-sm text-apple-gray hidden sm:table-cell">{u.email}</td>
                    <td className="px-4 py-3 text-sm text-apple-gray hidden md:table-cell">{u.phone}</td>
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
                    <td className="px-4 py-3 text-sm text-apple-gray hidden lg:table-cell">
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
