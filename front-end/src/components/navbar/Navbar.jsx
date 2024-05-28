import "../../index.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/API/apiAuth";
import { createAxios } from "../../createInstance";
import { logoutSuccess } from "../../redux/authSlice";
import Logo from "../../assets/logo.png";
import { TfiAlignJustify } from "react-icons/tfi";
import { TfiLinux } from "react-icons/tfi";
import { useState } from "react";
import Login from "../../pages/login/Login";
import Register from "../../pages/register/Register";
const Navbar = () => {
  const user = useSelector((state) => state.auth.login.currentUser);
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const [isOpenRegister, setIsOpenRegister] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let axiosJWTLOGOUT = createAxios(user, dispatch, logoutSuccess);
  const accessToken = user?.accessToken;
  const handleLogout = () => {
    logOut(dispatch, navigate, accessToken, axiosJWTLOGOUT);
  };
  const handleLoadingLogin = () => {
    setIsOpenLogin(!isOpenLogin);
  };
  const handleLoadingRegister = () => {
    setIsOpenRegister(!isOpenRegister);
  };
  return (
    <div className="container-fluid flex pt-10">
      <div className="flex  align-items-center w-[100%]">
        <div className="basis-1/5 ml-10">
          <Link
            to="/"
            className="text-inherit no-underline flex align-items-center"
          >
            <img src={Logo} alt="logo" className="h-10 w-10 object-contain" />
            <span className="text-2xl font-bold text-red-500">Airbnb</span>
          </Link>
        </div>
        {user?.user_type === "leave" ? (
          <div className="basis-1/2">
            <ul className="flex justify-center">
              <li className="navbar-hover"><Link to={"/"}>Hôm nay</Link></li>
              <li className="ml-10 navbar-hover ">Lịch</li>
              <li className="ml-10 navbar-hover"><Link to={"/leave/hotel"}>Nhà/phòng cho thuê</Link></li>
              <li className="ml-10 navbar-hover">Hộp thư đến</li>
              <li className="ml-10 navbar-hover">Menu</li>
            </ul>
          </div>
        ) : (
          <div className="basis-1/2">
            <ul className="flex justify-center">
              <li className="navbar-hover">Chổ ở</li>
              <li className="ml-10 navbar-hover ">Trải nghiệm</li>
              <li className="ml-10 navbar-hover">Trải nghiệm trực tiếp</li>
            </ul>
          </div>
        )}
        <div className="basis-1/6">
          <Link className="navbar-hover">Cho thuê chổ ở qua Airbnb</Link>
        </div>
        {user ? (
          <div className="basis-1/7 border-2 rounded-xl ">
            <div className="flex justify-center">
              <div className="flex">
                <div onClick={() => setIsOpen(!isOpen)} className="flex">
                  <TfiAlignJustify className="h-[35px] w-[35px] p-[10px] text-black" />
                  <div className="border-2 rounded-full bg-slate-500">
                    <TfiLinux className="text-white p-[10px] h-[35px] w-[35px]" />
                  </div>
                </div>
              </div>
              {isOpen && (
                <div className="absolute bg-white text-black py-2 rounded m-5 border-2 z-999">
                  <h3 className="block px-4 py-2 hover:bg-gray-200 font-bold">
                    {user.username}
                  </h3>
                  <Link
                    to="/"
                    className="block px-4 py-2 hover:bg-gray-200"
                    onClick={handleLogout}
                  >
                    Đăng Xuất
                  </Link>
                  <Link
                    to="/register"
                    className="block px-4 py-2 hover:bg-gray-200"
                  >
                    Cho thuê chổ ở qua Airbnb
                  </Link>
                  <Link
                    to="/register"
                    className="block px-4 py-2 hover:bg-gray-200"
                  >
                    trung tâm hỗ trợ
                  </Link>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="basis-1/7 border-2 rounded-2xl hover:shadow-lg">
            <div className="flex justify-center">
              <div className="flex">
                <div onClick={() => setIsOpen(!isOpen)} className="flex">
                  <TfiAlignJustify className="h-[35px] w-[35px] p-[10px] text-black" />
                  <div className="border-2 rounded-full bg-slate-500">
                    <TfiLinux className="text-white p-[10px] h-[35px] w-[35px]" />
                  </div>
                </div>
              </div>
              {isOpen && (
                <div className="absolute bg-white text-black py-2 rounded border-2 z-999 mt-5 right-[5rem]">
                  {isOpenLogin ? (
                    <>
                      <Login onClose={handleLoadingLogin} />
                      <button
                        onClick={handleLoadingLogin}
                        className="block px-4 py-2 hover:bg-gray-200"
                      >
                        Đăng nhập
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={handleLoadingLogin}
                      className="block px-4 py-2 hover:bg-gray-200"
                    >
                      Đăng nhập
                    </button>
                  )}
                  {isOpenRegister ? (
                    <>
                      <Register onClose={handleLoadingRegister} />
                      <button
                        onClick={handleLoadingRegister}
                        className="block px-4 py-2 hover:bg-gray-200"
                      >
                        Đăng kí
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={handleLoadingRegister}
                      className="block px-4 py-2 hover:bg-gray-200"
                    >
                      Đăng kí
                    </button>
                  )}
                  <Link
                    to="/register"
                    className="block px-4 py-2 hover:bg-gray-200"
                  >
                    Cho thuê chổ ở qua Airbnb
                  </Link>
                  <Link
                    to="/register"
                    className="block px-4 py-2 hover:bg-gray-200"
                  >
                    trung tâm hỗ trợ
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
