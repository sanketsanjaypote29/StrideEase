import React from 'react';

const Navbar = () => {
  return (
    
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="text-white">
            <a href="/" className="text-lg font-bold">My App</a>
          </div>
          <div className="flex items-center">
            <a href="/" className="text-white hover:text-gray-400 px-3 py-2">Home</a>
            <a href="/about" className="text-white hover:text-gray-400 px-3 py-2">About</a>
            <a href="/contact" className="text-white hover:text-gray-400 px-3 py-2">Contact</a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
