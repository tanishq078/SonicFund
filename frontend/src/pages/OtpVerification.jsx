// src/pages/OtpVerification.jsx
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";

const OtpVerification = () => {
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [message, setMessage] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const userEmail = location.state?.email;

  useEffect(() => {
    if (!userEmail) {
      navigate("/signup");
      return;
    }

    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(newOtp);

    emailjs.send(
      "service_7qxqc9j",       // replace with your EmailJS service ID
      "service_7qxqc9j",      // replace with your EmailJS template ID
      { to_email: userEmail, otp: newOtp },
      "S5Nz21BapCrBFseJN"        // replace with your EmailJS public key
    ).then(() => {
      console.log("OTP sent successfully");
    }).catch((err) => {
      console.error("Failed to send OTP", err);
      setMessage("Failed to send OTP. Try again.");
    });

  }, [userEmail, navigate]);

  const handleVerify = () => {
    if (otp === generatedOtp) {
      navigate("/dashboard");
    } else {
      setMessage("Incorrect OTP. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
      <div className="bg-black bg-opacity-80 p-8 rounded-3xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-red-500 mb-4">Verify Your Email</h2>
        <p className="text-center text-gray-400 mb-6">Enter the 6-digit OTP sent to {userEmail}</p>

        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          className="w-full p-3 mb-4 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 focus:ring-2 focus:ring-red-500 focus:outline-none"
        />

        <div className="text-sm text-red-500 mb-4">{message}</div>

        <button
          onClick={handleVerify}
          className="w-full bg-gradient-to-r from-red-600 to-red-800 text-white font-semibold py-3 px-4 rounded-lg hover:scale-105 transition-all"
        >
          Verify & Continue
        </button>
      </div>
    </div>
  );
};

export default OtpVerification;
