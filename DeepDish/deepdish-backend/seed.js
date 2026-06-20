require('dotenv').config();
const mongoose = require('mongoose');
const { connectDB } = require('./config/database');
const Restaurant = require('./models/Restaurant');
const Menu = require('./models/Menu');

const seedRestaurants = async () => {
  try {
    await connectDB();

    const restaurants = [
      {
        name: 'Spice Route',
        description: 'Authentic North Indian Cuisine',
        cuisines: ['North Indian', 'Mughlai'],
        rating: 4.8,
        priceRange: '₹₹',
        image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=400&q=80',
        address: {
          street: '123 Main St',
          city: 'Delhi',
          state: 'Delhi',
          zipCode: '110001',
          latitude: 28.6139,
          longitude: 77.2090,
        },
        phone: '9876543210',
        email: 'spiceroute@deepdish.com',
        deliveryTime: 35,
        deliveryFee: 40,
        minOrderValue: 200,
      },
      {
        name: 'The Deep Pan',
        description: 'Wood-fired Pizza & Italian',
        cuisines: ['Pizza', 'Italian', 'Fast Food'],
        rating: 4.9,
        priceRange: '₹₹₹',
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=400&q=80',
        address: {
          street: '456 Pizza Lane',
          city: 'Bangalore',
          state: 'Karnataka',
          zipCode: '560001',
          latitude: 12.9716,
          longitude: 77.5946,
        },
        phone: '9876543211',
        email: 'deeppan@deepdish.com',
        deliveryTime: 25,
        deliveryFee: 50,
        minOrderValue: 300,
      },
      {
        name: 'Sushi Zen',
        description: 'Premium Japanese & Asian Fusion',
        cuisines: ['Japanese', 'Asian', 'Sushi'],
        rating: 4.6,
        priceRange: '₹₹₹₹',
        image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=400&q=80',
        address: {
          street: '789 Asia Blvd',
          city: 'Mumbai',
          state: 'Maharashtra',
          zipCode: '400001',
          latitude: 19.0760,
          longitude: 72.8777,
        },
        phone: '9876543212',
        email: 'sushizen@deepdish.com',
        deliveryTime: 40,
        deliveryFee: 60,
        minOrderValue: 500,
      },
      {
        name: 'Biryani Express',
        description: 'Authentic Hyderabadi Biryani',
        cuisines: ['Mughlai', 'Biryani', 'Indian'],
        rating: 4.5,
        priceRange: '₹',
        image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=400&q=80',
        address: {
          street: '321 Biryani Street',
          city: 'Hyderabad',
          state: 'Telangana',
          zipCode: '500001',
          latitude: 17.3850,
          longitude: 78.4867,
        },
        phone: '9876543213',
        email: 'biryani@deepdish.com',
        deliveryTime: 30,
        deliveryFee: 30,
        minOrderValue: 150,
      },
      {
        name: 'Burger Haven',
        description: 'Gourmet Burgers & American',
        cuisines: ['American', 'Fast Food', 'Burgers'],
        rating: 4.4,
        priceRange: '₹₹',
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80',
        address: {
          street: '555 Burger Lane',
          city: 'Pune',
          state: 'Maharashtra',
          zipCode: '411001',
          latitude: 18.5204,
          longitude: 73.8567,
        },
        phone: '9876543214',
        email: 'burgerhaven@deepdish.com',
        deliveryTime: 20,
        deliveryFee: 35,
        minOrderValue: 200,
      },
      {
        name: 'Cafe Delight',
        description: 'Healthy Salads & Cafe',
        cuisines: ['Continental', 'Cafe', 'Healthy'],
        rating: 4.7,
        priceRange: '₹₹',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80',
        address: {
          street: '999 Coffee Street',
          city: 'Chennai',
          state: 'Tamil Nadu',
          zipCode: '600001',
          latitude: 13.0827,
          longitude: 80.2707,
        },
        phone: '9876543215',
        email: 'cafedelight@deepdish.com',
        deliveryTime: 20,
        deliveryFee: 25,
        minOrderValue: 150,
      },
      {
        name: 'Thai Express',
        description: 'Authentic Thai Cuisine',
        cuisines: ['Thai', 'Asian', 'Oriental'],
        rating: 4.3,
        priceRange: '₹₹',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80',
        address: {
          street: '111 Thai Lane',
          city: 'Kolkata',
          state: 'West Bengal',
          zipCode: '700001',
          latitude: 22.5726,
          longitude: 88.3639,
        },
        phone: '9876543216',
        email: 'thaiexpress@deepdish.com',
        deliveryTime: 30,
        deliveryFee: 40,
        minOrderValue: 250,
      },
      {
        name: 'Shawarma King',
        description: 'Middle Eastern Shawarma',
        cuisines: ['Middle Eastern', 'Shawarma', 'Fast Food'],
        rating: 4.2,
        priceRange: '₹',
        image: 'https://images.unsplash.com/photo-1618201479367-4cc92037ceb0?auto=format&fit=crop&w=400&q=80',
        address: {
          street: '222 Kebab Street',
          city: 'Jaipur',
          state: 'Rajasthan',
          zipCode: '302001',
          latitude: 26.9124,
          longitude: 75.7873,
        },
        phone: '9876543217',
        email: 'shawarma@deepdish.com',
        deliveryTime: 15,
        deliveryFee: 20,
        minOrderValue: 100,
      },
    ];

    // Clear existing restaurants
    await Restaurant.deleteMany({});

    // Insert new restaurants
    const insertedRestaurants = await Restaurant.insertMany(restaurants);

    console.log(`✓ ${insertedRestaurants.length} restaurants seeded successfully`);

    // Seed menus for each restaurant
    const menus = [];
    for (const restaurant of insertedRestaurants) {
      menus.push({
        restaurant: restaurant._id,
        categories: ['Appetizers', 'Main Course', 'Desserts', 'Beverages'],
        items: generateMenuItems(),
      });
    }

    await Menu.deleteMany({});
    const insertedMenus = await Menu.insertMany(menus);

    console.log(`✓ ${insertedMenus.length} menus seeded successfully`);
    console.log('\n✓ Database seeded successfully!');

    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

function generateMenuItems() {
  return [
    {
      name: 'Samosa (2 pcs)',
      description: 'Crispy pastry filled with potatoes and spices',
      price: 60,
      category: 'Appetizers',
      isVeg: true,
      preparationTime: 10,
    },
    {
      name: 'Paneer Tikka',
      description: 'Marinated cottage cheese grilled to perfection',
      price: 220,
      category: 'Appetizers',
      isVeg: true,
      preparationTime: 20,
    },
    {
      name: 'Chicken Biryani',
      description: 'Fragrant rice cooked with tender chicken',
      price: 280,
      category: 'Main Course',
      isVeg: false,
      preparationTime: 30,
    },
    {
      name: 'Butter Chicken',
      description: 'Tender chicken in creamy tomato sauce',
      price: 320,
      category: 'Main Course',
      isVeg: false,
      preparationTime: 25,
    },
    {
      name: 'Paneer Butter Masala',
      description: 'Cottage cheese in silky tomato sauce',
      price: 250,
      category: 'Main Course',
      isVeg: true,
      preparationTime: 20,
    },
    {
      name: 'Gulab Jamun',
      description: 'Soft milk solids in sugar syrup',
      price: 80,
      category: 'Desserts',
      isVeg: true,
      preparationTime: 5,
    },
    {
      name: 'Mango Lassi',
      description: 'Yogurt-based drink with fresh mango',
      price: 90,
      category: 'Beverages',
      isVeg: true,
      preparationTime: 5,
    },
    {
      name: 'Masala Chai',
      description: 'Traditional Indian spiced tea',
      price: 40,
      category: 'Beverages',
      isVeg: true,
      preparationTime: 5,
    },
  ];
}

seedRestaurants();
