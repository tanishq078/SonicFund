const express = require('express');
const app = express();
const cors = require('cors'); 
const accountRouter = require('./routes/account');
const userRouter = require('./routes/user');

// Correct CORS configuration
app.use(cors({
    origin: 'https://sonic-fund.vercel.app', // Allow requests from your frontend
    methods: 'GET, POST, PUT, DELETE, OPTIONS',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true // Allow cookies/auth headers if needed
}));

// Middleware for parsing request bodies
app.use(express.json());

app.use('/user', userRouter);
app.use('/account', accountRouter);

const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Server Started!");
});

// Handle preflight requests
app.options('*', cors());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
