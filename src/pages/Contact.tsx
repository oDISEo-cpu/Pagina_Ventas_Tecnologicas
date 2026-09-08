import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { MapPin, Phone, Clock, Instagram, Send, MessageCircle, CheckCircle } from 'lucide-react';
import { BUSINESS_INFO } from '../lib/constants';

const contactSchema = z.object({
  name: z.string().min(2, 'El nombre es requerido'),
  phone: z.string().min(10, 'Ingresa un teléfono válido'),
  email: z.string().email('Email inválido').optional().or(z.literal('')),
  message: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres'),
});

type ContactForm = z.infer<typeof contactSchema>;

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (data: ContactForm) => {
    const message = encodeURIComponent(
      `¡Hola iPhoneLechería!\n\nNombre: ${data.name}\nTeléfono: ${data.phone}\nEmail: ${data.email || 'No proporcionado'}\n\nMensaje: ${data.message}`
    );
    window.open(`${BUSINESS_INFO.whatsappLink}?text=${message}`, '_blank');
    setIsSubmitted(true);
    reset();
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <div className="pt-20 pb-16 min-h-screen bg-apple-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-apple-dark mb-4">
            Contáctanos
          </h1>
          <p className="text-apple-gray text-xl max-w-2xl mx-auto">
            Estamos aquí para ayudarte. Visítanos en nuestra tienda o escríbenos por WhatsApp.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-apple-dark mb-6">Envíanos un mensaje</h2>
              
              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <p className="text-green-700 text-sm">¡Mensaje enviado! Te redirigimos a WhatsApp.</p>
                </motion.div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-apple-dark mb-1.5">
                    Nombre completo *
                  </label>
                  <input
                    {...register('name')}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-apple-blue focus:border-transparent"
                    placeholder="Tu nombre"
                  />
                  {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-apple-dark mb-1.5">
                    Teléfono *
                  </label>
                  <input
                    {...register('phone')}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-apple-blue focus:border-transparent"
                    placeholder="0414-0000000"
                  />
                  {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-apple-dark mb-1.5">
                    Email (opcional)
                  </label>
                  <input
                    {...register('email')}
                    type="email"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-apple-blue focus:border-transparent"
                    placeholder="tu@email.com"
                  />
                  {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-apple-dark mb-1.5">
                    Mensaje *
                  </label>
                  <textarea
                    {...register('message')}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-apple-blue focus:border-transparent resize-none"
                    placeholder="¿En qué podemos ayudarte?"
                  />
                  {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-apple-blue text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Enviar mensaje
                </button>
              </form>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Info Cards */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-semibold text-apple-dark mb-4">Información de contacto</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-apple-blue mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-apple-dark">Dirección</p>
                    <p className="text-sm text-apple-gray">{BUSINESS_INFO.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-apple-blue mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-apple-dark">Teléfonos</p>
                    <div className="flex flex-col gap-1">
                      {BUSINESS_INFO.phones.map(phone => (
                        <a key={phone} href={`tel:${phone.replace(/-/g, '')}`} className="text-sm text-apple-blue hover:underline">
                          {phone}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-apple-blue mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-apple-dark">Horario</p>
                    <p className="text-sm text-apple-gray">{BUSINESS_INFO.schedule}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Instagram className="w-5 h-5 text-apple-blue mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-apple-dark">Instagram</p>
                    <a href={BUSINESS_INFO.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-apple-blue hover:underline">
                      {BUSINESS_INFO.instagram}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href={BUSINESS_INFO.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-green-500 rounded-2xl p-6 text-white hover:bg-green-600 transition-colors"
            >
              <div className="flex items-center gap-3 mb-3">
                <MessageCircle className="w-6 h-6" />
                <h3 className="font-semibold text-lg">Escríbenos por WhatsApp</h3>
              </div>
              <p className="text-green-100 text-sm">
                Respuesta inmediata. Consultas, pedidos y soporte técnico.
              </p>
            </a>

            {/* Map */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
              <div className="aspect-video">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3926.5!2d-64.63!3d10.35!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDIxJzAwLjAiTiA2NMKwMzcnNDguMCJX!5e0!3m2!1ses!2sve!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación iPhoneLechería"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
