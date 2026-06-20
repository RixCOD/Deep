import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { restaurantService } from '../services/api';
import { FaInstagram, FaTwitter, FaFacebook, FaYoutube, FaWhatsapp } from 'react-icons/fa';

export default function Home() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => { fetchRestaurants(); }, []);

  const fetchRestaurants = async () => {
    setLoading(true);
    try {
      const response = await restaurantService.getAllRestaurants(1, 8);
      setRestaurants(response.data.data);
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await restaurantService.searchRestaurants(searchTerm);
      setRestaurants(response.data.data);
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-orange-500/30">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500 cursor-pointer" onClick={() => navigate('/')}>
            DeepDish
          </div>
          <div className="flex items-center gap-6 font-medium text-sm">
            {isAuthenticated ? (
              <>
                <span className="text-gray-400">Hi, {user?.firstName}</span>
                <button onClick={() => navigate('/orders')} className="hover:text-orange-400 transition">Orders</button>
                <button onClick={logout} className="px-5 py-2 rounded-full bg-white/5 hover:bg-white/10 transition">Logout</button>
              </>
            ) : (
              <>
                <button onClick={() => navigate('/login')} className="hover:text-orange-400 transition">Login</button>
                <button onClick={() => navigate('/signup')} className="px-5 py-2 rounded-full bg-orange-600 hover:bg-orange-500 transition">Sign Up</button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header className="relative px-6 py-24 text-center overflow-hidden">
        <div className="absolute inset-0 flex justify-center -z-10 opacity-20">
          <div className="w-[500px] h-[500px] bg-orange-600 rounded-full blur-[128px]"></div>
        </div>
        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight mb-8">
          Cravings, <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">delivered.</span>
        </h1>
        <form onSubmit={handleSearch} className="max-w-xl mx-auto flex gap-2 p-2 bg-white/5 rounded-2xl border border-white/10">
          <input
            type="text"
            className="flex-1 bg-transparent px-4 outline-none text-lg"
            placeholder="Search restaurants or cuisines..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="px-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-orange-500 hover:text-white transition">Search</button>
        </form>
      </header>

      {/* RESTAURANTS GRID */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-10">Popular Restaurants</h2>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => <div key={i} className="h-80 bg-white/5 rounded-3xl animate-pulse" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {restaurants.map((r) => (
              <div key={r._id} onClick={() => navigate(`/restaurant/${r._id}`)} className="group cursor-pointer bg-white/5 rounded-3xl p-4 border border-white/5 hover:border-orange-500/50 transition duration-300">
                <div className="h-48 w-full bg-gray-800 rounded-2xl mb-4 overflow-hidden">
                  <img src={r.image} alt={r.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                </div>
                <h3 className="text-xl font-bold mb-1">{r.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{r.cuisines?.join(', ')}</p>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-yellow-500 font-bold">★ {r.rating}</span>
                  <span className="text-gray-500">{r.deliveryTime} min</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 bg-[#080808] pt-16 pb-8 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

          {/* Brand & Tagline */}
          <div className="space-y-4">
            <div className="text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
              DeepDish
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              Bringing your favorite local flavors to your doorstep. Fast, fresh, and powered by the best tech.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><button onClick={() => navigate('/')} className="hover:text-orange-400 transition">Home</button></li>
              <li><button onClick={() => navigate('/orders')} className="hover:text-orange-400 transition">My Orders</button></li>
              <li><a href="#" className="hover:text-orange-400 transition">Partner With Us</a></li>
              <li><a href="#" className="hover:text-orange-400 transition">FAQs</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#" className="hover:text-orange-400 transition">Help Center</a></li>
              <li><a href="#" className="hover:text-orange-400 transition">Terms of Service</a></li>
              <li><a href="#" className="hover:text-orange-400 transition">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h4 className="font-bold mb-4">Follow Us</h4>
            <div className="flex gap-3">
              {[
                { icon: FaInstagram, label: 'Instagram' },
                { icon: FaTwitter, label: 'Twitter' },
                { icon: FaFacebook, label: 'Facebook' },
                { icon: FaYoutube, label: 'YouTube' },
                { icon: FaWhatsapp, label: 'WhatsApp' }
              ].map((social) => (
                <a
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-orange-600 hover:scale-110 transition-all duration-300"
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="max-w-7xl mx-auto border-t border-white/5 pt-8 text-center text-gray-600 text-xs">
          <p>&copy; 2026 DeepDish Technologies Pvt. Ltd. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}