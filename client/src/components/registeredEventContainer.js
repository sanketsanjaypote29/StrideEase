import React from "react";
import RegisteredEventCard from "./registeredEventCard";

const registeredEventContainer = () => {
  return (
    <>
      <div className="flex h-fit mb-16 mt-16 overflow-x-scroll no-scrollbar ">
      <RegisteredEventCard />
      <RegisteredEventCard />
      <RegisteredEventCard />
      <RegisteredEventCard />
      <RegisteredEventCard />
      <RegisteredEventCard />
      </div>
    </>
  );
};

export default registeredEventContainer;
