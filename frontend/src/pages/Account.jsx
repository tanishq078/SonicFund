import { useEffect, useState } from "react";
import axios from "axios";

const Account = () => {
  const [user, setUser] = useState({});
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const fetchData = async () => {
      try {
        const userRes = await axios.get("https://sonic-fund-backend.vercel.app/user/info", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const balanceRes = await axios.get("https://sonic-fund-backend.vercel.app/account/balance", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(userRes.data.user);
        setBalance(balanceRes.data.balance);
      } catch (err) {
        console.error("Error fetching account info", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 text-gray-200">
      <h2 className="text-3xl font-bold text-red-500 mb-6">Account Details</h2>
      <div className="bg-gray-800 rounded-lg shadow-xl p-6 space-y-4">
        <p><span className="text-gray-400">Name:</span> {user.firstname} {user.lastname}</p>
        <p><span className="text-gray-400">Username:</span> {user.username}</p>
        <p><span className="text-gray-400">Email:</span> {user.username}</p>
        <p className="text-2xl font-bold text-green-400">Balance: ₹{balance.toLocaleString()}</p>
      </div>
    </div>
  );
};

export default Account;
