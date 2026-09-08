import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const slides = [
  {
    id: 1,
    title: "iPhone 17 Pro Max",
    subtitle: "El futuro en tus manos. Chip A19 Pro, titanio y cámara de 48MP.",
    cta: "Comprar Ahora",
    link: "/products",
    bg: "from-gray-900 via-gray-800 to-black",
    image: "https://images.unsplash.com/photo-1696446702183-cbd13d78e1e7?w=800&q=80",
  },
  {
    id: 2,
    title: "MacBook Neo 13\"",
    subtitle: "Potencia y portabilidad. Chip M3, hasta 18 horas de batería.",
    cta: "Ver MacBooks",
    link: "/products",
    bg: "from-blue-900 via-blue-800 to-indigo-900",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80",
  },
  {
    id: 3,
    title: "AirPods Pro 3",
    subtitle: "Audio espacial personalizado. Cancelación de ruido adaptativa.",
    cta: "Descubrir",
    link: "/products",
    bg: "from-purple-900 via-purple-800 to-indigo-900",
    image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=800&q=80",
  },
  {
    id: 4,
    title: "PlayStation 5 Slim",
    subtitle: "La nueva generación de gaming. 4K, Ray Tracing y SSD ultrarrápido.",
    cta: "Comprar PS5",
    link: "/products",
    bg: "from-slate-900 via-blue-900 to-slate-800",
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800&q=80",
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const next = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prev = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section
      className="relative h-[500px] sm:h-[600px] lg:h-[700px] overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={slides[current].id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className={`absolute inset-0 bg-gradient-to-br ${slides[current].bg}`}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
              {/* Text */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center lg:text-left flex-1"
              >
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                  {slides[current].title}
                </h1>
                <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-lg">
                  {slides[current].subtitle}
                </p>
                <Link
                  to={slides[current].link}
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-apple-dark font-semibold rounded-full hover:bg-gray-100 transition-colors"
                >
                  {slides[current].cta}
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </motion.div>

              {/* Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="flex-1 max-w-sm lg:max-w-md"
              >
                <img
                  src={slides[current].image}
                  alt={slides[current].title}
                  className="w-full h-auto drop-shadow-2xl"
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-colors"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-colors"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              i === current ? 'bg-white w-8' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
