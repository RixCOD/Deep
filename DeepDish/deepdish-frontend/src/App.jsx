import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import RestaurantList from './pages/RestaurantList';
import RestaurantDetail from './pages/RestaurantDetail';
import Checkout from './pages/Checkout';
import OrderHistory from './pages/OrderHistory';
import Unauthorized from './pages/Unauthorized';
import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';
import ChefDashboard from './pages/ChefDashboard';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/restaurants" element={<RestaurantList />} />
          <Route path="/restaurant/:id" element={<RestaurantDetail />} />
          <Route path="/checkout/:restaurantId" element={<Checkout />} />
          <Route path="/orders" element={<OrderHistory />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/chef" element={<ChefDashboard />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}