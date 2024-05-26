const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const newEvent = require("../models/newEventSchema");
const Event = require("../models/newEventSchema");
// Route for fetching all events
router.get("/events", async (req, res) => {
  try {
    const events = await newEvent.find({});

    if (!events || events.length === 0) {
      return res.status(404).json({ message: "No events found" });
    }

    res.status(200).json({ message: "Events found", events });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
// router.get("/events/:eventId", async (req, res) => {
//   const eventId = req.params.eventId;
//   if (!mongoose.Types.ObjectId.isValid(eventId)) {
//     return res.status(400).json({ message: "Invalid event ID format" });
//   }

//   try {
//     const event = await Event.findById(eventId);

//     if (!event) {
//       return res.status(404).json({ message: "Event not found" });
//     }

//     res.status(200).json({ message: "Event found", event });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

router.get("/events/googleId/:googleId", async (req, res) => {
  try {
    const googleId = req.params.googleId;
    console.log(googleId);
    const events = await Event.find({ googleId });

    if (events.length === 0) {
      return res
        .status(404)
        .json({ message: "No events found for the specified Google ID" });
    }

    res.status(200).json({ message: "Events found", events });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/events/:eventId", async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const deletedEvent = await Event.findByIdAndDelete(eventId);

    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
router.put("/events/:eventId", async (req, res) => {
  console.log("Event ID route hit with ID:", req.params.eventId);
  const eventId = req.params.eventId;
  const eventDataToUpdate = req.body;
  console.log(eventDataToUpdate);
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      eventDataToUpdate,
      { new: true }
    );
    res.json({
      success: true,
      message: "Event updated successfully",
      event: updatedEvent,
    });
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({ success: false, message: "Failed to update event" });
  }
});

// Route for searching events based on a query, not an ID
router.get("/events/search", async (req, res) => {
  console.log("Search route hit with query:", req.query.q);
  try {
    const searchQuery = req.query.q ? String(req.query.q).trim() : null;
    if (!searchQuery) {
      return res.status(400).json({ message: "No search query provided" });
    }

    // Check if the search query is a valid date
    const isDate = !isNaN(Date.parse(searchQuery));
    let events;

    if (isDate) {
      // If it's a valid date, construct a range query for date fields
      events = await Event.find({
        $or: [
          {
            saleStartDate: {
              $gte: new Date(searchQuery),
              $lte: new Date(new Date(searchQuery).getTime() + 24 * 60 * 60 * 1000),
            },
          },
          {
            saleEndDate: {
              $gte: new Date(searchQuery),
              $lte: new Date(new Date(searchQuery).getTime() + 24 * 60 * 60 * 1000),
            },
          },
        ],
      });
    } else {
      // If it's not a valid date, search in other fields
      events = await Event.find({
        $or: [
          { organiserName: { $regex: searchQuery, $options: "i" } },
          { description: { $regex: searchQuery, $options: "i" } },
          { country: { $regex: searchQuery, $options: "i" } },
          { state: { $regex: searchQuery, $options: "i" } },
          { venueAddress: { $regex: searchQuery, $options: "i" } },
          { description: { $regex: searchQuery, $options: "i" } },
          { ticketType: { $regex: searchQuery, $options: "i" } },
          { ticketName: { $regex: searchQuery, $options: "i" } },
        ],
      });
    }

    if (!events.length) {
      return res.status(404).json({ message: "No events found" });
    }

    res.status(200).json({ message: "Events found", events });
  } catch (error) {
    console.error("Error inside router: " + error);
    res.status(500).json({ message: "Internal server error" });
  }
});


// Route for fetching events by ID
router.get("/events/:eventId", async (req, res) => {
  const eventId = req.params.eventId;
  if (!mongoose.Types.ObjectId.isValid(eventId)) {
    return res.status(400).json({ message: "Invalid event ID format" });
  }

  try {
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({ message: "Event found", event });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
