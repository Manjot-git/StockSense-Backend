const User = require("../model/UsersModel");
const bcrypt = require("bcryptjs");
const { createSecretToken } = require("../util/secretToken");

//cookie standard
const cookieOptions = {
  httpOnly: true,
  sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
  secure: process.env.NODE_ENV === "production",
  maxAge: 24 * 60 * 60 * 1000,
};


//Signup Core Logic
module.exports.Signup = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword, username });

    const token = createSecretToken(user._id);

    res.cookie("token", token, cookieOptions);


    const { password: _, ...safeUser } = user.toObject();

    res.status(201).json({
      message: "User signed in successfully",
      success: true,
      user: safeUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Signup failed", error });
  }
};



// ------------------------------------------- //


//Login Core Logic
module.exports.Login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // Create token
    const token = createSecretToken(user._id);

    // Send token as cookie
    res.cookie("token", token, cookieOptions);

    const { password: _, ...safeUser } = user.toObject();

    res.status(200).json({
      message: "Login successful",
      success: true,
      user: safeUser,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Login failed", error });
  }
};

// Logout Controller
module.exports.Logout = (req, res) => {
  res.clearCookie("token", cookieOptions);

  res.status(200).json({ message: "Logged out successfully" });
};
