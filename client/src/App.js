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
import { ToastContainer } from "react-toastify";
import RegisteredEvent from "./pages/registeredEvents";
import CheckOutPage from "./pages/checkOutPage";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

function App() {
  // useEffect(() => {
  //   const handleContextMenu = (e) => {
  //     e.preventDefault(); // Prevent the default right-click behavior
  //   };

  //   const handleKeyPress = (e) => {
  //     // Prevent right-click and some common shortcut keys
  //     if (e.ctrlKey && (e.key === 'c' || e.key === 'v' || e.key === 'i')) {
  //       e.preventDefault();
  //       alert('This keyboard combination has been disabled');
  //     }

  //     // Prevent shortcut keys for opening developer tools
  //     if ((e.ctrlKey && e.shiftKey && e.key === 'i') || // Ctrl + Shift + I
  //         (e.ctrlKey && e.shiftKey && e.key === 'j') || // Ctrl + Shift + J
  //         (e.ctrlKey && e.shiftKey && e.key === 'c') || // Ctrl + Shift + C
  //         (e.ctrlKey && e.shiftKey && e.key === 'k') || // Ctrl + Shift + K
  //         (e.ctrlKey && e.key === 'u')) { // Ctrl + U
  //       e.preventDefault();
  //       alert('Developer tools are disabled');
  //     }

  //     // Prevent F12 key
  //     if (e.key === 'F12' || e.key === 'F12' || (e.ctrlKey && e.key === 'F12')) {
  //       e.preventDefault();
  //       alert('F12 key is disabled');
  //     }
  //   };

  //   // Add event listeners when the component mounts
  //   document.addEventListener('contextmenu', handleContextMenu);
  //   document.addEventListener('keydown', handleKeyPress);

  //   // Cleanup: Remove event listeners when the component unmounts
  //   return () => {
  //     document.removeEventListener('contextmenu', handleContextMenu);
  //     document.removeEventListener('keydown', handleKeyPress);
  //   };
  // }, []);
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/createevent" element={<CreateEvent />} />
        <Route path="/location" element={<locationDemo />} />
        <Route
          path="/viewEventDetails/:eventId"
          element={<ViewEventDetails />}
        />
        <Route path="/registeredEvent" element={<RegisteredEvent />} />
        <Route path="/checkOut/:eventId" element={<CheckOutPage />} />
      </Routes>
    </>
  );
}

export default App;
