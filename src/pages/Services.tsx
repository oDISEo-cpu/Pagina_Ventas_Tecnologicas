import { motion } from 'framer-motion';
import { Wrench, RefreshCw, Shield, Truck, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BUSINESS_INFO } from '../lib/constants';

const services = [
  {
    icon: Wrench,
    title: "Servicio Técnico Especializado",
    description: "Contamos con técnicos certificados en productos Apple. Realizamos reparaciones de pantallas, baterías, placas base, y más.",
    features: [
      "Reparación de pantallas iPhone/iPad",
      "Cambio de baterías originales",
      "Reparación de placa base (microsoldadura)",
      "Diagnóstico gratuito",
      "Servicio express en el día",
      "Repuestos 100% originales",
    ],
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    icon: RefreshCw,
    title: "Retoma de Equipos Usados",
    description: "¿Tienes un equipo Apple que ya no usas? Te damos el mejor valor de retoma para que actualices a un modelo más reciente.",
    features: [
      "Evaluación gratuita e inmediata",
      "Los mejores precios del mercado",
      "Aceptamos iPhones, iPads y MacBooks",
      "Descuento directo en tu nueva compra",
      "Proceso rápido y transparente",
      "Pago inmediato en efectivo o transferencia",
    ],
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50",
  },
  {
    icon: Shield,
    title: "Garantía en Productos",
    description: "Todos nuestros productos cuentan con garantía. Los equipos nuevos con garantía de fábrica y los usados con nuestra garantía de 3 meses.",
    features: [
      "Garantía de fábrica en productos nuevos",
      "3 meses de garantía en equipos usados",
      "Soporte post-venta personalizado",
      "Cobertura contra defectos de fabricación",
      "Servicio técnico incluido en garantía",
      "Política de cambio flexible",
    ],
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    icon: Truck,
    title: "Envíos Nacionales",
    description: "Enviamos a toda Venezuela con empaque seguro y seguimiento. Tu pedido llega en perfectas condiciones.",
    features: [
      "Cobertura en todo el país",
      "Empaque premium anti-golpes",
      "Seguro de envío incluido",
      "Número de tracking",
      "Entrega en 24-72 horas",
      "Opción de pago contra entrega (ciudades principales)",
    ],
    color: "from-orange-500 to-orange-600",
    bgColor: "bg-orange-50",
  },
];

export default function Services() {
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
            Nuestros Servicios
          </h1>
          <p className="text-apple-gray text-xl max-w-2xl mx-auto">
            En iPhoneLechería no solo vendemos productos. Ofrecemos una experiencia completa 
            con servicios diseñados para ti.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="space-y-12">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`${service.bgColor} rounded-3xl p-8 sm:p-12`}
            >
              <div className="flex flex-col lg:flex-row gap-8 items-start">
                {/* Icon & Title */}
                <div className="flex-1">
                  <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center mb-6`}>
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-apple-dark mb-4">
                    {service.title}
                  </h2>
                  <p className="text-apple-gray text-lg leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Features */}
                <div className="flex-1 w-full">
                  <ul className="space-y-3">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                        <span className="text-apple-dark">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center bg-gradient-to-r from-apple-dark to-gray-800 rounded-3xl p-12"
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            ¿Necesitas alguno de nuestros servicios?
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-xl mx-auto">
            Contáctanos y con gusto te asesoramos. Estamos en Lechería, pero atendemos a toda Venezuela.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={BUSINESS_INFO.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 bg-green-500 text-white font-semibold rounded-full hover:bg-green-600 transition-colors flex items-center gap-2"
            >
              Contactar por WhatsApp
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              to="/contact"
              className="px-8 py-3.5 bg-white/10 text-white font-semibold rounded-full hover:bg-white/20 transition-colors"
            >
              Ver ubicación
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
