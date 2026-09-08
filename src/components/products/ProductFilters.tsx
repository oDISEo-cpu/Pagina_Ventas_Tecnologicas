import { motion } from 'framer-motion';
import { SlidersHorizontal, X } from 'lucide-react';
import { CATEGORIES, CONDITIONS, STORAGE_OPTIONS } from '../../lib/constants';

interface ProductFiltersProps {
  category: string;
  condition: string;
  storage: string;
  priceRange: [number, number];
  onCategoryChange: (value: string) => void;
  onConditionChange: (value: string) => void;
  onStorageChange: (value: string) => void;
  onPriceRangeChange: (range: [number, number]) => void;
  onReset: () => void;
}

export default function ProductFilters({
  category,
  condition,
  storage,
  priceRange,
  onCategoryChange,
  onConditionChange,
  onStorageChange,
  onPriceRangeChange,
  onReset,
}: ProductFiltersProps) {
  const hasFilters = category !== 'all' || condition !== 'all' || storage !== '' || priceRange[0] > 0 || priceRange[1] < 2000;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-apple-blue" />
          <h3 className="font-semibold text-apple-dark">Filtros</h3>
        </div>
        {hasFilters && (
          <button
            onClick={onReset}
            className="text-sm text-apple-blue hover:underline flex items-center gap-1"
          >
            <X className="w-3.5 h-3.5" />
            Limpiar
          </button>
        )}
      </div>

      {/* Categories */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-apple-gray mb-3">Categoría</h4>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map(cat => (
            <button
              key={cat.value}
              onClick={() => onCategoryChange(cat.value)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                category === cat.value
                  ? 'bg-apple-blue text-white'
                  : 'bg-gray-100 text-apple-dark hover:bg-gray-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Condition */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-apple-gray mb-3">Condición</h4>
        <div className="flex flex-wrap gap-2">
          {CONDITIONS.map(cond => (
            <button
              key={cond.value}
              onClick={() => onConditionChange(cond.value)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                condition === cond.value
                  ? 'bg-apple-blue text-white'
                  : 'bg-gray-100 text-apple-dark hover:bg-gray-200'
              }`}
            >
              {cond.label}
            </button>
          ))}
        </div>
      </div>

      {/* Storage */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-apple-gray mb-3">Almacenamiento</h4>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onStorageChange('')}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              storage === ''
                ? 'bg-apple-blue text-white'
                : 'bg-gray-100 text-apple-dark hover:bg-gray-200'
            }`}
          >
            Todos
          </button>
          {STORAGE_OPTIONS.map(opt => (
            <button
              key={opt}
              onClick={() => onStorageChange(opt)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                storage === opt
                  ? 'bg-apple-blue text-white'
                  : 'bg-gray-100 text-apple-dark hover:bg-gray-200'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h4 className="text-sm font-medium text-apple-gray mb-3">
          Precio: ${priceRange[0]} - ${priceRange[1]}
        </h4>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-apple-gray">Mínimo</label>
            <input
              type="range"
              min="0"
              max="2000"
              step="50"
              value={priceRange[0]}
              onChange={(e) => onPriceRangeChange([Number(e.target.value), priceRange[1]])}
              className="w-full accent-apple-blue"
            />
          </div>
          <div>
            <label className="text-xs text-apple-gray">Máximo</label>
            <input
              type="range"
              min="0"
              max="2000"
              step="50"
              value={priceRange[1]}
              onChange={(e) => onPriceRangeChange([priceRange[0], Number(e.target.value)])}
              className="w-full accent-apple-blue"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
