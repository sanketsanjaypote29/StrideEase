import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EventFilter from "../components/eventFilter";
import EventContainer from "../components/eventContainer";
import Footer from "../components/footer";
import Navbar from "../components/navBars/dashboardNav";
const Dashboard = () => {
  const navigate = useNavigate();
  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:6005/login/sucess", {
        withCredentials: true,
      });
      console.log(response);
      localStorage.setItem("googleId", response.data.user.googleId);
    } catch (error) {
      navigate("/login");
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <div className="h-full overflow-x-hidden">
      <Navbar/>
      <EventFilter />
      <EventContainer />
      <Footer />
    </div>
  );
};

export default Dashboard;
