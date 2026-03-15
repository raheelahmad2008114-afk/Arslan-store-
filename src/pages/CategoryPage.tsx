import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';

export default function CategoryPage({ onAddToCart }: any) {
  const { slug } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      // Map slug back to category name (simplified)
      const catName = slug?.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      
      const q = query(collection(db, 'products'), where('category', '==', catName));
      const snap = await getDocs(q);
      const pData = snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
      setProducts(pData);
      setLoading(false);
    };
    fetchProducts();
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) return <div className="h-96 flex items-center justify-center">Loading products...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-center gap-4 mb-8">
        <Link to="/" className="text-gray-400 hover:text-blue-600">Home</Link>
        <span className="text-gray-300">/</span>
        <h1 className="text-2xl font-bold text-gray-900 capitalize">{slug?.replace(/-/g, ' ')}</h1>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500">No products found in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
          ))}
        </div>
      )}
    </div>
  );
}
