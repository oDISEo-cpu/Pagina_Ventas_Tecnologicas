import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { BUSINESS_INFO } from '../../lib/constants';

export default function WhatsAppFloat() {
  return (
    <motion.a
      href={BUSINESS_INFO.whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 200 }}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 hover:scale-110 transition-all group"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="w-7 h-7 text-white" />
      <span className="absolute right-full mr-3 bg-white text-apple-dark text-sm font-medium px-3 py-1.5 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        ¡Escríbenos!
      </span>
    </motion.a>
  );
}
