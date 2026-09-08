import { Product } from '../types';

export const products: Product[] = [
  {
    id: 1,
    name: "iPhone 17 Pro Max",
    slug: "iphone-17-pro-max",
    category: "iphones",
    price: 1199,
    storage: "256GB",
    color: "Titanio Natural",
    condition: "nuevo",
    image: "https://images.unsplash.com/photo-1696446702183-cbd13d78e1e7?w=500&q=80",
    specs: ["Chip A19 Pro", "Cámara 48MP", "Pantalla 6.9\"", "5G", "Titanio"],
    description: "El iPhone más potente hasta la fecha con chip A19 Pro y diseño en titanio.",
    inStock: true,
    stockQuantity: 5
  },
  {
    id: 2,
    name: "iPhone 17",
    slug: "iphone-17",
    category: "iphones",
    price: 899,
    storage: "128GB",
    color: "Negro Medianoche",
    condition: "nuevo",
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&q=80",
    specs: ["Chip A19", "Cámara 48MP", "Pantalla 6.1\"", "5G", "USB-C"],
    description: "El nuevo iPhone 17 con rendimiento excepcional y cámara profesional.",
    inStock: true,
    stockQuantity: 8
  },
  {
    id: 3,
    name: "iPhone 16 Pro Max",
    slug: "iphone-16-pro-max",
    category: "iphones",
    price: 950,
    storage: "256GB",
    color: "Titanio Desierto",
    condition: "nuevo",
    image: "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=500&q=80",
    specs: ["Chip A18 Pro", "Cámara 48MP", "Pantalla 6.9\"", "5G", "Botón Camera Control"],
    description: "iPhone 16 Pro Max con el nuevo botón Camera Control y chip A18 Pro.",
    inStock: true,
    stockQuantity: 4
  },
  {
    id: 4,
    name: "iPhone 15 Pro Max",
    slug: "iphone-15-pro-max",
    category: "iphones",
    price: 670,
    originalPrice: 850,
    storage: "256GB",
    color: "Titanio Azul",
    condition: "usado",
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500&q=80",
    specs: ["Chip A17 Pro", "Cámara 48MP", "Dual e-SIM", "Excelente estado", "Batería 92%"],
    description: "Equipo usado certificado, garantía 3 meses. Incluye caja y cargador.",
    inStock: true,
    stockQuantity: 2
  },
  {
    id: 5,
    name: "iPhone 15",
    slug: "iphone-15",
    category: "iphones",
    price: 550,
    originalPrice: 650,
    storage: "128GB",
    color: "Rosa",
    condition: "usado",
    image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=500&q=80",
    specs: ["Chip A16 Bionic", "Cámara 48MP", "Dynamic Island", "USB-C", "Batería 95%"],
    description: "iPhone 15 usado certificado en excelente estado con garantía.",
    inStock: true,
    stockQuantity: 3
  },
  {
    id: 6,
    name: "AirPods Pro 3",
    slug: "airpods-pro-3",
    category: "airpods",
    price: 260,
    condition: "nuevo",
    image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=500&q=80",
    specs: ["Cancelación activa de ruido", "Audio espacial", "USB-C", "Hasta 6hrs batería", "Resistencia al agua"],
    description: "Los AirPods más avanzados con cancelación de ruido adaptativa y audio espacial personalizado.",
    inStock: true,
    stockQuantity: 10
  },
  {
    id: 7,
    name: "AirPods 4",
    slug: "airpods-4",
    category: "airpods",
    price: 130,
    condition: "nuevo",
    image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=500&q=80",
    specs: ["Audio adaptativo", "Chip H2", "USB-C", "Hasta 30hrs con estuche"],
    description: "Los nuevos AirPods 4 con audio adaptativo y diseño renovado.",
    inStock: true,
    stockQuantity: 15
  },
  {
    id: 8,
    name: "MacBook Neo 13\"",
    slug: "macbook-neo-13",
    category: "macbooks",
    price: 800,
    storage: "256GB SSD",
    color: "Gris Espacial",
    condition: "nuevo",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80",
    specs: ["Chip M3", "8GB RAM", "Pantalla Retina", "Hasta 18hrs batería", "MagSafe"],
    description: "Potencia y portabilidad en un solo equipo. Ideal para profesionales.",
    inStock: true,
    stockQuantity: 3
  },
  {
    id: 9,
    name: "MacBook Air M3 15\"",
    slug: "macbook-air-m3-15",
    category: "macbooks",
    price: 1100,
    storage: "512GB SSD",
    color: "Medianoche",
    condition: "nuevo",
    image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500&q=80",
    specs: ["Chip M3", "16GB RAM", "Pantalla Liquid Retina 15\"", "Hasta 18hrs batería"],
    description: "La MacBook Air más grande con pantalla de 15 pulgadas y chip M3.",
    inStock: true,
    stockQuantity: 2
  },
  {
    id: 10,
    name: "MacBook Pro 14\" M4 Pro",
    slug: "macbook-pro-14-m4",
    category: "macbooks",
    price: 1800,
    storage: "512GB SSD",
    color: "Negro Espacial",
    condition: "nuevo",
    image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=500&q=80",
    specs: ["Chip M4 Pro", "24GB RAM", "Pantalla XDR", "Hasta 22hrs batería", "3 puertos Thunderbolt"],
    description: "La MacBook Pro más potente para profesionales exigentes.",
    inStock: true,
    stockQuantity: 1
  },
  {
    id: 11,
    name: "PlayStation 5 Slim",
    slug: "ps5-slim",
    category: "playstation",
    price: 740,
    storage: "1TB",
    condition: "nuevo",
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500&q=80",
    specs: ["Versión Disco", "4K 120Hz", "Ray Tracing", "2 controles DualSense", "SSD 1TB"],
    description: "La nueva generación de gaming con gráficos impresionantes y carga ultrarrápida.",
    inStock: true,
    stockQuantity: 4
  },
  {
    id: 12,
    name: "PlayStation 5 Digital",
    slug: "ps5-digital",
    category: "playstation",
    price: 620,
    storage: "1TB",
    condition: "nuevo",
    image: "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=500&q=80",
    specs: ["Versión Digital", "4K 120Hz", "Ray Tracing", "Control DualSense", "SSD 1TB"],
    description: "PS5 edición digital, sin lector de discos. Todo digital, todo gaming.",
    inStock: true,
    stockQuantity: 3
  },
  {
    id: 13,
    name: "Apple Watch Series 10",
    slug: "apple-watch-series-10",
    category: "accesorios",
    price: 420,
    color: "Titanio Natural",
    condition: "nuevo",
    image: "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=500&q=80",
    specs: ["Pantalla más grande", "Sensor de temperatura", "ECG", "SpO2", "GPS + Cellular"],
    description: "El Apple Watch más avanzado con monitoreo de salud completo.",
    inStock: true,
    stockQuantity: 6
  },
  {
    id: 14,
    name: "Case MagSafe Silicona",
    slug: "case-magsafe-silicona",
    category: "accesorios",
    price: 35,
    color: "Varios colores",
    condition: "nuevo",
    image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=500&q=80",
    specs: ["Compatible MagSafe", "Silicona premium", "Protección contra caídas", "iPhone 15/16/17"],
    description: "Case de silicona premium con compatibilidad MagSafe para tu iPhone.",
    inStock: true,
    stockQuantity: 25
  },
  {
    id: 15,
    name: "Cargador MagSafe 20W",
    slug: "cargador-magsafe-20w",
    category: "accesorios",
    price: 45,
    condition: "nuevo",
    image: "https://images.unsplash.com/photo-1618577608401-46f4a95bd8f3?w=500&q=80",
    specs: ["Carga inalámbrica 15W", "USB-C", "Compatible iPhone 12+", "Alineación magnética"],
    description: "Cargador inalámbrico MagSafe con alineación magnética perfecta.",
    inStock: true,
    stockQuantity: 20
  },
  {
    id: 16,
    name: "iPad Pro M4 11\"",
    slug: "ipad-pro-m4-11",
    category: "accesorios",
    price: 999,
    storage: "256GB",
    color: "Gris Espacial",
    condition: "nuevo",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&q=80",
    specs: ["Chip M4", "Pantalla OLED Ultra Retina XDR", "Apple Pencil Pro", "WiFi 6E", "Face ID"],
    description: "El iPad más potente con pantalla OLED y chip M4 para creatividad sin límites.",
    inStock: true,
    stockQuantity: 3
  },
  {
    id: 17,
    name: "Cable USB-C a Lightning",
    slug: "cable-usb-c-lightning",
    category: "accesorios",
    price: 15,
    condition: "nuevo",
    image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=500&q=80",
    specs: ["1 metro", "Carga rápida", "Datos hasta 480Mbps", "Compatible iPhone/iPad"],
    description: "Cable original de alta calidad para carga rápida y sincronización.",
    inStock: true,
    stockQuantity: 50
  },
  {
    id: 18,
    name: "iPhone 14 Pro",
    slug: "iphone-14-pro",
    category: "iphones",
    price: 480,
    originalPrice: 600,
    storage: "128GB",
    color: "Morado Oscuro",
    condition: "usado",
    image: "https://images.unsplash.com/photo-1663499482523-1c0c1bae4ce1?w=500&q=80",
    specs: ["Chip A16 Bionic", "Dynamic Island", "Cámara 48MP", "Batería 88%", "Siempre encendida"],
    description: "iPhone 14 Pro usado certificado. Dynamic Island y cámara de 48MP.",
    inStock: true,
    stockQuantity: 2
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  if (category === 'all') return products;
  return products.filter(p => p.category === category);
}

export function filterProducts(filters: {
  category?: string;
  condition?: string;
  storage?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
}): Product[] {
  let filtered = [...products];

  if (filters.category && filters.category !== 'all') {
    filtered = filtered.filter(p => p.category === filters.category);
  }
  if (filters.condition && filters.condition !== 'all') {
    filtered = filtered.filter(p => p.condition === filters.condition);
  }
  if (filters.storage) {
    filtered = filtered.filter(p => p.storage?.includes(filters.storage!));
  }
  if (filters.minPrice !== undefined) {
    filtered = filtered.filter(p => p.price >= filters.minPrice!);
  }
  if (filters.maxPrice !== undefined) {
    filtered = filtered.filter(p => p.price <= filters.maxPrice!);
  }
  if (filters.search) {
    const term = filters.search.toLowerCase();
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(term) ||
      p.description.toLowerCase().includes(term) ||
      p.category.toLowerCase().includes(term)
    );
  }

  return filtered;
}
