import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const Complete = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [transferDetails, setTransferDetails] = useState({
    amount: null,
    recipient: null,
  });

  // Retrieve state from navigation (optional)
  useEffect(() => {
    if (location.state) {
      setTransferDetails({
        amount: location.state.amount,
        recipient: location.state.recipient,
      });
    }
  }, [location.state]);

  return (
    <div className="flex min-h-screen bg-gray-950 justify-center items-center text-gray-100">
      <div className="flex flex-col justify-center items-center w-[90%] max-w-md p-8 rounded-3xl shadow-2xl bg-gradient-to-br from-gray-900 to-black border border-gray-800">
        {/* Success Icon */}
        <div className="bg-gradient-to-br from-green-500 to-green-700 w-28 h-28 rounded-full mt-4 mb-6 flex justify-center items-center text-white shadow-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-14 h-14"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </div>

        {/* Title */}
        <h1 className="font-bold text-2xl text-green-400 mb-2">
          Transfer Successful!
        </h1>

        {/* Message */}
        <p className="text-center text-gray-400 text-sm mb-4">
          Your transaction has been completed and the amount has been sent securely.
        </p>

        {/* Transaction Summary */}
        {transferDetails.amount && (
          <div className="bg-gray-800 text-sm text-gray-300 w-full rounded-xl p-4 mb-4 border border-gray-700">
            <div className="flex justify-between mb-2">
              <span className="font-medium text-gray-400">Recipient:</span>
              <span>{transferDetails.recipient || "User"}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-400">Amount:</span>
              <span>₹{parseFloat(transferDetails.amount).toFixed(2)}</span>
            </div>
          </div>
        )}

        {/* Done Button */}
        <button
          onClick={() => navigate("/dashboard")}
          className="w-full py-2 bg-gradient-to-br from-red-600 to-gray-900 hover:from-red-700 hover:to-gray-800 text-white font-semibold rounded-full shadow-md transition-all duration-300 hover:scale-105"
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default Complete;
