// App.js

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./components/home";
  import Register from "./components/register"; // Import the Register component

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
