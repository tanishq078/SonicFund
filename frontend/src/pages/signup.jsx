import Input from "../components/inputs";
import Heading from "../components/heading";
import Subheading from "../components/subheading";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import emailjs from "@emailjs/browser";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(""); // Add email field
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

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

  const validatePassword = (password) => {
    if (password && password.length < 8) {
      return "Password should be at least 8 characters long";
    } else {
      return '';
    }
  };

  const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const sendOtp = async () => {
    if (!email || !firstname) {
      setMessage("Please enter email and first name before sending OTP");
      return;
    }

    const newOtp = generateOtp();
    setGeneratedOtp(newOtp);

    const templateParams = {
      to_name: firstname,
      to_email: email,
      otp_code: newOtp,
    };

    try {
      await emailjs.send(
        "your_service_id",
        "your_template_id",
        templateParams,
        "your_public_key"
      );
      setIsOtpSent(true);
      setMessage("OTP sent to your email");
    } catch (error) {
      console.error("EmailJS error:", error);
      setMessage("Failed to send OTP. Please try again.");
    }
  };

  const handleOtpVerification = () => {
    if (otp === generatedOtp) {
      setIsOtpVerified(true);
      setMessage("OTP verified successfully");
    } else {
      setMessage("Invalid OTP");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationMessage = validatePassword(password);
    if (validationMessage) {
      setMessage(validationMessage);
      return;
    }

    if (!username || !firstname || !lastname || !password || !email) {
      setMessage("All fields are required");
      return;
    }

    if (!isOtpVerified) {
      setMessage("Please verify OTP before signup");
      return;
    }

    try {
      const response = await axios.post("https://sonic-fund-backend.vercel.app/user/signup", {
        username,
        firstname,
        lastname,
        password
      });

      if (response.data && response.data.token) {
        localStorage.setItem("token", response.data.token);
        navigate('/dashboard');
      } else {
        setMessage('Signup failed: No token received');
      }
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

          <div className="space-y-4">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm text-gray-300 mb-1">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 bg-gray-800 text-gray-300 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            {/* Send OTP */}
            <div className="flex justify-between items-center">
              <button
                type="button"
                onClick={sendOtp}
                className="text-sm text-red-500 hover:underline"
              >
                {isOtpSent ? "Resend OTP" : "Send OTP"}
              </button>
            </div>

            {/* OTP Input */}
            {isOtpSent && !isOtpVerified && (
              <div>
                <label htmlFor="otp" className="block text-sm text-gray-300 mb-1">Enter OTP</label>
                <input
                  id="otp"
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full p-3 bg-gray-800 text-gray-300 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <button
                  type="button"
                  onClick={handleOtpVerification}
                  className="w-full mt-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg"
                >
                  Verify OTP
                </button>
              </div>
            )}

            {/* Other Inputs */}
            <div>
              <label htmlFor="username" className="block text-sm text-gray-300 mb-1">Username</label>
              <input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 bg-gray-800 text-gray-300 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
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
                className="w-full p-3 bg-gray-800 text-gray-300 border border-gray-700 rounded-lg"
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
                className="w-full p-3 bg-gray-800 text-gray-300 border border-gray-700 rounded-lg"
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
                className="w-full p-3 bg-gray-800 text-gray-300 border border-gray-700 rounded-lg"
              />
            </div>
          </div>

          {message && <div className="text-sm text-red-500 mt-2">{message}</div>}

          <div className="mt-5">
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg shadow-lg"
              disabled={!isOtpVerified}
            >
              Sign Up
            </button>
          </div>

          <div className="flex justify-center items-center mt-4 text-sm">
            <p className="text-gray-400">Already have an account?</p>
            <button
              onClick={goToSignIn}
              className="text-red-500 hover:underline ml-1"
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
