import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

interface CategoryCardProps {
  category: {
    name: string;
    image: string;
    slug: string;
  };
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link to={`/category/${category.slug}`}>
      <motion.div 
        whileHover={{ scale: 1.03 }}
        className="relative group overflow-hidden rounded-2xl aspect-[4/5] bg-gray-100"
      >
        <img 
          src={category.image} 
          alt={category.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
          <h3 className="text-xl font-bold text-white mb-1">{category.name}</h3>
          <p className="text-blue-300 text-sm font-medium flex items-center gap-1">
            Shop Now <span className="group-hover:translate-x-1 transition-transform">→</span>
          </p>
        </div>
      </motion.div>
    </Link>
  );
}
