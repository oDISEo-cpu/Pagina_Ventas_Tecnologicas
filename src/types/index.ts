export interface Product {
  id: number;
  name: string;
  slug: string;
  category: 'iphones' | 'accesorios' | 'macbooks' | 'airpods' | 'playstation';
  price: number;
  originalPrice?: number;
  storage?: string;
  color?: string;
  condition: 'nuevo' | 'usado';
  image: string;
  images?: string[];
  specs: string[];
  description: string;
  inStock: boolean;
  stockQuantity?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Testimonial {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  text: string;
  location: string;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
}
