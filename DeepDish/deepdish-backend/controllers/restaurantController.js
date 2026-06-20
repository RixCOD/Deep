const Restaurant = require('../models/Restaurant');
const Menu = require('../models/Menu');

exports.getAllRestaurants = async (req, res) => {
  try {
    const { page = 1, limit = 10, search } = req.query;

    let query = {};
    if (search) {
      query = {
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { cuisines: { $regex: search, $options: 'i' } },
        ],
      };
    }

    const skip = (page - 1) * limit;
    const restaurants = await Restaurant.find(query)
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ rating: -1 });

    const total = await Restaurant.countDocuments(query);

    res.status(200).json({
      success: true,
      data: restaurants,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('[Get Restaurants Error]', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch restaurants',
      error: error.message,
    });
  }
};

exports.getRestaurantById = async (req, res) => {
  try {
    const { id } = req.params;

    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: 'Restaurant not found',
      });
    }

    const menu = await Menu.findOne({ restaurant: id });

    res.status(200).json({
      success: true,
      data: {
        restaurant,
        menu: menu || null,
      },
    });
  } catch (error) {
    console.error('[Get Restaurant By ID Error]', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch restaurant',
      error: error.message,
    });
  }
};

exports.searchRestaurants = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required',
      });
    }

    const restaurants = await Restaurant.find({
      $or: [
        { name: { $regex: q, $options: 'i' } },
        { cuisines: { $regex: q, $options: 'i' } },
        { 'address.city': { $regex: q, $options: 'i' } },
      ],
    })
      .limit(20)
      .sort({ rating: -1 });

    res.status(200).json({
      success: true,
      data: restaurants,
      count: restaurants.length,
    });
  } catch (error) {
    console.error('[Search Restaurants Error]', error);
    res.status(500).json({
      success: false,
      message: 'Search failed',
      error: error.message,
    });
  }
};

exports.getRestaurantsByCity = async (req, res) => {
  try {
    const { city } = req.params;

    const restaurants = await Restaurant.find({
      'address.city': { $regex: city, $options: 'i' },
    }).sort({ rating: -1 });

    res.status(200).json({
      success: true,
      data: restaurants,
      count: restaurants.length,
    });
  } catch (error) {
    console.error('[Get Restaurants By City Error]', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch restaurants',
      error: error.message,
    });
  }
};
