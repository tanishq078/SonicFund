import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Firstpage = () => {
  const navigate = useNavigate();

  const checkTokenValidity = async () => {
  
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/');
        return;
      }
      
  
      const response = await axios.get("http://localhost:3000/user/check", {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });
  
      if(response.data){
        navigate('/dashboard')
      } // Handle the response data here
  
    
  };
  
  // Call the function to check token validity
  checkTokenValidity();

  const goToSignUp = () => {
    navigate('/signup');
  };

  const goToSignIn = () => {
    navigate('/signin');
  };

  return (
    <>
  <div className="flex flex-col min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 justify-center items-center">
    <div className="font-bold text-4xl text-white mb-8 shadow-md">
      Welcome to <span className="text-yellow-300">SonicFund</span>
    </div>
    <div className="flex space-x-6">
      <button
        className="w-32 h-10 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
        onClick={goToSignUp}
      >
        Sign Up
      </button>
      <button
        className="w-32 h-10 bg-purple-600 text-white text-lg font-semibold rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-300"
        onClick={goToSignIn}
      >
        Sign In
      </button>
    </div>
  </div>
</>
  );
};

export default Firstpage;
