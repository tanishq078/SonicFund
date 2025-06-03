import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaBars, FaTimes } from "react-icons/fa";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [data, setData] = useState(null);
  const [firstname, setFirstname] = useState("User");
  const [lastname, setLastname] = useState("Three");
  const [username, setUsername] = useState("user@user");
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", route: "/dashboard" },
    { name: "Transactions", route: "/transactions" },
    { name: "Deposit", route: "/deposit" },
    { name: "Chatbot", route: "/chatbot" },
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://sonic-fund-backend.vercel.app/account/balance",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setData(response.data.balance);
      } catch (error) {
        console.error("Error fetching balance:", error);
        navigate("/");
      }
    };

    fetchData();
  }, [navigate]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await axios.get(
          "https://sonic-fund-backend.vercel.app/user/info",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (response?.data?.user) {
          setFirstname(response.data.user.firstname);
          setLastname(response.data.user.lastname);
          setUsername(response.data.user.username);
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, []);

  useEffect(() => {
    const fetchAllUsers = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await axios.get(
          `https://sonic-fund-backend.vercel.app/user/bulk?filter=${filter}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (Array.isArray(response?.data?.users)) {
          setUsers(response.data.users);
        } else {
          setUsers([]);
        }
      } catch (error) {
        console.error("Error fetching all users:", error);
        setUsers([]);
      }
    };

    fetchAllUsers();
  }, [filter]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const goToTransfer = (user) => {
    const queryParams = new URLSearchParams({
      id: user._id,
      name: user.firstname,
    }).toString();
    navigate(`/transfer?${queryParams}`);
  };

  return (
    <div className="flex min-h-screen bg-gray-950 text-gray-200">
      {/* Sidebar */}
      <div
        className={`fixed lg:static z-50 top-0 left-0 h-full transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } w-64 bg-black bg-opacity-90 shadow-xl flex flex-col`}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <h1 className="text-3xl font-extrabold text-red-600">SONICFUND</h1>
          <FaTimes
            className="lg:hidden cursor-pointer text-white"
            onClick={() => setSidebarOpen(false)}
          />
        </div>
        <nav className="flex-1 overflow-y-auto px-4 py-2">
          {menuItems.map((item, idx) => (
            <div
              key={idx}
              onClick={() => {
                navigate(item.route);
                setSidebarOpen(false);
              }}
              className={`p-3 rounded-md cursor-pointer mt-2 transition-all ${
                location.pathname === item.route
                  ? "bg-red-600 text-white"
                  : "text-gray-400 hover:bg-red-700 hover:text-white"
              }`}
            >
              {item.name}
            </div>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-800">
          <button
            onClick={handleLogout}
            className="w-full bg-red-700 hover:bg-red-800 py-2 rounded-md font-bold"
          >
            Log Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-64">
        {/* Topbar for mobile */}
        <div className="lg:hidden flex items-center justify-between bg-black bg-opacity-90 px-4 py-3 shadow-md">
          <h2 className="text-xl font-bold text-red-500">Dashboard</h2>
          <FaBars
            className="text-white text-xl cursor-pointer"
            onClick={() => setSidebarOpen(true)}
          />
        </div>

        {/* Dashboard Content */}
        <main className="p-4 md:p-8 bg-gray-900 min-h-screen overflow-y-auto">
          {/* Welcome Section */}
          <div className="bg-gradient-to-br from-black via-red-800 to-gray-800 p-6 rounded-xl mb-6 shadow-2xl">
            <div className="flex flex-col md:flex-row justify-between">
              <div>
                <h2 className="text-3xl font-bold text-white mb-1">
                  Welcome Back, {firstname}!
                </h2>
                <p className="text-green-400">
                  Last Received: ₹{(Math.floor(Math.random() * 900) + 100).toLocaleString()}
                </p>
              </div>
              <div className="mt-4 md:mt-0 text-right">
                <h3 className="text-4xl font-extrabold text-white">
                  ₹{data?.toLocaleString()}
                </h3>
                <p className="text-sm text-gray-300">Total Balance</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 mt-6">
              {["Transfer Money", "Add Money", "Withdraw"].map((label, idx) => (
                <button
                  key={idx}
                  className="px-4 py-2 bg-gray-800 text-gray-200 rounded-md hover:bg-red-600 hover:scale-105 transition-transform font-semibold"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Payment Systems + Search */}
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-gray-800 p-5 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4 text-white">Linked Payment Systems</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {["Visa", "PayPal", "Blockchain"].map((method, idx) => (
                  <div
                    key={idx}
                    className="bg-gradient-to-br from-red-700 to-black text-white font-semibold text-center p-4 rounded-lg hover:scale-105 transition-transform"
                  >
                    {method}
                  </div>
                ))}
                <div className="flex items-center justify-center bg-gray-700 rounded-lg cursor-pointer text-3xl text-gray-300 hover:bg-gray-600">
                  +
                </div>
              </div>
            </div>

            <div className="bg-black p-5 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-white">Search Users</h3>
              <input
                type="text"
                onChange={(e) => setFilter(e.target.value)}
                className="w-full p-2 bg-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-600"
                placeholder="Search users..."
              />
            </div>
          </div>

          {/* Users List */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-4 text-white">Users List</h3>
            <div className="space-y-4 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-red-700 scrollbar-track-gray-900 pr-2">
              {users.map((user, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center bg-gray-800 p-4 rounded-md hover:bg-gray-700 transition"
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-red-700 flex items-center justify-center text-white font-bold">
                      {user.firstname.charAt(0)}
                    </div>
                    <div className="ml-4">
                      <p className="font-semibold text-white">
                        {user.firstname} {user.lastname}
                      </p>
                      <p className="text-sm text-gray-400">{user.username}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => goToTransfer(user)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-bold transition"
                  >
                    Send Money
                  </button>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
