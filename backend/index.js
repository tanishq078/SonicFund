const express = require('express');
const app = express();
const cors = require('cors'); 
const accountRouter = require('./routes/account');
const userRouter = require('./routes/user');

// Correct CORS configuration
const allowedOrigins = [
  'https://sonic-fund.vercel.app/',
  'https://sonic-fund-backend.vercel.app/'
];


app.use(cors({
  origin: allowedOrigins,
  methods: "GET,POST,PUT,DELETE",
  credentials: true 
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
