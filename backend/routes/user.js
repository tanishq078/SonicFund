const express = require("express");
const { User, Account } = require("../db");
const jwt = require('jsonwebtoken');
const authMiddleware = require("../Middleware/auth");
const { uservalidate, updateone } = require('../validate/validate');
const JWT_SECRET = "hello";  // Use a more secure secret in production

const router = express.Router();

router.post('/signup', async (req, res) => {
  const validationResult = uservalidate.safeParse(req.body);

  if (!validationResult.success) {
    return res.status(400).json({
      msg: 'Validation failed',
      errors: validationResult.error.errors
    });
  } else {
    const finduser = await User.findOne({
      username: req.body.username
    });

    if (finduser) {
      return res.json("This username already exists, try a different one");
    } else {
      const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname
      });

      // Create account with random balance
      await Account.create({
        userId: user._id,
        balance: 1 + Math.random() * 10000
      });

      // Generate JWT token with user._id
      const token = jwt.sign({ userId: user._id }, JWT_SECRET);

      res.json({
        msg: "Account Created Successfully",
        token: token
      });
    }
  }
});

router.post('/signin', async (req, res) => {
  const { username, password } = req.body;

  // Find user by username and password (simple authentication)
  const user = await User.findOne({ username, password });
  if (!user) {
    return res.status(400).json({ msg: "Invalid username or password" });
  }

  // Generate JWT token with user._id
  const token = jwt.sign({ userId: user._id }, JWT_SECRET);

  res.json({
    msg: "Sign in successfully",
    token: token
  });
});

router.put('/update', authMiddleware, async (req, res) => {
  const updation = updateone.safeParse(req.body);

  if (!updation.success) {
    return res.status(400).json({
      msg: 'Validation error',
      errors: updation.error.errors,
    });
  }

  const result = await User.updateOne(
    { _id: req.userId },
    { $set: req.body }
  );

  if (result.modifiedCount === 0) {
    return res.status(404).json({ msg: "User not found or no changes made" });
  }

  res.json({ msg: "Profile updated" });
});

router.get('/bulk', authMiddleware, async (req, res) => {
  const filter = req.query.filter || "";
  const userId = req.userId;

  const users = await User.find({
    $and: [
      { _id: { $ne: userId } },
      {
        $or: [
          { firstname: { "$regex": filter, "$options": "i" } },
          { lastname: { "$regex": filter, "$options": "i" } }
        ]
      }
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

router.get('/check', authMiddleware, (req, res) => {
  res.json({ msg: "User is authenticated" });
});

router.get('/info', authMiddleware, (req, res) => {
  const user = req.user;
  res.json({ user: user });
});

module.exports = router;
