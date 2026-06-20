import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { restaurantService, reviewService } from '../services/api';

export default function RestaurantDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [restaurant, setRestaurant] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('menu');
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: '' });

  useEffect(() => {
    fetchRestaurantDetails();
    fetchReviews();
  }, [id]);

  useEffect(() => {
    const savedCart = localStorage.getItem(`cart-${id}`);
    if (savedCart) setCart(JSON.parse(savedCart));
  }, [id]);

  const fetchRestaurantDetails = async () => {
    try {
      const response = await restaurantService.getRestaurantById(id);
      setRestaurant(response.data.data);
    } catch (err) {
      console.error('Failed to fetch restaurant:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await reviewService.getRestaurantReviews(id);
      setReviews(response.data.data);
    } catch (err) {
      console.error('Failed to fetch reviews:', err);
    }
  };

  const addToCart = (menuItem) => {
    const existing = cart.find((item) => item._id === menuItem._id);
    if (existing) {
      setCart(cart.map((item) =>
        item._id === menuItem._id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...menuItem, quantity: 1 }]);
    }
    localStorage.setItem(`cart-${id}`, JSON.stringify([...cart, menuItem]));
  };

  const removeFromCart = (itemId) => {
    setCart(cart.filter((item) => item._id !== itemId));
  };

  const updateQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
    } else {
      setCart(cart.map((item) =>
        item._id === itemId ? { ...item, quantity } : item
      ));
    }
  };

  const handleSubmitReview = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    try {
      await reviewService.createReview({
        restaurantId: id,
        rating: reviewForm.rating,
        comment: reviewForm.comment
      });
      setReviewForm({ rating: 5, comment: '' });
      setShowReviewForm(false);
      fetchReviews();
    } catch (err) {
      console.error('Failed to submit review:', err);
    }
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (loading) {
    return <div className="bg-gray-50 min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!restaurant) {
    return <div className="bg-gray-50 min-h-screen flex items-center justify-center">Restaurant not found</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* NAVBAR */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
          <button onClick={() => navigate('/')} className="text-2xl font-bold text-red-500">
            ← DeepDish
          </button>
          <div className="text-gray-700">
            {cart.length > 0 && (
              <button
                onClick={() => navigate(`/checkout/${id}`)}
                className="bg-red-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-red-600"
              >
                Cart ({cart.length})
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* RESTAURANT HEADER */}
      <div className="bg-white">
        <img src={restaurant.image} alt={restaurant.name} className="w-full h-96 object-cover" />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">{restaurant.name}</h1>
              <div className="flex gap-4 items-center mb-4">
                <span className="bg-green-600 text-white px-3 py-1 rounded-full font-semibold">{restaurant.rating} ⭐</span>
                <span className="text-gray-600">{restaurant.cuisines?.join(', ')}</span>
                <span className="text-gray-600">{restaurant.priceRange}</span>
              </div>
              <p className="text-gray-600 mb-2">{restaurant.address}</p>
              <p className="text-gray-600">Delivery in {restaurant.deliveryTime || 30} mins</p>
            </div>
          </div>

          {/* TABS */}
          <div className="flex gap-8 border-b">
            <button
              onClick={() => setActiveTab('menu')}
              className={`py-4 font-semibold ${activeTab === 'menu' ? 'border-b-2 border-red-500 text-red-500' : 'text-gray-600'}`}
            >
              Menu
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`py-4 font-semibold ${activeTab === 'reviews' ? 'border-b-2 border-red-500 text-red-500' : 'text-gray-600'}`}
            >
              Reviews
            </button>
            <button
              onClick={() => setActiveTab('info')}
              className={`py-4 font-semibold ${activeTab === 'info' ? 'border-b-2 border-red-500 text-red-500' : 'text-gray-600'}`}
            >
              Info
            </button>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* MENU TAB */}
        {activeTab === 'menu' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* MENU ITEMS */}
            <div className="lg:col-span-2">
              {restaurant.menuCategories && restaurant.menuCategories.map((category) => (
                <div key={category} className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">{category}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {restaurant.menu?.filter((item) => item.category === category).map((item) => (
                      <div key={item._id} className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow">
                        {item.image && <img src={item.image} alt={item.name} className="w-full h-40 object-cover rounded mb-3" />}
                        <h3 className="font-bold text-lg mb-1">{item.name}</h3>
                        <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-bold text-red-500">₹{item.price}</span>
                          <button
                            onClick={() => addToCart(item)}
                            className="bg-red-50 text-red-600 px-4 py-2 rounded-lg font-semibold hover:bg-red-500 hover:text-white transition-colors"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* CART SIDEBAR */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-lg shadow sticky top-20">
                <h2 className="text-xl font-bold mb-4">Your Cart</h2>
                {cart.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">Your cart is empty</p>
                ) : (
                  <>
                    <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                      {cart.map((item) => (
                        <div key={item._id} className="flex justify-between items-center border-b pb-3">
                          <div className="flex-1">
                            <p className="font-semibold text-sm">{item.name}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <button
                                onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                className="text-red-500 font-bold w-6 h-6"
                              >
                                −
                              </button>
                              <span className="w-6 text-center">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                className="text-red-500 font-bold w-6 h-6"
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold">₹{item.price * item.quantity}</p>
                            <button
                              onClick={() => removeFromCart(item._id)}
                              className="text-red-500 text-sm hover:underline"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="border-t pt-4">
                      <div className="flex justify-between mb-4 text-lg font-bold">
                        <span>Total</span>
                        <span>₹{cartTotal}</span>
                      </div>
                      <button
                        onClick={() => navigate(`/checkout/${id}`)}
                        className="w-full bg-red-500 text-white py-3 rounded-lg font-bold hover:bg-red-600 transition-colors"
                      >
                        Proceed to Checkout
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* REVIEWS TAB */}
        {activeTab === 'reviews' && (
          <div className="max-w-3xl">
            {isAuthenticated && (
              <div className="bg-white p-6 rounded-lg shadow mb-8">
                {!showReviewForm ? (
                  <button
                    onClick={() => setShowReviewForm(true)}
                    className="w-full bg-red-500 text-white py-3 rounded-lg font-bold hover:bg-red-600"
                  >
                    Write a Review
                  </button>
                ) : (
                  <div>
                    <h3 className="text-lg font-bold mb-4">Share Your Experience</h3>
                    <div className="mb-4">
                      <label className="block font-semibold mb-2">Rating</label>
                      <select
                        value={reviewForm.rating}
                        onChange={(e) => setReviewForm({ ...reviewForm, rating: parseInt(e.target.value) })}
                        className="w-full border rounded px-3 py-2"
                      >
                        {[5, 4, 3, 2, 1].map((r) => (
                          <option key={r} value={r}>
                            {r} Stars
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-4">
                      <label className="block font-semibold mb-2">Comment</label>
                      <textarea
                        value={reviewForm.comment}
                        onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                        className="w-full border rounded px-3 py-2 h-24"
                        placeholder="Tell us about your experience..."
                      />
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={handleSubmitReview}
                        className="flex-1 bg-red-500 text-white py-2 rounded-lg font-bold hover:bg-red-600"
                      >
                        Submit
                      </button>
                      <button
                        onClick={() => setShowReviewForm(false)}
                        className="flex-1 bg-gray-200 py-2 rounded-lg font-bold hover:bg-gray-300"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="space-y-4">
              {reviews.length === 0 ? (
                <p className="text-center text-gray-500">No reviews yet</p>
              ) : (
                reviews.map((review) => (
                  <div key={review._id} className="bg-white p-4 rounded-lg shadow">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-bold">{review.userId?.firstName} {review.userId?.lastName}</p>
                        <p className="text-yellow-500 text-sm">{'⭐'.repeat(review.rating)}</p>
                      </div>
                      <p className="text-gray-500 text-sm">{new Date(review.createdAt).toLocaleDateString()}</p>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* INFO TAB */}
        {activeTab === 'info' && (
          <div className="max-w-3xl bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-6">Restaurant Information</h2>
            <div className="space-y-4">
              <div>
                <p className="font-semibold text-gray-600">Address</p>
                <p className="text-lg">{restaurant.address}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-600">Phone</p>
                <p className="text-lg">{restaurant.phone || 'Not available'}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-600">Cuisines</p>
                <p className="text-lg">{restaurant.cuisines?.join(', ')}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-600">Delivery Time</p>
                <p className="text-lg">{restaurant.deliveryTime || 30} minutes</p>
              </div>
              <div>
                <p className="font-semibold text-gray-600">Price Range</p>
                <p className="text-lg">{restaurant.priceRange}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
