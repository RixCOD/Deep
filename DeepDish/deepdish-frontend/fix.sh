#!/bin/bash
# Quick Fix Script for DeepDish Frontend

echo "🔧 Fixing DeepDish Frontend..."

# Remove Vite cache
echo "Clearing Vite cache..."
rm -rf node_modules/.vite

# Remove dist
echo "Clearing dist..."
rm -rf dist

# Clear package lock cache if needed
echo "Done! Try running: npm run dev"
