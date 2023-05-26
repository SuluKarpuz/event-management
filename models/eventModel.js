import mongoose from "mongoose";

const eventSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    attendees: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        status: {
          type: String,
          enum: ["attending", "not_attending", "undecided"],
          default: "undecided",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model("Event", eventSchema);

export default Event;
