// App.js

import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import Register from "./pages/register"; // Import the Register component
import Login from "./pages/login"; // Import the Register component
import Dashboard from "./pages/dashboard";
import CreateEvent from "./pages/createEvent";
import ViewEventDetails from "./pages/viewEventDetails";
import StepperSample from "./pages/stepperSample";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Routes>
      <Route path="/stepper" element={<StepperSample />} />
      </Routes>
      
      {/* <Navbar />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/createevent" element={<CreateEvent />} />
        <Route path="/location" element={<locationDemo />} />
        <Route path="/viewEventDetails" element={<ViewEventDetails />} />
      </Routes> 
      */}
    </>
  );
}

export default App;
