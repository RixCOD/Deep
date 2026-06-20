require('dotenv').config();
const mongoose = require('mongoose');
const Restaurant = require('../models/Restaurant');
const Menu = require('../models/Menu');

const seedRestaurants = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/deepdish');
    console.log('✓ Connected to MongoDB');

    // Clear existing data
    await Restaurant.deleteMany({});
    await Menu.deleteMany({});
    console.log('✓ Cleared existing restaurants and menus');

    // High-quality 4K image URLs (using Unsplash with 4K resolution)
    const restaurantData = [
      {
        name: 'Taj Express',
        description: 'Authentic North Indian cuisine with modern twist. Finest quality ingredients sourced daily.',
        cuisines: ['Indian', 'North Indian'],
        rating: 4.7,
        reviewCount: 523,
        priceRange: '₹₹₹',
        image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=2000&q=95',
        address: {
          street: '123 Curry Lane',
          city: 'Mumbai',
          state: 'Maharashtra',
          zipCode: '400001',
          latitude: 19.0760,
          longitude: 72.8777,
        },
        phone: '+91 98765 43210',
        email: 'taj@deepdish.com',
        deliveryTime: 25,
        deliveryFee: 30,
        minOrderValue: 150,
        cuisineType: 'Indian',
        menus: [
          {
            items: [
              {
                name: 'Butter Chicken',
                description: 'Tender chicken in rich tomato cream sauce',
                price: 350,
                image: 'https://images.unsplash.com/photo-1565937281614-7751c3de742d?auto=format&fit=crop&w=2000&q=95',
                category: 'Chicken',
                isVeg: false,
                preparationTime: 20,
              },
              {
                name: 'Paneer Tikka',
                description: 'Marinated cottage cheese grilled to perfection',
                price: 280,
                image: 'https://images.unsplash.com/photo-1631452180519-c01d6461d7e3?auto=format&fit=crop&w=2000&q=95',
                category: 'Paneer',
                isVeg: true,
                preparationTime: 15,
              },
              {
                name: 'Biryani Hyderabadi',
                description: 'Fragrant rice with meat, slow-cooked with spices',
                price: 420,
                image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a104?auto=format&fit=crop&w=2000&q=95',
                category: 'Rice',
                isVeg: false,
                preparationTime: 30,
              },
              {
                name: 'Dal Makhani',
                description: 'Creamy lentils with butter and cream',
                price: 220,
                image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=2000&q=95',
                category: 'Vegetarian',
                isVeg: true,
                preparationTime: 25,
              },
              {
                name: 'Naan & Roti',
                description: 'Freshly baked Indian breads',
                price: 80,
                image: 'https://images.unsplash.com/photo-1599043513145-7867b2b0439d?auto=format&fit=crop&w=2000&q=95',
                category: 'Bread',
                isVeg: true,
                preparationTime: 5,
              },
            ],
            categories: ['Chicken', 'Paneer', 'Rice', 'Vegetarian', 'Bread'],
          },
        ],
      },
      {
        name: 'Pizzeria Napoli',
        description: 'Authentic Italian pizzas with imported ingredients and wood-fired oven.',
        cuisines: ['Italian', 'Continental'],
        rating: 4.8,
        reviewCount: 892,
        priceRange: '₹₹₹',
        image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?auto=format&fit=crop&w=2000&q=95',
        address: {
          street: '456 Pasta Street',
          city: 'Mumbai',
          state: 'Maharashtra',
          zipCode: '400002',
          latitude: 19.0826,
          longitude: 72.8830,
        },
        phone: '+91 98765 43211',
        email: 'pizzeria@deepdish.com',
        deliveryTime: 30,
        deliveryFee: 40,
        minOrderValue: 200,
        cuisineType: 'Italian',
        menus: [
          {
            items: [
              {
                name: 'Margherita Pizza',
                description: 'Classic pizza with fresh mozzarella and basil',
                price: 380,
                image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?auto=format&fit=crop&w=2000&q=95',
                category: 'Pizzas',
                isVeg: true,
                preparationTime: 12,
              },
              {
                name: 'Pepperoni Paradise',
                description: 'Loaded with premium pepperoni and mozzarella',
                price: 450,
                image: 'https://images.unsplash.com/photo-1628840042765-356cda07f4ee?auto=format&fit=crop&w=2000&q=95',
                category: 'Pizzas',
                isVeg: false,
                preparationTime: 12,
              },
              {
                name: 'Alfredo Pasta',
                description: 'Creamy Alfredo sauce with fettuccine',
                price: 320,
                image: 'https://images.unsplash.com/photo-1645112411341-6c4ee32510d9?auto=format&fit=crop&w=2000&q=95',
                category: 'Pasta',
                isVeg: true,
                preparationTime: 15,
              },
              {
                name: 'Carbonara',
                description: 'Traditional Italian pasta with pancetta and cream',
                price: 380,
                image: 'https://images.unsplash.com/photo-1612874742237-6526221fcf4e?auto=format&fit=crop&w=2000&q=95',
                category: 'Pasta',
                isVeg: false,
                preparationTime: 15,
              },
              {
                name: 'Bruschetta Trio',
                description: 'Three flavors of toasted Italian bread',
                price: 220,
                image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?auto=format&fit=crop&w=2000&q=95',
                category: 'Starters',
                isVeg: true,
                preparationTime: 8,
              },
            ],
            categories: ['Pizzas', 'Pasta', 'Starters'],
          },
        ],
      },
      {
        name: 'Spice Dragon',
        description: 'Authentic Chinese and Asian fusion cuisine prepared by expert chefs.',
        cuisines: ['Chinese', 'Asian'],
        rating: 4.6,
        reviewCount: 654,
        priceRange: '₹₹',
        image: 'https://images.unsplash.com/photo-1609501676725-7186f017a4b6?auto=format&fit=crop&w=2000&q=95',
        address: {
          street: '789 Dragon Lane',
          city: 'Mumbai',
          state: 'Maharashtra',
          zipCode: '400003',
          latitude: 19.0595,
          longitude: 72.8295,
        },
        phone: '+91 98765 43212',
        email: 'dragon@deepdish.com',
        deliveryTime: 28,
        deliveryFee: 35,
        minOrderValue: 120,
        cuisineType: 'Chinese',
        menus: [
          {
            items: [
              {
                name: 'Hakka Noodles',
                description: 'Stir-fried noodles with vegetables and soy sauce',
                price: 220,
                image: 'https://images.unsplash.com/photo-1612874742237-6526221fcf4e?auto=format&fit=crop&w=2000&q=95',
                category: 'Noodles',
                isVeg: true,
                preparationTime: 10,
              },
              {
                name: 'Chicken 65',
                description: 'Spicy fried chicken with Indian spices',
                price: 280,
                image: 'https://images.unsplash.com/photo-1609501676725-7186f017a4b6?auto=format&fit=crop&w=2000&q=95',
                category: 'Chicken',
                isVeg: false,
                preparationTime: 12,
              },
              {
                name: 'Manchurian Balls',
                description: 'Crispy cottage cheese balls in tangy sauce',
                price: 240,
                image: 'https://images.unsplash.com/photo-1609501676725-7186f017a4b6?auto=format&fit=crop&w=2000&q=95',
                category: 'Vegetables',
                isVeg: true,
                preparationTime: 10,
              },
              {
                name: 'Kung Pao Chicken',
                description: 'Chicken with peanuts and chili sauce',
                price: 320,
                image: 'https://images.unsplash.com/photo-1609501676725-7186f017a4b6?auto=format&fit=crop&w=2000&q=95',
                category: 'Chicken',
                isVeg: false,
                preparationTime: 12,
              },
              {
                name: 'Spring Rolls',
                description: 'Crispy rolls filled with vegetables and meat',
                price: 180,
                image: 'https://images.unsplash.com/photo-1618164436241-4473940571f2?auto=format&fit=crop&w=2000&q=95',
                category: 'Starters',
                isVeg: false,
                preparationTime: 8,
              },
            ],
            categories: ['Noodles', 'Chicken', 'Vegetables', 'Starters'],
          },
        ],
      },
      {
        name: 'Burger Junction',
        description: 'Premium burgers with fresh ingredients and craft sodas.',
        cuisines: ['American', 'Fast Food'],
        rating: 4.5,
        reviewCount: 423,
        priceRange: '₹₹',
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=2000&q=95',
        address: {
          street: '321 Burger Boulevard',
          city: 'Mumbai',
          state: 'Maharashtra',
          zipCode: '400004',
          latitude: 19.1136,
          longitude: 72.8697,
        },
        phone: '+91 98765 43213',
        email: 'burger@deepdish.com',
        deliveryTime: 20,
        deliveryFee: 25,
        minOrderValue: 100,
        cuisineType: 'American',
        menus: [
          {
            items: [
              {
                name: 'Classic Burger',
                description: 'Juicy beef patty with cheese and fresh toppings',
                price: 250,
                image: 'https://images.unsplash.com/photo-1551028719-00167b16ebc5?auto=format&fit=crop&w=2000&q=95',
                category: 'Burgers',
                isVeg: false,
                preparationTime: 8,
              },
              {
                name: 'Veggie Delight',
                description: 'Grilled vegetable patty with special sauce',
                price: 220,
                image: 'https://images.unsplash.com/photo-1555939594-58d7cb561482?auto=format&fit=crop&w=2000&q=95',
                category: 'Burgers',
                isVeg: true,
                preparationTime: 8,
              },
              {
                name: 'Crispy Fries',
                description: 'Golden crispy fries with seasoning',
                price: 120,
                image: 'https://images.unsplash.com/photo-1573080496104-febf75cf5f4f?auto=format&fit=crop&w=2000&q=95',
                category: 'Sides',
                isVeg: true,
                preparationTime: 5,
              },
              {
                name: 'Chicken Sandwich',
                description: 'Crispy chicken with garlic mayo',
                price: 200,
                image: 'https://images.unsplash.com/photo-1603046891726-36bfd957e2af?auto=format&fit=crop&w=2000&q=95',
                category: 'Sandwiches',
                isVeg: false,
                preparationTime: 7,
              },
              {
                name: 'Milkshake Combo',
                description: 'Thick and creamy milkshakes in various flavors',
                price: 150,
                image: 'https://images.unsplash.com/photo-1555014393-5c0b5c1fb8f5?auto=format&fit=crop&w=2000&q=95',
                category: 'Beverages',
                isVeg: true,
                preparationTime: 3,
              },
            ],
            categories: ['Burgers', 'Sandwiches', 'Sides', 'Beverages'],
          },
        ],
      },
      {
        name: 'Sweet Cravings Bakery',
        description: 'Fresh bakery items and desserts made daily with premium ingredients.',
        cuisines: ['Bakery', 'Desserts'],
        rating: 4.9,
        reviewCount: 745,
        priceRange: '₹',
        image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=2000&q=95',
        address: {
          street: '654 Dessert Drive',
          city: 'Mumbai',
          state: 'Maharashtra',
          zipCode: '400005',
          latitude: 19.1332,
          longitude: 72.8439,
        },
        phone: '+91 98765 43214',
        email: 'bakery@deepdish.com',
        deliveryTime: 15,
        deliveryFee: 20,
        minOrderValue: 50,
        cuisineType: 'Bakery',
        menus: [
          {
            items: [
              {
                name: 'Chocolate Cake',
                description: 'Rich chocolate cake with fudge frosting',
                price: 280,
                image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=2000&q=95',
                category: 'Cakes',
                isVeg: true,
                preparationTime: 5,
              },
              {
                name: 'Strawberry Cheesecake',
                description: 'Creamy cheesecake with fresh strawberries',
                price: 320,
                image: 'https://images.unsplash.com/photo-1567327613485-f1a1442b1608?auto=format&fit=crop&w=2000&q=95',
                category: 'Cakes',
                isVeg: true,
                preparationTime: 5,
              },
              {
                name: 'Croissant',
                description: 'Buttery French croissant',
                price: 100,
                image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=2000&q=95',
                category: 'Pastries',
                isVeg: true,
                preparationTime: 3,
              },
              {
                name: 'Brownie',
                description: 'Fudgy chocolate brownie',
                price: 120,
                image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=2000&q=95',
                category: 'Desserts',
                isVeg: true,
                preparationTime: 3,
              },
              {
                name: 'Garlic Bread',
                description: 'Crispy garlic bread with herbs',
                price: 140,
                image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?auto=format&fit=crop&w=2000&q=95',
                category: 'Bread',
                isVeg: true,
                preparationTime: 5,
              },
            ],
            categories: ['Cakes', 'Pastries', 'Desserts', 'Bread'],
          },
        ],
      },
    ];

    // Create restaurants and menus
    for (const data of restaurantData) {
      const menus = data.menus;
      delete data.menus;

      // Create restaurant
      const restaurant = await Restaurant.create(data);
      console.log(`✓ Created restaurant: ${restaurant.name}`);

      // Create menus for the restaurant
      for (const menu of menus) {
        await Menu.create({
          restaurant: restaurant._id,
          items: menu.items,
          categories: menu.categories,
        });
      }
      console.log(`✓ Created menu for: ${restaurant.name}`);
    }

    console.log('\n✅ Database seeding completed successfully!');
    console.log(`Total restaurants created: ${restaurantData.length}`);
    console.log(`Total menus created: ${restaurantData.length}`);

    await mongoose.connection.close();
    console.log('✓ Database connection closed');
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    process.exit(1);
  }
};

seedRestaurants();
