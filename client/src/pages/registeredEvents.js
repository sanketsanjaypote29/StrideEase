import React, { useState, useEffect } from "react";
import Footer from "../components/footer";
import { useNavigate } from "react-router-dom";
import RegisteredEventCard from "../components/registeredEventCard";

const RegisteredEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const googleId = localStorage.getItem("googleId");
        const response = await fetch(
          `http://localhost:6005/api/events/googleId/${googleId}`
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
      await fetch(`http://localhost:6005/api/events/${eventId}`, {
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
      <div className="flex h-fit mb-16 mt-16 overflow-x-scroll no-scrollbar ">
        {loading ? (
          <p>Loading...</p>
        ) : events === undefined ? (
          <div className="border h-96 w-96 bg-amber-50 font-bold items-center ml-96 rounded-lg justify-center">
            <p className="ml-10 mt-36">
              You haven't created any events yet. Create an event first.
            </p>
            <div>
              <button
                className="text-xl border flex items-center m-5 p-2 rounded-lg bg-amber-50 hover:bg-blue-400 hover:text-white  text-black ml-28 mr-16"
                onClick={handleClick}
              >
                Create Event
              </button>
            </div>
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

export default RegisteredEvents;
