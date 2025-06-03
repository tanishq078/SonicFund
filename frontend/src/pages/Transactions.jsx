import React from "react";

const dummyTransactions = [
  { id: 1, date: "2025-06-01", amount: 1500, type: "Credit", sender: "Alice", receiver: "You" },
  { id: 2, date: "2025-06-02", amount: 500, type: "Debit", sender: "You", receiver: "Bob" },
  { id: 3, date: "2025-06-03", amount: 10000, type: "Credit", sender: "Charlie", receiver: "You" },
];

const Transactions = () => {
  return (
    <div className="p-6 text-gray-200">
      <h2 className="text-3xl font-bold mb-6 text-red-500">Transaction History</h2>
      <div className="bg-gray-800 rounded-lg shadow-lg p-4 overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-400 border-b border-gray-700">
              <th className="p-2">Date</th>
              <th className="p-2">Type</th>
              <th className="p-2">Amount</th>
              <th className="p-2">From</th>
              <th className="p-2">To</th>
            </tr>
          </thead>
          <tbody>
            {dummyTransactions.map((tx) => (
              <tr key={tx.id} className="hover:bg-gray-700 transition duration-200">
                <td className="p-2">{tx.date}</td>
                <td className={`p-2 font-bold ${tx.type === "Credit" ? "text-green-400" : "text-red-400"}`}>
                  {tx.type}
                </td>
                <td className="p-2">₹{tx.amount.toLocaleString()}</td>
                <td className="p-2">{tx.sender}</td>
                <td className="p-2">{tx.receiver}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transactions;
