import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

export default function ChefDashboard() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState([
    { id: 1001, items: ['2x Pizza Margherita', '1x Garlic Bread'], status: 'new', time: '5 min ago' },
    { id: 1002, items: ['1x Pasta Alfredo', '1x Coke'], status: 'preparing', time: '12 min ago' },
    { id: 1003, items: ['3x Tacos', '1x Nachos'], status: 'ready', time: '2 min ago' }
  ]);

  useEffect(() => {
    if (!isAuthenticated) navigate('/login');
  }, [isAuthenticated, navigate]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'new':
        return 'bg-red-100 text-red-800';
      case 'preparing':
        return 'bg-yellow-100 text-yellow-800';
      case 'ready':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'new':
        return '🆕';
      case 'preparing':
        return '👨‍🍳';
      case 'ready':
        return '✅';
      default:
        return '📋';
    }
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* Header */}
      <header className="bg-black/50 backdrop-blur border-b border-white/10 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="text-3xl">👨‍🍳</div>
            <div>
              <h1 className="text-2xl font-bold">DeepDish Kitchen</h1>
              <p className="text-sm text-gray-400">Order Management System</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-300">{user?.name || 'Chef'}</span>
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-white/10">
          {[
            { id: 'orders', label: 'Active Orders', icon: '📋' },
            { id: 'menu', label: 'Menu Management', icon: '🍽️' },
            { id: 'analytics', label: 'Today\'s Summary', icon: '📊' },
            { id: 'settings', label: 'Settings', icon: '⚙️' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 border-b-2 transition ${activeTab === tab.id
                  ? 'border-orange-500 text-orange-400'
                  : 'border-transparent text-gray-400 hover:text-white'
                }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'orders' && (
          <div>
            {/* Order Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              {[
                { label: 'New Orders', count: 5, color: 'from-red-500 to-orange-500' },
                { label: 'Preparing', count: 3, color: 'from-yellow-500 to-orange-500' },
                { label: 'Ready', count: 2, color: 'from-green-500 to-teal-500' },
                { label: 'Completed Today', count: 28, color: 'from-blue-500 to-purple-500' }
              ].map((stat, i) => (
                <div key={i} className={`bg-gradient-to-br ${stat.color} rounded-lg p-6 text-center`}>
                  <p className="text-sm opacity-90 mb-2">{stat.label}</p>
                  <p className="text-4xl font-bold">{stat.count}</p>
                </div>
              ))}
            </div>

            {/* Orders Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {orders.map(order => (
                <div key={order.id} className="bg-gray-800/50 border border-white/10 rounded-lg p-6 hover:border-white/20 transition">
                  {/* Order Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-gray-400 text-sm">Order #</p>
                      <p className="text-2xl font-bold">{order.id}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)} {order.status.toUpperCase()}
                    </span>
                  </div>

                  {/* Items */}
                  <div className="bg-black/30 rounded-lg p-4 mb-4">
                    <p className="text-sm text-gray-400 mb-3">📋 Items</p>
                    <div className="space-y-2">
                      {order.items.map((item, i) => (
                        <div key={i} className="flex items-center gap-2 text-gray-200">
                          <span className="text-orange-400">•</span>
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Time */}
                  <p className="text-sm text-gray-400 mb-4">⏱️ Ordered {order.time}</p>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    {order.status === 'new' && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'preparing')}
                        className="flex-1 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded-lg transition font-semibold"
                      >
                        Start Preparing
                      </button>
                    )}
                    {order.status === 'preparing' && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'ready')}
                        className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition font-semibold"
                      >
                        Mark Ready
                      </button>
                    )}
                    {order.status === 'ready' && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'completed')}
                        className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition font-semibold"
                      >
                        Order Picked Up
                      </button>
                    )}
                    <button className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition">
                      Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'menu' && (
          <div className="bg-gray-800/50 border border-white/10 rounded-lg p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Menu Management</h2>
              <button className="px-4 py-2 bg-orange-600 hover:bg-orange-700 rounded-lg transition">
                + Add Item
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { name: 'Margherita Pizza', price: '$12.99', available: true },
                { name: 'Pasta Alfredo', price: '$10.99', available: true },
                { name: 'Tacos (3)', price: '$8.99', available: false },
                { name: 'Garlic Bread', price: '$4.99', available: true }
              ].map((item, i) => (
                <div key={i} className="bg-gray-900/50 rounded-lg p-4 flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-orange-400 text-sm">{item.price}</p>
                  </div>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      defaultChecked={item.available}
                      className="w-4 h-4 accent-orange-600"
                    />
                    <span className="text-sm">{item.available ? 'Available' : 'Out'}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="bg-gray-800/50 border border-white/10 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Today's Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: 'Total Orders', value: '28', icon: '📋' },
                { label: 'Avg Prep Time', value: '12m', icon: '⏱️' },
                { label: 'Customer Rating', value: '4.8⭐', icon: '⭐' },
                { label: 'Peak Hour', value: '12-1 PM', icon: '📈' }
              ].map((stat, i) => (
                <div key={i} className="bg-gray-900/50 rounded-lg p-6">
                  <p className="text-gray-400 text-sm">{stat.icon} {stat.label}</p>
                  <p className="text-3xl font-bold mt-2">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-gray-800/50 border border-white/10 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Chef Settings</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Kitchen Name</label>
                <input
                  type="text"
                  defaultValue="Main Kitchen"
                  className="w-full bg-gray-900 border border-white/20 rounded-lg px-4 py-2 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Operating Hours</label>
                <input
                  type="text"
                  defaultValue="9:00 AM - 11:00 PM"
                  className="w-full bg-gray-900 border border-white/20 rounded-lg px-4 py-2 text-white"
                />
              </div>
              <button className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition font-semibold">
                Save Changes
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
