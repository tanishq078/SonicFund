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
            const response = await axios.post("http://localhost:3000/user/signup", {
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
        <>
        <div className="flex justify-center items-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 min-h-screen p-4">
          <div className="flex flex-col bg-white shadow-xl rounded-xl w-full max-w-md">
            <form className="w-full p-6 sm:p-8" onSubmit={handleSubmit}>
              <div className="text-center mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Sign Up</h1>
                <p className="text-gray-600 text-sm sm:text-base">
                  Enter your information to create an account
                </p>
              </div>
      
              {/* Input Fields */}
              <div className="space-y-3">
                <Input 
                  label="Username" 
                  id="username" 
                  placeholder="Enter your username" 
                  type="email" 
                  onchange={(e) => setUsername(e.target.value)} 
                  autocomplete="username" 
                />
                <Input 
                  label="First Name" 
                  id="first" 
                  placeholder="Enter your First Name" 
                  type="text" 
                  onchange={(e) => setFirstname(e.target.value)} 
                  autocomplete="given-name" 
                />
                <Input 
                  label="Last Name" 
                  id="last" 
                  placeholder="Enter your Last Name" 
                  type="text" 
                  onchange={(e) => setLastname(e.target.value)} 
                  autocomplete="family-name" 
                />
                <Input 
                  label="Password" 
                  id="password" 
                  placeholder="Enter your password" 
                  type="password" 
                  onchange={(e) => setPassword(e.target.value)} 
                  autocomplete="current-password" 
                />
              </div>
      
              {/* Error Message */}
              <div className="text-sm text-red-500 mt-2">
                {message}
              </div>
      
              {/* Submit Button */}
              <div className="mt-5">
                <button 
                  className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
                  type="submit"
                >
                  Sign Up
                </button>
              </div>
      
              {/* Footer */}
              <div className="flex justify-center items-center mt-4 text-sm">
                <p className="text-gray-700">Already have an account?</p>
                <button 
                  onClick={goToSignIn} 
                  className="text-blue-500 hover:underline ml-1 focus:outline-none"
                >
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
};

export default Signup;
