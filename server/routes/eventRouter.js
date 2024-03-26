const express = require('express');
const router = express.Router();
const newEvent = require('../models/newEventSchema');

// Route for fetching all events
router.get('/events', async (req, res) => {
  try {
    const events = await newEvent.find({});

    if (!events || events.length === 0) {
      return res.status(404).json({ message: 'No events found' });
    }


    res.status(200).json({ message: 'Events found', events });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
router.get('/events/:eventId', async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const event = await newEvent.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json({ message: 'Event found', event });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
module.exports = router;
