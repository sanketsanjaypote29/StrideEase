import React from "react";
import Navbar from "../components/navbar";
import { MdOutlineEventNote } from "react-icons/md";
import { TbFileDescription } from "react-icons/tb";
import { IoBagCheckOutline } from "react-icons/io5";
import { GrMapLocation } from "react-icons/gr";
import Footer from "../components/footer";
import { IoShareOutline } from "react-icons/io5";
import { FcLike } from "react-icons/fc";
import { MdLockOutline } from "react-icons/md";
import { MdOutlineContactMail } from "react-icons/md";

const ViewEventDetails = () => {
  return (
    <div className="h-full">
      <div className="flex justify-center mt-8">
        <div className="flex flex-row justify-between ml-10">
          <div className="mb-8 mr-10 ">
            <div className="flex items-center">
              <button className="bg-transparent hover:border text-black w-40 mb-7 font-bold py-2 px-4 rounded  flex items-center">
                <MdOutlineEventNote className="mr-1" size={"25px"} />
                <label className="text-black font-bold text-lg">Event</label>
                <label className="text-gray-500 ml-1">Detail</label>
              </button>
            </div>
            <div className="flex items-center">
              <button className="bg-transparent hover:border text-black w-50  font-bold py-2 px-4 rounded mb-7 flex items-center">
                <TbFileDescription className="mr-1" size={"25px"} />
                <label className="text-black font-bold text-lg">Event</label>
                <label className="text-gray-500 ml-1">Description</label>
              </button>
            </div>
            <div className="flex items-center">
              <button className="bg-transparent hover:border text-black w-40  font-bold py-2 px-4 rounded mb-7 flex items-center">
                <IoBagCheckOutline className="mr-1" size={"25px"} />
                <label className="text-black font-bold text-lg">Checkout</label>
              </button>
            </div>
          </div>
        </div>

        <div className="mr-8 w-[1000px] h-full  py-5">
          <img
            src="/eventbanner.jpg"
            alt="Event"
            className="w-[1100px] h-72 object-cover"
          />
          <div className="flex ml-8">
            <p className="mt-4 text-center text-black text-xl ">
              Pune City Marathon 2024
            </p>
          </div>
          <div className="flex items-center">
            <label className="ml-10 text-gray-600 w-44 text-md mr-20">
              March 25 | Baner, Pune
            </label>
            <button className="border px-2 py-3 rounded-xl w-52 flex items-center justify-center">
              View On map <GrMapLocation className="ml-3" size={"20px"} />
            </button>
            <div className="ml-60 flex">
              <button>
                <IoShareOutline size={"30px"} className="ml-10 mr-5" />
              </button>
              <button>
                <FcLike size={"30px"} />
              </button>
            </div>
          </div>
        </div>

        <div>
          <div className="border bg-amber-100 p-4 w-80 rounded-lg">
            <h2 className="text-black font-semibold">
              ₹499 /- Onwards Exclusive of Taxes and Platform Fees
            </h2>

            <button className="border  px-2 py-3 rounded-lg mt-10 bg-amer-500   text-black border-black font-bold flex items-center">
              <MdLockOutline className="ml-2 mr-3" size={"25px"} /> Book Now
            </button>
          </div>
          <div className="border bg-amber-100  p-4 w-80 mr-10 mt-10 rounded-lg">
            <h2 className="text-black font-semibold">
              Have any Doubts? Send any Queries To the Organizer
            </h2>
            <button className="border px-2 py-3 rounded-lg mt-10 bg-amer-500 border-black text-black font-bold flex items-center">
              <MdOutlineContactMail className="ml-2 mr-3" size={"25px"} />{" "}
              Contact Organizer
            </button>
          </div>
        </div>
      </div>
      {/* <Footer/> */}
    </div>
  );
};

export default ViewEventDetails;
