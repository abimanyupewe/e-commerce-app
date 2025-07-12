import { createContext, useEffect, useState } from "react";
// import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

// create api
export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = '$'; // simbol currency
    const delivery_fee = 10;
    // untuk connect backend
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    // untuk pencarian
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    // untuk cart
    const [cartItems, setCartItems] = useState({});
    const navigate = useNavigate();
    // get api
    const [products, setProducts] = useState([]);
    // get token user
    const [token, setToken] = useState('');

    // cart
    const addToCart = async (itemId, size) => {
        // Validasi ukuran
        if (!size) {
            toast.error('Select Product Size');
            return; // Hentikan eksekusi jika ukuran tidak dipilih
        }

        // Duplicating cartItems to avoid direct mutation
        let cartData = structuredClone(cartItems);

        // Memeriksa apakah item sudah ada di keranjang
        if (cartData[itemId]) {
            // Memeriksa apakah ukuran sudah ada untuk item tersebut
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1; // Tambah jumlah jika ukuran sudah ada
            } else {
                cartData[itemId][size] = 1; // Tambah ukuran baru
            }
        } else {
            // Jika item baru, buat objek baru untuk item tersebut
            cartData[itemId] = {};
            cartData[itemId][size] = 1; // Set jumlah untuk ukuran yang dipilih
        }

        // Perbarui state cartItems
        setCartItems(cartData);

        // dari API atau DB
        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/add', { itemId, size }, { headers: { token } })
            } catch (error) {
                console.log(error);
                toast.error(error.message)
            }
        }
        // toast.success('Item added to cart!'); // Tampilkan notifikasi sukses
    };

    // cumbah item yang di tambahkan pada cart
    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item];
                    }
                } catch (error) {
                    console.log(error);
                    toast.error(error.message)
                }
            }
        }
        return totalCount;
    }

    // delete item in cart
    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;

        setCartItems(cartData);
        // toast.success('Success delete item');

        // dari API atau DB
        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/update', {itemId, size, quantity}, {headers:{token}})

            } catch (error) {
                console.log(error);
                toast.error(error.message)
            }
        }
    }

    // total amount
    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
          let itemInfo = products.find((product) => product._id === items);
          if (!itemInfo) continue; // Skip jika item tidak ditemukan
      
          for (const item in cartItems[items]) {
            if (cartItems[items][item] > 0) {
              totalAmount += itemInfo.price * cartItems[items][item];
            }
          }
        }
        return totalAmount;
      };

    // get API backend
    const getProductsData = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/product/list')
            if (response.data.success) {
                setProducts(response.data.products)
            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    // jika di refresh biar tidak hilang data di cartnya
    const getUserCart = async (token) => {
        try {
            const response = await axios.post(backendUrl + '/api/cart/get', {}, {headers:{token}})
            if (response.data.success) {
                setCartItems(response.data.cartData)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    useEffect(() => {
        getProductsData();
    }, [])

    // ini agar di resfre tidak login ulang
    useEffect(() => {
        if (!token && localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'))
            getUserCart(localStorage.getItem('token'))
        }
    }, [])

    const value = {
        products, currency, delivery_fee,
        // search
        search, setSearch, showSearch, setShowSearch,
        // cart
        cartItems, addToCart, setCartItems,
        getCartCount,
        // dlete iteme cart
        updateQuantity,
        // total amount
        getCartAmount,
        // navigate
        navigate,
        // backend
        backendUrl,
        // token user
        setToken, token,
    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
