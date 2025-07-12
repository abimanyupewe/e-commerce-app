import { Link, NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {

    // usestate untuk menu mobile
    const [visible, setVisible] = useState(false);

    // untuk menampilkan search
    const {setShowSearch, getCartCount, navigate, token, setToken, setCartItems} = useContext(ShopContext);

    // untuk logout
    const logout = () => {
        navigate('/login')
        localStorage.removeItem('token')
        setToken('')
        setCartItems({})
    }

    return (
        <div className="flex items-center justify-between py-5 font-medium">
            {/* menggil logo dari assets.js */}
            {/* <img src={assets.logo} alt="" className='w-36'/> */}
            <Link to='/'><h1 className='text-3xl'>TUMBAS</h1></Link>

            <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
                {["/", "/collection", "/about", "/contact"].map((path, index) => {
                    const labels = ["Home", "Collection", "About", "Contact"];

                    return (
                        <NavLink
                            key={index}
                            to={path}
                            className={({ isActive }) =>
                                `flex flex-col items-center gap-1 ${isActive ? "text-black font-semibold" : "text-gray-700"}`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    <p>{labels[index]}</p>
                                    <hr className={`w-2/4 border-none h-[1.5px] bg-gray-700 transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`} />
                                </>
                            )}
                        </NavLink>
                    );
                })}
            </ul>

            <div className="flex items-center gap-6">
                <img onClick={() => setShowSearch(true)} src={assets.search_icon} className='w-5 cursor-pointer' alt="" />

                <div className="group relative">
                    <img onClick={() => token ? null : navigate('/login')} src={assets.profile_icon} className='w-5 cursor-pointer' alt="" />
                    {/* Dropdown */} 
                    {
                        token && 
                        <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
                        <div className="flex flex-col gap-2 w-36 p-2 text-gray-500 border rounded bg-white">
                            <p className="cursor-pointer hover:text-black hover:bg-gray-50 p-1">Profile</p>
                            <p onClick={() => navigate('/orders')} className="cursor-pointer hover:text-black hover:bg-gray-50 p-1">Orders</p>
                            <p onClick={logout} className="cursor-pointer hover:text-black hover:bg-gray-50 p-1">Log out</p>
                        </div>
                    </div>
                    }
                </div>
                <Link to="/cart" className='relative'>
                    <img src={assets.cart_icon} className='w-5 min-w-5' alt="" />
                    <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">{getCartCount()}</p>
                </Link>
                <img onClick={() => setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt="" />
            </div>
            {/* sidebar menu mobile */}
            <div className={`top-0 absolute bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
                <div className="flex flex-col text-gray-600">
                    <div onClick={() => setVisible(false)} className="flex items-center gap-4 p-3 cursor-pointer">
                        <img src={assets.dropdown_icon} className='h-4 rotate-180' alt="" />
                        <p className="hover:underline">Back</p>
                    </div>
                    <NavLink className='py-2 pl-6 border ' onClick={() => setVisible(false)} to='/'>Home</NavLink>
                    <NavLink className='py-2 pl-6 border ' onClick={() => setVisible(false)} to='/collection'>Collection</NavLink>
                    <NavLink className='py-2 pl-6 border ' onClick={() => setVisible(false)} to='/about'>About</NavLink>
                    <NavLink className='py-2 pl-6 border ' onClick={() => setVisible(false)} to='/contact'>Contact</NavLink>
                </div>
            </div>
        </div>
    )
}

export default Navbar
