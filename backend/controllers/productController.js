import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

// func for add product
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

    // Upload gambar ke Cloudinary
    let imageUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    // Buat objek produk untuk MongoDB
    const productData = new productModel({
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      bestseller: bestseller === "true",
      sizes: JSON.parse(sizes), // Sesuai dengan schema
      image: imageUrl, // Simpan array URL gambar
      date: new Date(), // Simpan sebagai Date, bukan Number
    });

    // Simpan ke database
    await productData.save();

    console.log("Produk berhasil ditambahkan:", productData);

    res.json({ success: true, message: "Product Added", product: productData });
  } catch (error) {
    console.error("Error saat menambahkan produk:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
// func for list product
const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// func for remove product
const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Product Removed" });
  } catch (error) {
    console.log(error);

    res.json({ success: false, message: error.message });
  }
};

// func for remove product
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId);

    res.json({ success: true, product });
  } catch (error) {
    console.log(error);

    res.json({ success: false, message: error.message });
  }
};

export { listProducts, addProduct, removeProduct, singleProduct };
