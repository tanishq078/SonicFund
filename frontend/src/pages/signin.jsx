import Input from "../components/inputs";
import Heading from "../components/heading";
import Subheading from "../components/subheading";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
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
                    const response = await axios.get("http://localhost:3000/user/check", {
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
                console.error('Token validation failed:', error);
                // Handle token validation errors, if needed
            }
        };

        checkTokenValidity();
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        try {
            const response = await axios.get("http://localhost:3000/user/signin", {
                headers: {
                    'Content-Type': 'application/json',
                
                username,
                password
          }  }, {
                
            });

            localStorage.setItem("token", response.data.token);
            console.log(response)
            navigate('/dashboard');
        } catch (error) {
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
          type="email"
          id="username"
          placeholder="Enter your username"
          className="w-full p-3 mt-1 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 focus:ring-2 focus:ring-red-500 focus:outline-none"
          onChange={(e) => setUsername(e.target.value)}
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