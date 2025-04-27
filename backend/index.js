const express = require('express');
const cors = require('cors');
const accountRouter = require('./routes/account');
const userRouter = require('./routes/user');

const app = express();

// ✅ CORS Setup
const allowedOrigins = ['https://sonic-fund.vercel.app', 'http://localhost:3000'];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, Postman) or allowed frontend
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// ✅ Automatically handles OPTIONS preflight requests as well
app.options('*', cors());

// ✅ Middleware to parse incoming JSON requests
app.use(express.json());

// ✅ API routes
app.use('/user', userRouter);
app.use('/account', accountRouter);

// ✅ Root Route
app.get("/", (req, res) => {
  res.send("Server Started!");
});

// ✅ Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
