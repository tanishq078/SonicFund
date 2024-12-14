import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [firstname, setFirstname] = useState("user");
  const [lastname, setLastname] = useState("user");
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
        const response = await axios.get('http://localhost:3000/account/balance', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        });
        setData(response.data.balance);
      } catch (error) {
        console.error('Error fetching data:', error);
        navigate('/'); // Redirect to login if fetching data fails (e.g., token expired)
      }
    };

    fetchData();
  }, [navigate]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem('token');
    
      try {
        const response = await axios.get("http://localhost:3000/user/info", {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        });
        setFirstname(response.data.user.firstname);
        setLastname(response.data.user.lastname);
        setUsername(response.data.user.username);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserInfo();
  }, []);

  useEffect(() => {
    const fetchAllUsers = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get("http://localhost:3000/user/bulk?filter=" + filter, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        });
        setUsers(response.data.users);
      } catch (error) {
        console.error('Error fetching all users:', error);
      }
    };

    fetchAllUsers();
  }, [filter]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const goToTransfer = (user) => {
    // Create query parameters
    const queryParams = new URLSearchParams({
      id: user._id,
      name: user.firstname
    }).toString();
    
    // Navigate to the new route with query parameters
    navigate(`/transfer?${queryParams}`);
  };

  return (
    <>
  <div className="px-4" style={{ backgroundColor: '#f0f4f8', padding: '20px' }}>
    {/* Header Section */}
    <div className="flex flex-col md:flex-row md:items-center md:justify-between" style={{ backgroundColor: '#4a90e2', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
      <div className="text-3xl font-bold text-white">SonicFund</div>
      <div className="flex items-center space-x-4 mt-3 md:mt-0">
        <div className="flex rounded-full border-2 border-white cursor-pointer bg-green-600 text-3xl items-center justify-center font-semibold w-14 h-14 md:w-12 md:h-12 text-white">
          {username.charAt(0).toUpperCase()}
        </div>
        <div className="flex flex-col text-center md:text-left">
          <div className="font-semibold text-xl text-white">{firstname} {lastname}</div>
          <div className="text-sm text-white">{username}</div>
          <div
            onClick={handleLogout}
            className="mt-2 px-4 py-2 rounded bg-red-600 text-white font-semibold hover:bg-red-700 cursor-pointer transition duration-300 text-center md:w-auto"
          >
            Log Out
          </div>
        </div>
      </div>
    </div>

    {/* Balance Section */}
    <div className="bg-white mt-5" style={{ padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
      <div className="text-gray-900 font-bold text-2xl">Your Balance</div>
      <div className="text-teal-600 font-semibold text-xl mt-2">
        ₹ {data !== null ? data.toFixed(2) : "Loading..."}
      </div>
    </div>

    {/* Search Users Section */}
    <div className="mt-5">
      <div className="text-gray-900 font-bold text-xl mb-2 mx-2 md:mx-5">Search Users</div>
      <input
        onChange={(e) => setFilter(e.target.value)}
        className="shadow border rounded-lg w-full md:w-11/12 py-3 px-4 mx-2 md:mx-5 text-gray-700 leading-tight font-medium focus:outline-none focus:ring focus:ring-teal-400"
        id="search"
        type="text"
        placeholder="Search Users..."
      />
    </div>

    {/* Users List Section */}
    <div className="flex flex-col mx-2 md:mx-5 mt-5 space-y-6">
      {users.map((user, index) => (
        <div
          key={index}
          className="flex flex-col md:flex-row justify-between items-center bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300"
          style={{ padding: '20px' }}
        >
          <div className="flex items-center w-full md:w-auto">
            <div className="flex rounded-full bg-gray-300 w-14 h-14 text-xl items-center justify-center font-semibold text-teal-600 mr-4">
              {user.firstname ? user.firstname.charAt(0).toUpperCase() : ""}
            </div>
            <div className="flex flex-col">
              <div className="text-lg font-semibold text-gray-900">
                {user.firstname} {user.lastname}
              </div>
              <div className="text-sm text-gray-600">{user.username}</div>
            </div>
          </div>

          <div
            onClick={() => goToTransfer(user)}
            className="bg-teal-600 cursor-pointer hover:bg-teal-800 text-white w-full md:w-auto rounded h-[40px] flex items-center justify-center mt-4 md:mt-0 transition duration-300"
          >
            Send Money
          </div>
        </div>
      ))}
    </div>
  </div>
</>
  );
};

export default Dashboard;
