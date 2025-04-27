import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const goToSignUp = () => {
    navigate('/signup');
  };

  useEffect(() => {
    const checkTokenValidity = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get("https://sonic-fund-backend.vercel.app/user/check", {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            }
          });

          // If the token is valid, redirect the user to the dashboard
          if (response.data.msg === "user is authenticated") {
            navigate('/dashboard');
          }
        }
      } catch (error) {
        console.error('Token validation failed:', error);
      }
    };

    checkTokenValidity();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const response = await axios.post("https://sonic-fund-backend.vercel.app/user/signin", 
        { username, password }, // <-- credentials go here (body)
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      // Store the token in localStorage
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        console.log("Token received:", response.data.token);
        navigate('/dashboard'); // Redirect to dashboard on successful sign in
      } else {
        setMessage("Failed to sign in. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setMessage("Invalid username or password");
    }
  };

  return (
    <div className="flex justify-center items-center bg-gradient-to-br from-gray-900 via-black to-gray-800 min-h-screen text-white">
      <div className="flex bg-gray-900 bg-opacity-70 shadow-lg rounded-3xl w-full max-w-md p-8 backdrop-blur-md">
        <form className="w-full" onSubmit={handleSubmit}>
          <h2 className="text-3xl font-extrabold text-center text-red-500">Sign In</h2>
          <p className="text-center text-gray-400 mb-6">Enter your credentials to sign in to your account</p>

          {/* Username Field */}
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-300">
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              className="w-full p-3 mt-1 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 focus:ring-2 focus:ring-red-500 focus:outline-none"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              autoComplete="username"
            />
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full p-3 mt-1 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 focus:ring-2 focus:ring-red-500 focus:outline-none"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              autoComplete="current-password"
            />
          </div>

          {/* Error Message */}
          <div className="text-sm text-red-500 mb-4">{message}</div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-red-600 to-red-800 text-white font-semibold py-3 px-4 rounded-lg shadow-lg transform transition-all hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          >
            Sign In
          </button>

          {/* Footer */}
          <div className="flex justify-center mt-6 text-sm">
            <p className="text-gray-400">Don't have an account?</p>
            <button
              onClick={goToSignUp}
              className="text-red-500 hover:underline ml-1 focus:outline-none"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
