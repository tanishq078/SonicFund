import React from "react";

// More detailed dummy data
const dummyTransactions = [
  {
    id: 1,
    date: "2025-06-01",
    type: "Credit",
    amount: 1500,
    sender: "Mukul Singh",
    receiver: "You",
    status: "Completed",
  },
  {
    id: 2,
    date: "2025-06-02",
    type: "Debit",
    amount: 500,
    sender: "You",
    receiver: "Tanishq Singh2",
    status: "Completed",
  },
  {
    id: 3,
    date: "2025-06-03",
    type: "Credit",
    amount: 10000,
    sender: "Anubhav Garg",
    receiver: "You",
    status: "Pending",
  },
  {
    id: 4,
    date: "2025-06-04",
    type: "Debit",
    amount: 2500,
    sender: "You",
    receiver: "Mukul Singh",
    status: "Completed",
  },
  {
    id: 5,
    date: "2025-06-05",
    type: "Credit",
    amount: 3200,
    sender: "Tanishq Singh2",
    receiver: "You",
    status: "Completed",
  },
  {
    id: 6,
    date: "2025-06-06",
    type: "Debit",
    amount: 750,
    sender: "You",
    receiver: "Anubhav Garg",
    status: "Failed",
  },
];

const Transactions = () => {
  // Compute total credits and debits
  const totalCredits = dummyTransactions
    .filter((tx) => tx.type === "Credit")
    .reduce((sum, tx) => sum + tx.amount, 0);
  const totalDebits = dummyTransactions
    .filter((tx) => tx.type === "Debit")
    .reduce((sum, tx) => sum + tx.amount, 0);

  return (
    <div className="min-h-screen p-4 sm:p-6 bg-gray-900 bg-opacity-90 backdrop-blur-md shadow-inner overflow-y-auto">
      {/* Sticky Header */}
      <div className="sticky top-0 bg-red-700 bg-opacity-90 text-gray-50 z-10 p-4 sm:p-6 rounded-xl shadow-2xl mb-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-wider">
              Transaction History
            </h2>
            <p className="text-gray-200 mt-1 text-lg">
              Last Updated:{" "}
              <span className="font-semibold">
                {new Date().toLocaleDateString()}
              </span>
            </p>
          </div>
          <div className="text-center md:text-right space-y-1">
            <p className="text-lg text-gray-200">
              Total Credits:{" "}
              <span className="text-green-300 font-semibold">
                ₹{totalCredits.toLocaleString()}
              </span>
            </p>
            <p className="text-lg text-gray-200">
              Total Debits:{" "}
              <span className="text-red-300 font-semibold">
                ₹{totalDebits.toLocaleString()}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-gray-800 bg-opacity-75 rounded-lg shadow-lg p-4 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr className="text-left">
              <th className="px-4 py-2 text-gray-300 font-medium">Date</th>
              <th className="px-4 py-2 text-gray-300 font-medium">Type</th>
              <th className="px-4 py-2 text-gray-300 font-medium">Amount</th>
              <th className="px-4 py-2 text-gray-300 font-medium">From</th>
              <th className="px-4 py-2 text-gray-300 font-medium">To</th>
              <th className="px-4 py-2 text-gray-300 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {dummyTransactions.map((tx, idx) => (
              <tr
                key={tx.id}
                className={`${
                  idx % 2 === 0 ? "bg-gray-800" : "bg-gray-700"
                } hover:bg-gray-600 transition duration-200`}
              >
                <td className="px-4 py-3 text-gray-200">{tx.date}</td>
                <td
                  className={`px-4 py-3 font-semibold ${
                    tx.type === "Credit" ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {tx.type}
                </td>
                <td className="px-4 py-3 text-gray-200">
                  ₹{tx.amount.toLocaleString()}
                </td>
                <td className="px-4 py-3 text-gray-200">{tx.sender}</td>
                <td className="px-4 py-3 text-gray-200">{tx.receiver}</td>
                <td
                  className={`px-4 py-3 font-medium ${
                    tx.status === "Completed"
                      ? "text-green-300"
                      : tx.status === "Pending"
                      ? "text-yellow-300"
                      : "text-red-400"
                  }`}
                >
                  {tx.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transactions;
