import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


function App() {
  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_ENDPOINT_URL;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [showError, setShowError] = useState(false);

  const handleLogin = async () => {
      const response = await axios.post(`${process.env.ENDPOINT_URL}/check-user`, { username, password })
        .then((response) => {
          if (response.data.exist) {
            setShowError(false);
            navigate('/todo');
          }

          else {
            setShowError(true);
          }
        })
  }
      
  return (
      <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-r from-purple-600 to-blue-500">
        <div className="w-96 bg-white shadow-lg rounded-lg p-8 flex flex-col items-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">LOGIN</h1>

          {showError && (
            <div className="bg-red-100 text-red-600 px-4 py-2 rounded-lg mb-4 text-sm w-full text-center">
              INVALID USERNAME OR PASSWORD
            </div>
          )}

          <div className="w-full mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-1" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="w-full mb-6">
            <label className="block text-gray-700 text-sm font-semibold mb-1" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="button"
            onClick={handleLogin}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 font-medium text-lg rounded-lg shadow-md transition duration-300"
          >
            LOGIN
          </button>
        </div>
      </div>
    );
  }

  export default App
