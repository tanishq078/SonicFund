/*  src/pages/OtpVerification.jsx  */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import axios from "axios";

const OtpVerification = () => {
  const navigate = useNavigate();

  /* -------------------------------------------------------- */
  /* pull the data we stashed during signup                   */
  /* -------------------------------------------------------- */
  const pendingRaw = localStorage.getItem("pendingSignup");
  const pending = pendingRaw ? JSON.parse(pendingRaw) : null;   // { username, firstname, lastname, password, otp }

  /* if user refreshed or hit this route directly, kick them out */
  useEffect(() => {
    if (!pending) navigate("/signup");
  }, [pending, navigate]);

  const [otpInput, setOtpInput]   = useState("");
  const [msg, setMsg]             = useState("");
  const [busy, setBusy]           = useState(false);
  const [cooldown, setCooldown]   = useState(0);                // resend timer

  /* initialise resend timer */
  useEffect(() => {
    setCooldown(60);
    const id = setInterval(() => setCooldown((t) => (t > 0 ? t - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, []);

  /* -------------------------------------------------------- */
  /* resend OTP helper                                        */
  /* -------------------------------------------------------- */
  const resendOtp = async () => {
    if (!pending) return;
    try {
      const newOtp = Math.floor(100000 + Math.random() * 900000).toString();

      await emailjs.send(
        "your_service_id",      // 🔁 replace
        "your_template_id",     // 🔁 replace
        { to_email: pending.username, otp_code: newOtp },
        "your_public_key"       // 🔁 replace
      );

      /* save new otp locally */
      localStorage.setItem( "pendingSignup", JSON.stringify({ ...pending, otp: newOtp }) );
      setMsg("A new OTP has been sent to your email.");
      setCooldown(60);
    } catch (err) {
      console.error("OTP resend failed:", err);
      setMsg("Failed to resend OTP, please try again.");
    }
  };

  /* -------------------------------------------------------- */
  /* verify OTP and create account                            */
  /* -------------------------------------------------------- */
  const handleVerify = async (e) => {
    e.preventDefault();
    if (!pending) return;

    if (otpInput !== pending.otp) {
      setMsg("Incorrect OTP, please try again.");
      return;
    }

    setBusy(true);
    try {
      /* 🔑 create the real account now that the e-mail is verified */
      const res = await axios.post(
        "https://sonic-fund-backend.vercel.app/user/signup",
        {
          username:  pending.username,
          firstname: pending.firstname,
          lastname:  pending.lastname,
          password:  pending.password,
        }
      );

      if (res.data && res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.removeItem("pendingSignup");
        navigate("/dashboard");
      } else {
        setMsg("Signup failed – no token received.");
      }
    } catch (err) {
      console.error("Signup error after OTP:", err);
      setMsg(
        err.response?.data?.msg ||
        "Something went wrong while creating your account."
      );
    } finally {
      setBusy(false);
    }
  };

  if (!pending) return null;   // safety—UI won’t flash briefly

  /* -------------------------------------------------------- */
  /* UI                                                       */
  /* -------------------------------------------------------- */
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950 text-white">
      <div className="w-full max-w-md bg-gray-900 bg-opacity-80 p-8 rounded-3xl shadow-xl">
        <h1 className="text-3xl font-extrabold text-center text-red-500 mb-4">
          Verify Your Email
        </h1>
        <p className="text-center text-gray-400 mb-6">
          Enter the 6-digit code sent to&nbsp;
          <span className="font-semibold">{pending.username}</span>
        </p>

        <form onSubmit={handleVerify}>
          <input
            type="text"
            maxLength="6"
            pattern="\d{6}"
            value={otpInput}
            onChange={(e) => setOtpInput(e.target.value)}
            placeholder="123456"
            className="w-full p-3 mb-4 text-center tracking-widest bg-gray-800 border border-gray-700 rounded-lg text-gray-300 focus:ring-2 focus:ring-red-500 focus:outline-none"
            required
          />

          {msg && (
            <div className="text-sm text-red-500 mb-4 text-center">{msg}</div>
          )}

          <button
            type="submit"
            disabled={busy}
            className="w-full py-3 px-4 font-semibold rounded-lg bg-gradient-to-r from-red-600 to-red-800 shadow-lg transition-all hover:scale-105 disabled:opacity-60"
          >
            {busy ? "Verifying…" : "Verify & Continue"}
          </button>
        </form>

        <div className="mt-6 text-center">
          {cooldown > 0 ? (
            <p className="text-gray-400 text-sm">
              Resend available in&nbsp;<span className="font-medium">{cooldown}s</span>
            </p>
          ) : (
            <button
              onClick={resendOtp}
              className="text-red-500 text-sm hover:underline"
            >
              Didn’t get the code? Resend
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;
