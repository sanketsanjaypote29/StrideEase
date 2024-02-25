import React from "react";
import Navbar from "../components/navbar";

const CreateEvent = () => {
  return (
    <div>
      <div className="flex justify-center">
        {/* Container for progress of form filling */}
        <div className="w-1/2 p-4">
          {/* Add your progress component here */}
          Progress of Form Filling
        </div>

        {/* Container for form */}
        <div className="w-1/2 p-4">
          {/* Add your form component here */}
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Name
              </label>
              <input
                type="text"
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter event name"
              />
            </div>
            {/* Add more input fields here */}

            <div className="flex justify-between">
              <button
                type="button"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Next
              </button>
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
