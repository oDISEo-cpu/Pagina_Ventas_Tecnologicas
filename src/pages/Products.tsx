import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Grid3X3, LayoutList } from 'lucide-react';
import ProductCard from '../components/products/ProductCard';
import ProductFilters from '../components/products/ProductFilters';
import { filterProducts } from '../lib/products';

export default function Products() {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';

  const [category, setCategory] = useState('all');
  const [condition, setCondition] = useState('all');
  const [storage, setStorage] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [search, setSearch] = useState(initialSearch);
  const [gridCols, setGridCols] = useState<3 | 4>(3);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    return filterProducts({
      category,
      condition,
      storage,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      search,
    });
  }, [category, condition, storage, priceRange, search]);

  const handleReset = () => {
    setCategory('all');
    setCondition('all');
    setStorage('');
    setPriceRange([0, 2000]);
    setSearch('');
  };

  return (
    <div className="pt-20 pb-16 min-h-screen bg-apple-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-apple-dark mb-2">
            Nuestros Productos
          </h1>
          <p className="text-apple-gray text-lg">
            Encuentra el producto Apple perfecto para ti
          </p>
        </motion.div>

        {/* Search & Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-apple-gray" />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-apple-blue focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="lg:hidden px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50"
            >
              Filtros
            </button>
            <div className="hidden sm:flex items-center gap-1 bg-white border border-gray-200 rounded-xl p-1">
              <button
                onClick={() => setGridCols(3)}
                className={`p-2 rounded-lg ${gridCols === 3 ? 'bg-apple-blue text-white' : 'text-apple-gray'}`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setGridCols(4)}
                className={`p-2 rounded-lg ${gridCols === 4 ? 'bg-apple-blue text-white' : 'text-apple-gray'}`}
              >
                <LayoutList className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters - Desktop */}
          <div className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-24">
              <ProductFilters
                category={category}
                condition={condition}
                storage={storage}
                priceRange={priceRange}
                onCategoryChange={setCategory}
                onConditionChange={setCondition}
                onStorageChange={setStorage}
                onPriceRangeChange={setPriceRange}
                onReset={handleReset}
              />
            </div>
          </div>

          {/* Mobile Filters */}
          {showMobileFilters && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div className="absolute inset-0 bg-black/50" onClick={() => setShowMobileFilters(false)} />
              <div className="absolute left-0 top-0 bottom-0 w-80 bg-white p-6 overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-lg">Filtros</h3>
                  <button onClick={() => setShowMobileFilters(false)} className="p-2 hover:bg-gray-100 rounded-full">
                    ✕
                  </button>
                </div>
                <ProductFilters
                  category={category}
                  condition={condition}
                  storage={storage}
                  priceRange={priceRange}
                  onCategoryChange={setCategory}
                  onConditionChange={setCondition}
                  onStorageChange={setStorage}
                  onPriceRangeChange={setPriceRange}
                  onReset={handleReset}
                />
              </div>
            </div>
          )}

          {/* Products Grid */}
          <div className="flex-1">
            <p className="text-sm text-apple-gray mb-4">
              {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
            </p>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-apple-gray text-lg">No se encontraron productos con estos filtros.</p>
                <button onClick={handleReset} className="mt-4 text-apple-blue font-medium hover:underline">
                  Limpiar filtros
                </button>
              </div>
            ) : (
              <div className={`grid grid-cols-1 sm:grid-cols-2 ${gridCols === 4 ? 'xl:grid-cols-4' : 'xl:grid-cols-3'} gap-6`}>
                {filteredProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
