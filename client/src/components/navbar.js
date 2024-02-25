import React, { useEffect, useState } from "react";
import "./navbar.css";
import { Link, useLocation } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { SlLocationPin } from "react-icons/sl";
import { TbTruckDelivery } from "react-icons/tb";
import { FaWallet } from "react-icons/fa";
import { MdFavorite, MdHelp } from "react-icons/md";
import { AiOutlineMenu, AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import { IoCreate } from "react-icons/io5";
import { BsCalendar2EventFill } from "react-icons/bs";
import { MdArtTrack } from "react-icons/md";
import { AiFillMessage } from "react-icons/ai";
import { IoLogOut } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import axios from "axios";

const Navbar = () => {
  const [userData, setUserData] = useState({});
  console.log("response", userData.user);
  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:6005/login/sucess", {
        withCredentials: true,
      });

      setUserData(response.data);
    } catch (error) {
      console.log("error", error);
    }
  };
  const [nav, setNav] = useState(false);

  const menuItems = [
    { icon: <IoCreate size={25} className="mr-4" />, text: "Create New Event" },
    {
      icon: <BsCalendar2EventFill size={25} className="mr-4" />,
      text: "Your Registed Events",
    },
    {
      icon: <MdArtTrack size={25} className="mr-4" />,
      text: "Track Your Goodies",
    },
    {
      icon: <AiFillMessage size={25} className="mr-4" />,
      text: "Support & About Us",
    },
    { icon: <IoMdSettings size={25} className="mr-4" />, text: "Help" },
    { icon: <IoLogOut size={25} className="mr-4" />, text: "Logout" },
  ];
  useEffect(() => {
    getUser();
  }, []);
  const location = useLocation();
  const logout = () => {
    window.location.href = "http://localhost:6005/logout";
  };
  if (location.pathname === "/dashboard") {
    return (
      <nav className="bg-white p-4">
        <div className="mx-10 max-w-7xl px-2 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center">
            <div onClick={() => setNav(!nav)} className="cursor-pointer">
              <AiOutlineMenu size={30} />
            </div>
          </div>

          {nav ? (
            <div className="bg-black/80 fixed w-full h-screen z-10 top-0 left-0"></div>
          ) : (
            ""
          )}

          <div
            className={
              nav
                ? "fixed top-0 left-0 w-[300px] h-screen bg-white z-10 duration-300"
                : "fixed top-0 left-[-100%] w-[300px] h-screen bg-white z-10 duration-300"
            }>
            <AiOutlineClose
              onClick={() => setNav(!nav)}
              size={30}
              className="absolute right-4 top-4 cursor-pointer"
            />
            <div className="flex ml-5 mt-5">
              <img src="/logo.png" alt="Logo" className="h-8 mr-2" />
              <span className="text-lg font-bold text-black mr-4">
                Stride Ease
              </span>
            </div>
            <nav>
            <ul className="flex flex-col p-4 text-gray-800">
              {menuItems.map(({ icon, text }, index) => (
                <div key={index} className="py-4">
                  <li
                    className="text-xl flex cursor-pointer w-[100%] rounded-lg mx-auto p-2 hover:text-black hover:bg-blue-300"
                    onClick={text === "Logout" ? logout : undefined}
                  >
                    {icon} {text}
                  </li>
                </div>
              ))}
            </ul>
            </nav>
          </div>
          <div className="flex items-center">
            {/* Logo */}
            <img src="/logo.png" alt="Logo" className="h-8 mr-2" />
            <span className="text-lg font-bold text-black mr-4">
              Stride Ease
            </span>

            {/* Search bar with search icon */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search for Event...."
                className="px-3 py-2 ml-20 min-w-96 border text-black rounded-full hover:border-blue-800 pl-12 shadow-lg shadow-blue-100"
              />
              <div className="absolute inset-y-0 right-0 mr-5 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
            </div>
            <div className="flex items-center">
              <div className=" ml-5 mr-2">
                <SlLocationPin />
              </div>
              <label className="text-black text-lg">Pune</label>
            </div>
          </div>

          <div className="flex items-center">
            {/* Profile */}
            <Link
              to="/profile"
              className="hover:text-blue-400 px-3 py-2 text-black">
              Profile
            </Link>

            <img
              src={userData.user?.image}
              alt="user"
              className="w-10 h-10 rounded-full p-1"
            />
            <span className="px-3 py-2 text-black">
              {userData.user?.displayName}
            </span>
          </div>
        </div>
      </nav>
    );
  }
  return (
    <nav className="bg-white p-4">
      <div className="mx-auto max-w-8xl px-2 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {/* Render the logo */}
            <img src="/logo.png" alt="Logo" className="h-8 mr-2" />{" "}
            {/* Adjust height and margin as needed */}
            <div className="flex items-center">
              {" "}
              {/* New container for Stride Ease and dropdowns */}
              <a href="/" className="text-lg font-bold text-black mr-4">
                {" "}
                {/* Add margin-right to Stride Ease */}
                Stride Ease
              </a>
              {/* Dropdowns */}
              <select className="px-3 py-2 rounded-lg mr-1">
                {" "}
                {/* Adjust margin-right */}
                <option value="option1">Shipping</option>
                {/* Add dropdown options as needed */}
              </select>
              <select className="px-3 py-2 rounded-lg mr-1">
                {" "}
                {/* Adjust margin-right */}
                <option value="option2">Tracking</option>
                {/* Add dropdown options as needed */}
              </select>
              <select className="px-3 py-2 rounded-lg mr-1">
                {" "}
                {/* Adjust margin-right */}
                <option value="option3">Support</option>
                {/* Add dropdown options as needed */}
              </select>
              <select className="px-3 py-2 rounded-lg">
                {" "}
                {/* No margin-right for the last dropdown */}
                <option value="option4">Account</option>
                {/* Add dropdown options as needed */}
              </select>
            </div>
          </div>

          <div className="flex items-center ml-0">
            {Object.keys(userData)?.length > 0 ? (
              <>
                {" "}
                <label className="text-blue-500">Welcome </label>
                <label className="text-black p-2">
                  {userData.user?.displayName}
                </label>
                <Link
                  to="/profile"
                  className="hover:text-blue-400 ml-3 mr-0 text-black">
                  Profile
                </Link>
                <Link
                  to="/profile"
                  className="hover:text-blue-400 px-3 py-2 text-black">
                  <label onClick={logout}>Logout</label>
                </Link>
                <img
                  src={userData.user?.image}
                  alt="user"
                  className="w-10 h-10 rounded-full p-1"
                />
              </>
            ) : (
              <Link
                to="/login" // Specify the path to the register page
                className="border py-2 px-3 rounded-lg hover:border-blue-400">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
