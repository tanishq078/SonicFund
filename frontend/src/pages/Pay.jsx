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
        const res = await axios.get(
          `https://sonic-fund-backend.vercel.app/user/bulk?filter=${filter}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
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
    <div className="min-h-screen flex-1 p-6 sm:p-8 bg-gray-900 bg-opacity-90 text-gray-200 overflow-y-auto">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-4xl font-extrabold text-red-600 tracking-wide mb-2">
          Send Money
        </h2>
        <p className="text-gray-400 text-sm">
          Search for a user and initiate a transfer.
        </p>
      </div>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search users by name or username..."
        className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-600 placeholder-gray-400 mb-6 transition"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      {/* User List */}
      <div className="max-h-[60vh] overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-red-600 scrollbar-track-gray-800 pr-1">
        {users.length > 0 ? (
          users.map((user) => (
            <div
              key={user._id}
              className="flex items-center justify-between bg-gray-800 hover:bg-gray-700 transition-colors duration-200 p-4 rounded-lg shadow-sm"
            >
              <div className="space-y-1">
                <p className="text-lg font-semibold text-white">
                  {user.firstname} {user.lastname}
                </p>
                <p className="text-sm text-gray-400">{user.username}</p>
              </div>
              <button
                onClick={() => goToTransfer(user)}
                className="bg-red-600 hover:bg-red-500 transition px-5 py-2 rounded-lg text-white font-bold shadow"
              >
                Send
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No users found.</p>
        )}
      </div>
    </div>
  );
};

export default Pay;
