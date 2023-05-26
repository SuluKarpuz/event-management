import express from "express";
import {
  createEvent,
  updateEvent,
  deleteEvent,
  getEventById,
  getEvents,
  rsvpEvent,
} from "../controllers/eventController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createEvent); // Create a new event
router.put("/:id", protect, updateEvent); // Update the details of an existing event
router.delete("/:id", protect, deleteEvent); // Delete an existing event
router.get("/:id", getEventById); // Get details of an existing event by its ID
router.get("/", getEvents); // Get a list of all existing events with optional date filter
router.post("/events/:id/rsvp", protect, rsvpEvent); // RSVP to an event route
export default router;
