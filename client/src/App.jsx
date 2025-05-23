import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import { Toaster } from "react-hot-toast";
import Footer from './components/Footer';
import { useAppContext } from './context/AppContext';
import Login from './components/Login';
import AllProducts from './pages/AllProducts';
import ProductCategory from './pages/ProductCategory';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import AddAddress from './pages/AddAddress';
import MyOrders from './pages/MyOrders';
import SellerLogin from './components/seller/SellerLogin';
import SellerLayout from './pages/seller/SellerLayout';
import AddProduct from './pages/seller/AddProduct';
import ProductList from './pages/seller/ProductList';
import Orders from './pages/seller/Orders';
import Loading from './components/Loading';
import ReturnandRefaund from './components/ReturnandRefaund';
import PaymentMethods from './components/PaymentMethods';
import Contact from './pages/Contact';
import UnderDevelopment from './pages/UnderDevelopment';
import FAQ from './components/FAQ';
import OffersAndDeals from './components/OffersAndDeals';
import BestSellers from './components/BestSellers';
import UserAccount from './pages/UserAccount';
import ExploreDeals from './pages/ExploreDeals';
import EditProfile from './pages/EditProfile';
import Success from './pages/Success';

const App = () => {

  const isSellerPath = useLocation().pathname.includes("seller");
  const {showUserLogin, isSeller} = useAppContext()

  return (
    <div className='text-default min-h-screen text-gray-700 bg-white'>

     {isSellerPath ? null : <Navbar/>} 
     {showUserLogin ? <Login/> : null}

     <Toaster />

      <div className={`${isSellerPath ? "" : "px-6 md:px-16 lg:px-24 xl:px-32"}`}>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/products' element={<AllProducts/>} />
          <Route path='/products/:category' element={<ProductCategory/>} />
          <Route path='/products/:category/:id' element={<ProductDetails/>} />
          <Route path='/cart' element={<Cart/>} />
          <Route path='/add-address' element={<AddAddress/>} />
          <Route path='/my-orders' element={<MyOrders/>} />
          <Route path='/loader' element={<Loading/>} />
          <Route path='/returnandrefaundpolicy' element={<ReturnandRefaund/>} />
          <Route path='/paymentmethods' element={<PaymentMethods/>} />
          <Route path='/contact' element={<Contact/>} />
          <Route path='/underDevelopment' element={<UnderDevelopment/>} />
          <Route path='/faq' element={<FAQ/>} />
          <Route path='/offersanddeals' element={<OffersAndDeals/>} />
          <Route path='/bestsellers' element={<BestSellers/>} />
          <Route path='/account' element={<UserAccount/>} />
          <Route path='/exploredeals' element={<ExploreDeals/>} />
          <Route path='/editprofile' element={<EditProfile/>} />
          <Route path='/editprofile' element={<EditProfile/>} />
          <Route path='/success' element={<Success/>}>
            <Route index element={isSeller ? <AddProduct/> : null} />
            <Route path='product-list' element={<ProductList/>} />
            <Route path='orders' element={<Orders/>} />
          </Route>
        </Routes>
      </div>
     {!isSellerPath && <Footer/>}
    </div>
  )
}

export default App
