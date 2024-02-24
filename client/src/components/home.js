import React from "react";
import "./home.css";

const Home = () => {
  return (
    <div className="container mx-auto px-4 flex justify-start">
      <div className="w-5/12 max-h-96 font-sans text-sky-950 mr-4 ml-40 mt-20">
        <h1 className="font-bold mb-4 text-5xl">
          Seamless Marathon Registration with Home Jersey Delivery
        </h1>
        <p className="text-2xl mb-4 text-gray">StrideEase, fast and easy.</p>
      </div>
      <div className="flex justify-start mt-10 ml-40">
        <img
          src="/marathon.jpg"
          alt="Marathon"
          className="w-80 h-3/4"
          style={{ marginLeft: "144px" }}
        />
      </div>
    </div>
  );
};

export default Home;
