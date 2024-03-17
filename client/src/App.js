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

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/createevent" element={<CreateEvent />} />
        <Route path="/viewEventDetails" element={<ViewEventDetails />} />
      </Routes>
    </>
  );
}

export default App;
