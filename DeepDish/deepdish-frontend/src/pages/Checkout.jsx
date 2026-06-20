import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { orderService } from '../services/api';

export default function Checkout() {
  const { restaurantId } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [deliveryTime, setDeliveryTime] = useState('express');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const savedCart = localStorage.getItem(`cart-${restaurantId}`);
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    } else {
      navigate(`/restaurant/${restaurantId}`);
    }

    if (user) {
      setPhone(user.phone || '');
      setAddress(user.address || '');
    }
  }, [isAuthenticated, restaurantId]);

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = paymentMethod === 'prime' ? 0 : 40;
  const finalTotal = cartTotal + deliveryFee;

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setError('');

    if (!address.trim() || !phone.trim()) {
      setError('Please enter delivery address and phone number');
      return;
    }

    if (cart.length === 0) {
      setError('Your cart is empty');
      return;
    }

    setLoading(true);
    try {
      const orderData = {
        restaurantId,
        items: cart.map((item) => ({
          menuItemId: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        deliveryAddress: address,
        deliveryTime: deliveryTime === 'express' ? new Date(Date.now() + 30 * 60000) : new Date(Date.now() + 60 * 60000),
        totalPrice: finalTotal,
        paymentMethod: paymentMethod === 'COD' ? 'COD' : paymentMethod
      };

      const response = await orderService.createOrder(orderData);

      if (response.data.success) {
        setSuccess(true);
        localStorage.removeItem(`cart-${restaurantId}`);
        setTimeout(() => {
          navigate(`/orders`);
        }, 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* NAVBAR */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
          <button onClick={() => navigate(`/restaurant/${restaurantId}`)} className="text-2xl font-bold text-red-500">
            ← Back
          </button>
          <h1 className="text-2xl font-bold">Checkout</h1>
          <div />
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* FORM */}
          <div className="lg:col-span-2">
            {success && (
              <div className="mb-6 bg-green-100 text-green-800 p-4 rounded-lg text-center">
                <p className="font-bold text-lg">✓ Order Placed Successfully!</p>
                <p>Redirecting to your orders...</p>
              </div>
            )}

            {error && (
              <div className="mb-6 bg-red-100 text-red-800 p-4 rounded-lg">
                {error}
              </div>
            )}

            <form onSubmit={handlePlaceOrder} className="space-y-6">
              {/* DELIVERY ADDRESS */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-bold mb-4">Delivery Address</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block font-semibold mb-2">Address</label>
                    <textarea
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full border rounded px-4 py-3 h-24"
                      placeholder="Enter your delivery address"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full border rounded px-4 py-3"
                      placeholder="Your phone number"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* DELIVERY OPTIONS */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-bold mb-4">Delivery Options</h2>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer p-3 border rounded hover:bg-gray-50">
                    <input
                      type="radio"
                      name="delivery"
                      value="express"
                      checked={deliveryTime === 'express'}
                      onChange={(e) => setDeliveryTime(e.target.value)}
                    />
                    <div className="flex-1">
                      <p className="font-semibold">Express Delivery (30 mins)</p>
                      <p className="text-gray-500 text-sm">Fastest delivery option</p>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer p-3 border rounded hover:bg-gray-50">
                    <input
                      type="radio"
                      name="delivery"
                      value="standard"
                      checked={deliveryTime === 'standard'}
                      onChange={(e) => setDeliveryTime(e.target.value)}
                    />
                    <div className="flex-1">
                      <p className="font-semibold">Standard Delivery (60 mins)</p>
                      <p className="text-gray-500 text-sm">Regular delivery option</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* PAYMENT METHOD */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-bold mb-4">Payment Method</h2>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer p-3 border rounded hover:bg-gray-50">
                    <input
                      type="radio"
                      name="payment"
                      value="COD"
                      checked={paymentMethod === 'COD'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <div className="flex-1">
                      <p className="font-semibold">Cash on Delivery</p>
                      <p className="text-gray-500 text-sm">Pay when order arrives</p>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer p-3 border rounded hover:bg-gray-50">
                    <input
                      type="radio"
                      name="payment"
                      value="prime"
                      checked={paymentMethod === 'prime'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <div className="flex-1">
                      <p className="font-semibold">DeepDish Prime (Free Delivery)</p>
                      <p className="text-gray-500 text-sm">No delivery charges</p>
                    </div>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-red-500 text-white py-4 rounded-lg font-bold text-lg hover:bg-red-600 disabled:bg-gray-400"
              >
                {loading ? 'Placing Order...' : 'Place Order'}
              </button>
            </form>
          </div>

          {/* ORDER SUMMARY */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow sticky top-20">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6 pb-6 border-b">
                {cart.map((item) => (
                  <div key={item._id} className="flex justify-between text-sm">
                    <span>{item.name} x{item.quantity}</span>
                    <span className="font-semibold">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 mb-6 pb-6 border-b">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{cartTotal}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span>₹{deliveryFee}</span>
                </div>
              </div>

              <div className="flex justify-between text-lg font-bold mb-6">
                <span>Total</span>
                <span className="text-red-500">₹{finalTotal}</span>
              </div>

              {paymentMethod === 'prime' && (
                <p className="text-sm text-green-600 font-semibold mb-4">✓ Free delivery with Prime</p>
              )}

              <p className="text-xs text-gray-500 text-center">
                By placing this order, you agree to our terms & conditions
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
