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
   const response = axios.post("http://localhost:3000/account/transfer",{
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
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
  <div className="flex flex-col justify-start items-center w-80 rounded-lg shadow-2xl h-auto bg-white p-6">
    <div className="font-bold text-3xl mb-6 text-gray-800">Send Money</div>
    
    <div className="flex justify-start">
      <Users 
        className="flex rounded-full border-inherit border-2 mt-3 mb-2 bg-green-500 text-3xl items-center justify-center font-semibold" 
        users={name} 
        firstletter={name.charAt(0).toUpperCase()}  
        color="#5edc5e"
      />
    </div>
    
    <div className="mr-36 mb-2 font-semibold text-gray-700">Amount (in ₹)</div>
    
    <input 
      onChange={(e) => setamount(e.target.value)}
      className="shadow appearance-none border rounded-lg w-11/12 py-2 px-3 ml-2 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-teal-400"
      id="amount"
      type="number"
      min="0"
      step="0.01"
      placeholder="Enter Amount"
    />
    
    <div 
      onClick={transfer} 
      className="flex bg-green-600 w-11/12 mt-5 hover:bg-green-800 cursor-pointer rounded-lg text-white text-lg h-12 justify-center items-center transition duration-300"
    >
      Initiate Transfer
    </div>
    
    {message && <div className="text-red-500 text-sm mt-2">{message}</div>}
  </div>
</div>
  );
};

export default Transfer;
