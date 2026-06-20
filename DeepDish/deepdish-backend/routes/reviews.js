const express = require('express');
const { authMiddleware } = require('../middleware/auth');
const reviewController = require('../controllers/reviewController');

const router = express.Router();

router.post('/', authMiddleware, reviewController.createReview);
router.get('/restaurant/:restaurantId', reviewController.getRestaurantReviews);
router.put('/:id', authMiddleware, reviewController.updateReview);
router.delete('/:id', authMiddleware, reviewController.deleteReview);

module.exports = router;
