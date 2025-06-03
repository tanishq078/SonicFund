import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();

  // 🔴 Sidebar Links
  const sidebarLinks = [
    { name: "Dashboard", route: "/dashboard" },
    { name: "Transactions", route: "/transactions" },
    { name: "Pay", route: "/transfer" },
    { name: "Receive", route: "/receive" },
    { name: "Exchange", route: "/exchange" },
    { name: "Recipients", route: "/recipients" },
    { name: "Crypto", route: "/crypto" },
    { name: "Deposit Money", route: "/deposit" },
    { name: "Withdraw Money", route: "/withdraw" },
    { name: "Account", route: "/account" },
  ];

  // 🔴 Local States
  const [balance, setBalance] = useState(10000);
  const [transactions] = useState([
    { id: 1, type: "Deposit", amount: 5000, date: "2025-06-10" },
    { id: 2, type: "Withdraw", amount: 2000, date: "2025-06-11" },
    { id: 3, type: "Transfer", amount: 1500, date: "2025-06-12" },
  ]);
  const [users] = useState([
    { id: 1, firstname: "Alice", lastname: "Smith", username: "alice@demo.com" },
    { id: 2, firstname: "Bob", lastname: "Johnson", username: "bob@demo.com" },
  ]);
  const [filter, setFilter] = useState("");

  // 🔴 User Info Dummy
  const [firstname, setFirstname] = useState("User");
  const [lastname, setLastname] = useState("Demo");
  const [username, setUsername] = useState("user@demo.com");

  // 🔴 Dummy Balance Fetch (Optional)
  useEffect(() => {
    // simulate fetch
    const token = localStorage.getItem('token');
    if (!token) navigate('/');
  }, [navigate]);

  // 🔴 Feature Handlers
  const addMoney = (amount) => setBalance(balance + amount);

  const withdrawMoney = (amount) => {
    if (balance >= amount) {
      setBalance(balance - amount);
    } else {
      alert("Insufficient funds");
    }
  };

  const transferMoney = (amount) => {
    if (balance >= amount) {
      setBalance(balance - amount);
      alert(`Transfer of ₹${amount} successful!`);
    } else {
      alert("Insufficient funds");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate('/');
  };

  const handlePaymentClick = (system) => {
    alert(`${system} clicked! (Demo)`);
  };

  const filteredUsers = users.filter(u =>
    u.firstname.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-950 text-gray-200">
      {/* Sidebar */}
      <aside className="w-72 bg-black bg-opacity-90 backdrop-blur-lg flex flex-col shadow-xl border-r border-gray-800">
        <div className="p-6 text-center">
          <div className="text-4xl font-extrabold text-red-600 tracking-wide mb-4 uppercase shadow-md">
            SonicFund
          </div>
        </div>
        <nav className="flex-1 mt-2">
          <ul>
            {sidebarLinks.map((item, idx) => (
              <li
                key={idx}
                onClick={() => navigate(item.route)}
                className="px-6 py-3 text-gray-400 hover:bg-red-600 hover:text-white cursor-pointer transition-all duration-300 rounded-lg"
              >
                {item.name}
              </li>
            ))}
          </ul>
        </nav>
        {/* Logout */}
        <div className="p-6 mt-auto">
          <button
            onClick={handleLogout}
            className="w-full py-2 bg-red-700 text-white font-semibold rounded-lg hover:bg-red-800 hover:scale-105 transition-all duration-300"
          >
            Log Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-900 bg-opacity-90 backdrop-blur-md shadow-inner">
        {/* Header */}
        <div className="bg-gradient-to-br from-black via-red-800 to-gray-800 p-6 rounded-xl shadow-2xl mb-6">
          <div className="flex justify-between items-center">
            {/* Welcome */}
            <div>
              <h2 className="text-4xl font-extrabold text-gray-50 tracking-wider">
                Welcome Back, {firstname}!
              </h2>
              <p className="text-gray-400 mt-1 text-lg">
                Last Received:{" "}
                <span className="text-green-400">
                  ₹{(Math.floor(Math.random() * 900) + 100).toLocaleString()}
                </span>
              </p>
            </div>
            {/* Balance */}
            <div>
              <h3 className="text-6xl font-black text-gray-50">
                ₹{balance.toLocaleString()}
              </h3>
              <p className="text-gray-500">Total Balance</p>
            </div>
          </div>

          <div className="flex space-x-4 mt-6">
            <button
              onClick={() => transferMoney(1000)}
              className="px-6 py-2 bg-gray-800 text-gray-200 font-bold uppercase rounded-lg shadow-lg hover:bg-red-600 hover:scale-105 transition-all duration-300"
            >
              Transfer Money
            </button>
            <button
              onClick={() => addMoney(2000)}
              className="px-6 py-2 bg-gray-800 text-gray-200 font-bold uppercase rounded-lg shadow-lg hover:bg-green-600 hover:scale-105 transition-all duration-300"
            >
              Add Money
            </button>
            <button
              onClick={() => withdrawMoney(1000)}
              className="px-6 py-2 bg-gray-800 text-gray-200 font-bold uppercase rounded-lg shadow-lg hover:bg-yellow-600 hover:scale-105 transition-all duration-300"
            >
              Withdraw
            </button>
          </div>
        </div>

        {/* Linked Payment Systems */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="col-span-2 bg-gray-800 bg-opacity-75 p-6 rounded-lg shadow-lg backdrop-blur-md">
            <h3 className="text-2xl font-bold mb-4 text-gray-300">
              Linked Payment Systems
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {["Visa", "PayPal", "Blockchain"].map((system, idx) => (
                <div
                  key={idx}
                  onClick={() => handlePaymentClick(system)}
                  className="bg-gradient-to-br from-red-700 to-black text-center text-white font-bold p-4 rounded-lg shadow-lg hover:scale-105 hover:shadow-red-500/50 transition-transform duration-300 cursor-pointer"
                >
                  {system}
                </div>
              ))}
              <div className="flex items-center justify-center bg-gray-700 rounded-lg shadow cursor-pointer hover:bg-gray-600 transition duration-300">
                <span className="text-4xl font-bold text-gray-400">+</span>
              </div>
            </div>
          </div>
          <div className="bg-black bg-opacity-75 p-6 rounded-lg shadow-lg backdrop-blur-md">
            <h3 className="text-2xl font-semibold mb-4 text-gray-400">
              Search Users
            </h3>
            <input
              onChange={(e) => setFilter(e.target.value)}
              className="w-full py-2 px-4 rounded-lg bg-gray-700 text-gray-300 focus:ring focus:ring-red-500"
              type="text"
              placeholder="Search Users..."
            />
          </div>
        </div>

        {/* Transactions */}
        <div className="mt-6 bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-4 text-gray-300">
            Transactions
          </h3>
          <div className="space-y-4">
            {transactions.map(tx => (
              <div
                key={tx.id}
                className="flex justify-between items-center bg-gray-700 p-4 rounded-lg shadow-md"
              >
                <div className="text-gray-200">
                  {tx.date} - {tx.type}
                </div>
                <div className="text-green-400 font-bold">
                  ₹{tx.amount.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* User List */}
        <div className="mt-6">
          <h3 className="text-2xl font-semibold mb-4 text-gray-300">
            Users List
          </h3>
          <div className="space-y-4">
            {filteredUsers.map(user => (
              <div
                key={user.id}
                className="flex justify-between items-center bg-gray-800 bg-opacity-75 p-4 rounded-lg shadow-lg hover:bg-gray-700 transition-all duration-300"
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-red-700 text-white flex items-center justify-center text-lg font-bold shadow-lg">
                    {user.firstname.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <p className="text-gray-200 font-semibold">
                      {user.firstname} {user.lastname}
                    </p>
                    <p className="text-gray-500 text-sm">{user.username}</p>
                  </div>
                </div>
                <button
                  onClick={() => transferMoney(500)}
                  className="px-4 py-2 bg-red-700 text-white font-semibold rounded-lg hover:bg-red-600 hover:scale-105 transition-all duration-300"
                >
                  Send Money
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
