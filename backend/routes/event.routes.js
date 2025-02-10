import { Router } from 'express';
import { body } from 'express-validator';
import { authUser } from '../middleware/auth.middleware.js';
import * as EventController from '../controllers/event.controller.js';
import eventModel from '../models/event.model.js';

const router = Router();


export default (io) => {
    router.get('/all', EventController.getAllEventsController)
    router.get('/:id', EventController.getSingleEventController)

    router.post('/:id/register', authUser, async (req, res) => {
        try {
            const event = await eventModel.findById(req.params.id);
            if (!event) {
                return res.status(404).json({ message: "Event not found" });
            }
    
            const isAlreadyRegistered = event.attendees.some(att => att.user.toString() === req.user._id);
            if (isAlreadyRegistered) {
                return res.status(400).json({ message: "You are already registered for this event" });
            }
    
            event.attendees.push({ user: req.user._id });
            await event.save();
    
            // Emit event update after successful registration
            io.emit("attendeeUpdated", { eventId: req.params.id, attendees: event.attendees });
            console.log("Attendee updated");
    
            return res.status(200).json({ success: true, attendees: event.attendees});
        } catch (error) {
            console.error(error);
            return res.status(500).json({ success: false, message: "Server error" });
        }
    });


    router.post('/:id/unregister', authUser, async (req, res) => {
        try {
            const event = await eventModel.findById(req.params.id);
            if (!event) {
                return res.status(404).json({ success: false, message: "Event not found" });
            }
    
            const attendeeIndex = event.attendees.findIndex(att => att.user.toString() === req.user._id);
            if (attendeeIndex === -1) {
                return res.status(400).json({ success: false, message: "You are not registered for this event" });
            }
    
            event.attendees.splice(attendeeIndex, 1);
            await event.save();
    
            // Emit WebSocket event
            io.emit("attendeeUpdated", { eventId: req.params.id, attendees: event.attendees });
            console.log("Attendee updated");
    
            return res.status(200).json({ success: true, attendees: event.attendees});
        } catch (error) {
            console.error(error);
            return res.status(500).json({ success: false, message: "Server error" });
        }
    });
    

    router.post('/create', authUser, [
        body("title").notEmpty().withMessage("Title is required"),
        body("description").notEmpty().withMessage("Description is required"),
        body("date").isISO8601().toDate().withMessage("Invalid date format"),
        body("location").notEmpty().withMessage("Location is required"),
        body("category").isIn(["Conference", "Meetup", "Workshop", "Webinar", "Other"]).withMessage("Invalid category"),
    ], EventController.createEventController)


    router.put('/:id', authUser, [
        body("title").notEmpty().withMessage("Title is required"),
        body("description").notEmpty().withMessage("Description is required"),
        body("date").isISO8601().toDate().withMessage("Invalid date format"),
        body("location").notEmpty().withMessage("Location is required"),
        body("category").isIn(["Conference", "Meetup", "Workshop", "Webinar", "Other"]).withMessage("Invalid category")
    ], EventController.updateEventController)

    router.delete("/:id", authUser, EventController.deleteEventController)

    return router;
};