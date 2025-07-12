import mongoose from "mongoose";

// ini untuk membuat connection to database
const connectDB = async () => {
  mongoose.connection.on("connected", () => {
    console.log("✅ MongoDB Connected Successfully!");
  });

  await mongoose.connect(`${process.env.MONGODB_URI}/e-commerce`);
};

export default connectDB;
