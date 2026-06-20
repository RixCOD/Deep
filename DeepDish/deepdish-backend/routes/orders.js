const express = require('express');
const { authMiddleware } = require('../middleware/auth');
const orderController = require('../controllers/orderController');

const router = express.Router();

router.post('/', authMiddleware, orderController.createOrder);
router.get('/', authMiddleware, orderController.getUserOrders);
router.get('/:id', authMiddleware, orderController.getOrderById);
router.put('/:id/status', authMiddleware, orderController.updateOrderStatus);
router.put('/:id/cancel', authMiddleware, orderController.cancelOrder);

module.exports = router;
