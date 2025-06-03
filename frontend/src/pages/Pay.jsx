import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Pay = () => {
  const [filter, setFilter] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      try {
        const res = await axios.get(`https://sonic-fund-backend.vercel.app/user/bulk?filter=${filter}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (Array.isArray(res.data.users)) setUsers(res.data.users);
      } catch (err) {
        console.error("Error fetching users", err);
      }
    };
    fetchUsers();
  }, [filter]);

  const goToTransfer = (user) => {
    const queryParams = new URLSearchParams({
      id: user._id,
      name: user.firstname,
    }).toString();
    navigate(`/transfer?${queryParams}`);
  };

  return (
    <div className="p-6 text-gray-200">
      <h2 className="text-3xl font-bold mb-4 text-red-500">Send Money</h2>
      <input
        type="text"
        placeholder="Search users..."
        className="w-full p-2 rounded bg-gray-700 text-white mb-4"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <div className="max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-red-600 scrollbar-track-gray-800">
        {users.length > 0 ? (
          users.map((user) => (
            <div
              key={user._id}
              className="flex justify-between items-center bg-gray-800 p-4 mb-3 rounded-lg shadow-md hover:bg-gray-700"
            >
              <div>
                <p className="font-semibold">{user.firstname} {user.lastname}</p>
                <p className="text-sm text-gray-400">{user.username}</p>
              </div>
              <button
                onClick={() => goToTransfer(user)}
                className="bg-red-700 hover:bg-red-600 px-4 py-2 rounded text-white font-bold"
              >
                Send
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No users found.</p>
        )}
      </div>
    </div>
  );
};

export default Pay;
