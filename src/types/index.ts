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

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  cedula?: string;
  role: 'user' | 'admin';
  createdAt: string;
}

export interface OrderItem {
  product: Product;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  userCedula?: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  paymentMethod: string;
  createdAt: string;
}

export interface Testimonial {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  text: string;
  location: string;
}
