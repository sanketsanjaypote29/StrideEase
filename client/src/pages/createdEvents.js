import React, { useState, useEffect } from "react";
import Footer from "../components/footer";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navBars/RegisteredEventNav";
import RegisteredEventCard from "../components/createdEventCard";
import { BASE_URL } from "./helper";

const CreatedEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const googleId = localStorage.getItem("googleId");
        const response = await fetch(
          `${BASE_URL}/api/events/googleId/${googleId}`
        );
        const data = await response.json();
        setEvents(data.events);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleClick = () => {
    navigate("/createEvent");
  };

  // Function to handle event deletion
  const handleEventDelete = async (eventId) => {
    try {
      // Make a DELETE request to delete the event
      await fetch(`${BASE_URL}/api/events/${eventId}`, {
        method: "DELETE",
      });

      // Remove the deleted event from the events state
      setEvents(events.filter((event) => event._id !== eventId));
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col max-w-full mt-16 mb-16">
        {loading ? (
          <p>Loading...</p>
        ) : events === undefined ? (
          <div className="flex flex-col items-center justify-center font-bold border rounded-lg h-96 bg-amber-50">
            <p className="mb-4 text-center">
              You haven't created any events yet. Create an event first.
            </p>
            <button
              className="flex items-center px-4 py-2 text-xl text-black border rounded-lg bg-amber-50 hover:bg-blue-400 hover:text-white"
              onClick={handleClick}
            >
              Create Event
            </button>
          </div>
        ) : (
          events.map((event) => (
            <RegisteredEventCard
              key={event._id}
              event={event}
              googleId={event.googleId}
              onDelete={() => handleEventDelete(event._id)} // Pass handleEventDelete function as onDelete prop
            />
          ))
        )}
      </div>
      <Footer />
    </>
  );
};

export default CreatedEvents;
