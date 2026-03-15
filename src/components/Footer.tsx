import React from 'react';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center mb-6">
              <span className="text-2xl font-bold tracking-tighter">
                <span className="text-blue-500">Arsalan</span>
                <span className="text-green-500">Superstore</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-6">
              Your trusted partner for fresh groceries and household essentials in Kamalia. 
              We bring quality products directly to your doorstep with love and care.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-blue-600 transition-colors"><Facebook size={18} /></a>
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-pink-600 transition-colors"><Instagram size={18} /></a>
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-blue-400 transition-colors"><Twitter size={18} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Quick Links</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/about" className="hover:text-blue-400 transition-colors">About Us</Link></li>
              <li><Link to="/products" className="hover:text-blue-400 transition-colors">All Products</Link></li>
              <li><Link to="/categories" className="hover:text-blue-400 transition-colors">Categories</Link></li>
              <li><Link to="/blog" className="hover:text-blue-400 transition-colors">Latest News</Link></li>
              <li><Link to="/contact" className="hover:text-blue-400 transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Customer Service</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/account" className="hover:text-blue-400 transition-colors">My Account</Link></li>
              <li><Link to="/orders" className="hover:text-blue-400 transition-colors">Track Order</Link></li>
              <li><Link to="/wishlist" className="hover:text-blue-400 transition-colors">Wishlist</Link></li>
              <li><Link to="/faq" className="hover:text-blue-400 transition-colors">FAQs</Link></li>
              <li><Link to="/terms" className="hover:text-blue-400 transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Contact Info</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-blue-500 flex-shrink-0" />
                <span>Main Bazaar, Kamalia, District Toba Tek Singh, Pakistan</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-blue-500 flex-shrink-0" />
                <span>+92 300 1234567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-blue-500 flex-shrink-0" />
                <span>info@arsalansuperstore.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs">
            © 2026 Arsalan Superstore. All rights reserved. Designed for Kamalia with ❤️
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs uppercase tracking-widest font-bold text-gray-500">Payment Methods:</span>
            <div className="flex gap-2">
              <div className="bg-gray-800 px-2 py-1 rounded text-[10px] font-bold">COD</div>
              <div className="bg-gray-800 px-2 py-1 rounded text-[10px] font-bold">JazzCash</div>
              <div className="bg-gray-800 px-2 py-1 rounded text-[10px] font-bold">EasyPaisa</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
