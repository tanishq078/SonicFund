import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [firstname, setFirstname] = useState("User");
  const [lastname, setLastname] = useState("Three");
  const [username, setUsername] = useState("user@user");
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/'); // Redirect to login if no token is found
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axios.get('https://sonic-fund-backend.vercel.app/account/balance', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        });
        setData(response.data.balance);
      } catch (error) {
        console.error('Error fetching balance:', error);
        navigate('/');
      }
    };

    fetchData();
  }, [navigate]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem('token');
  
      if (!token) {
        console.error('No token found, user is not authenticated');
        return;
      }
  
      try {
        const response = await axios.get("https://sonic-fund-backend.vercel.app/user/info", {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        });
        console.log("User Info Response:", response.data);

        // Ensure response data is valid and contains 'user' object
        if (response && response.data && response.data.user) {
          setFirstname(response.data.user.firstname);
          setLastname(response.data.user.lastname);
          setUsername(response.data.user.username);
        } else {
          console.error('Invalid user data format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };
  
    fetchUserInfo();
  }, []);
  
  useEffect(() => {
    const fetchAllUsers = async () => {
      const token = localStorage.getItem('token');
  
      if (!token) {
        console.error('No token found, user is not authenticated');
        return;
      }
  
      try {
        const response = await axios.get(`https://sonic-fund-backend.vercel.app/user/bulk?filter=${filter}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
  
        // Check if response and response.data are valid
        if (response && response.data && Array.isArray(response.data.users)) {
          setUsers(response.data.users);
        } else {
          console.error('Invalid data format:', response.data);
          setUsers([]);  // Clear users in case of invalid data
        }
      } catch (error) {
        console.error('Error fetching all users:', error);
        setUsers([]);  // Clear users in case of error
      }
    };
  
    fetchAllUsers();
  }, [filter]);
  

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const goToTransfer = (user) => {
    const queryParams = new URLSearchParams({
      id: user._id,
      name: user.firstname
    }).toString();

    navigate(`/transfer?${queryParams}`);
  };

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
        {[
          "Dashboard",
          "Transactions",
          "Pay",
          "Receive",
          "Exchange",
          "Recipients",
          "Crypto",
          "Deposit Money",
          "Withdraw Money",
          "Account",
        ].map((item, idx) => (
          <li
            key={idx}
            className="px-6 py-3 text-gray-400 hover:bg-red-600 hover:text-white cursor-pointer transition-all duration-300 rounded-lg"
          >
            {item}
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
 {/* Main Content */}
<main className="flex-1 p-4 xl:p-6 overflow-y-auto max-h-screen bg-gray-900 bg-opacity-90 backdrop-blur-md shadow-inner">
  {/* Header */}
  <div className="bg-gradient-to-br from-black via-red-800 to-gray-800 p-4 xl:p-6 rounded-xl shadow-2xl mb-4">
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
      {/* Welcome and Last Received */}
      <div>
        <h2 className="text-3xl xl:text-4xl font-extrabold text-gray-50 tracking-wider">
          Welcome Back, {firstname}!
        </h2>
        <p className="text-gray-400 mt-1 text-base xl:text-lg">
          Last Received: <span className="text-green-400">₹{(Math.floor(Math.random() * 900) + 100).toLocaleString()}</span>
        </p>
      </div>
      {/* Real-time Total Balance */}
      <div className="text-right">
        <h3 className="text-4xl xl:text-5xl font-black text-gray-50">
          ₹{data?.toLocaleString()}
        </h3>
        <p className="text-gray-500 text-sm">Total Balance</p>
      </div>
    </div>

    {/* Action Buttons */}
    <div className="flex flex-wrap gap-3 mt-4">
      {["Transfer Money", "Add Money", "Withdraw"].map((btn, i) => (
        <button
          key={i}
          className="px-4 py-2 bg-gray-800 text-gray-200 font-bold uppercase rounded-lg shadow-lg hover:bg-red-600 hover:scale-105 transition duration-300 text-sm"
        >
          {btn}
        </button>
      ))}
    </div>
  </div>

  {/* Payment Systems & Search */}
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
    <div className="col-span-2 bg-gray-800 bg-opacity-75 p-4 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-3 text-gray-300">Linked Payment Systems</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {["Visa", "PayPal", "Blockchain"].map((system, idx) => (
          <div
            key={idx}
            className="bg-gradient-to-br from-red-700 to-black text-center text-white font-bold p-3 rounded-lg shadow hover:scale-105 transition-transform duration-300"
          >
            {system}
          </div>
        ))}
        <div className="flex items-center justify-center bg-gray-700 rounded-lg shadow cursor-pointer hover:bg-gray-600 transition">
          <span className="text-3xl font-bold text-gray-400">+</span>
        </div>
      </div>
    </div>
    <div className="bg-black bg-opacity-75 p-4 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold mb-3 text-gray-400">Search Users</h3>
      <input
        onChange={(e) => setFilter(e.target.value)}
        className="w-full py-2 px-3 rounded-lg bg-gray-700 text-gray-300 focus:ring focus:ring-red-500 text-sm"
        type="text"
        placeholder="Search Users..."
      />
    </div>
  </div>

  {/* User List with Scroll */}
  <div>
    <h3 className="text-xl font-semibold mb-3 text-gray-300">Users List</h3>
    <div className="max-h-[40vh] overflow-y-auto pr-2 space-y-3">
      {users.map((user, idx) => (
        <div
          key={idx}
          className="flex justify-between items-center bg-gray-800 bg-opacity-75 p-3 rounded-lg shadow hover:bg-gray-700 transition"
        >
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-red-700 text-white flex items-center justify-center text-base font-bold shadow">
              {user.firstname.charAt(0)}
            </div>
            <div className="ml-3">
              <p className="text-gray-200 font-semibold text-sm">
                {user.firstname} {user.lastname}
              </p>
              <p className="text-gray-500 text-xs">{user.username}</p>
            </div>
          </div>
          <button
            onClick={() => goToTransfer(user)}
            className="px-3 py-1.5 bg-red-700 text-white font-semibold rounded-md hover:bg-red-600 hover:scale-105 transition text-sm"
          >
            Send
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
