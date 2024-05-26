import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import { MdOutlineEventNote, MdOutlineContactMail, MdLockOutline } from "react-icons/md";
import { TbFileDescription } from "react-icons/tb";
import { IoBagCheckOutline, IoShareOutline } from "react-icons/io5";
import { GrMapLocation } from "react-icons/gr";
import { FcLike } from "react-icons/fc";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../components/footer";
import ViewEventNav from "../components/navBars/viewEventNav";

const ViewEventDetails = () => {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [showMapPopup, setShowMapPopup] = useState(false);

  useEffect(() => {
    fetchEventDetails();
  }, [eventId]);

  const fetchEventDetails = async () => {
    try {
      const response = await fetch(
        `http://localhost:6005/api/events/${eventId}`
      );
      const data = await response.json();
      setEvent(data.event);
    } catch (error) {
      console.error("Error fetching event details:", error);
    }
  };

  if (!event) {
    return <div>Loading...</div>;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "2-digit", month: "long", year: "numeric" };
    return date.toLocaleDateString("en-GB", options);
  };

  const openMapInPopup = (address) => {
    const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(address)}`;
    window.open(mapUrl, "_blank", "width=600,height=600");
  };

  const handleClick = () => {
    navigate(`/checkOut/${event._id}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <ViewEventNav />
      <div className="flex flex-col justify-center p-4 mt-8 space-y-8 lg:flex-row lg:p-10 lg:space-y-0 lg:space-x-8">
        <div className="flex flex-col items-start space-y-4 lg:space-y-8 lg:w-1/4">
          <button className="flex items-center w-full px-4 py-2 font-bold text-black bg-transparent rounded hover:border lg:w-auto">
            <MdOutlineEventNote className="mr-2" size={25} />
            <span>Event</span>
            <span className="ml-1 text-gray-500">Detail</span>
          </button>
          <button className="flex items-center w-full px-4 py-2 font-bold text-black bg-transparent rounded hover:border lg:w-auto">
            <TbFileDescription className="mr-2" size={25} />
            <span>Event</span>
            <span className="ml-1 text-gray-500">Description</span>
          </button>
          <button className="flex items-center w-full px-4 py-2 font-bold text-black bg-transparent rounded hover:border lg:w-auto">
            <IoBagCheckOutline className="mr-2" size={25} />
            <span>Checkout</span>
          </button>
        </div>

        <div className="flex flex-col lg:flex-row lg:space-x-8 lg:w-3/4">
          <div className="flex flex-col w-full space-y-8 lg:w-3/5">
            <img
              src="/eventbanner.jpg"
              alt="Event"
              className="object-cover w-full rounded-lg h-72"
            />
            <div className="flex flex-col space-y-4">
              <p className="text-xl text-center text-black">
                {event.ticketName}
              </p>
              <div className="flex items-center space-x-2">
                <span className="text-gray-600 text-md">{formatDate(event.saleStartDate)} |</span>
                <span className="text-gray-600 text-md">{event.venueAddress}</span>
                <button
                  className="flex items-center px-2 py-2 border rounded-xl"
                  onClick={() => openMapInPopup(event.venueAddress)}
                >
                  View On map <GrMapLocation className="ml-2" size={20} />
                </button>
              </div>
              <div className="flex space-x-4">
                <button>
                  <IoShareOutline size={30} />
                </button>
                <button>
                  <FcLike size={30} />
                </button>
              </div>
              <div className="p-4 border rounded-lg bg-amber-50">
                <div className="mb-4">
                  <span className="text-lg font-bold text-black">Event</span>
                  <span className="ml-1 font-semibold text-gray-500">Detail</span>
                </div>
                <div className="p-4 bg-white border rounded-lg">
                  <p>{event.description}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-4 lg:space-y-8 lg:w-2/5">
            <div className="p-4 border rounded-lg bg-amber-50">
              <h2 className="font-semibold text-black">
                ₹ {event.ticketPrice} Onwards Exclusive of Taxes and Platform Fees
              </h2>
              <button
                className="flex items-center justify-center w-full px-4 py-2 mt-4 font-bold text-black border rounded-lg bg-amber-500"
                onClick={handleClick}
              >
                <MdLockOutline className="mr-2" size={25} /> Book Now
              </button>
            </div>
            <div className="p-4 border rounded-lg bg-amber-50">
              <h2 className="font-semibold text-black">
                Have any Doubts? Send any Queries To the Organizer
              </h2>
              <button className="flex items-center justify-center w-full px-4 py-2 mt-4 font-bold text-black border rounded-lg bg-amber-500">
                <MdOutlineContactMail className="mr-2" size={25} /> Contact Organizer
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ViewEventDetails;
