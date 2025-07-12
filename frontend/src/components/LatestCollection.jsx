import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { useState } from "react";
import Title from "./Title";
import { useEffect } from "react";
import ProductItem from "./ProductItem";

const LatestCollection = () => {
    const { products } = useContext(ShopContext);
    // console.log(products); // Pastikan ini mencetak produk ke konsol
    // usesate
    const [latestProducts, setLatestProducts] = useState([]);
    useEffect(() => {
        setLatestProducts(products.slice(0, 10)); // ada 10 produk yang ditampilkan
    }, [products]); // Tambahkan products di sini

    return (
        <div className="my-10">
            <div className="text-center py-8 text-3xl">
                <Title text1={'LATEST'} text2={'COLLECTIONS'} />
                <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam reprehenderit, repellat omnis dolores dolorem nesciunt voluptatem sunt veniam rerum reiciendis</p>
            </div>

            {/* render product */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
                {latestProducts.map((item, index) => (
                    <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price}/>
                ))}
            </div>
        </div>
    );
};

export default LatestCollection;
