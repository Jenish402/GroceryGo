import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import ProductCard from './ProductCard.jsx';
import toast from 'react-hot-toast';
import { assets } from '../assets/assets';

const BestSellers = () => {
  const { navigate, axios } = useAppContext();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch best-selling products (mocked or from API)
  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        // Assuming API endpoint returns products sorted by sales
        const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/product/list?sort=sales`, {
          withCredentials: true,
        });
        if (data.success) {
          setProducts(data.products);
        } else {
          toast.error(data.message);
          // Fallback to mock data if API fails
          setProducts(mockBestSellers);
        }
      } catch (error) {
        toast.error('Failed to load best sellers');
        setProducts(mockBestSellers);
      } finally {
        setLoading(false);
      }
    };

    fetchBestSellers();
  }, [axios]);

  // Mock data for best sellers (replace with actual API data)
  const mockBestSellers = [
    {
      _id: '1',
      name: 'Organic Apples',
      category: 'Fruits',
      price: 120,
      image: assets.bottom_banner_image,
      rating: 4.5,
      sales: 1500,
    },
    {
      _id: '2',
      name: 'Fresh Spinach',
      category: 'Vegetables',
      price: 40,
      image: assets.bottom_banner_image_sm,
      rating: 4.2,
      sales: 1200,
    },
    {
      _id: '3',
      name: 'Whole Milk',
      category: 'Dairy',
      price: 60,
      image: assets.bottom_banner_image,
      rating: 4.7,
      sales: 1000,
    },
    {
      _id: '4',
      name: 'Crispy Chips',
      category: 'Snacks',
      price: 30,
      image: assets.bottom_banner_image_sm,
      rating: 4.0,
      sales: 800,
    },
  ];

  // Handle add to cart (simplified, assumes ProductCard handles details)
  const handleAddToCart = async (productId) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/cart/update`,
        { productId, quantity: 1 },
        { withCredentials: true }
      );
      if (data.success) {
        toast.success('Added to cart');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Failed to add to cart');
    }
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
      <Navbar />
      <div className="px-6 md:px-16 lg:px-24 xl:px-32 py-16">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-6 text-center">
            Best Sellers
          </h1>
          <p className="text-gray-500 text-center mb-12">
            Discover the most loved products on{' '}
            <span className="text-primary">GroceryGo</span>!
          </p>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onClick={() => {
                  navigate(`/product/${product._id}`);
                  window.scrollTo(0, 0);
                }}
                onAddToCart={() => handleAddToCart(product._id)}
              />
            ))}
          </div>

          {/* No Products Message */}
          {products.length === 0 && (
            <p className="text-center text-gray-500 mt-12">
              No best sellers available right now. Check back soon!
            </p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BestSellers;