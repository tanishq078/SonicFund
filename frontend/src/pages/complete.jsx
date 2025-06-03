import { useNavigate } from "react-router-dom";

const Complete = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-gray-950 justify-center items-center text-gray-100">
      <div className="flex flex-col space-y-4 justify-center items-center w-80 h-80 bg-gray-900 rounded-full shadow-2xl backdrop-blur-md">
        <div className="bg-gradient-to-br from-green-500 to-green-700 w-28 h-28 rounded-full mt-6 flex justify-center items-center text-white shadow-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            style={{ width: "60px", height: "60px" }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </div>

        <div className="font-extrabold text-2xl tracking-wide text-gray-200">
          Transfer Successful
        </div>

        <div
          onClick={() => navigate("/dashboard")}
          className="w-24 h-10 bg-gradient-to-br from-red-600 to-black hover:from-red-700 hover:to-gray-800 text-white flex justify-center items-center font-bold cursor-pointer rounded-full shadow-md hover:scale-105 transition-transform duration-300"
        >
          Done
        </div>
      </div>
    </div>
  );
};

export default Complete;
