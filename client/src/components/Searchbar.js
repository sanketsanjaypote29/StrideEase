import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const Searchbar = ({ onSearch }) => {
  const [search, setSearch] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(search);
  };
  console.log("search", search);
  return (
    <div className="relative">
      <form onSubmit={handleSearch}>
        <input
          type="search"
          placeholder="Search for Event...."
          className="px-3 py-2 pl-12 text-black border rounded-full shadow-lg min-w-96 hover:border-blue-800 shadow-blue-100 lg:w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          type="submit"
          className="absolute inset-y-0 right-0 flex items-center pr-3">
          <FaSearch className="text-gray-400" />
        </button>
      </form>
    </div>
  );
};

export default Searchbar;
