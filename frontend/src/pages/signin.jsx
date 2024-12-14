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
      <div className="flex justify-center items-center bg-gradient-to-r from-blue-500 to-purple-500 min-h-screen">
      <div className="flex bg-white shadow-lg rounded-3xl w-full max-w-md p-8">
          <form className="w-full" onSubmit={handleSubmit}>
              <h2 className="text-3xl font-bold text-center text-gray-800">Sign In</h2>
              <p className="text-center text-gray-600 mb-6">Enter your credentials to sign in to your account</p>
  
              <div className="mb-4">
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                  <input
                      type="email"
                      id="username"
                      placeholder="Enter your username"
                      className="w-full p-3 mt-1 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      onChange={(e) => setUsername(e.target.value)}
                      autoComplete="username"
                  />
              </div>
  
              <div className="mb-6">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                  <input
                      type="password"
                      id="password"
                      placeholder="Enter your password"
                      className="w-full p-3 mt-1 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="current-password"
                  />
              </div>
  
              <div className="flex flex-col text-sm text-red-500 mb-4">
                  {message}
              </div>
  
              <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                  Sign In
              </button>
  
              <div className="flex justify-center mt-6">
                  <div className="text-sm text-gray-600">Don't have an account? </div>
                  <div
                      onClick={goToSignUp}
                      className="text-sm text-blue-500 cursor-pointer hover:text-blue-700 underline ml-1"
                  >
                      Sign up
                  </div>
              </div>
          </form>
      </div>
  </div>
    );
};

export default Signin;
