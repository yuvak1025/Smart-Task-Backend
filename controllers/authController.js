import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Response helpers
export const successResponse = (res, data, message = "Success", status = 200) =>
  res.status(status).json({ success: true, data, message });

export const errorResponse = (res, message = "Error", status = 500) =>
  res.status(status).json({ success: false, message });

// Register user
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return errorResponse(res, "All fields required", 400);

    const existingUser = await User.findOne({ email });
    if (existingUser) return errorResponse(res, "User already exists", 400);

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    successResponse(
      res,
      { token, user: { id: newUser._id, name: newUser.name, email: newUser.email } },
      "User created successfully",
      201
    );
  } catch (err) {
    console.error(err);
    errorResponse(res);
  }
};

// Login user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return errorResponse(res, "All fields required", 400);

    const user = await User.findOne({ email });
    if (!user) return errorResponse(res, "User not found", 404);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return errorResponse(res, "Invalid credentials", 401);

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    successResponse(
      res,
      { token, user: { id: user._id, name: user.name, email: user.email } },
      "Login successful"
    );
  } catch (err) {
    console.error(err);
    errorResponse(res);
  }
};
