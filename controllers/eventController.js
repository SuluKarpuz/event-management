import asyncHandler from "express-async-handler";
import Event from "../models/eventModel.js";
import { eventValidationSchema } from "../validators/eventValidator.js";

// @desc    Create a new event
// @route   POST /api/events
// @access  Private
const createEvent = asyncHandler(async (req, res) => {
  const { error } = eventValidationSchema.validate(req.body);
  if (error) {
    res.status(400);
    throw new Error(error.details[0].message);
  }
  const { name, date, location, description } = req.body;

  const event = await Event.create({
    name,
    date,
    location,
    description,
  });

  if (event) {
    res.status(201).json(event);
  } else {
    res.status(400);
    throw new Error("Invalid event data");
  }
});

// @desc    Update the details of an existing event
// @route   PUT /api/events/:id
// @access  Private
const updateEvent = asyncHandler(async (req, res) => {
  const { error } = eventValidationSchema.validate(req.body);
  if (error) {
    res.status(400);
    throw new Error(error.details[0].message);
  }
  const { name, date, location, description } = req.body;

  const event = await Event.findById(req.params.id);

  if (event) {
    event.name = name || event.name;
    event.date = date || event.date;
    event.location = location || event.location;
    event.description = description || event.description;

    const updatedEvent = await event.save();
    res.json(updatedEvent);
  } else {
    res.status(404);
    throw new Error("Event not found");
  }
});

// @desc    Delete an existing event
// @route   DELETE /api/events/:id
// @access  Private
const deleteEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (event) {
    await event.deleteOne();
    res.json({ message: "Event deleted" });
  } else {
    res.status(404);
    throw new Error("Event not found");
  }
});

// @desc    Get details of an existing event by its ID
// @route   GET /api/events/:id
// @access  Public
const getEventById = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id).populate("attendees.user");

  if (event) {
    res.json(event);
  } else {
    res.status(404);
    throw new Error("Event not found");
  }
});

// @desc    Get a list of all existing events with optional date filter
// @route   GET /api/events
// @access  Public
const getEvents = asyncHandler(async (req, res) => {
  const { date } = req.query;

  let filter = {};
  if (date) {
    filter = { date: { $gte: new Date(date) } };
  }

  const events = await Event.find(filter).populate("attendees.user");
  res.json(events);
});

const rsvpEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (event) {
    const { status } = req.body;
    const existingAttendee = event.attendees.find(
      (attendee) => attendee.user.toString() === req.user._id.toString()
    );

    if (existingAttendee) {
      existingAttendee.status = status;
    } else {
      event.attendees.push({ user: req.user._id, status });
    }

    const updatedEvent = await event.save();
    res.json(updatedEvent);
  } else {
    res.status(404);
    throw new Error("Event not found");
  }
});

export {
  createEvent,
  updateEvent,
  deleteEvent,
  getEventById,
  getEvents,
  rsvpEvent,
};
