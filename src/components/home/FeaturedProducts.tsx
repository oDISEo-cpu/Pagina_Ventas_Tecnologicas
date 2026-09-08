import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProductCard from '../products/ProductCard';
import { useProductsStore } from '../../store/useProductsStore';

export default function FeaturedProducts() {
  const products = useProductsStore((state) => state.products);
  const featured = products.filter(p => p.inStock).slice(0, 8);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-apple-dark mb-3">
            Productos Destacados
          </h2>
          <p className="text-apple-gray text-lg max-w-2xl mx-auto">
            Los mejores productos Apple y gaming al mejor precio en Venezuela
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-apple-dark text-white font-medium rounded-full hover:bg-black transition-colors"
          >
            Ver todos los productos
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
