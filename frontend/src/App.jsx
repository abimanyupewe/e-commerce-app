import { Route, Routes } from "react-router-dom"
import Home from './pages/Home'
import Collection from './pages/Collection'
import About from './pages/About'
import Contact from './pages/Contact'
import Product from './pages/Product'
import Cart from './pages/Cart'
import LoginRegis from './pages/LoginRegis'
import PleceOrder from './pages/PleceOrder'
import Orders from './pages/Orders'

import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import SearchBar from "./components/SearchBar"
// import Hero from "./components/Hero"
// import ShopContextProvider from "./context/ShopContext"
// import LatestCollection from "./components/LatestCollection"

import { ToastContainer, toast } from 'react-toastify';

const App = () => {
  return (
    <>
      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
        <ToastContainer />
        <Navbar/>
        <SearchBar/>
        {/* untuk alurnya navnya */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<LoginRegis />} />
          <Route path="/place-order" element={<PleceOrder />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
        <Footer/>
      </div>
    </>
  )
}

export default App

// catatan 
// ini adalah dinamic clas name
// className={`w-2/4 border-none h-[1.5px] bg-gray-700 transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`}
// disini menggunakan kurung cucut dan back tik
