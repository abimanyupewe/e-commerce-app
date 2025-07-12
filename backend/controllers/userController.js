import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// gerenerate token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// Route for user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      // jika user tidak ditemukan
      return res.json({ success: false, message: "User doesn't exists" });
    }

    // mencocokan passowrd yang sudah berbentuk hash dari register
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      // akan di generate ulang token yang di inputkan user dan nanti akan dibandingkan dengan token yang sudah ada dalam db regsiter
      const token = createToken(user._id);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// route for user regis
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // chcking user alredy exists or not
    const exists = await userModel.findOne({ email });
    // check user
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }

    // validating email format and strong password
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Pleace enter a valid email",
      });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Pleace enter a strong password",
      });
    }

    // hasing user Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create user
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    const token = createToken(user._id);

    // testing
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }

  // test
  // res.json({msg:"Register API Working"})
};

// route for admin login
const adminLogin = async (req, res) => {
  // membuat email dan password untuk user yang nanti akan berupa token
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid Creadentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { loginUser, registerUser, adminLogin };
