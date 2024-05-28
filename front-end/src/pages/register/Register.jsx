import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/API/apiAuth";
import { registerSuccess, registerFailed } from "../../redux/authSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Register = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // Thêm state cho role
  const [errorMessage, setErrorMessage] = useState(""); // Thông báo lỗi
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.register.currentUser);

  const handleRegister = (e) => {
    e.preventDefault();
    if (password.length < 6) {
      setErrorMessage("Mật khẩu phải chứa ít nhất 6 ký tự");
      return;
    }
    const newUser = {
      email: email,
      password: password,
      username: username,
      user_type: role,
    };
    registerUser(newUser, dispatch, navigate, registerSuccess, registerFailed);
    toast.success("Đăng ký thành công!");

  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white w-96 rounded-md shadow-lg p-8 relative">
      <ToastContainer />

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
        <h2 className="text-2xl font-semibold text-center mb-4">Sign up</h2>
        {errorMessage && (
          <div className="text-red-500 text-center mb-4">{errorMessage}</div>
        )}
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="text"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              onChange={(e) => setUserName(e.target.value)}
              className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700"
            >
              Role
            </label>
            <select
              id="role"
              // value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option >Chọn dưới đấy</option>
              <option value="user">người dùng</option>
              <option value="leave">Cho thuê phòng</option>
            </select>
          </div>
          <button
            className="w-full bg-red-500  text-white font-semibold py-2 px-4 rounded-md mb-4"
            type="submit"
          >
            Create account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
