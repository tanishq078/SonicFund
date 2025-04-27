const express = require("express");
const userMiddleware = require("../Middleware/user"); // probably verifies username and password
const authMiddleware = require("../Middleware/auth"); // verifies JWT token
const { User, Account } = require("../db");
const { uservalidate, updateone } = require("../validate/validate");
const jwt = require("jsonwebtoken");

const router = express.Router();
const JWT_SECRET = "hello"; // you should ideally keep this in environment variables (.env)

// ✅ Signup
router.post('/signup', async (req, res) => {
  const validationResult = uservalidate.safeParse(req.body);

  if (!validationResult.success) {
    return res.status(400).json({
      msg: 'Validation failed',
      errors: validationResult.error.errors
    });
  }

  const existingUser = await User.findOne({ username: req.body.username });
  if (existingUser) {
    return res.status(400).json({ msg: "This username already exists, try a different one" });
  }

  const user = await User.create({
    username: req.body.username,
    password: req.body.password,
    firstname: req.body.firstname,
    lastname: req.body.lastname
  });

  await Account.create({
    userId: user._id,
    balance: 1 + Math.random() * 10000
  });

  const token = jwt.sign({ userId: user._id }, JWT_SECRET);

  res.json({
    msg: "Account created successfully",
    token: token
  });
});

// ✅ Signin (Fixed to POST)
router.post('/signin', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ msg: "Username and password are required" });
  }

  const user = await User.findOne({ username: username });

  if (!user) {
    return res.status(401).json({ msg: "Invalid username or password" });
  }

  if (user.password !== password) { // (👉 in real world, use bcrypt.compare here)
    return res.status(401).json({ msg: "Invalid username or password" });
  }

  const token = jwt.sign({ userId: user._id }, JWT_SECRET);

  res.json({
    msg: "Signed in successfully",
    token: token
  });
});

// ✅ Update user profile
router.put('/update', authMiddleware, async (req, res) => {
  const validationResult = updateone.safeParse(req.body);

  if (!validationResult.success) {
    return res.status(400).json({
      msg: 'Validation error',
      errors: validationResult.error.errors
    });
  }

  const result = await User.updateOne(
    { _id: req.userId },
    { $set: req.body }
  );

  if (result.modifiedCount === 0) {
    return res.status(404).json({ msg: "User not found or no changes made" });
  }

  res.json({ msg: "Profile updated successfully" });
});

// ✅ Bulk search (exclude yourself)
router.get('/bulk', authMiddleware, async (req, res) => {
  const filter = req.query.filter || "";
  const userId = req.userId;

  const users = await User.find({
    _id: { $ne: userId },
    $or: [
      { firstname: { $regex: filter, $options: "i" } },
      { lastname: { $regex: filter, $options: "i" } }
    ]
  });

  res.json({
    users: users.map(user => ({
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      _id: user._id
    }))
  });
});

// ✅ Token check
router.get('/check', authMiddleware, (req, res) => {
  res.json({ msg: "User is authenticated" });
});

// ✅ Get user info
router.get('/info', authMiddleware, async (req, res) => {
  const user = await User.findById(req.userId);

  if (!user) {
    return res.status(404).json({ msg: "User not found" });
  }

  res.json({
    user: {
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      _id: user._id
    }
  });
});

module.exports = router;
