const Review = require('../models/Review');
const Order = require('../models/Order');

exports.createReview = async (req, res) => {
  try {
    const userId = req.user.id;
    const { restaurantId, rating, comment, images } = req.body;

    if (!restaurantId || !rating) {
      return res.status(400).json({
        success: false,
        message: 'Restaurant ID and rating are required'
      });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: 'Rating must be between 1 and 5'
      });
    }

    const userHasOrdered = await Order.findOne({
      userId,
      restaurantId,
      status: 'delivered'
    });

    if (!userHasOrdered) {
      return res.status(400).json({
        success: false,
        message: 'You can only review restaurants you have ordered from'
      });
    }

    const review = new Review({
      userId,
      restaurantId,
      rating,
      comment: comment || '',
      images: images || [],
      createdAt: new Date()
    });

    await review.save();
    await review.populate('userId', 'firstName lastName');

    res.status(201).json({
      success: true,
      message: 'Review created successfully',
      data: review
    });
  } catch (error) {
    console.error('Create review error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create review',
      error: error.message
    });
  }
};

exports.getRestaurantReviews = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const reviews = await Review.find({ restaurantId })
      .populate('userId', 'firstName lastName')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalReviews = await Review.countDocuments({ restaurantId });
    const averageRating = await Review.aggregate([
      { $match: { restaurantId: require('mongoose').Types.ObjectId(restaurantId) } },
      { $group: { _id: null, avg: { $avg: '$rating' } } }
    ]);

    res.status(200).json({
      success: true,
      data: reviews,
      pagination: {
        page,
        limit,
        total: totalReviews,
        pages: Math.ceil(totalReviews / limit)
      },
      averageRating: averageRating[0]?.avg || 0
    });
  } catch (error) {
    console.error('Get reviews error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch reviews',
      error: error.message
    });
  }
};

exports.updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comment, images } = req.body;
    const userId = req.user.id;

    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    if (review.userId.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized'
      });
    }

    if (rating) review.rating = rating;
    if (comment !== undefined) review.comment = comment;
    if (images) review.images = images;
    review.updatedAt = new Date();

    await review.save();

    res.status(200).json({
      success: true,
      message: 'Review updated successfully',
      data: review
    });
  } catch (error) {
    console.error('Update review error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update review',
      error: error.message
    });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    if (review.userId.toString() !== userId && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized'
      });
    }

    await Review.deleteOne({ _id: id });

    res.status(200).json({
      success: true,
      message: 'Review deleted successfully'
    });
  } catch (error) {
    console.error('Delete review error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete review',
      error: error.message
    });
  }
};
