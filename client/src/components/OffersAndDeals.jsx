import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { assets } from '../assets/assets';

const OffersAndDeals = () => {
  const { navigate } = useAppContext();

  // State for selected category filter
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Sample deal data (can be fetched from API like /api/product/list)
  const deals = [
    {
      id: 1,
      title: 'Fresh Fruits Combo',
      category: 'Fruits',
      discount: '20% Off',
      price: 299,
      originalPrice: 375,
      image: assets.bottom_banner_image, // Replace with actual deal image
      path: 'fruits',
    },
    {
      id: 2,
      title: 'Organic Vegetables Pack',
      category: 'Vegetables',
      discount: '15% Off',
      price: 199,
      originalPrice: 235,
      image: assets.bottom_banner_image_sm,
      path: 'vegetables',
    },
    {
      id: 3,
      title: 'Dairy Delight Bundle',
      category: 'Dairy',
      discount: '10% Off',
      price: 450,
      originalPrice: 500,
      image: assets.bottom_banner_image,
      path: 'dairy',
    },
    {
      id: 4,
      title: 'Snacks Mega Deal',
      category: 'Snacks',
      discount: '25% Off',
      price: 150,
      originalPrice: 200,
      image: assets.bottom_banner_image_sm,
      path: 'snacks',
    },
  ];

  // Sample categories for filtering
  const categories = ['All', 'Fruits', 'Vegetables', 'Dairy', 'Snacks'];

  // Filter deals based on selected category
  const filteredDeals = selectedCategory === 'All'
    ? deals
    : deals.filter(deal => deal.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="px-6 md:px-16 lg:px-24 xl:px-32 py-16">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-6 text-center">
            Offers & Deals
          </h1>
          <p className="text-gray-500 text-center mb-8">
            Grab the best deals on fresh groceries at{' '}
            <span className="text-primary">GroceryGo</span>!
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  selectedCategory === category
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Deals Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDeals.map(deal => (
              <div
                key={deal.id}
                className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden group cursor-pointer"
                onClick={() => {
                  navigate(`/products/${deal.path.toLowerCase()}`);
                  window.scrollTo(0, 0);
                }}
              >
                <img
                  src={deal.image}
                  alt={deal.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900">{deal.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{deal.category}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-primary font-semibold">₹{deal.price}</span>
                    <span className="text-sm text-gray-500 line-through">₹{deal.originalPrice}</span>
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                      {deal.discount}
                    </span>
                  </div>
                  <button
                    className="mt-4 w-full bg-primary text-white py-2 rounded-md hover:bg-primary-dull transition"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/products/${deal.path.toLowerCase()}`);
                    }}
                  >
                    Shop Now
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* No Deals Message */}
          {filteredDeals.length === 0 && (
            <p className="text-center text-gray-500 mt-12">
              No deals available for this category. Check back soon!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OffersAndDeals;