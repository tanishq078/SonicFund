const express = require('express');
const app = express();
const cors = require('cors'); 
const accountRouter = require('./routes/account');
const userRouter = require('./routes/user');

// ✅ Allow all origins (for production, restrict this)
app.use(cors({
  origin: "*",  // Allows all origins
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
  credentials: false  // Set to `true` only if using cookies/sessions
}));

// Middleware for parsing request bodies
app.use(express.json());

app.use('/user', userRouter);
app.use('/account', accountRouter);

const PORT = process.env.PORT || 3000;  // Use environment variable for Vercel

app.get("/", (req, res) => {
  res.send("Server Started!");
});

// ✅ Handle preflight requests properly
app.options('*', cors());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
