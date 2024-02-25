import React from "react";
import { TERipple } from "tw-elements-react";

import { FaRegShareSquare } from "react-icons/fa";
import { FcLike } from "react-icons/fc";


const EventCard = () => {
  return (
    <div className="block w-96 h-fit ml-16 bg-amber-50 rounded-3xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] shadow-blue-100  dark:bg-white-700">
      <TERipple>
        <div className="relative overflow-hidden bg-cover bg-no-repeat">
          <img
            className="rounded-t-3xl"
            src="https://tecdn.b-cdn.net/img/new/standard/nature/186.jpg"
            alt=""
          />
          <a href="#!">
            <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsla(0,0%,98%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100"></div>
          </a>
        </div>
      </TERipple>
      <div className="p-6">
        <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-black-50">
          Pune City Marathon 2024
        </h5>
        <p className="mb-14 text-base text-neutral-600 dark:text-black-200">
          March 25 | Baner, Pune
        </p>
        <div className="relative flex">
          <button className="text-2xl right-20 bottom-2 absolute">
            <FcLike />
          </button>
          <button className="text-2xl right-28 bottom-2 absolute">
            <FaRegShareSquare />
          </button>
          <button className="absolute bottom-0 right-0  bg-transperent text-black border hover:bg-pink-500 hover:font-bold hover:text-white px-4 py-2 rounded">
            Free
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
