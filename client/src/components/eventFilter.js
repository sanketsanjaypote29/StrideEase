import React from "react";
import { FaRegCalendarCheck } from "react-icons/fa6";
import { FaFreeCodeCamp } from "react-icons/fa";
import { BsCalendarWeekFill } from "react-icons/bs";
import { FaCalendarAlt } from "react-icons/fa";

const EventFilter = ({ handleFilter }) => {
  const handleClick = (filter) => {
    handleFilter(filter);
  };

  return (
    <div className="flex flex-col items-start p-4 space-y-2 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-3 lg:items-center lg:justify-center">
      <div className="flex items-center mb-2 sm:mb-0">
        <label className="text-xl font-bold text-black sm:text-2xl">Filter</label>
        <label className="ml-2 text-xl text-gray-500 sm:text-2xl">Events</label>
      </div>
      <div className="flex flex-wrap space-x-2 space-y-2 sm:space-y-0 sm:space-x-3 lg:items-center lg:justify-center">
        <button
          onClick={() => handleClick("today")}
          className="flex items-center w-auto px-3 py-2 font-semibold text-black border rounded-md">
          <label className="p-1">Today</label>
          <FaRegCalendarCheck className="ml-2 sm:ml-3" />
        </button>
        <button
          onClick={() => handleClick("tomorrow")}
          className="flex items-center w-auto px-3 py-2 font-semibold text-black border rounded-md">
          <label className="p-1">Tomorrow</label>
          <FaRegCalendarCheck className="ml-2 sm:ml-3" />
        </button>
        <button
          onClick={() => handleClick("week")}
          className="flex items-center w-auto px-3 py-2 font-semibold text-black border rounded-md">
          <label className="p-1">This Week</label>
          <BsCalendarWeekFill className="ml-2 sm:ml-3" />
        </button>
        <button
          onClick={() => handleClick("month")}
          className="flex items-center w-auto px-3 py-2 font-semibold text-black border rounded-md">
          <label className="p-1">This Month</label>
          <FaCalendarAlt className="ml-2 sm:ml-3" />
        </button>
        <button
          onClick={() => handleClick("free")}
          className="flex items-center w-auto px-3 py-2 font-semibold text-black border rounded-md">
          <label className="p-1">Free</label>
          <FaFreeCodeCamp className="ml-2 sm:ml-3" />
        </button>
      </div>
    </div>
  );
};

export default EventFilter;
