import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { logoutUser } from "../store/authSlice";
import axios from "axios";
import {
  FaBars,
  FaTimes,
  FaSignInAlt,
  FaUserPlus,
  FaTachometerAlt,
  FaPen,
  FaSignOutAlt,
} from "react-icons/fa"; // Importing relevant icons
import ReflectiveButton from "./Buttons/ReflectiveButton";

function Navbar() {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const userData = useSelector((state) => state.auth.user);
  console.log(userData);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage menu toggle

  const handleLogout = async () => {
    try {
      await axios.post(
        `${baseUrl}/api/users/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
        }
      );
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      dispatch(logoutUser());
      navigate("/users/login");
    } catch (err) {
      if (err.response?.status === 411) {
        dispatch(logoutUser());
        navigate("/auth/login");
      }
      console.error(err);
    }
  };

  return (
    <nav className="bg-gray-100 text-gray-800 p-4 top-0 left-0 w-full z-10 font-thin">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/users/home"
          className="text-3xl font-extrabold text-gray-700 group relative inline-block"
        >
          {/* Short Text (TDS) */}
          <span className="absolute left-0 transition-all duration-300 ease-in-out group-hover:opacity-0">
            TDS
          </span>

          {/* Full Text (The Daily Scroll) */}
          <span className="absolute left-0 transition-all duration-500 ease-in-out opacity-0 group-hover:opacity-100 group-hover:scale-x-100 scale-x-0 origin-left whitespace-nowrap hover:text-yellow-400">
            The Daily Scroll
          </span>
        </Link>

        {/* Hamburger Icon (visible only on small screens) */}
        <div
          className="lg:hidden flex items-center"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <FaTimes className="text-3xl text-gray-800" />
          ) : (
            <FaBars className="text-3xl text-gray-800" />
          )}
        </div>

        {/* Navbar Links */}
        <ul
          className={`${
            isMenuOpen
              ? "flex-col absolute bg-gray-100 w-full top-16 left-0 py-4 space-y-4 md:space-x-10 md:flex-row lg:flex lg:space-x-10 items-center"
              : "hidden lg:flex-row lg:flex space-x-10 items-center"
          } flex lg:flex-row space-x-6 md:space-x-2`}
        >
          {!isLoggedIn ? (
            <>
              {/* Login Link with Icon */}
              <li>
                <Link
                  to="/users/login"
                  className="text-lg px-4 py-2 rounded-md flex items-center space-x-2 transition-all duration-300 hover:bg-indigo-500 hover:text-white"
                >
                  <FaSignInAlt className="text-gray-600" />
                  <span>Login</span>
                </Link>
              </li>
              {/* Register Link with Icon */}
              <li>
                <Link
                  to="/users/register"
                  className="text-lg px-4 py-2 rounded-md flex items-center space-x-2 transition-all duration-300 hover:bg-indigo-500 hover:text-white"
                >
                  <FaUserPlus className="text-gray-600" />
                  <span>Register</span>
                </Link>
              </li>
            </>
          ) : (
            <>
              {/* Dashboard Link with Icon */}
              <li>
                <Link
                  to="/users/dashboard"
                  className="text-lg px-4 py-2 rounded-2xl flex items-center space-x-2 transition-all duration-300 hover:bg-gray-200 hover:text-gray-700 "
                >
                  <FaTachometerAlt className="text-gray-600" />
                  <span>Dashboard</span>
                </Link>
              </li>
              {/* Create Post Link with Icon */}
              <li>
                <Link
                  to="/posts/create"
                  className="text-lg px-4 py-2 rounded-2xl flex items-center space-x-2 transition-all duration-300 hover:bg-gray-200 hover:text-gray-700"
                >
                  <FaPen className="text-gray-600" />
                  <span>Create Post</span>
                </Link>
              </li>

              {/* Logout Button with Icon */}
              <li>
                <button
                  onClick={handleLogout}
                  className="text-lg px-4 py-2 rounded-2xl flex items-center space-x-2 transition-all duration-300  hover:text-white hover:bg-red-500 focus:outline-none"
                >
                  <FaSignOutAlt className="hover:text-white" />
                  <span>Logout</span>
                </button>
              </li>
              <ReflectiveButton userData={userData} />
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
