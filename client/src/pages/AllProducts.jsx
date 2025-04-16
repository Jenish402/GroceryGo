import React, { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import ProductCard from "../components/ProductCard.jsx";
import toast from "react-hot-toast";
import { assets } from "../assets/assets";

const AllProducts = () => {
  const { navigate, axios } = useAppContext();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([
    "All",
    "Fruits",
    "Vegetables",
    "Dairy",
    "Snacks",
    "Bakery",
    "Grains",
    "Drinks",
  ]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  // Fetch products based on selected category
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log(import.meta.env.VITE_API_BASE_URL);

        setLoading(true);
        const query =
          selectedCategory === "All" ? "" : `?category=${selectedCategory}`;
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/product/list${query}`,
          {
            withCredentials: true,
          }
        );
        if (data.success) {
          console.log(data);

          setProducts(data.products || []);
        } else {
          toast.error(data.message);
          // Fallback to mock data
          setProducts(mockProducts);
        }
      } catch (error) {
        toast.error("Failed to load products");
        setProducts(mockProducts);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [axios, selectedCategory]);

  // Fetch categories (optional, if backend supports /api/category/list)
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Hypothetical endpoint; replace with actual if available
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/category/list`,
          {
            withCredentials: true,
          }
        );
        if (data.success) {
          setCategories(["All", ...data.categories]);
        }
      } catch (error) {
        console.log("Using default categories");
        // Keep static categories if endpoint fails
      }
    };
    // Comment out if using static categories
    // fetchCategories();
  }, [axios]);

  // Mock data for products (replace with API data)
  const mockProducts = [
    {
      _id: "1",
      name: "Organic Apples",
      category: "Fruits",
      price: 120,
      image: assets.bottom_banner_image,
      rating: 4.5,
    },
    {
      _id: "2",
      name: "Fresh Spinach",
      category: "Vegetables",
      price: 40,
      image: assets.bottom_banner_image_sm,
      rating: 4.2,
    },
    {
      _id: "3",
      name: "Whole Milk",
      category: "Dairy",
      price: 60,
      image: assets.bottom_banner_image,
      rating: 4.7,
    },
    {
      _id: "4",
      name: "Crispy Chips",
      category: "Snacks",
      price: 30,
      image: assets.bottom_banner_image_sm,
      rating: 4.0,
    },
  ];

  // Handle add to cart
  const handleAddToCart = async (productId) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/cart/update`,
        { productId, quantity: 1 },
        { withCredentials: true }
      );
      if (data.success) {
        toast.success("Added to cart");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to add to cart");
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
      <div className="px-6 md:px-16 lg:px-24 xl:px-32 py-16">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-6 text-center">
            All Products
          </h1>
          <p className="text-gray-500 text-center mb-12">
            Explore our wide range of groceries at{" "}
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
                    ? "bg-primary text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

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
              No products found for this category. Try another one!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
