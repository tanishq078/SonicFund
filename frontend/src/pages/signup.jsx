import Input from "../components/inputs";
import Heading from "../components/heading";
import Subheading from "../components/subheading";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const validatePassword = (password) => {
    if (password && password.length < 8) {
      return "Password should be at least 8 characters long";
    } else {
      return '';
    }
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

          if (response.data) {
            navigate('/dashboard');
          }
        }
      } catch (error) {
        console.error('Token check failed:', error);
      }
    };

    checkTokenValidity();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationMessage = validatePassword(password);
    if (validationMessage) {
      setMessage(validationMessage);
      return;
    }

    if (!username || !firstname || !lastname || !password) {
      setMessage("All fields are required");
      return;
    }

    try {
      const response = await axios.post("https://sonic-fund-backend.vercel.app/user/signup", {
        username,
        firstname,
        lastname,
        password
      });

      localStorage.setItem("token", response.data.token);
      navigate('/dashboard');
    } catch (error) {
      console.error("Signup error:", error);
      if (error.response && error.response.data) {
        setMessage(error.response.data.msg || "Signup failed");
      } else {
        setMessage("An unexpected error occurred");
      }
    }
  };

  const goToSignIn = () => {
    navigate('/signin');
  };

  return (
    <div className="flex justify-center items-center bg-gradient-to-br from-gray-900 via-black to-gray-800 min-h-screen p-4 text-white">
      <div className="flex flex-col bg-gray-900 bg-opacity-70 shadow-lg rounded-xl w-full max-w-md backdrop-blur-md">
        <form className="w-full p-6 sm:p-8" onSubmit={handleSubmit}>
          <div className="text-center mb-6">
            <h1 className="text-3xl sm:text-4xl font-bold text-red-500">Sign Up</h1>
            <p className="text-gray-400 text-sm sm:text-base">
              Enter your information to create an account
            </p>
          </div>

          {/* Input Fields */}
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm text-gray-300 mb-1">Username</label>
              <input
                id="username"
                type="text"      // 👈 change this line
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 bg-gray-800 text-gray-300 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                autoComplete="username"
              />
            </div>
            <div>
              <label htmlFor="first" className="block text-sm text-gray-300 mb-1">First Name</label>
              <input
                id="first"
                type="text"
                placeholder="Enter your First Name"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                className="w-full p-3 bg-gray-800 text-gray-300 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                autoComplete="given-name"
              />
            </div>
            <div>
              <label htmlFor="last" className="block text-sm text-gray-300 mb-1">Last Name</label>
              <input
                id="last"
                type="text"
                placeholder="Enter your Last Name"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                className="w-full p-3 bg-gray-800 text-gray-300 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                autoComplete="family-name"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm text-gray-300 mb-1">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 bg-gray-800 text-gray-300 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                autoComplete="current-password"
              />
            </div>
          </div>

          {/* Error Message */}
          {message && <div className="text-sm text-red-500 mt-2">{message}</div>}

          {/* Submit Button */}
          <div className="mt-5">
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg shadow-lg transform transition-all hover:scale-105"
            >
              Sign Up
            </button>
          </div>

          {/* Footer */}
          <div className="flex justify-center items-center mt-4 text-sm">
            <p className="text-gray-400">Already have an account?</p>
            <button
              onClick={goToSignIn}
              className="text-red-500 hover:underline ml-1 focus:outline-none"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;