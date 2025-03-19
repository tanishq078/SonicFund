import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import image from "../image/image.jpg";
import image2 from "../image/image2.jpg";

const Firstpage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkTokenValidity = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/");
        return;
      }

      try {
        const response = await axios.get("https://sonic-fund-backend.vercel.app/user/check", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.data) {
          navigate("/dashboard");
        }
      } catch (error) {
        console.error("Token validation failed", error);
        navigate("/");
      }
    };

    checkTokenValidity();
  }, [navigate]);

  const goToSignUp = () => navigate("/signup");
  const goToSignIn = () => navigate("/signin");
  const scrollToAbout = () =>
    document.getElementById("about-section").scrollIntoView({ behavior: "smooth" });
  const scrollToContact = () =>
    document.getElementById("contact-section").scrollIntoView({ behavior: "smooth" });

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      {/* Header */}
      <header className="w-full flex justify-between items-center px-6 py-4 bg-gray-900 bg-opacity-70 shadow-lg backdrop-blur-md">
        <div className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700">
          SonicFund
        </div>
        <nav className="flex space-x-4">
          <button className="text-red-400 hover:text-red-500 font-semibold transition-all" onClick={goToSignUp}>
            Sign Up
          </button>
          <button className="text-red-400 hover:text-red-500 font-semibold transition-all" onClick={goToSignIn}>
            Sign In
          </button>
          <button
            className="text-red-400 hover:text-red-500 font-semibold transition-all"
            onClick={scrollToAbout}
          >
            About Us
          </button>
          <button
            className="text-red-400 hover:text-red-500 font-semibold transition-all"
            onClick={scrollToContact}
          >
            Contact Us
          </button>
        </nav>
      </header>

      {/* Main Section */}
      <main className="flex flex-col-reverse md:flex-row justify-center items-center flex-grow px-4 py-24 gap-x-16">
        {/* Left Content */}
        <div className="flex flex-col space-y-10 text-center md:text-left">
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight text-red-500">
            Welcome to <span className="text-red-700">SonicFund</span>
          </h1>
          <p className="text-lg font-light leading-relaxed text-gray-300 text-justify">
            SonicFund is your gateway to secure, dummy fund transfers and seamless online transactions.
            Join our platform today and experience intuitive financial solutions tailored for learners
            and developers.
          </p>
          <p className="text-lg font-light leading-relaxed text-gray-300 text-justify">
            Experiment with dummy funds, test your projects, or simply explore the capabilities of
            safe financial systems in a controlled environment.
          </p>
          <p className="text-lg font-light leading-relaxed text-gray-300 text-justify">
            Discover endless possibilities in the financial technology world while ensuring your learning
            remains practical, secure, and risk-free.
          </p>
          <div className="flex justify-center md:justify-start space-x-4 mt-4">
            <button
              className="w-40 h-12 bg-gradient-to-r from-red-600 to-red-800 text-white font-semibold rounded-full shadow-lg transform transition-all hover:scale-105 hover:shadow-xl"
              onClick={goToSignUp}
            >
              Sign Up
            </button>
            <button
              className="w-40 h-12 bg-gradient-to-r from-gray-700 to-gray-900 text-white font-semibold rounded-full shadow-lg transform transition-all hover:scale-105 hover:shadow-xl"
              onClick={goToSignIn}
            >
              Sign In
            </button>
          </div>
        </div>

        {/* Right Image Section */}
        <div className="flex justify-center items-center w-full md:w-1/2 mt-16 md:mt-0">
          <img
            src={image}
            alt="SonicFund Illustration"
            className="w-full max-w-lg md:max-w-2xl object-contain rounded-lg shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl"
          />
        </div>
      </main>

      {/* About Section */}
      <section id="about-section" className="py-24 px-6 bg-gray-800 text-gray-200 flex flex-col-reverse md:flex-row items-center gap-x-16">
        {/* Left Image Section */}
        <div className="flex justify-center items-center w-full md:w-1/2 mt-16 md:mt-0">
          <img
            src={image2} 
            alt="About SonicFund"
            className="w-full max-w-lg md:max-w-2xl object-contain rounded-lg shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl"
          />
        </div>

        {/* Right Content */}
        <div className="flex flex-col space-y-8 text-center md:text-left w-full md:w-1/2">
          <h2 className="text-5xl font-bold text-red-500">About SonicFund</h2>
          <p className="text-lg font-light leading-relaxed text-gray-300 text-justify">
            SonicFund is an innovative project designed to simplify digital transactions for educational
            and testing purposes. With our platform, users can safely simulate fund transfers using dummy
            data in a controlled, secure environment.
          </p>
          <p className="text-lg font-light leading-relaxed text-gray-300 text-justify">
            Whether you are building your first fintech application, exploring APIs, or learning about
            secure transactions, SonicFund provides all the tools you need. Our mission is to empower
            users with a platform that prioritizes simplicity, security, and functionality.
          </p>
        </div>
      </section>

      {/* Contact Us Section */}
      <section id="contact-section" className="py-12 px-6 bg-gray-900 text-gray-300">
        <h2 className="text-4xl font-bold text-center text-red-500 mb-6">Contact Us</h2>
        <form className="max-w-2xl mx-auto bg-gray-800 bg-opacity-80 p-8 rounded-lg shadow-lg backdrop-blur-md">
          <div className="mb-6">
            <label className="block text-gray-300 font-semibold mb-2">Name</label>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-300 font-semibold mb-2">Email</label>
            <input
              type="email"
              placeholder="Your Email"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-300 font-semibold mb-2">Message</label>
            <textarea
              placeholder="Your Message"
              rows="4"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold py-3 rounded-lg shadow-lg transform transition-all hover:scale-105 hover:shadow-xl"
          >
            Send Message
          </button>
        </form>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-900 text-gray-400 py-6 text-center">
        <div className="container mx-auto">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} SonicFund. All rights reserved.
          </p>
          <p className="text-sm mt-2">
            Designed and developed with ❤️ by the SonicFund team.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Firstpage;
