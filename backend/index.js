const express = require('express');
const cors = require('cors'); 
const accountRouter = require('./routes/account');
const userRouter = require('./routes/user');

const app = express();

// Allowed Origins (Without Trailing Slash)
const allowedOrigins = [
  'https://sonic-fund.vercel.app',
  'https://sonic-fund-backend.vercel.app'
];

// Correct CORS Configuration
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true 
}));

// Middleware for Parsing JSON Requests
app.use(express.json());

// Handle Preflight Requests
app.options('*', cors());

// Routes
app.use('/user', userRouter);
app.use('/account', accountRouter);

const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Server Started!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});