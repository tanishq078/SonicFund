const express = require('express');
const cors = require('cors'); 
const accountRouter = require('./routes/account');
const userRouter = require('./routes/user');

const app = express();

// ✅ Explicitly Allow Your Frontend
const allowedOrigins = ['https://sonic-fund.vercel.app']; 

app.use(cors({
  origin: allowedOrigins, 
  methods: "GET,POST,PUT,DELETE,OPTIONS",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true  // Required for handling cookies or authorization headers
}));

// ✅ Handle Preflight Requests Properly
app.options('*', (req, res) => {
  res.header("Access-Control-Allow-Origin", "https://sonic-fund.vercel.app");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  return res.status(200).end();
});

// Middleware for parsing JSON
app.use(express.json());

app.use('/user', userRouter);
app.use('/account', accountRouter);

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Server Started!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
