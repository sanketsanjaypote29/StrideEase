import React, { useEffect, useState } from "react";
import "./navbar.css";
import { Link, useLocation } from "react-router-dom";
import { IoCreate } from "react-icons/io5";
import { BsCalendar2EventFill } from "react-icons/bs";
import { MdArtTrack } from "react-icons/md";
import { AiFillMessage, AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { IoLogOut } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import Modal from "./Modal";
import CreateEventForm from "../pages/createEventForm";
import { BASE_URL } from "../pages/helper";

const Navbar = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  console.log("response", userData.user);
  const getUser = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/login/sucess`, {
        withCredentials: true,
      });

      setUserData(response.data);
    } catch (error) {
      console.log("error", error);
    }
  };
  const [nav, setNav] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const menuItems = [
    { icon: <IoCreate size={25} className="mr-4" />, text: "Create New Event" },
    {
      icon: <BsCalendar2EventFill size={25} className="mr-4" />,
      text: "Your Registered Event",
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
    window.location.href = `${BASE_URL}/logout`;
  };
  const handleCancelClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const toggleNav = () => {
    setNav(!nav);
  };

  return (
    <nav className="p-4 bg-white shadow-md">
      <div className="px-2 mx-auto max-w-8xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img src="/logo.png" alt="Logo" className="h-8 mr-2" />
              <a href="/" className="text-lg font-bold text-black">
                Stride Ease
              </a>
            <div className="items-center hidden space-x-4 md:flex">
              <select className="px-3 py-2 rounded-lg">
                <option value="option1">Shipping</option>
              </select>
              <select className="px-3 py-2 rounded-lg">
                <option value="option2">Tracking</option>
              </select>
              <select className="px-3 py-2 rounded-lg">
                <option value="option3">Support</option>
              </select>
              <select className="px-3 py-2 rounded-lg">
                <option value="option4">Account</option>
              </select>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {Object.keys(userData)?.length > 0 ? (
              <>
                <label className="text-blue-500">Welcome</label>
                <label className="p-2 text-black">
                  {userData.user?.displayName}
                </label>
                <Link
                  to="/profile"
                  className="hidden text-black md:block hover:text-blue-400"
                >
                  Profile
                </Link>
                <button
                  onClick={logout}
                  className="hidden px-3 py-2 text-black md:block hover:text-blue-400"
                >
                  Logout
                </button>
                <img
                  src={userData.user?.image}
                  alt="user"
                  className="w-10 h-10 p-1 rounded-full"
                />
              </>
            ) : (
              <Link
                to="/login"
                className="px-3 py-2 border rounded-lg hover:border-blue-400"
              >
                Login
              </Link>
            )}
            <button
              onClick={toggleNav}
              className="text-2xl md:hidden focus:outline-none"
            >
              {nav ? <AiOutlineClose /> : <AiOutlineMenu />}
            </button>
          </div>
        </div>
        {nav && (
          <div className="mt-4 space-y-4 md:hidden">
           
            <select className="block w-full px-3 py-2 rounded-lg">
              <option value="option1">Shipping</option>
            </select>
            <select className="block w-full px-3 py-2 rounded-lg">
              <option value="option2">Tracking</option>
            </select>
            <select className="block w-full px-3 py-2 rounded-lg">
              <option value="option3">Support</option>
            </select>
            <select className="block w-full px-3 py-2 rounded-lg">
              <option value="option4">Account</option>
            </select>
            {Object.keys(userData)?.length > 0 ? (
              <>
                <div className="text-blue-500">Welcome</div>
                <div className="p-2 text-black">{userData.user?.displayName}</div>
                <Link
                  to="/profile"
                  className="block text-black hover:text-blue-400"
                >
                  Profile
                </Link>
                <button
                  onClick={logout}
                  className="block px-3 py-2 text-black hover:text-blue-400"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block px-3 py-2 border rounded-lg hover:border-blue-400"
              >
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
