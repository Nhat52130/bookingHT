import axios from "axios";
import { useContext, useState } from "react";
import {Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./login.css";
import { useDispatch, useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { loginUser } from "../../redux/API/apiAuth";
import { loginSuccess } from "../../redux/authSlice";

const Login = ({onClose}) => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      email: username,
      password: password,
    };
    
    try {
      setError(""); // Xóa thông báo lỗi trước đó (nếu có)
      const res = await loginUser(newUser, dispatch, navigate);
      
      dispatch(loginSuccess(res.data));
    } catch (err) {
      setError("Wrong username or password"); // Đặt thông báo lỗi
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="relative bg-white w-96 rounded-md shadow-lg p-8">
        <button
          type="button"
          className="absolute top-2 left-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h2 className="text-2xl font-semibold text-center mb-4">Log in</h2>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="formUsername" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="formUsername"
              type="text"
              placeholder="Enter your username"
              onChange={(e) => setUserName(e.target.value)}
              className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="formPassword" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="formPassword"
              type="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <button className="w-full bg-red-500  text-white font-semibold py-2 px-4 rounded-md mb-4" type="submit">
            Continue
          </button>
        </form>
        <div className="text-center text-gray-700">Don't have an account yet?</div>
        <Link className="block text-center text-indigo-600 hover:underline" to="/register">Register one for free</Link>
      </div>
    </div>
  );
  
};

export default Login;
