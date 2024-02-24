import React from "react";
import "./navbar.css";

const Navbar = () => {
  return (
    <nav className="bg-white p-4">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {/* Render the logo */}
            <img src="/logo.png" alt="Logo" className="h-8 mr-2" />{" "}
            {/* Adjust height and margin as needed */}
            <div className="flex items-center">
              {" "}
              {/* New container for Stride Ease and dropdowns */}
              <a href="/" className="text-lg font-bold text-black mr-4">
                {" "}
                {/* Add margin-right to Stride Ease */}
                Stride Ease
              </a>
              {/* Dropdowns */}
              <select className="px-3 py-2 rounded-lg mr-1">
                {" "}
                {/* Adjust margin-right */}
                <option value="option1">Shipping</option>
                {/* Add dropdown options as needed */}
              </select>
              <select className="px-3 py-2 rounded-lg mr-1">
                {" "}
                {/* Adjust margin-right */}
                <option value="option2">Tracking</option>
                {/* Add dropdown options as needed */}
              </select>
              <select className="px-3 py-2 rounded-lg mr-1">
                {" "}
                {/* Adjust margin-right */}
                <option value="option3">Support</option>
                {/* Add dropdown options as needed */}
              </select>
              <select className="px-3 py-2 rounded-lg">
                {" "}
                {/* No margin-right for the last dropdown */}
                <option value="option4">Account</option>
                {/* Add dropdown options as needed */}
              </select>
            </div>
          </div>

          <div className="flex items-center ml-0 ">
            <a
              href="/contact"
              className="hover:text-blue-400 px-3 py-2 text-black">
              Sign In
            </a>
            <button className="border py-2 px-3 rounded-lg hover:border-blue-400 ">
              Register
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
