import { Link } from 'react-router-dom';
import { Apple, Instagram, Phone, MapPin, Clock, CreditCard } from 'lucide-react';
import { BUSINESS_INFO } from '../../lib/constants';

export default function Footer() {
  return (
    <footer className="bg-apple-dark dark:bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: '#000', border: '2px solid #FFD700', boxShadow: '0 0 8px rgba(255, 215, 0, 0.5)' }}>
                <svg viewBox="0 0 100 100" className="w-5 h-5">
                  <path d="M 50,20 C 35,20 22,32 22,48 C 22,64 32,80 42,88 C 46,91 49,92 50,92 C 51,92 54,91 58,88 C 68,80 78,64 78,48 C 78,32 65,20 50,20 Z" fill="white"/>
                  <circle cx="68" cy="48" r="10" fill="black"/>
                  <path d="M 50,20 C 52,14 56,10 62,8 C 60,14 56,18 50,20 Z" fill="white"/>
                  <path d="M 50,20 C 50,16 51,12 52,10 C 51,12 50,16 50,20 Z" fill="white" stroke="white" strokeWidth="1"/>
                </svg>
              </div>
              <span className="font-bold text-lg">
                iPhone<span className="text-apple-blue">Lechería</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Tu tienda Apple de confianza en Venezuela. Productos originales, garantía y la mejor atención.
            </p>
            <p className="text-gray-500 text-xs">RIF: {BUSINESS_INFO.rif}</p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 text-gray-300">Links Rápidos</h3>
            <ul className="space-y-3">
              {[
                { to: '/', label: 'Inicio' },
                { to: '/products', label: 'Productos' },
                { to: '/services', label: 'Servicios' },
                { to: '/contact', label: 'Contacto' },
              ].map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="text-gray-400 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 text-gray-300">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-apple-blue mt-0.5 shrink-0" />
                <span className="text-gray-400 text-sm">{BUSINESS_INFO.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-apple-blue shrink-0" />
                <a href="tel:+584148808810" className="text-gray-400 hover:text-white text-sm transition-colors">
                  {BUSINESS_INFO.phones[0]}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-apple-blue shrink-0" />
                <span className="text-gray-400 text-sm">{BUSINESS_INFO.schedule}</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Social & Payment */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 text-gray-300">Síguenos</h3>
            <div className="flex gap-3 mb-6">
              <a
                href={BUSINESS_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-apple-blue transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={BUSINESS_INFO.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-green-500 transition-colors"
              >
                <Phone className="w-5 h-5" />
              </a>
              <a
                href={BUSINESS_INFO.linktree}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-apple-blue transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15H9v-2h2v2zm0-4H9V7h2v6zm4 4h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
              </a>
            </div>

            <h3 className="font-semibold text-sm uppercase tracking-wider mb-3 text-gray-300">Métodos de Pago</h3>
            <div className="flex flex-wrap gap-2">
              {BUSINESS_INFO.paymentMethods.map(method => (
                <span key={method} className="inline-flex items-center gap-1 px-2 py-1 bg-white/10 rounded text-xs text-gray-300">
                  <CreditCard className="w-3 h-3" />
                  {method}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © 2024 iPhoneLechería. Todos los derechos reservados.
          </p>
          <p className="text-gray-500 text-xs">
            Lechería, Anzoátegui - Venezuela
          </p>
        </div>
      </div>
    </footer>
  );
}
