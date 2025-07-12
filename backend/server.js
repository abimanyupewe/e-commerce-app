import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

//  cek dulu diterminal apakah port woring | sebelum itu setting dulu pada package json

// app config
const app = express();
const port = process.env.PORT || 4000;

// connect db
connectDB();
// connect cloudinary
connectCloudinary();

// middlewares
app.use(express.json());
app.use(cors());

// api endpoints
// user
app.use("/api/user", userRouter);
// product
app.use("/api/product", productRouter);
// cart
app.use("/api/cart", cartRouter);
// order router (payment)
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
  res.send("API WORIKING");
});

app.listen(port, () => console.log("Server started on PORT : " + port));
