import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_BASE = 'http://localhost:5000/api/v1';

export default function AdminDashboard() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(false);

  // States
  const [users, setUsers] = useState([]);
  const [chefs, setChefs] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [stats, setStats] = useState({
    totalRestaurants: 0,
    totalUsers: 0,
    totalChefs: 0,
    totalRevenue: 0
  });

  // Form states
  const [showUserForm, setShowUserForm] = useState(false);
  const [showDiscountForm, setShowDiscountForm] = useState(false);
  const [showMenuForm, setShowMenuForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  // Form data
  const [userForm, setUserForm] = useState({
    email: '', firstName: '', lastName: '', phone: '', role: 'customer'
  });
  const [discountForm, setDiscountForm] = useState({
    userId: '', discountAmount: '', discountPercentage: '', description: ''
  });
  const [menuForm, setMenuForm] = useState({
    name: '', price: '', category: 'main', description: '', image: '', isVeg: false, preparationTime: 30
  });

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'admin') navigate('/login');
    else loadAllData();
  }, [isAuthenticated, user, navigate]);

  const loadAllData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };

      const [usersRes, chefsRes, restaurantsRes] = await Promise.all([
        axios.get(`${API_BASE}/admin/users`, { headers }),
        axios.get(`${API_BASE}/admin/chefs`, { headers }),
        axios.get(`${API_BASE}/restaurants`, { headers })
      ]);

      setUsers(usersRes.data.data || []);
      setChefs(chefsRes.data.data || []);
      setRestaurants(restaurantsRes.data.data || []);
      setStats({
        totalRestaurants: restaurantsRes.data.data?.length || 0,
        totalUsers: usersRes.data.data?.length || 0,
        totalChefs: chefsRes.data.data?.length || 0,
        totalRevenue: 45230
      });
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  // ========================
  // USER MANAGEMENT
  // ========================

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_BASE}/admin/users`, userForm, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert(`User created! Temp password: ${response.data.tempPassword}`);
      setUserForm({ email: '', firstName: '', lastName: '', phone: '', role: 'customer' });
      setShowUserForm(false);
      loadAllData();
    } catch (error) {
      alert(error.response?.data?.message || 'Error adding user');
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_BASE}/admin/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('User deleted successfully');
      loadAllData();
    } catch (error) {
      alert(error.response?.data?.message || 'Error deleting user');
    }
  };

  // ========================
  // DISCOUNT MANAGEMENT
  // ========================

  const handleGiveDiscount = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${API_BASE}/admin/discount`, discountForm, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Discount applied successfully');
      setDiscountForm({ userId: '', discountAmount: '', discountPercentage: '', description: '' });
      setShowDiscountForm(false);
      loadAllData();
    } catch (error) {
      alert(error.response?.data?.message || 'Error applying discount');
    }
  };

  // ========================
  // CHEF VERIFICATION
  // ========================

  const handleVerifyChef = async (chefId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${API_BASE}/admin/chefs/${chefId}/verify`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Chef verified successfully');
      loadAllData();
    } catch (error) {
      alert(error.response?.data?.message || 'Error verifying chef');
    }
  };

  const handleRejectChef = async (chefId) => {
    if (!window.confirm('Are you sure you want to reject this chef?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${API_BASE}/admin/chefs/${chefId}/reject`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Chef rejected');
      loadAllData();
    } catch (error) {
      alert(error.response?.data?.message || 'Error rejecting chef');
    }
  };

  // ========================
  // MENU MANAGEMENT
  // ========================

  const handleAddMenuItem = async (e) => {
    e.preventDefault();
    if (!selectedRestaurant) {
      alert('Please select a restaurant');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${API_BASE}/admin/menu/${selectedRestaurant._id}`, menuForm, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Menu item added successfully');
      setMenuForm({ name: '', price: '', category: 'main', description: '', image: '', isVeg: false, preparationTime: 30 });
      setShowMenuForm(false);
      loadAllData();
    } catch (error) {
      alert(error.response?.data?.message || 'Error adding menu item');
    }
  };

  // ========================
  // UI COMPONENTS
  // ========================

  const StatCard = ({ icon, label, value, color }) => (
    <div className="bg-white rounded-lg shadow p-6 border-l-4" style={{ borderColor: color }}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm">{label}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
        </div>
        <div className="text-4xl">{icon}</div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 w-64 h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-6 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-8">🍕 DeepDish Admin</h1>

        <nav className="space-y-2">
          {[
            { id: 'overview', label: 'Overview', icon: '📊' },
            { id: 'users', label: 'Users', icon: '👥' },
            { id: 'chefs', label: 'Chefs', icon: '👨‍🍳' },
            { id: 'restaurants', label: 'Restaurants', icon: '🏪' },
            { id: 'discounts', label: 'Discounts', icon: '🏷️' },
            { id: 'menus', label: 'Menus', icon: '📋' }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full text-left px-4 py-3 rounded-lg transition ${activeTab === item.id
                ? 'bg-orange-600'
                : 'hover:bg-gray-700'
                }`}
            >
              {item.icon} {item.label}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-6 left-6 right-6 bg-gray-800 rounded-lg p-4">
          <p className="text-sm text-gray-400">Logged in as</p>
          <p className="text-white font-semibold">{user?.firstName || 'Admin'}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Admin Dashboard</h2>
          <p className="text-gray-600 mt-2">Welcome back, {user?.firstName}!</p>
        </div>

        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard icon="🏪" label="Total Restaurants" value={stats.totalRestaurants} color="#FF6B6B" />
              <StatCard icon="👥" label="Total Users" value={stats.totalUsers} color="#4ECDC4" />
              <StatCard icon="👨‍🍳" label="Total Chefs" value={stats.totalChefs} color="#95E1D3" />
              <StatCard icon="💰" label="Total Revenue" value={`$${stats.totalRevenue}`} color="#FFE66D" />
            </div>
          </div>
        )}

        {/* USERS TAB */}
        {activeTab === 'users' && (
          <div>
            <button
              onClick={() => setShowUserForm(!showUserForm)}
              className="mb-6 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              ➕ Add New User
            </button>

            {showUserForm && (
              <div className="bg-white rounded-lg shadow p-6 mb-6">
                <h3 className="text-lg font-bold mb-4">Add New User</h3>
                <form onSubmit={handleAddUser} className="space-y-4">
                  <input
                    type="email"
                    placeholder="Email"
                    value={userForm.email}
                    onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                    required
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="First Name"
                    value={userForm.firstName}
                    onChange={(e) => setUserForm({ ...userForm, firstName: e.target.value })}
                    required
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={userForm.lastName}
                    onChange={(e) => setUserForm({ ...userForm, lastName: e.target.value })}
                    required
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                  <input
                    type="phone"
                    placeholder="Phone"
                    value={userForm.phone}
                    onChange={(e) => setUserForm({ ...userForm, phone: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                  <select
                    value={userForm.role}
                    onChange={(e) => setUserForm({ ...userForm, role: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                  >
                    <option value="customer">Customer</option>
                    <option value="chef">Chef</option>
                    <option value="delivery">Delivery</option>
                  </select>
                  <button type="submit" className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Create User
                  </button>
                </form>
              </div>
            )}

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-bold">Name</th>
                    <th className="px-6 py-3 text-left text-sm font-bold">Email</th>
                    <th className="px-6 py-3 text-left text-sm font-bold">Role</th>
                    <th className="px-6 py-3 text-left text-sm font-bold">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-bold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(u => (
                    <tr key={u._id} className="border-t hover:bg-gray-50">
                      <td className="px-6 py-3">{u.firstName} {u.lastName}</td>
                      <td className="px-6 py-3">{u.email}</td>
                      <td className="px-6 py-3 capitalize">{u.role}</td>
                      <td className="px-6 py-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${u.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {u.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-3">
                        <button
                          onClick={() => handleDeleteUser(u._id)}
                          className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* CHEFS TAB */}
        {activeTab === 'chefs' && (
          <div>
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-bold">Name</th>
                    <th className="px-6 py-3 text-left text-sm font-bold">Email</th>
                    <th className="px-6 py-3 text-left text-sm font-bold">Verified</th>
                    <th className="px-6 py-3 text-left text-sm font-bold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {chefs.map(chef => (
                    <tr key={chef._id} className="border-t hover:bg-gray-50">
                      <td className="px-6 py-3">{chef.firstName} {chef.lastName}</td>
                      <td className="px-6 py-3">{chef.email}</td>
                      <td className="px-6 py-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${chef.isVerified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          {chef.isVerified ? '✓ Verified' : '⏳ Pending'}
                        </span>
                      </td>
                      <td className="px-6 py-3 space-x-2">
                        {!chef.isVerified && (
                          <button
                            onClick={() => handleVerifyChef(chef._id)}
                            className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                          >
                            Verify
                          </button>
                        )}
                        <button
                          onClick={() => handleRejectChef(chef._id)}
                          className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* DISCOUNTS TAB */}
        {activeTab === 'discounts' && (
          <div>
            <button
              onClick={() => setShowDiscountForm(!showDiscountForm)}
              className="mb-6 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              🏷️ Give Discount
            </button>

            {showDiscountForm && (
              <div className="bg-white rounded-lg shadow p-6 mb-6">
                <h3 className="text-lg font-bold mb-4">Give Discount to User</h3>
                <form onSubmit={handleGiveDiscount} className="space-y-4">
                  <select
                    value={discountForm.userId}
                    onChange={(e) => setDiscountForm({ ...discountForm, userId: e.target.value })}
                    required
                    className="w-full px-4 py-2 border rounded-lg"
                  >
                    <option value="">Select User</option>
                    {users.map(u => (
                      <option key={u._id} value={u._id}>
                        {u.firstName} {u.lastName} ({u.email})
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    placeholder="Discount Amount ($)"
                    value={discountForm.discountAmount}
                    onChange={(e) => setDiscountForm({ ...discountForm, discountAmount: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                  <input
                    type="number"
                    placeholder="Discount Percentage (%)"
                    value={discountForm.discountPercentage}
                    onChange={(e) => setDiscountForm({ ...discountForm, discountPercentage: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Description (e.g., Birthday offer)"
                    value={discountForm.description}
                    onChange={(e) => setDiscountForm({ ...discountForm, description: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                  <button type="submit" className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Apply Discount
                  </button>
                </form>
              </div>
            )}
          </div>
        )}

        {/* MENUS TAB */}
        {activeTab === 'menus' && (
          <div>
            <button
              onClick={() => setShowMenuForm(!showMenuForm)}
              className="mb-6 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              📋 Add Menu Item
            </button>

            {showMenuForm && (
              <div className="bg-white rounded-lg shadow p-6 mb-6">
                <h3 className="text-lg font-bold mb-4">Add Menu Item</h3>
                <form onSubmit={handleAddMenuItem} className="space-y-4">
                  <select
                    value={selectedRestaurant?._id || ''}
                    onChange={(e) => {
                      const restaurant = restaurants.find(r => r._id === e.target.value);
                      setSelectedRestaurant(restaurant);
                    }}
                    required
                    className="w-full px-4 py-2 border rounded-lg"
                  >
                    <option value="">Select Restaurant</option>
                    {restaurants.map(r => (
                      <option key={r._id} value={r._id}>
                        {r.name}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    placeholder="Item Name"
                    value={menuForm.name}
                    onChange={(e) => setMenuForm({ ...menuForm, name: e.target.value })}
                    required
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                  <input
                    type="number"
                    placeholder="Price"
                    value={menuForm.price}
                    onChange={(e) => setMenuForm({ ...menuForm, price: e.target.value })}
                    required
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                  <select
                    value={menuForm.category}
                    onChange={(e) => setMenuForm({ ...menuForm, category: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                  >
                    <option value="main">Main Course</option>
                    <option value="appetizer">Appetizer</option>
                    <option value="dessert">Dessert</option>
                    <option value="beverage">Beverage</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Description"
                    value={menuForm.description}
                    onChange={(e) => setMenuForm({ ...menuForm, description: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Image URL"
                    value={menuForm.image}
                    onChange={(e) => setMenuForm({ ...menuForm, image: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={menuForm.isVeg}
                      onChange={(e) => setMenuForm({ ...menuForm, isVeg: e.target.checked })}
                      className="mr-2"
                    />
                    <label>Vegetarian</label>
                  </div>
                  <input
                    type="number"
                    placeholder="Preparation Time (minutes)"
                    value={menuForm.preparationTime}
                    onChange={(e) => setMenuForm({ ...menuForm, preparationTime: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                  <button type="submit" className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Add Item
                  </button>
                </form>
              </div>
            )}

            <div className="grid grid-cols-1 gap-4">
              {restaurants.map(restaurant => (
                <div key={restaurant._id} className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-bold">{restaurant.name}</h3>
                  <p className="text-gray-600">{restaurant.cuisines.join(', ')}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* RESTAURANTS TAB */}
        {activeTab === 'restaurants' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants.map(restaurant => (
              <div key={restaurant._id} className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition">
                <img src={restaurant.image} alt={restaurant.name} className="w-full h-48 object-cover rounded-lg mb-4" />
                <h3 className="text-lg font-bold">{restaurant.name}</h3>
                <p className="text-sm text-gray-600">{restaurant.cuisines.join(', ')}</p>
                <div className="flex justify-between mt-4">
                  <span className="text-yellow-500">⭐ {restaurant.rating}</span>
                  <span className="text-gray-600">{restaurant.deliveryTime}min • ${restaurant.deliveryFee}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
