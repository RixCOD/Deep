import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';

export default function Signup() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setLoading(true);

        try {
            await register({
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                password: formData.password,
                phone: formData.phone,
            });
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 p-6">
            <div className="w-full max-w-md bg-gray-800 p-8 rounded-2xl border border-gray-700 shadow-2xl">
                <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
                <p className="text-gray-400 mb-6">Join DeepDish for amazing food</p>

                {error && (
                    <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-300">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            <label className="text-gray-300 text-sm mb-1 block">First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                placeholder="John"
                                required
                                className="w-full p-2 bg-gray-700 rounded-lg text-white placeholder-gray-500 border border-gray-600 focus:border-orange-500 focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="text-gray-300 text-sm mb-1 block">Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                placeholder="Doe"
                                required
                                className="w-full p-2 bg-gray-700 rounded-lg text-white placeholder-gray-500 border border-gray-600 focus:border-orange-500 focus:outline-none"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-gray-300 text-sm mb-2 block">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="your@email.com"
                            required
                            className="w-full p-3 bg-gray-700 rounded-lg text-white placeholder-gray-500 border border-gray-600 focus:border-orange-500 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="text-gray-300 text-sm mb-2 block">Phone</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="9876543210"
                            className="w-full p-3 bg-gray-700 rounded-lg text-white placeholder-gray-500 border border-gray-600 focus:border-orange-500 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="text-gray-300 text-sm mb-2 block">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            required
                            className="w-full p-3 bg-gray-700 rounded-lg text-white placeholder-gray-500 border border-gray-600 focus:border-orange-500 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="text-gray-300 text-sm mb-2 block">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="••••••••"
                            required
                            className="w-full p-3 bg-gray-700 rounded-lg text-white placeholder-gray-500 border border-gray-600 focus:border-orange-500 focus:outline-none"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-orange-600 hover:bg-orange-700 py-3 rounded-lg font-bold text-white disabled:opacity-50 transition-colors mt-6"
                    >
                        {loading ? 'Creating Account...' : 'Sign Up'}
                    </button>
                </form>

                <p className="text-gray-400 mt-6 text-center">
                    Already have an account?{' '}
                    <Link to="/login" className="text-orange-500 hover:text-orange-400 font-semibold">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
}