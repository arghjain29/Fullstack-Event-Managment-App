import mongoose from "mongoose";


const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minLength: [3, "Title must be at least 3 characters long"],
    maxLength: [50, "Title must be at most 20 characters long"],
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
    trim: true,
    minLength: [3, "Location must be at least 3 characters long"],
    maxLength: [50, "Location must be at most 50 characters long"],
  },
  category: {
    type: String,
    enum: ["Conference", "Meetup", "Workshop", "Webinar", "Other"],
    required: true,
  },
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  attendees: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
      joinedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
},
  { timestamps: true }
);
export default mongoose.model("Event", eventSchema);