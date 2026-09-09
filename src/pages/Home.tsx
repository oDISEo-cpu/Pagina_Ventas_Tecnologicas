import HeroCarousel from '../components/home/HeroCarousel';
import FeaturedProducts from '../components/home/FeaturedProducts';
import ServicesSection from '../components/home/ServicesSection';
import InstagramGrid from '../components/home/InstagramGrid';
import TestimonialsSection from '../components/home/TestimonialsSection';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Truck, CreditCard, ShieldCheck } from 'lucide-react';

export default function Home() {
  return (
    <div>
      <HeroCarousel />

      {/* Trust badges */}
      <section className="py-8 bg-white dark:bg-gray-900 border-b dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center justify-center gap-3"
            >
              <Truck className="w-6 h-6 text-apple-blue" />
              <span className="text-sm font-medium text-apple-dark dark:text-white">Envíos a toda Venezuela</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-center gap-3"
            >
              <CreditCard className="w-6 h-6 text-apple-blue" />
              <span className="text-sm font-medium text-apple-dark dark:text-white">Múltiples métodos de pago</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center justify-center gap-3"
            >
              <ShieldCheck className="w-6 h-6 text-apple-blue" />
              <span className="text-sm font-medium text-apple-dark dark:text-white">Productos 100% originales</span>
            </motion.div>
          </div>
        </div>
      </section>

      <FeaturedProducts />
      <ServicesSection />

      {/* CTA Banner */}
      <section className="py-16 bg-gradient-to-r from-apple-blue to-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            ¿Buscas algo especial?
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Contáctanos por WhatsApp y te ayudamos a encontrar el producto perfecto para ti. 
            También aceptamos equipos usados como parte de pago.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://wa.me/584148808810?text=¡Hola!%20Quiero%20consultar%20sobre%20un%20producto"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 bg-green-500 text-white font-semibold rounded-full hover:bg-green-600 transition-colors"
            >
              Escribir por WhatsApp
            </a>
            <Link
              to="/products"
              className="px-8 py-3.5 bg-white text-apple-dark font-semibold rounded-full hover:bg-gray-100 transition-colors"
            >
              Ver Catálogo
            </Link>
          </div>
        </div>
      </section>

      <TestimonialsSection />
      <InstagramGrid />
    </div>
  );
}
