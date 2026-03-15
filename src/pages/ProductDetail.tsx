import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { Star, ShoppingCart, ShieldCheck, Truck, RotateCcw, Plus, Minus } from 'lucide-react';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';

export default function ProductDetail({ onAddToCart, products }: any) {
  const { slug } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const q = query(collection(db, 'products'), where('slug', '==', slug), limit(1));
      const snap = await getDocs(q);
      if (!snap.empty) {
        setProduct({ id: snap.docs[0].id, ...snap.docs[0].data() } as Product);
      }
      setLoading(false);
    };
    fetchProduct();
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) return <div className="h-96 flex items-center justify-center">Loading product...</div>;
  if (!product) return <div className="h-96 flex items-center justify-center">Product not found</div>;

  const relatedProducts = products.filter((p: any) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-square rounded-3xl overflow-hidden bg-gray-50 border border-gray-100">
            <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((img, i) => (
              <div key={i} className="aspect-square rounded-xl overflow-hidden border-2 border-blue-500">
                <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <p className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-2">{product.category}</p>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />
              ))}
            </div>
            <span className="text-sm text-gray-500 font-medium">{product.rating} Rating</span>
            <span className="text-sm text-green-600 font-bold">In Stock ({product.stock})</span>
          </div>

          <div className="mb-8">
            {product.discountPrice ? (
              <div className="flex items-baseline gap-4">
                <span className="text-4xl font-bold text-gray-900">Rs. {product.discountPrice}</span>
                <span className="text-xl text-gray-400 line-through">Rs. {product.price}</span>
                <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-bold">
                  Save {Math.round(((product.price - product.discountPrice) / product.price) * 100)}%
                </span>
              </div>
            ) : (
              <span className="text-4xl font-bold text-gray-900">Rs. {product.price}</span>
            )}
          </div>

          <p className="text-gray-600 leading-relaxed mb-8">
            {product.description}
          </p>

          <div className="flex items-center gap-6 mb-10">
            <div className="flex items-center border-2 border-gray-100 rounded-2xl p-1">
              <button 
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="p-3 hover:bg-gray-50 rounded-xl transition-colors"
              >
                <Minus size={20} />
              </button>
              <span className="px-6 font-bold text-xl">{quantity}</span>
              <button 
                onClick={() => setQuantity(q => q + 1)}
                className="p-3 hover:bg-gray-50 rounded-xl transition-colors"
              >
                <Plus size={20} />
              </button>
            </div>
            
            <button 
              onClick={() => {
                for(let i=0; i<quantity; i++) onAddToCart(product);
                navigate('/cart');
              }}
              className="flex-1 bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 flex items-center justify-center gap-3"
            >
              <ShoppingCart size={24} /> Add to Cart
            </button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-4 pt-8 border-t border-gray-100">
            <div className="flex flex-col items-center text-center gap-2">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-full"><Truck size={20} /></div>
              <span className="text-[10px] font-bold uppercase text-gray-500">Fast Delivery</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <div className="p-3 bg-green-50 text-green-600 rounded-full"><ShieldCheck size={20} /></div>
              <span className="text-[10px] font-bold uppercase text-gray-500">100% Organic</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <div className="p-3 bg-orange-50 text-orange-600 rounded-full"><RotateCcw size={20} /></div>
              <span className="text-[10px] font-bold uppercase text-gray-500">Easy Returns</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p: any) => (
              <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
