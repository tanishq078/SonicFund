const express = require('express');
const cors = require('cors'); 
const accountRouter = require('./routes/account');
const userRouter = require('./routes/user');

const app = express();

// ✅ CORS setup (do this first!)
const allowedOrigins = ['https://sonic-fund.vercel.app'];

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// ✅ Middleware for parsing JSON
app.use(express.json());

// ✅ Your API routes
app.use('/user', userRouter);
app.use('/account', accountRouter);

// ✅ Health check or landing route
app.get("/", (req, res) => {
  res.send("Server Started!");
});

// ✅ Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
