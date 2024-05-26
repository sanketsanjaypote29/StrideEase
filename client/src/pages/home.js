import React from "react";
import "./home.css";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import Chatbot from "../components/Chatbot";
import Service from "../components/Service";
import Testimonal from "../components/Testimonal";
const Home = () => {
  return (
    <>
      <Navbar />
      <div className="overflow-x-scroll no-scrollbar">
      <div className="container justify-start px-4 mx-auto md:flex lg:items-center lg:justify-center lg:flex ">
          <div className="w-full mt-20 font-sans text-sky-950 md:mr-4 md:w-3/6 lg:mt-0 lg:flex lg:items-center lg:justify-center lg:w-2/4">
            <div className=" lg:pl-4">
            <h1 className="mb-4 text-3xl font-bold md:text-4xl">
              Seamless Marathon Registration with Home Jersey Delivery
            </h1>
            <p className="mb-4 text-2xl text-gray">
              StrideEase, fast and easy.
            </p>
            </div>
          </div>
          <div className="flex justify-start w-full mt-10 md:w-3/4 h-2/5 md:mr-0">
            <img
              src="./jogging/jogging-not-css.svg"
              alt="Marathon"
              className="w-full h-[20rem] lg:h-[35rem]"
            />
          </div>
        </div>
        <div className="m-8">
          <Service />
        </div>
        <div className="m-8">
          <Testimonal />
        </div>
        <div>
          <Chatbot />
        </div>
      </div>
      <div className="w-full">
        <Footer />
      </div>
    </>
  );
};

export default Home;
