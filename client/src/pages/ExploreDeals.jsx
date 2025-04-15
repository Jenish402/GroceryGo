import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import toast from 'react-hot-toast';
import { assets } from '../assets/assets';

const ExploreDeals = () => {
  const { navigate, axios } = useAppContext();
  const [deals, setDeals] = useState([]);
  const [categories, setCategories] = useState(['All', 'Fruits', 'Vegetables', 'Dairy', 'Snacks']);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  // Mock deal data (replace with /api/deal/list)
  const mockDeals = [
    {
      id: '1',
      title: 'Fresh Fruits Fiesta',
      category: 'Fruits',
      discount: '20% Off',
      price: 299,
      originalPrice: 375,
      image: assets.bottom_banner_image,
      path: 'fruits',
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
    },
    {
      id: '2',
      title: 'Veggie Value Pack',
      category: 'Vegetables',
      discount: '15% Off',
      price: 199,
      originalPrice: 235,
      image: assets.bottom_banner_image_sm,
      path: 'vegetables',
      expiresAt: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(), // 48 hours
    },
    {
      id: '3',
      title: 'Dairy Delights',
      category: 'Dairy',
      discount: '10% Off',
      price: 450,
      originalPrice: 500,
      image: assets.bottom_banner_image,
      path: 'dairy',
      expiresAt: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(), // 12 hours
    },
    {
      id: '4',
      title: 'Snack Savers',
      category: 'Snacks',
      discount: '25% Off',
      price: 150,
      originalPrice: 200,
      image: assets.bottom_banner_image_sm,
      path: 'snacks',
      expiresAt: new Date(Date.now() + 36 * 60 * 60 * 1000).toISOString(), // 36 hours
    },
  ];

  // Fetch deals (mocked for now)
  useEffect(() => {
    const fetchDeals = async () => {
      try {
        setLoading(true);
        // Placeholder for /api/deal/list
        // const { data } = await axios.get(`/api/deal/list?category=${selectedCategory === 'All' ? '' : selectedCategory}`, {
        //   withCredentials: true,
        // });
        // if (data.success) {
        //   setDeals(data.deals);
        // } else {
        //   toast.error(data.message);
        //   setDeals(mockDeals);
        // }
        const filteredDeals = selectedCategory === 'All'
          ? mockDeals
          : mockDeals.filter(deal => deal.category === selectedCategory);
        setDeals(filteredDeals);
      } catch (error) {
        toast.error('Failed to load deals');
        setDeals(mockDeals);
      } finally {
        setLoading(false);
      }
    };
    fetchDeals();
  }, [axios, selectedCategory]);

  // Countdown timer for each deal
  const getTimeRemaining = (expiresAt) => {
    const now = new Date();
    const expires = new Date(expiresAt);
    const diff = expires - now;
    if (diff <= 0) return 'Expired';
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-24 w-24 border-4 border-gray-300 border-t-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="px-6 md:px-16 lg:px-24 xl:px-32 py-16">
        <div className="max-w-7xl mx-auto">
          {/* Hero Banner */}
          <div className="relative bg-primary text-white rounded-lg overflow-hidden mb-12">
            <img
              src={assets.bottom_banner_image}
              alt="Explore Deals"
              className="w-full h-48 md:h-64 object-cover opacity-50"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6">
              <h1 className="text-3xl md:text-4xl font-semibold mb-4">
                Explore Exclusive Deals
              </h1>
              <p className="text-lg">
                Save big on your favorite groceries with{' '}
                <span className="font-bold">GroceryGo</span>!
              </p>
            </div>
          </div>

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
            {deals.map((deal) => (
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
                  <div className="text-sm text-red-500 mt-2">
                    Ends in: {getTimeRemaining(deal.expiresAt)}
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
          {deals.length === 0 && (
            <p className="text-center text-gray-500 mt-12">
              No deals available for this category. Check back soon!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExploreDeals;