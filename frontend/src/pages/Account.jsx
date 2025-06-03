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
        const userRes = await axios.get(
          "https://sonic-fund-backend.vercel.app/user/info",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const balanceRes = await axios.get(
          "https://sonic-fund-backend.vercel.app/account/balance",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setUser(userRes.data.user);
        setBalance(balanceRes.data.balance);
      } catch (err) {
        console.error("Error fetching account info", err);
      }
    };

    fetchData();
  }, []);

  // Fallback dummy data
  const phone = user.phone || "+91 98765 43210";
  const address = user.address || "123, Green Street, Lucknow, UP, India";
  const accountType = user.accountType || "Savings Account";
  const joinedDate = user.joinedDate || "2023-01-15";

  return (
    <div className="min-h-screen flex-1 p-6 sm:p-8 bg-gray-900 bg-opacity-90 text-gray-200 overflow-y-auto flex justify-center items-start">
      {/* Account Info Card */}
      <div className="bg-gray-800 rounded-lg shadow-xl p-6 space-y-6 max-w-md w-full">
        {/* Header */}
        <div>
          <h2 className="text-4xl font-extrabold text-red-600 tracking-wide mb-2">
            Account Details
          </h2>
          <p className="text-gray-400 text-sm">
            Here’s your personal account information and balance.
          </p>
        </div>

        <div>
          <p className="text-lg text-gray-400 font-semibold">Name</p>
          <p className="text-white text-2xl font-bold">
            {user.firstname} {user.lastname}
          </p>
        </div>

        <div>
          <p className="text-lg text-gray-400 font-semibold">Email</p>
          <p className="text-white text-lg">{user.email || user.username}</p>
        </div>

        <div>
          <p className="text-lg text-gray-400 font-semibold">Phone</p>
          <p className="text-white text-lg">{phone}</p>
        </div>

        <div>
          <p className="text-lg text-gray-400 font-semibold">Address</p>
          <p className="text-white text-lg">{address}</p>
        </div>

        <div>
          <p className="text-lg text-gray-400 font-semibold">Account Type</p>
          <p className="text-white text-lg">{accountType}</p>
        </div>

        <div>
          <p className="text-lg text-gray-400 font-semibold">Member Since</p>
          <p className="text-white text-lg">
            {new Date(joinedDate).toLocaleDateString()}
          </p>
        </div>

        <div className="pt-4 border-t border-gray-700">
          <p className="text-3xl font-extrabold text-green-400">
            Balance: ₹{balance.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Account;
