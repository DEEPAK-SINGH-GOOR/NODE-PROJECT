const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendMail = require("../service/sendMail");

const Signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

   
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ error: "User already exists" });
    }

   
    const hashedPassword = await bcrypt.hash(password, 10);

   
    const user = await User.create({ username, email, password: hashedPassword });

    
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

    
    const verificationLink = `http://localhost:8090/user/verify/${token}`;
    const html = `<div>
                    <h1>Hello ${user.username}</h1>
                    <p>Click <a href="${verificationLink}">here</a> to verify your email.</p>
                  </div>`;

    await sendMail(email, "Email Verification", html);

    res.status(201).send({
      message: "User created, verification email sent",
      token,
    });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).send({ error: error.message });
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).send({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).send({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.status(200).send({ message: "Login successful", token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send({ error: error.message });
  }
};

const GetUser = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) return res.status(404).send({ error: "User not found" });

    res.status(200).send({ message: "User deleted", user });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).send({ error: error.message });
  }
};

const verifyUser = async (req, res) => {
  try {
    const { token } = req.params;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

   
    const user = await User.findByIdAndUpdate(decoded.id, { isVerified: true }, { new: true });
    if (!user) return res.status(404).send({ error: "User not found" });

    res.status(200).send({ message: "User verified", user });
  } catch (error) {
    console.error("Error verifying user:", error);
    res.status(500).send({ error: error.message });
  }
};

const getAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: "ADMIN" });
    res.status(200).send(admins);
  } catch (error) {
    console.error("Error fetching admins:", error);
    res.status(500).send({ error: error.message });
  }
};

const verifyAdmin = async (req, res) => {
  try {
    const { adminId } = req.params;
    const admin = await User.findByIdAndUpdate(adminId, { isVerified: true }, { new: true });
    if (!admin) return res.status(404).send({ error: "Admin not found" });

   
    const html = `<div><h1>Your admin account has been approved!</h1></div>`;
    await sendMail(admin.email, "Admin Approval", html);

    res.status(200).send({ message: "Admin verified", admin });
  } catch (error) {
    console.error("Error verifying admin:", error);
    res.status(500).send({ error: error.message });
  }
};

module.exports = {
  Signup,
  Login,
  GetUser,
  deleteUser,
  verifyUser,
  getAdmins,
  verifyAdmin,
};
