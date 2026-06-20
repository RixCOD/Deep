import React, { useState } from 'react';
import { Search, MapPin, Star, ChevronRight, Utensils, Award, Truck, QrCode } from 'lucide-react';

// --- MOCK DATA ---
const stats = [
  { label: "Restaurants", value: "50,000+" },
  { label: "Cities Covered", value: "120+" },
  { label: "Orders Delivered", value: "10M+" }
];

const restaurants = [
  { id: 1, name: "Spice Route", rating: 4.8, cuisine: "North Indian", price: "₹₹", distance: "2.5 km", image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=400&q=80" },
  { id: 2, name: "The Deep Pan", rating: 4.9, cuisine: "Pizza, Fast Food", price: "₹₹₹", distance: "1.2 km", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=400&q=80" },
  { id: 3, name: "Sushi Zen", rating: 4.6, cuisine: "Japanese, Asian", price: "₹₹₹₹", distance: "5.0 km", image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=400&q=80" },
  { id: 4, name: "Biryani Express", rating: 4.5, cuisine: "Mughlai, Biryani", price: "₹", distance: "3.1 km", image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=400&q=80" }
];

export default function DeepDishWeb() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="font-sans text-gray-800 bg-gray-50 min-h-screen">
      
      {/* --- NAVBAR --- */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <Utensils className="text-red-500 h-8 w-8" />
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-500">
              DeepDish
            </span>
          </div>
          <div className="hidden md:flex space-x-8 font-medium">
            <a href="#browse" className="hover:text-red-500 transition-colors">Order</a>
            <a href="#prime" className="hover:text-red-500 transition-colors">Prime</a>
            <a href="#partner" className="hover:text-red-500 transition-colors">Partner With Us</a>
          </div>
          <button className="bg-red-500 text-white px-5 py-2 rounded-full font-semibold hover:bg-red-600 transition-colors">
            Sign In
          </button>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <header className="relative bg-gradient-to-r from-gray-900 to-gray-800 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 space-y-8 z-10">
            <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight">
              India’s New <br/>
              <span className="text-red-500">Food Discovery</span> App.
            </h1>
            <p className="text-xl text-gray-300">
              Your cravings, delivered hot. Dive into flavor with DeepDish today.
            </p>
            
            {/* Stats */}
            <div className="flex gap-6 pt-4">
              {stats.map((stat, idx) => (
                <div key={idx} className="bg-gray-800/50 p-4 rounded-xl border border-gray-700 backdrop-blur-sm">
                  <div className="text-2xl font-bold text-orange-400">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* QR Code App Download */}
          <div className="lg:w-1/2 mt-12 lg:mt-0 flex justify-center z-10">
            <div className="bg-white text-gray-900 p-8 rounded-3xl shadow-2xl flex flex-col items-center max-w-sm">
              <QrCode className="h-40 w-40 text-gray-800 mb-4" />
              <h3 className="text-2xl font-bold text-center">Get the DeepDish App</h3>
              <p className="text-gray-500 text-center mt-2 mb-6 text-sm">Scan to download and get ₹200 off your first order!</p>
              <div className="flex gap-4 w-full">
                <button className="flex-1 bg-black text-white py-2 rounded-lg font-medium">App Store</button>
                <button className="flex-1 bg-black text-white py-2 rounded-lg font-medium">Google Play</button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* --- RESTAURANT LISTINGS --- */}
      <section id="browse" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold mb-8">Discover top restaurants</h2>
        
        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search for restaurant, cuisine, or a dish..." 
              className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <button className="px-6 py-3 bg-white border border-gray-300 rounded-full font-medium hover:bg-gray-50 shadow-sm">Filters</button>
            <button className="px-6 py-3 bg-white border border-gray-300 rounded-full font-medium hover:bg-gray-50 shadow-sm flex items-center gap-2">
              <MapPin className="h-4 w-4 text-red-500"/> Distance
            </button>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {restaurants.map((rest) => (
            <div key={rest.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow border border-gray-100 group">
              <div className="h-48 overflow-hidden">
                <img src={rest.image} alt={rest.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold truncate pr-2">{rest.name}</h3>
                  <div className="flex items-center bg-green-600 text-white px-2 py-1 rounded text-sm font-bold">
                    {rest.rating} <Star className="h-3 w-3 ml-1" fill="currentColor" />
                  </div>
                </div>
                <p className="text-gray-500 text-sm mb-1">{rest.cuisine}</p>
                <div className="flex justify-between text-sm text-gray-400 mb-4">
                  <span>{rest.price}</span>
                  <span>{rest.distance}</span>
                </div>
                <button className="w-full bg-red-50 text-red-600 font-semibold py-2 rounded-xl hover:bg-red-500 hover:text-white transition-colors">
                  Order Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- PROMOTIONS SECTION --- */}
      <section id="prime" className="bg-red-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-3xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between shadow-lg relative overflow-hidden">
            <div className="z-10 mb-8 md:mb-0">
              <div className="flex items-center gap-2 mb-4">
                <Award className="h-8 w-8 text-yellow-300" />
                <h2 className="text-3xl font-extrabold tracking-tight">DeepDish Prime</h2>
              </div>
              <p className="text-lg text-orange-100 max-w-lg mb-6">
                Get unlimited free deliveries, exclusive 1+1 offers on dining out, and up to 40% off on your favorite restaurants.
              </p>
              <button className="bg-gray-900 text-white px-8 py-3 rounded-full font-bold hover:bg-black transition-colors flex items-center gap-2">
                Join Prime Now <ChevronRight className="h-5 w-5" />
              </button>
            </div>
            {/* Decorative BG element */}
            <div className="absolute right-0 top-0 w-64 h-full opacity-20 transform translate-x-1/4 scale-150">
              <Utensils className="w-full h-full" />
            </div>
          </div>
        </div>
      </section>

      {/* --- PARTNER SECTION --- */}
      <section id="partner" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white border border-gray-200 p-8 rounded-3xl shadow-sm text-center flex flex-col items-center">
            <div className="bg-red-100 p-4 rounded-full mb-6">
              <Utensils className="h-10 w-10 text-red-500" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Partner your Restaurant</h3>
            <p className="text-gray-500 mb-6">Join our supply chain network. Use the upcoming DeepDish Chef app to manage orders effortlessly.</p>
            <button className="mt-auto px-6 py-2 border-2 border-red-500 text-red-500 rounded-full font-semibold hover:bg-red-50 transition-colors">
              Get Started
            </button>
          </div>
          
          <div className="bg-white border border-gray-200 p-8 rounded-3xl shadow-sm text-center flex flex-col items-center">
            <div className="bg-orange-100 p-4 rounded-full mb-6">
              <Truck className="h-10 w-10 text-orange-500" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Ride with DeepDish</h3>
            <p className="text-gray-500 mb-6">Become a delivery partner. Flexible hours, great earnings, and weekly payouts.</p>
            <button className="mt-auto px-6 py-2 border-2 border-orange-500 text-orange-500 rounded-full font-semibold hover:bg-orange-50 transition-colors">
              Sign Up to Deliver
            </button>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 border-b border-gray-800 pb-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Utensils className="text-red-500 h-6 w-6" />
                <span className="text-xl font-bold text-white">DeepDish</span>
              </div>
              <p className="text-sm text-gray-400 max-w-sm">
                Serving food, served deep. Bringing the best local flavors directly to your doorstep.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Admin Portal</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Terms & Conditions</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center text-sm">
            <p>&copy; 2026 DeepDish Technologies. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-white">Twitter</a>
              <a href="#" className="hover:text-white">Instagram</a>
              <a href="#" className="hover:text-white">LinkedIn</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}