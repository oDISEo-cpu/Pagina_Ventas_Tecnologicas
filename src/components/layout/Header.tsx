import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Menu, X, Search, Apple, User, LogOut, Package, Shield, ChevronDown, Sun, Moon } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { useAuthStore } from '../../store/useAuthStore';
import { useThemeStore } from '../../store/useThemeStore';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const itemCount = useCartStore((state) => state.getItemCount());
  const toggleCart = useCartStore((state) => state.toggleCart);
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = [
    { to: '/', label: 'Inicio' },
    { to: '/products', label: 'Productos' },
    { to: '/services', label: 'Servicios' },
    { to: '/contact', label: 'Contacto' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-sm' 
        : 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-full flex items-center justify-center group-hover:scale-105 transition-transform" style={{ background: '#000', border: '2px solid #FFD700', boxShadow: '0 0 8px rgba(255, 215, 0, 0.5)' }}>
              <svg viewBox="0 0 100 100" className="w-5 h-5">
                <path d="M 50,20 C 35,20 22,32 22,48 C 22,64 32,80 42,88 C 46,91 49,92 50,92 C 51,92 54,91 58,88 C 68,80 78,64 78,48 C 78,32 65,20 50,20 Z" fill="white"/>
                <circle cx="68" cy="48" r="10" fill="black"/>
                <path d="M 50,20 C 52,14 56,10 62,8 C 60,14 56,18 50,20 Z" fill="white"/>
                <path d="M 50,20 C 50,16 51,12 52,10 C 51,12 50,16 50,20 Z" fill="white" stroke="white" strokeWidth="1"/>
              </svg>
            </div>
            <span className="font-bold text-lg text-apple-dark dark:text-white hidden sm:block">
              iPhone<span className="text-apple-blue">Lechería</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium transition-colors hover:text-apple-blue ${
                  location.pathname === link.to ? 'text-apple-blue' : 'text-apple-dark dark:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <Search className="w-5 h-5 text-apple-dark dark:text-white" />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Cambiar tema"
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5 text-apple-dark dark:text-white" />
              ) : (
                <Sun className="w-5 h-5 text-yellow-400" />
              )}
            </button>

            {/* Cart */}
            <button
              onClick={toggleCart}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative"
            >
              <ShoppingCart className="w-5 h-5 text-apple-dark dark:text-white" />
              {itemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-apple-blue text-white text-xs rounded-full flex items-center justify-center font-medium"
                >
                  {itemCount}
                </motion.span>
              )}
            </button>

            {/* User Menu */}
            <div className="relative">
              {isAuthenticated && user ? (
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="w-7 h-7 bg-apple-blue rounded-full flex items-center justify-center text-white text-xs font-medium">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <ChevronDown className="w-3 h-3 text-apple-gray hidden sm:block" />
                </button>
              ) : (
                <Link
                  to="/login"
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <User className="w-5 h-5 text-apple-dark dark:text-white" />
                </Link>
              )}

              {/* Dropdown */}
              <AnimatePresence>
                {isUserMenuOpen && isAuthenticated && user && (
                  <motion.div
                    initial={{ opacity: 0, y: -5, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -5, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 py-2 overflow-hidden"
                  >
                    {/* User Info */}
                    <div className="px-4 py-3 border-b dark:border-gray-700">
                      <p className="font-medium text-apple-dark dark:text-white text-sm truncate">{user.name}</p>
                      <p className="text-xs text-apple-gray truncate">{user.email}</p>
                      {user.role === 'admin' && (
                        <span className="inline-block mt-1 px-2 py-0.5 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 text-xs rounded-full font-medium">
                          Administrador
                        </span>
                      )}
                    </div>

                    {/* Menu Items */}
                    <div className="py-1">
                      <Link
                        to="/my-orders"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-apple-dark dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <Package className="w-4 h-4 text-apple-gray" />
                        Mis Pedidos
                      </Link>
                      {user.role === 'admin' && (
                        <Link
                          to="/admin"
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-apple-dark dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                          <Shield className="w-4 h-4 text-purple-500" />
                          Panel Admin
                        </Link>
                      )}
                    </div>

                    {/* Logout */}
                    <div className="border-t dark:border-gray-700 py-1">
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors w-full text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        Cerrar Sesión
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {isMenuOpen ? <X className="w-5 h-5 dark:text-white" /> : <Menu className="w-5 h-5 dark:text-white" />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="pb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-apple-gray" />
                  <input
                    type="text"
                    placeholder="Buscar productos..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && searchQuery) {
                        navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
                        setIsSearchOpen(false);
                        setSearchQuery('');
                      }
                    }}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-apple-blue focus:border-transparent"
                    autoFocus
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 shadow-lg"
          >
            <nav className="px-4 py-4 space-y-1">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === link.to
                      ? 'bg-apple-blue/10 text-apple-blue'
                      : 'text-apple-dark dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              {/* Mobile user links */}
              {isAuthenticated && user && (
                <>
                  <div className="border-t dark:border-gray-800 my-2" />
                  <Link
                    to="/my-orders"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-apple-dark dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <Package className="w-4 h-4" />
                    Mis Pedidos
                  </Link>
                  {user.role === 'admin' && (
                    <Link
                      to="/admin"
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
                    >
                      <Shield className="w-4 h-4" />
                      Panel Admin
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors w-full text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    Cerrar Sesión
                  </button>
                </>
              )}
              {!isAuthenticated && (
                <>
                  <div className="border-t dark:border-gray-800 my-2" />
                  <Link
                    to="/login"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-apple-dark dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <User className="w-4 h-4" />
                    Iniciar Sesión
                  </Link>
                  <Link
                    to="/register"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-apple-blue hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                  >
                    Crear Cuenta
                  </Link>
                </>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
