import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { db, auth } from './firebase';
import { collection, onSnapshot, query, where, limit, doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { Product, Category, CartItem } from './types';

// Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import CategoryCard from './components/CategoryCard';
import Footer from './components/Footer';

// Pages
import CartPage from './pages/CartPage';
import ProductDetail from './pages/ProductDetail';
import CategoryPage from './pages/CategoryPage';
import AuthPage from './pages/AuthPage';
import AdminDashboard from './pages/AdminDashboard';
import ErrorBoundary from './components/ErrorBoundary';
const HomePage = ({ products, categories, onAddToCart }: any) => {
  const featuredProducts = products.filter((p: any) => p.isFeatured);
  const topSelling = products.filter((p: any) => p.isTopSelling);

  return (
    <div className="space-y-16 pb-16">
      <Hero />
      
      {/* Featured Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Shop by Category</h2>
            <p className="text-gray-500">Explore our wide range of fresh and quality products</p>
          </div>
          <button className="text-blue-600 font-bold hover:underline">View All</button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat: any) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </section>

      {/* Top Selling Products */}
      <section className="bg-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Top Selling Items</h2>
              <p className="text-gray-500">Most popular choices from our customers in Kamalia</p>
            </div>
            <button className="text-blue-600 font-bold hover:underline">View All</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {topSelling.slice(0, 8).map((product: any) => (
              <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
            <p className="text-gray-500">Handpicked quality items just for you</p>
          </div>
          <button className="text-blue-600 font-bold hover:underline">View All</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.slice(0, 8).map((product: any) => (
            <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
          ))}
        </div>
      </section>

      {/* Suppliers / Trusted Brands */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Trusted Suppliers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center opacity-60 grayscale hover:grayscale-0 transition-all">
            {/* Fake Brand Logos */}
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex justify-center">
                <img 
                  src={`https://picsum.photos/seed/brand${i}/200/100`} 
                  alt="Brand" 
                  className="h-12 object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog / News */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Latest from Arsalan Blog</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Healthy Eating in Summer", date: "May 10, 2026", img: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=800" },
            { title: "Ramzan Grocery Checklist", date: "April 25, 2026", img: "https://images.unsplash.com/photo-1506484334402-40f2dd553f6d?auto=format&fit=crop&q=80&w=800" },
            { title: "5 Tips for Fresh Vegetables", date: "March 15, 2026", img: "https://images.unsplash.com/photo-1518843875459-f738682238a6?auto=format&fit=crop&q=80&w=800" }
          ].map((post, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="rounded-2xl overflow-hidden mb-4 aspect-video">
                <img src={post.img} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
              </div>
              <p className="text-xs font-bold text-blue-600 uppercase mb-2">{post.date}</p>
              <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">{post.title}</h3>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setIsAdmin(userDoc.data().role === 'admin' || user.email === 'raheelahmad2008114@gmail.com');
        } else if (user.email === 'raheelahmad2008114@gmail.com') {
          setIsAdmin(true);
        }
      } else {
        setIsAdmin(false);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Load products
    const qProducts = query(collection(db, 'products'), limit(20));
    const unsubProducts = onSnapshot(qProducts, (snapshot) => {
      const pData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
      setProducts(pData);
      setLoading(false);
    });

    // Load categories
    const unsubCategories = onSnapshot(collection(db, 'categories'), (snapshot) => {
      const cData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Category));
      setCategories(cData);
    });

    // Load cart from local storage
    const savedCart = localStorage.getItem('arsalan_cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }

    return () => {
      unsubProducts();
      unsubCategories();
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('arsalan_cart', JSON.stringify(cart));
  }, [cart]);

  const handleAddToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-blue-600 font-bold animate-pulse">Loading Arsalan Superstore...</p>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <Router>
        <div className="min-h-screen bg-white font-sans text-gray-900">
          <Navbar cartCount={cartCount} isAdmin={isAdmin} />
          
          <main>
            <Routes>
              <Route path="/" element={
                <HomePage 
                  products={products} 
                  categories={categories} 
                  onAddToCart={handleAddToCart} 
                />
              } />
              <Route path="/category/:slug" element={<CategoryPage onAddToCart={handleAddToCart} />} />
              <Route path="/product/:slug" element={<ProductDetail onAddToCart={handleAddToCart} products={products} />} />
              <Route path="/cart" element={<CartPage cart={cart} setCart={setCart} />} />
              <Route path="/checkout" element={
                <div className="max-w-md mx-auto py-20 text-center">
                  <h2 className="text-2xl font-bold mb-4">Checkout</h2>
                  <p className="text-gray-500 mb-8">Checkout is currently being processed via Cash on Delivery.</p>
                  <button onClick={() => {setCart([]); alert('Order Placed Successfully!');}} className="bg-green-600 text-white px-8 py-3 rounded-full font-bold">Confirm Order</button>
                </div>
              } />
              <Route path="/login" element={<AuthPage mode="login" />} />
              <Route path="/register" element={<AuthPage mode="register" />} />
              <Route path="/admin" element={isAdmin ? <AdminDashboard /> : <div className="py-20 text-center">Access Denied</div>} />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </ErrorBoundary>
  );
}
