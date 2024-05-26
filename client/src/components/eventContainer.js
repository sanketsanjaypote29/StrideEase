import React from "react";
import EventCard from "./eventCard";

const EventContainer = ({ events }) => {
  return (
<div className="items-center justify-center min-h-screen mt-8">
      <div className="flex items-center justify-center">
        <label className="relative flex text-3xl font-bold text-black ">
          Events At
        </label>
        <label className="flex ml-2 text-3xl font-bold text-gray-500 ">
          Pune
        </label>
      </div>

      <div className="flex flex-col px-3 py-3 mt-8 mb-2">
        <EventCard />
      </div>
      <div className="flex items-center justify-center ml-4 cursor-pointer">
        <p className="mr-2 text-gray-500">View All</p>
        <div className="flex">
          {/* <div className="w-3 h-3 mx-1 bg-black rounded-full"></div>
          <div className="w-3 h-3 mx-1 bg-black rounded-full"></div> */}
        </div>
      </div>
    </div>
  );
};

export default EventContainer;
