import { useEffect, useState } from "react";
import Users from "../components/users";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";

const Transfer = () => {
  const navigate=useNavigate()
  const[searchParams]=useSearchParams();
  const id = searchParams.get("id")
  const name = searchParams.get("name");
const[amount,setamount]=useState()
const [message,setmessage]=useState("")


  
    const transfer=async()=>{

      if(amount<=0|| !amount){
        setmessage("Enter the valid input ")
        
      }
      else{
      try{
      const token=localStorage.getItem('token')
   const response = axios.post("https://sonic-fund-backend.vercel.app/account/transfer",{
    to:id,
    amount:amount
    
    },{
    headers:{
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',

    }
    })
    navigate('/success')
    }
    catch(error){
      setmessage("error occured while transfering money")

    }
  }

  }
  


  
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-950 text-gray-200">
  <div className="flex flex-col justify-start items-center w-80 rounded-lg shadow-2xl bg-gray-900 bg-opacity-90 backdrop-blur-md p-6">
    {/* Header */}
    <div className="font-extrabold text-3xl mb-6 text-gray-100 tracking-wide">
      Send Money
    </div>

    {/* User Avatar */}
    <div className="flex justify-center items-center mb-6">
      <div
        className="flex rounded-full border-4 border-red-600 h-16 w-16 bg-gradient-to-br from-red-600 to-gray-800 text-gray-100 text-2xl items-center justify-center font-semibold shadow-lg"
        style={{ color: "#ffffff" }}
      >
        {name.charAt(0).toUpperCase()}
      </div>
    </div>

    {/* Amount Label */}
    <div className="mr-auto mb-2 font-semibold text-gray-400">
      Amount (in ₹)
    </div>

    {/* Amount Input */}
    <input
      onChange={(e) => setamount(e.target.value)}
      className="shadow-md appearance-none border border-gray-700 bg-gray-800 text-gray-300 rounded-lg w-full py-2 px-3 mb-4 leading-tight focus:outline-none focus:ring focus:ring-red-500"
      id="amount"
      type="number"
      min="0"
      step="0.01"
      placeholder="Enter Amount"
    />

    {/* Transfer Button */}
    <div
      onClick={transfer}
      className="flex bg-gradient-to-br from-red-700 to-black w-full mt-4 cursor-pointer rounded-lg text-white text-lg h-12 justify-center items-center font-bold shadow-lg hover:from-red-800 hover:to-gray-900 hover:scale-105 transition-transform duration-300"
    >
      Initiate Transfer
    </div>

    {/* Error Message */}
    {message && (
      <div className="text-red-500 text-sm mt-4 text-center">{message}</div>
    )}
  </div>
</div>

  );
};

export default Transfer;
