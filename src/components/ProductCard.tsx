import React from 'react';
import { ShoppingCart, Star, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const discount = product.discountPrice 
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100) 
    : 0;

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100 overflow-hidden group"
    >
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <Link to={`/product/${product.slug}`}>
          <img 
            src={product.images[0]} 
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            referrerPolicy="no-referrer"
          />
        </Link>
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {discount > 0 && (
            <span className="bg-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded-full">
              -{discount}%
            </span>
          )}
          {product.stock <= 5 && product.stock > 0 && (
            <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full">
              Low Stock
            </span>
          )}
          {product.stock === 0 && (
            <span className="bg-gray-800 text-white text-[10px] font-bold px-2 py-1 rounded-full">
              Out of Stock
            </span>
          )}
        </div>

        {/* Quick Actions */}
        <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-400 hover:text-red-500 hover:bg-white transition-all shadow-sm">
          <Heart size={18} />
        </button>
      </div>

      <div className="p-4">
        <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider mb-1">
          {product.category}
        </p>
        <Link to={`/product/${product.slug}`}>
          <h3 className="font-semibold text-gray-800 line-clamp-2 h-10 mb-2 hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <div className="flex items-center gap-1 mb-3">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={12} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />
            ))}
          </div>
          <span className="text-[10px] text-gray-400">({product.rating})</span>
        </div>

        <div className="flex items-center justify-between mt-auto">
          <div>
            {product.discountPrice ? (
              <div className="flex flex-col">
                <span className="text-lg font-bold text-green-600">Rs. {product.discountPrice}</span>
                <span className="text-xs text-gray-400 line-through">Rs. {product.price}</span>
              </div>
            ) : (
              <span className="text-lg font-bold text-gray-900">Rs. {product.price}</span>
            )}
          </div>
          
          <button
            onClick={() => onAddToCart(product)}
            disabled={product.stock === 0}
            className={`p-3 rounded-xl transition-all ${
              product.stock === 0 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200 active:scale-95'
            }`}
          >
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
