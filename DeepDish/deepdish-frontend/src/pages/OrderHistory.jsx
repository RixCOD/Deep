import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { orderService } from '../services/api';

export default function OrderHistory() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    fetchOrders();
  }, [isAuthenticated]);

  const fetchOrders = async () => {
    try {
      const response = await orderService.getUserOrders();
      setOrders(response.data.data);
    } catch (err) {
      console.error('Failed to fetch orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      preparing: 'bg-purple-100 text-purple-800',
      ready: 'bg-orange-100 text-orange-800',
      out_for_delivery: 'bg-indigo-100 text-indigo-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const filteredOrders = filter === 'all'
    ? orders
    : orders.filter((order) => order.status === filter);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* NAVBAR */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
          <button onClick={() => navigate('/')} className="text-2xl font-bold text-red-500">
            ← DeepDish
          </button>
          <h1 className="text-2xl font-bold">Your Orders</h1>
          <div />
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* FILTERS */}
        <div className="bg-white p-4 rounded-lg shadow mb-8 flex gap-2 overflow-x-auto">
          {['all', 'pending', 'confirmed', 'preparing', 'ready', 'out_for_delivery', 'delivered', 'cancelled'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-full font-semibold whitespace-nowrap transition-colors ${filter === status
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
            >
              {status.replace('_', ' ').toUpperCase()}
            </button>
          ))}
        </div>

        {/* ORDERS LIST */}
        {filteredOrders.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-xl mb-4">No orders found</p>
            <button
              onClick={() => navigate('/')}
              className="bg-red-500 text-white px-6 py-3 rounded-full font-bold hover:bg-red-600"
            >
              Start Ordering
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredOrders.map((order) => (
              <div key={order._id} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setSelectedOrder(selectedOrder?._id === order._id ? null : order)}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold">{order.restaurantId?.name || 'Restaurant'}</h3>
                    <p className="text-gray-600 text-sm">Order #{order._id.slice(-8)}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-bold ${getStatusColor(order.status)}`}>
                    {order.status.replace('_', ' ').toUpperCase()}
                  </span>
                </div>

                <div className="mb-4 pb-4 border-b">
                  <p className="text-gray-600 text-sm">
                    {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString()}
                  </p>
                  <p className="text-gray-600 text-sm">{order.items?.length || 0} items</p>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-red-500">₹{order.totalPrice}</span>
                  <button className="text-red-500 font-semibold hover:underline">
                    View Details →
                  </button>
                </div>

                {/* EXPANDED VIEW */}
                {selectedOrder?._id === order._id && (
                  <div className="mt-6 pt-6 border-t">
                    <h4 className="font-bold mb-3">Order Items</h4>
                    <div className="space-y-2 mb-6">
                      {order.items?.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-sm">
                          <span>{item.name} x{item.quantity}</span>
                          <span>₹{item.price * item.quantity}</span>
                        </div>
                      ))}
                    </div>

                    <h4 className="font-bold mb-3">Delivery Address</h4>
                    <p className="text-gray-600 text-sm mb-6">{order.deliveryAddress}</p>

                    {order.status === 'pending' && (
                      <button className="w-full bg-red-500 text-white py-2 rounded-lg font-bold hover:bg-red-600">
                        Cancel Order
                      </button>
                    )}

                    {order.status === 'delivered' && (
                      <button
                        onClick={() => navigate(`/restaurant/${order.restaurantId?._id}`)}
                        className="w-full bg-blue-500 text-white py-2 rounded-lg font-bold hover:bg-blue-600"
                      >
                        Reorder from this Restaurant
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
