import { useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import WhatsAppFloat from './components/layout/WhatsAppFloat';
import CartDrawer from './components/cart/CartDrawer';
import Home from './pages/Home';
import Products from './pages/Products';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import MyOrders from './pages/MyOrders';
import AdminDashboard from './pages/admin/AdminDashboard';
import { useProductsStore } from './store/useProductsStore';
import { useOrdersStore } from './store/useOrdersStore';

function AppInitializer({ children }: { children: React.ReactNode }) {
  const initializeProducts = useProductsStore((state) => state.initialize);
  const productsInitialized = useProductsStore((state) => state.initialized);
  const initializeOrders = useOrdersStore((state) => state.initialize);
  const ordersInitialized = useOrdersStore((state) => state.initialized);

  useEffect(() => {
    if (!productsInitialized) {
      initializeProducts();
    }
    if (!ordersInitialized) {
      initializeOrders();
    }
  }, [productsInitialized, ordersInitialized, initializeProducts, initializeOrders]);

  return <>{children}</>;
}

function App() {
  return (
    <HashRouter>
      <AppInitializer>
        <div className="min-h-screen flex flex-col bg-white">
          <Header />
          <CartDrawer />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/my-orders" element={<MyOrders />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
          </main>
          <Footer />
          <WhatsAppFloat />
        </div>
      </AppInitializer>
    </HashRouter>
  );
}

export default App;
