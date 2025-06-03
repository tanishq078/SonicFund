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

  // State to manage the active sidebar menu item
  const [activeMenuItem, setActiveMenuItem] = useState("Dashboard");

  // Fetch balance effect
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/'); // Redirect to login if no token
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

  // Fetch user info effect
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

  // Fetch all users (with filter) effect
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
        if (response && response.data && Array.isArray(response.data.users)) {
          setUsers(response.data.users);
        } else {
          console.error('Invalid data format:', response.data);
          setUsers([]);
        }
      } catch (error) {
        console.error('Error fetching all users:', error);
        setUsers([]);
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
      name: user.firstname,
    }).toString();
    navigate(`/transfer?${queryParams}`);
  };

  // Define the essential sidebar items
  essentialSidebarItems.map((item, idx) => (
  <li
    key={idx}
    className={`
      px-4 py-2
      text-gray-400 hover:bg-red-600 hover:text-white
      cursor-pointer transition-colors duration-300 rounded-lg
      select-none
      ${activeMenuItem === item ? 'bg-red-700 text-white font-bold' : ''}
    `}
    onClick={() => {
      setActiveMenuItem(item);

      // 🔁 Navigate based on item name
      switch (item) {
        case "Dashboard":
          navigate("/dashboard");
          break;
        case "Transactions":
          navigate("/transactions");
          break;
        case "Pay":
          navigate("/pay");
          break;
        case "Account":
          navigate("/account");
          break;
        default:
          break;
      }
    }}
  >
    {item}
  </li>
));


  return (
    <div className="flex h-screen bg-gray-950 text-gray-200">
      {/* Sidebar */}
      <aside
        className="
          w-56 flex-shrink-0
          bg-black bg-opacity-90 backdrop-blur-lg
          flex flex-col shadow-xl border-r border-gray-800
          overflow-y-auto
          scrollbar-thin scrollbar-thumb-red-700 scrollbar-track-gray-900
          transition-all duration-300
          sticky top-0 h-screen
        "
      >
        <div className="p-5 text-center border-b border-gray-800">
          <div className="text-3xl font-extrabold text-red-600 tracking-wide uppercase shadow-md select-none">
            SonicFund
          </div>
        </div>
        <nav className="flex-1 mt-3">
          <ul className="space-y-1 px-3">
            {essentialSidebarItems.map((item, idx) => (
              <li
                key={idx}
                className={`
                  px-4 py-2
                  text-gray-400 hover:bg-red-600 hover:text-white
                  cursor-pointer transition-colors duration-300 rounded-lg
                  select-none
                  ${activeMenuItem === item ? 'bg-red-700 text-white font-bold' : ''}
                `}
                onClick={() => setActiveMenuItem(item)}
              >
                {item}
              </li>
            ))}
          </ul>
        </nav>
        {/* Logout */}
        <div className="p-5 mt-auto border-t border-gray-800">
          <button
            onClick={handleLogout}
            className="
              w-full py-2 bg-red-700 text-white font-semibold rounded-lg
              hover:bg-red-800 hover:scale-105 transition-all duration-300
              select-none
            "
          >
            Log Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className="
          flex-1 h-full p-4 sm:p-6
          bg-gray-900 bg-opacity-90 backdrop-blur-md
          shadow-inner overflow-y-auto
          scrollbar-thin scrollbar-thumb-red-600 scrollbar-track-gray-800
        "
      >
        {/* Sticky Header */}
        <div className="sticky top-0 bg-red-500 bg-opacity-90 z-10 p-4 sm:p-6 rounded-xl shadow-2xl mb-6 select-none">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-50 tracking-wider">
                Welcome Back, {firstname}!
              </h2>
              <p className="text-gray-400 mt-1 text-lg">
                Last Received:{" "}
                <span className="text-green-400">
                  ₹{(Math.floor(Math.random() * 900) + 100).toLocaleString()}
                </span>
              </p>
            </div>
            <div className="text-center md:text-right">
              <h3 className="text-4xl md:text-6xl font-black text-gray-50">
                ₹{data?.toLocaleString()}
              </h3>
              <p className="text-gray-500">Total Balance</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 mt-6 justify-center md:justify-start">
            {["Transfer Money", "Add Money", "Withdraw"].map((btn, i) => (
              <button
                key={i}
                className="
                  px-5 py-2 bg-gray-800 text-gray-200 font-bold uppercase
                  rounded-lg shadow-lg hover:bg-red-600 hover:scale-105
                  transition-all duration-300 select-none
                "
              >
                {btn}
              </button>
            ))}
          </div>
        </div>

        {/* Linked Payment Systems */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="col-span-2 bg-gray-800 bg-opacity-75 p-6 rounded-lg shadow-lg backdrop-blur-md">
            <h3 className="text-2xl font-bold mb-4 text-gray-300">
              Linked Payment Systems
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {["Visa", "PayPal", "Blockchain"].map((system, idx) => (
                <div
                  key={idx}
                  className="
                    bg-gradient-to-br from-red-700 to-black text-center
                    text-white font-bold p-4 rounded-lg shadow-lg
                    hover:scale-105 hover:shadow-red-500/50
                    transition-transform duration-300 select-none
                  "
                >
                  {system}
                </div>
              ))}
              <div
                className="
                  flex items-center justify-center bg-gray-700 rounded-lg shadow
                  cursor-pointer hover:bg-gray-600 transition duration-300 select-none
                "
              >
                <span className="text-4xl font-bold text-gray-400">+</span>
              </div>
            </div>
          </div>
          <div className="bg-black bg-opacity-75 p-6 rounded-lg shadow-lg backdrop-blur-md">
            <h3 className="text-2xl font-semibold mb-4 text-gray-400">Search Users</h3>
            <input
              onChange={(e) => setFilter(e.target.value)}
              className="
                w-full py-2 px-4 rounded-lg bg-gray-700 text-gray-300
                focus:ring focus:ring-red-500
                transition duration-300
              "
              type="text"
              placeholder="Search Users..."
              value={filter}
            />
          </div>
        </div>

        {/* User List with resizable scroll area */}
        <div>
          <h3 className="text-2xl font-semibold mb-4 text-gray-300">Users List</h3>
          <div className="max-h-[40vh] md:max-h-[50vh] overflow-y-auto scrollbar-thin scrollbar-thumb-red-600 scrollbar-track-gray-800 rounded-md resize-y">
            {users.length > 0 ? (
              users.map((user, idx) => (
                <div
                  key={idx}
                  className="
                    flex flex-col sm:flex-row justify-between items-center bg-gray-800 bg-opacity-75 p-4
                    rounded-lg shadow-lg hover:bg-gray-700
                    transition-all duration-300 select-none mb-3
                  "
                >
                  <div className="flex items-center">
                    <div
                      className="
                        w-12 h-12 rounded-full bg-red-700 text-white
                        flex items-center justify-center text-lg font-bold shadow-lg
                      "
                    >
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
                    onClick={() => goToTransfer(user)}
                    className="
                      mt-3 sm:mt-0 px-4 py-2 bg-red-700 text-white font-semibold rounded-lg
                      hover:bg-red-600 hover:scale-105 transition-all duration-300
                      select-none
                    "
                  >
                    Send Money
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-8">No users found.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
