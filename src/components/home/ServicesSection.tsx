import { motion } from 'framer-motion';
import { Wrench, RefreshCw, Shield, Truck } from 'lucide-react';

const services = [
  {
    icon: Wrench,
    title: "Servicio Técnico",
    description: "Reparación especializada de productos Apple con técnicos certificados y repuestos originales.",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: RefreshCw,
    title: "Retoma de Equipos",
    description: "Recibe el mejor valor por tu equipo usado. Actualízate con nosotros sin complicaciones.",
    color: "bg-green-50 text-green-600",
  },
  {
    icon: Shield,
    title: "Garantía",
    description: "Todos nuestros productos nuevos tienen garantía. Equipos usados con 3 meses de garantía.",
    color: "bg-purple-50 text-purple-600",
  },
  {
    icon: Truck,
    title: "Envíos Nacionales",
    description: "Enviamos a toda Venezuela. Empaque seguro y seguimiento de tu pedido en todo momento.",
    color: "bg-orange-50 text-orange-600",
  },
];

export default function ServicesSection() {
  return (
    <section className="py-20 bg-apple-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-apple-dark mb-3">
            Nuestros Servicios
          </h2>
          <p className="text-apple-gray text-lg">
            Más que una tienda, somos tu aliado tecnológico
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 text-center hover:shadow-lg transition-shadow"
            >
              <div className={`w-14 h-14 ${service.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                <service.icon className="w-7 h-7" />
              </div>
              <h3 className="font-semibold text-apple-dark mb-2">{service.title}</h3>
              <p className="text-sm text-apple-gray leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
