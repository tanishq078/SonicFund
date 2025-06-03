import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";

const Transfer = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");

  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);

  // Fetch user balance
  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("https://sonic-fund-backend.vercel.app/account/balance", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBalance(res.data.balance);
      } catch (err) {
        setMessage("Error fetching balance");
        console.error("Balance fetch error:", err);
      }
    };

    fetchBalance();
  }, []);

  // Transfer handler
  const transfer = async () => {
    const numericAmount = parseFloat(amount);

    if (!numericAmount || numericAmount <= 0) {
      setMessage("Enter a valid amount greater than ₹0");
      return;
    }

    if (numericAmount > balance) {
      setMessage("Insufficient balance for this transfer");
      return;
    }

    try {
      setLoading(true);
      setMessage("");
      const token = localStorage.getItem("token");

      await axios.post(
        "https://sonic-fund-backend.vercel.app/account/transfer",
        {
          to: id,
          amount: numericAmount,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      navigate("/success");
    } catch (error) {
      const errMsg =
        error.response?.data?.message || "Error occurred while transferring money";
      setMessage(errMsg);
    } finally {
      setLoading(false);
    }
  };

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
            {name?.charAt(0).toUpperCase()}
          </div>
        </div>

        {/* Balance Info */}
        <div className="text-sm text-gray-400 mb-2">
          Available Balance: ₹{balance.toFixed(2)}
        </div>

        {/* Amount Label */}
        <div className="mr-auto mb-2 font-semibold text-gray-400">
          Amount (in ₹)
        </div>

        {/* Amount Input */}
        <input
          onChange={(e) => setAmount(e.target.value)}
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
          className={`flex bg-gradient-to-br from-red-700 to-black w-full mt-4 cursor-pointer rounded-lg text-white text-lg h-12 justify-center items-center font-bold shadow-lg transition-transform duration-300 ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:scale-105 hover:from-red-800 hover:to-gray-900"
          }`}
        >
          {loading ? "Transferring..." : "Initiate Transfer"}
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
