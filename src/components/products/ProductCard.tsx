import { motion } from 'framer-motion';
import { ShoppingCart, MessageCircle } from 'lucide-react';
import { Product } from '../../types';
import { formatPrice } from '../../lib/utils';
import { useCartStore } from '../../store/useCartStore';
import { BUSINESS_INFO } from '../../lib/constants';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);

  const handleAddToCart = () => {
    addItem(product);
    openCart();
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(`¡Hola! Me interesa el ${product.name}${product.storage ? ` ${product.storage}` : ''}${product.color ? ` - ${product.color}` : ''}. ¿Está disponible?`);
    window.open(`${BUSINESS_INFO.whatsappLink}?text=${message}`, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="product-card group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
    >
      {/* Image */}
      <div className="relative aspect-square bg-apple-bg overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="product-image w-full h-full object-cover transition-transform duration-500"
        />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {product.condition === 'nuevo' ? (
            <span className="px-2.5 py-1 bg-green-500 text-white text-xs font-medium rounded-full">Nuevo</span>
          ) : (
            <span className="px-2.5 py-1 bg-blue-500 text-white text-xs font-medium rounded-full">Usado</span>
          )}
          {product.originalPrice && (
            <span className="px-2.5 py-1 bg-red-500 text-white text-xs font-medium rounded-full">
              -{Math.round((1 - product.price / product.originalPrice) * 100)}%
            </span>
          )}
        </div>
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="text-white font-semibold text-lg">Agotado</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="mb-2">
          <h3 className="font-semibold text-apple-dark group-hover:text-apple-blue transition-colors line-clamp-1">
            {product.name}
          </h3>
          <div className="flex items-center gap-2 mt-1 text-xs text-apple-gray">
            {product.storage && <span>{product.storage}</span>}
            {product.color && <span>• {product.color}</span>}
          </div>
        </div>

        {/* Specs */}
        <div className="flex flex-wrap gap-1 mb-3">
          {product.specs.slice(0, 2).map((spec, i) => (
            <span key={i} className="px-2 py-0.5 bg-gray-100 text-xs text-apple-gray rounded">
              {spec}
            </span>
          ))}
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-xl font-bold text-apple-dark">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="text-sm text-apple-gray line-through">{formatPrice(product.originalPrice)}</span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="flex-1 py-2.5 bg-apple-blue text-white text-sm font-medium rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ShoppingCart className="w-4 h-4" />
            Agregar
          </button>
          <button
            onClick={handleWhatsApp}
            className="py-2.5 px-3 border border-green-500 text-green-600 text-sm font-medium rounded-xl hover:bg-green-50 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
