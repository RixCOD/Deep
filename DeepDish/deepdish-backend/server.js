require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/database');
const { API_PORT, API_HOST, API_V1 } = require('./config/constants');
const errorHandler = require('./middleware/errorHandler');

// Import Routes
const authRoutes = require('./routes/auth');
const restaurantRoutes = require('./routes/restaurants');
const orderRoutes = require('./routes/orders');
const reviewRoutes = require('./routes/reviews');
const passwordRoutes = require('./routes/password');
const adminRoutes = require('./routes/admin');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: '*',
    credentials: true,
}));

// Request logging
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
});

// Health check
app.get('/health', (req, res) => {
    res.json({ success: true, message: 'Server is running' });
});

// API Routes
app.use(`${API_V1}/auth`, authRoutes);
app.use(`${API_V1}/password`, passwordRoutes);
app.use(`${API_V1}/restaurants`, restaurantRoutes);
app.use(`${API_V1}/orders`, orderRoutes);
app.use(`${API_V1}/reviews`, reviewRoutes);
app.use(`${API_V1}/admin`, adminRoutes);

// 404 Handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found',
    });
});

// Error Handler
app.use(errorHandler);

// Start Server
const startServer = async () => {
    try {
        // Connect to MongoDB
        await connectDB();

        // Listen on all interfaces (0.0.0.0) to allow WiFi access
        app.listen(API_PORT, API_HOST, () => {
            console.log(`\n✓ DeepDish API Server Running`);
            console.log(`  Host: ${API_HOST}`);
            console.log(`  Port: ${API_PORT}`);
            console.log(`  Local: http://localhost:${API_PORT}`);
            console.log(`  Network: http://<your-machine-ip>:${API_PORT}`);
            console.log(`\n✓ API Endpoints:`);
            console.log(`  POST   ${API_V1}/auth/register`);
            console.log(`  POST   ${API_V1}/auth/login`);
            console.log(`  GET    ${API_V1}/restaurants`);
            console.log(`  GET    ${API_V1}/restaurants/:id`);
            console.log(`  GET    ${API_V1}/restaurants/search?q=...`);
        });
    } catch (error) {
        console.error('[Server Error]', error);
        process.exit(1);
    }
};

startServer();

module.exports = app;