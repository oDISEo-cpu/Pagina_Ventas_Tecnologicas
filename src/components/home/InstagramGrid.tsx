import { motion } from 'framer-motion';
import { Instagram, Heart, MessageCircle } from 'lucide-react';
import { BUSINESS_INFO } from '../../lib/constants';

const instagramPosts = [
  { id: 1, image: "https://images.unsplash.com/photo-1696446702183-cbd13d78e1e7?w=400&q=80", likes: 234, comments: 18 },
  { id: 2, image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&q=80", likes: 189, comments: 12 },
  { id: 3, image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&q=80", likes: 312, comments: 25 },
  { id: 4, image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400&q=80", likes: 156, comments: 8 },
  { id: 5, image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400&q=80", likes: 428, comments: 34 },
  { id: 6, image: "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=400&q=80", likes: 267, comments: 21 },
];

export default function InstagramGrid() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Instagram className="w-6 h-6 text-pink-500" />
            <h2 className="text-3xl sm:text-4xl font-bold text-apple-dark">
              Síguenos en Instagram
            </h2>
          </div>
          <p className="text-apple-gray text-lg">
            {BUSINESS_INFO.instagram} • 93.1K seguidores
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          {instagramPosts.map((post, index) => (
            <motion.a
              key={post.id}
              href={BUSINESS_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="relative aspect-square rounded-xl overflow-hidden group"
            >
              <img
                src={post.image}
                alt={`Instagram post ${post.id}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="flex items-center gap-4 text-white">
                  <span className="flex items-center gap-1">
                    <Heart className="w-5 h-5 fill-white" />
                    {post.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-5 h-5 fill-white" />
                    {post.comments}
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        <div className="text-center mt-8">
          <a
            href={BUSINESS_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white font-medium rounded-full hover:opacity-90 transition-opacity"
          >
            <Instagram className="w-5 h-5" />
            Seguir en Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
