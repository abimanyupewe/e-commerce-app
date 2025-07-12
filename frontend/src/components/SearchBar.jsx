import { useContext, useEffect, useState } from "react"
import { ShopContext } from "../context/ShopContext"
import { assets } from "../assets/assets";
import { useLocation } from "react-router-dom";


const SearchBar = () => {

    // memanggil variabel
    const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
    const [visible, setVisible] = useState(false); // membuat variabel untuk visiblenya
    // ini agar di bagian selain colection search bar akan di hidden
    // ini untuk location hook jadi tau tentang location navigationnya
    const location = useLocation();

    useEffect(() => {
        if (location.pathname.includes('collection')) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    },[location, showSearch]);

    // ini untuk search tampil ketika keadaan apa
    // disini kita menggunakan ternary operator
    return showSearch && visible ? (
        <div className="border-t border-b bg-gray-50 text-center">
            <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 rounded-full w-3/4 sm:w-1/2">
                <input className="flex-1 outline-none bg-inherit text-sm" value={search} onChange={(e) => setSearch(e.target.value)} type="text" name="" id="" placeholder="Search" />
                <img className="w-4" src={assets.search_icon} alt="" />
            </div>
            <img onClick={() => setShowSearch(false)} className="ml-2 inline w-3 cursor-pointer" src={assets.cross_icon} alt="" />
        </div>
    ) : null
}

export default SearchBar
