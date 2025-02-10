import eventModel from "../models/event.model.js";
import { validationResult } from "express-validator";

export const createEventController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    if (!req.user._id){
        console.log('No user found');
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const { title, description, date, location, category } = req.body;
        const newEvent = new eventModel({
            title,
            description,
            date,
            location,
            category,
            organizer: req.user._id, // Authenticated user's ID
        });

        const savedEvent = await newEvent.save();
        res.status(201).json(savedEvent);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

export const getAllEventsController = async (req, res) => {
    try {
        const events = await eventModel.find().sort({ date: 1 }).populate("organizer", "username email");
        res.status(200).json(events);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

export const getSingleEventController = async (req, res) => {
    try {
        const event = await eventModel.findById(req.params.id).populate("organizer", "username email");
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }
        res.json(event);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

export const updateEventController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array
        });
    }
    try {
        const event = await eventModel.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        // Ensure only the event owner can update it
        if (event.organizer.toString() !== req.user._id) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        const { title, description, date, location, category } = req.body;
        event.title = title || event.title;
        event.description = description || event.description;
        event.date = date || event.date;
        event.location = location || event.location;
        event.category = category || event.category;

        const updatedEvent = await event.save();
        res.status(200).json(updatedEvent);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

export const deleteEventController = async (req, res) => {
    try {
        const event = await eventModel.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        if (event.organizer.toString() !== req.user._id) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        await event.deleteOne();
        res.status(200).json({ message: "Event deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};


