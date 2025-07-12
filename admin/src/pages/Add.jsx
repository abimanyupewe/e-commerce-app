import { useEffect, useState } from "react"
import { assets } from "../assets/assets.js"
import axios from "axios"
import { backendUrl } from "../App.jsx";
import { toast } from "react-toastify";

const Add = ({ token }) => {

  // untuk image
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);


  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('None')
  const [subCategory, setSubCategory] = useState('None')
  const [bestseller, setBestseller] = useState(false)
  const [sizes, setSizes] = useState([]);

  // select size
  const sizeOptions = ["ALL Sizes", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"];

  const handleSizeToggle = (size) => {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  // untuk submit
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData()

      // push data to API DB | urutan harus sama
      formData.append("name", name)
      formData.append("description", description)
      formData.append("price", price)
      formData.append("category", category)
      formData.append("subCategory", subCategory)
      formData.append("bestseller", bestseller)
      formData.append("sizes", JSON.stringify(sizes))

      // image
      image1 && formData.append("image1", image1)
      image2 && formData.append("image2", image2)
      image3 && formData.append("image3", image3)
      image4 && formData.append("image4", image4)

      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        {
          headers: {
            token,
          },
        }
      );

      // jika tekan btn add product inputannakan kosong atau kereset
      if (response.data.success) {
        toast.success(response.data.message);
        setName('')
        setDescription('')
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
        setPrice('0')
      } else {
        toast.error(response.data.message)
      }

      console.log(response.data);

    } catch (error) {
      console.error(error);
      toast.error("Failed to add product");
    }
  }

  useEffect(() => {
    console.log(sizes);
  }, [sizes]);

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col w-full items-start gap-3">
      <div className="">
        <p className="mb-2">Upload</p>

        {/* input image */}
        <div className="flex gap-2">
          <label htmlFor="image1">
            <img className="w-28" src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" />
            <input onChange={(e) => setImage1(e.target.files[0])} type="file" name="" id="image1" hidden />
          </label>
          <label htmlFor="image2">
            <img className="w-28" src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="" />
            <input onChange={(e) => setImage2(e.target.files[0])} type="file" name="" id="image2" hidden />
          </label>
          <label htmlFor="image3">
            <img className="w-28" src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="" />
            <input onChange={(e) => setImage3(e.target.files[0])} type="file" name="" id="image3" hidden />
          </label>
          <label htmlFor="image4">
            <img className="w-28" src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="" />
            <input onChange={(e) => setImage4(e.target.files[0])} type="file" name="" id="image4" hidden />
          </label>
        </div>
      </div>

      {/* input product */}
      <div className="w-full">
        <p className="mb-2">Product Name</p>
        <input onChange={(e) => setName(e.target.value)} value={name} className="w-full max-w-[500px] px-3 py-2 border border-gray-200 outline-gray-100 rounded-sm" type="text" name="" id="" placeholder="Type name" required />
      </div>
      <div className="w-full">
        <p className="mb-2">Product description</p>
        <textarea onChange={(e) => setDescription(e.target.value)} value={description} className="w-full max-w-[500px] px-3 py-2 border border-gray-200 outline-gray-400 rounded-sm" type="text" name="" id="" placeholder="Type description" required />
      </div>
      <div className="flex flex-col md:flex-row gap-2 w-full sm:gap-8">
        {/* category */}
        <div className="">
          <p className="mb-2">Product category</p>
          <select onChange={(e) => setCategory(e.target.value)} className="w-full px-3 py-2 border border-gray-200 outline-gray-100" name="" id="" required>
            <option value="None">None</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        {/* sub catregory */}
        <div className="">
          <p className="mb-2">Sub category</p>
          <select onChange={(e) => setSubCategory(e.target.value)} className="w-full px-3 py-2 border border-gray-200 outline-gray-100" name="" id="" required>
            <option value="None">None</option>
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winter">Winter</option>
          </select>
        </div>
        {/* price */}
        <div className="">
          <p className="mb-2">Product price</p>
          <input onChange={(e) => setPrice(e.target.value)} className="w-full sm:w-[120px] px-3 py-2 border border-gray-200 outline-gray-100 rounded-sm" placeholder="0" type="number" name="" id="" required />
        </div>
      </div>
      {/* size */}
      <div className="">
        <p className="mb-2">Product size</p>
        <div className="flex flex-wrap gap-3">
          {sizeOptions.map((size) => (
            <div
              key={size}
              onClick={() => handleSizeToggle(size)}
              className={`cursor-pointer px-3 py-1 rounded-md border transition-all duration-200
              ${sizes.includes(size) ? "bg-black text-white" : "bg-gray-200 hover:bg-gray-300"}`}
            >
              {size}
            </div>
          ))}
        </div>
      </div>
      {/* bestseller */}
      <div className="flex gap-2 mt-2">
        <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} type="checkbox" name="" id="bestseller" />
        <label className="cursor-pointer" htmlFor="bestseller">Add to bestseller</label>
      </div>
      {/* btn */}
      <button className="w-full py-3 mt-4 bg-black text-white" type="submit">Add Product</button>
    </form>
  )
}

export default Add
