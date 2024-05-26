import React from 'react'
import EventContainer from '../components/eventContainer'
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "./helper";


const LiveEvent = () => {
    const navigate = useNavigate();
    // const getUser = async () => {
    //     try {
    //       const response = await axios.get(`${BASE_URL}/login/sucess`, {
    //         withCredentials: true,
    //       });
    //       // console.log(response);
    //       localStorage.setItem("googleId", response.data.user.googleId);
    //     } catch (error) {
    //       navigate("/login");
    //     }
    //   };
    //   useEffect(() => {
    //     getUser();
    //   }, []);
  return (
    <div>
        <EventContainer />
    </div>
  )
}

export default LiveEvent