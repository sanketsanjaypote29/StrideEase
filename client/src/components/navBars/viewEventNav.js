import React, { useEffect, useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import { MdDashboard } from "react-icons/md";
import { BASE_URL } from "../../pages/helper";

const ViewEventNav = () => {
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
    { icon: <MdDashboard size={25} className="mr-4" />, text: "Dashboard" },
    { icon: <IoCreate size={25} className="mr-4" />, text: "Create New Event" },
    {
      icon: <BsCalendar2EventFill size={25} className="mr-4" />,
      text: "Your Created Event",
    },
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

  return (
    <div>
      <nav className="p-4 bg-white">
        <div className="flex items-center justify-between px-2 max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center">
            <div onClick={() => setNav(!nav)} className="cursor-pointer ">
              <AiOutlineMenu size={30} />
            </div>
          </div>

          {nav ? (
            <div className="fixed top-0 left-0 z-10 w-full h-screen bg-black/80"></div>
          ) : (
            ""
          )}

          <div
            className={
              nav
                ? "fixed top-0 left-0 w-[300px] h-screen bg-white z-10 duration-300"
                : "fixed top-0 left-[-100%] w-[300px] h-screen bg-white z-10 duration-300"
            }
          >
            <AiOutlineClose
              onClick={() => setNav(!nav)}
              size={30}
              className="absolute cursor-pointer right-4 top-4"
            />
            <div className="flex mt-5 ml-5">
              <img src="/logo.png" alt="Logo" className="h-8 mr-2" />
              <span className="mr-4 text-lg font-bold text-black">
                Stride Ease
              </span>
            </div>
            <nav>
              <ul className="flex flex-col p-4 text-gray-800">
                {menuItems.map(({ icon, text }, index) => (
                  <div key={index} className="py-4">
                    <li
                      className="text-xl flex cursor-pointer w-[100%] rounded-lg mx-auto p-2 hover:text-black hover:bg-blue-300"
                      onClick={() => {
                        if (text === "Logout") {
                          logout();
                        } else if (text === "Create New Event") {
                          navigate("/createevent");
                        } else if (text === "Your Created Event") {
                          navigate("/createdEvent");
                        } else if (text === "Your Registered Event") {
                          navigate("/");
                        } else if (text === "Dashboard") {
                          navigate("/dashboard");
                        }
                      }}
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

            <img src="/logo.png" alt="Logo" className="hidden h-8 mr-2 lg:block" />
            <span className="hidden mr-4 text-lg font-bold text-black lg:block">
              Stride Ease
            </span>
          </div>

            <div className="flex mr-96 items-center">
              <Link to="/dashboard" className="flex items-center">
                <img src="/logo.png" alt="Logo" className="h-8 mr-2" />
                <span className="text-lg font-bold text-black mr-4">
                  Stride Ease
                </span>
              </Link>
            </div>


            <div className="relative">
              <input
                type="search"
                placeholder="Search for Event...."
                className="px-3 py-2 pl-12 ml-2 text-black border rounded-full shadow-lg min-w-48 hover:border-blue-800 shadow-blue-100 lg:w-96"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pl-3 mr-5 pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
            </div>

          <div className="flex items-center">
            {/* Profile */}
            <Link
              to="/profile"
              className="px-3 py-2 text-black hover:text-blue-400"
            >
              Profile
            </Link>

            <img
              src={userData.user?.image}
              alt="user"
              className="w-10 h-10 p-1 rounded-full"
            />
            <span className="px-3 py-2 text-black">
              {userData.user?.displayName}
            </span>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default ViewEventNav;
