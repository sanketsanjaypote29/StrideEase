import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { TERipple } from "tw-elements-react";
import { FaRegShareSquare } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../pages/helper";
import { FaRegCalendarCheck } from "react-icons/fa6";
import { FaFreeCodeCamp } from "react-icons/fa";
import { BsCalendarWeekFill } from "react-icons/bs";
import { FaCalendarAlt } from "react-icons/fa";
import Searchbar from "./Searchbar";
import EventFilter from "./eventFilter";
import axios from "axios";

const EventCard = ({ event }) => {
  const navigate = useNavigate();

  const handleClick = async () => {
    const getUser = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/login/sucess`, {
          withCredentials: true,
        });
        // console.log(response);
        localStorage.setItem("googleId", response.data.user.googleId);
      } catch (error) {
        navigate("/login");
      }
    };
    if (localStorage.getItem("googleId") === null) {
      getUser();
    }
    if (!getUser()) {
      navigate("/login");
    } else {
      navigate(`/viewEventDetails/${event._id}`);
    }
  };

  return (
    <div className="w-62 h-auto bg-amber-50 rounded-3xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] shadow-blue-100 hover:shadow-pink-200 dark:bg-white-700">
      <TERipple>
        <div className="relative h-48 bg-no-repeat bg-cover overflow lg:h-56">
          <img
            className="object-cover w-full h-full rounded-t-3xl"
            src="https://tecdn.b-cdn.net/img/new/standard/nature/186.jpg"
            alt=""
          />
          <a href="#!">
            <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsla(0,0%,98%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100"></div>
          </a>
        </div>
      </TERipple>
      <div className="h-[8rem] p-3">
        <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-black-50">
          {event.name}
        </h5>
        <div className="p-1 overflow-hidden whitespace-nowrap text-ellipsis">
          {event.description}
        </div>
        <div className="relative flex bottom-2">
          <button className="absolute mt-2 ml-2 text-2xl right-20">
            <FcLike />
          </button>
          <button className="absolute mt-2 ml-2 text-2xl right-28">
            <FaRegShareSquare />
          </button>
          <button
            className="absolute right-0 px-4 py-2 text-black border rounded bg-transparent hover:bg-pink-400 hover:font-bold hover:text-white"
            onClick={handleClick}
          >
            More
          </button>
        </div>
      </div>
    </div>
  );
};
const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchError, setSearchError] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/events`);
      const data = await response.json();
      setEvents(data.events || data);
      setLoading(false);
      setSearchError(null); // Reset search error if any
    } catch (error) {
      console.error("Error fetching events:", error);
      setLoading(false);
      setSearchError("Error fetching events. Please try again.");
    }
  };

  const handleSearch = async (query) => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/api/events/search?q=${query}`);
      const data = await response.json();
      setEvents(data.events);
      setLoading(false);
      setSearchError(null); // Reset search error if any
    } catch (error) {
      console.error("Error searching events:", error);
      setLoading(false);
      setSearchError("Error searching events. Please try again.");
    }
  };

  const handleToday = async () => {
    try {
      setLoading(true);

      // Get current date
      const currentDate = new Date();

      // Format date as YYYY-MM-DD
      const year = currentDate.getFullYear();
      const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
      const day = currentDate.getDate().toString().padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`;

      // Fetch events for today's date
      const response = await fetch(
        `${BASE_URL}/api/events/search?q=${formattedDate}`
      );
      const data = await response.json();
      setEvents(data.events);
      setLoading(false);
      setSearchError(null); // Reset search error if any
    } catch (error) {
      console.error("Error filtering events:", error);
      setLoading(false);
      setSearchError("Error filtering events. Please try again.");
    }
  };
  const handleTomorrow = async () => {
    try {
      setLoading(true);

      // Get tomorrow's date
      const currentDate = new Date();
      const tomorrowDate = new Date(currentDate);
      tomorrowDate.setDate(currentDate.getDate() + 1);

      // Format date as YYYY-MM-DD
      const year = tomorrowDate.getFullYear();
      const month = (tomorrowDate.getMonth() + 1).toString().padStart(2, "0");
      const day = tomorrowDate.getDate().toString().padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`;

      // Fetch events for tomorrow's date
      const response = await fetch(
        `${BASE_URL}/api/events/search?q=${formattedDate}`
      );
      const data = await response.json();
      setEvents(data.events);
      setLoading(false);
      setSearchError(null); // Reset search error if any
    } catch (error) {
      console.error("Error filtering events:", error);
      setLoading(false);
      setSearchError("Error filtering events. Please try again.");
    }
  };

  const handleWeek = async () => {
    try {
      setLoading(true);

      // Get start and end dates for the current week
      const currentDate = new Date();
      const startOfWeek = new Date(
        currentDate.setDate(currentDate.getDate() - currentDate.getDay())
      );
      const endOfWeek = new Date(
        currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 6)
      );

      // Format dates as YYYY-MM-DD
      const startYear = startOfWeek.getFullYear();
      const startMonth = (startOfWeek.getMonth() + 1)
        .toString()
        .padStart(2, "0");
      const startDay = startOfWeek.getDate().toString().padStart(2, "0");
      const endYear = endOfWeek.getFullYear();
      const endMonth = (endOfWeek.getMonth() + 1).toString().padStart(2, "0");
      const endDay = endOfWeek.getDate().toString().padStart(2, "0");
      const startDate = `${startYear}-${startMonth}-${startDay}`;
      const endDate = `${endYear}-${endMonth}-${endDay}`;

      // Fetch events for the current week
      const response = await fetch(
        `${BASE_URL}/api/events/search?q=${startDate}&endDate=${endDate}`
      );
      const data = await response.json();
      setEvents(data.events);
      setLoading(false);
      setSearchError(null); // Reset search error if any
    } catch (error) {
      console.error("Error filtering events:", error);
      setLoading(false);
      setSearchError("Error filtering events. Please try again.");
    }
  };

  const handleMonth = async () => {
    try {
      setLoading(true);

      // Get start and end dates for the current month
      const currentDate = new Date();
      const startOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
      );
      const endOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
      );

      // Format dates as YYYY-MM-DD
      const startYear = startOfMonth.getFullYear();
      const startMonth = (startOfMonth.getMonth() + 1)
        .toString()
        .padStart(2, "0");
      const startDay = startOfMonth.getDate().toString().padStart(2, "0");
      const endYear = endOfMonth.getFullYear();
      const endMonth = (endOfMonth.getMonth() + 1).toString().padStart(2, "0");
      const endDay = endOfMonth.getDate().toString().padStart(2, "0");
      const startDate = `${startYear}-${startMonth}-${startDay}`;
      const endDate = `${endYear}-${endMonth}-${endDay}`;

      // Fetch events for the current month
      const response = await fetch(
        `${BASE_URL}/api/events/search?q=${startDate}&endDate=${endDate}`
      );
      const data = await response.json();
      setEvents(data.events);
      setLoading(false);
      setSearchError(null); // Reset search error if any
    } catch (error) {
      console.error("Error filtering events:", error);
      setLoading(false);
      setSearchError("Error filtering events. Please try again.");
    }
  };

  const handleFree = async () => {
    try {
      setLoading(true);
      // Send the query to the server without expecting any response data
      const response = await fetch(`${BASE_URL}/api/events/search?q=free`);
      // Since we don't need to handle any response, we can directly set loading to false
      const data = await response.json();
      setEvents(data.events);
      setLoading(false);
      setSearchError(null); // Reset search error if any
    } catch (error) {
      console.error("Error filtering events:", error);
      setLoading(false);
      setSearchError("Error filtering events. Please try again.");
    }
  };

  if (loading) {
    return <div>Loading events...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-center">
        <label className="relative flex text-3xl font-bold text-black ">
          Events At
        </label>
        <label className="flex ml-2 text-3xl font-bold text-gray-500 ">
          Pune
        </label>
      </div>
        <Searchbar onSearch={handleSearch} />
      <div className="flex justify-center items-center mb-10">
        <div className="flex flex-col items-start p-4 space-y-2 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-3 lg:items-center lg:justify-center">
          <div className="flex items-center mb-2 sm:mb-0">
            <label className="text-xl font-bold text-black sm:text-2xl">
              Filter
            </label>
            <label className="ml-2 text-xl text-gray-500 sm:text-2xl">
              Events
            </label>
          </div>
          <div className="flex flex-wrap space-x-2 space-y-2 sm:space-y-0 sm:space-x-3 lg:items-center lg:justify-center">
            <button
              onClick={() => handleToday("today")}
              className="flex items-center w-auto px-3 py-2 font-semibold text-black border rounded-md"
            >
              <label className="p-1">Today</label>
              <FaRegCalendarCheck className="ml-2 sm:ml-3" />
            </button>
            {/* <button
              onClick={() => handleTomorrow("tomorrow")}
              className="flex items-center w-auto px-3 py-2 font-semibold text-black border rounded-md"
            >
              <label className="p-1">Tomorrow</label>
              <FaRegCalendarCheck className="ml-2 sm:ml-3" />
            </button> */}
            <button
              onClick={() => handleWeek("week")}
              className="flex items-center w-auto px-3 py-2 font-semibold text-black border rounded-md"
            >
              <label className="p-1">This Week</label>
              <BsCalendarWeekFill className="ml-2 sm:ml-3" />
            </button>
            <button
              onClick={() => handleMonth("month")}
              className="flex items-center w-auto px-3 py-2 font-semibold text-black border rounded-md"
            >
              <label className="p-1">This Month</label>
              <FaCalendarAlt className="ml-2 sm:ml-3" />
            </button>
            <button
              onClick={() => handleFree("free")}
              className="flex items-center w-auto px-3 py-2 font-semibold text-black border rounded-md"
            >
              <label className="p-1">Free</label>
              <FaFreeCodeCamp className="ml-2 sm:ml-3" />
            </button>
          </div>
        </div>
      </div>
      {searchError && <div>{searchError}</div>}
      <div className="flex flex-col mx-4 space-y-5 lg:grid lg:grid-cols-2 lg:gap-10 lg:space-y-0 lg:mx-8">
        {events && events.length > 0 ? (
          events.map((event) => <EventCard key={event._id} event={event} />)
        ) : (
          <div>No events found.</div>
        )}
      </div>
    </div>
  );
};

export default EventList;
