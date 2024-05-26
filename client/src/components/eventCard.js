import React, { useState, useEffect } from "react";
import { TERipple } from "tw-elements-react";
import { FaRegShareSquare } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../pages/helper";

const EventCard = ({ event }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/viewEventDetails/${event._id}`);
  };

  return (
    <div className="w-62 h-auto bg-amber-50 rounded-3xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] shadow-blue-100  hover:shadow-pink-200 dark:bg-white-700">
      <TERipple>
        <div className="relative h-56 bg-no-repeat bg-cover overflow">
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
          {event.ticketName}
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
            className="absolute right-0 px-4 py-2 text-black border rounded bg-transperent hover:bg-pink-400 hover:font-bold hover:text-white"
            onClick={handleClick}>
            More
          </button>
        </div>
      </div>
    </div>
  );
};

const EventList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/events`);
      const data = await response.json(); // Fix: extract the JSON data
      setEvents(data.events);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  if (events === undefined) {
    return <div>Loading events...</div>; // Display a loading message while fetching events
  }

  return (
    <div className="flex flex-col mx-4 space-y-5 lg:grid lg:grid-cols-2 lg:gap-10 lg:space-y-0 lg:mx-8">
      {events.map((event) => (
        <EventCard key={event._id} event={event} />
      ))}
    </div>
  );
};

export default EventList;