import React, { useState } from "react";
import emailjs from "@emailjs/browser";

const SERVICE_ID = "service_7qxqc9j";
const TEMPLATE_ID = "template_cxw284d";
const PUBLIC_KEY = "S5Nz21BapCrBFseJN";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [step, setStep] = useState(1); // 1: form, 2: verify
  const [message, setMessage] = useState("");

  const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit
  };

  const sendOtp = () => {
    const otpCode = generateOtp();
    setGeneratedOtp(otpCode);

    const templateParams = {
      user_email: email,
      otp: otpCode,
    };

    emailjs
      .send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
      .then(() => {
        setStep(2);
        setMessage("OTP sent to your email.");
      })
      .catch((error) => {
        console.error("EmailJS error:", error);
        setMessage("Failed to send OTP.");
      });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setMessage("Please enter all fields.");
      return;
    }
    sendOtp();
  };

  const handleVerifyOtp = () => {
    if (otp === generatedOtp) {
      setMessage("✅ Account created successfully!");
      // Proceed with registration logic (store in localStorage, redirect, etc.)
    } else {
      setMessage("❌ Incorrect OTP.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold mb-6">Sign Up - SonicFund</h2>

      {step === 1 && (
        <form onSubmit={handleRegister} className="flex flex-col gap-4 w-80">
          <input
            type="email"
            placeholder="Email"
            className="p-2 text-black rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="p-2 text-black rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Send OTP
          </button>
        </form>
      )}

      {step === 2 && (
        <div className="flex flex-col gap-4 w-80">
          <input
            type="text"
            placeholder="Enter OTP"
            className="p-2 text-black rounded"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />

          <button
            onClick={handleVerifyOtp}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Verify OTP
          </button>
          <button
            onClick={sendOtp}
            className="text-blue-400 text-sm underline"
          >
            Resend OTP
          </button>
        </div>
      )}

      <p className="mt-4 text-red-400">{message}</p>
    </div>
  );
};

export default SignUp;
