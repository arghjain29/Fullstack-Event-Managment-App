import { Router } from 'express';
import { body } from 'express-validator';
import { authUser } from '../middleware/auth.middleware.js';
import * as EventController from '../controllers/event.controller.js';

const router = Router();


export default (io) => {
    router.get('/all', EventController.getAllEventsController)
    router.get('/:id', EventController.getSingleEventController)

    router.post('/:id/register', authUser, async (req, res) => {
        try {
            const response = await EventController.registerForEventController(req, res);
            if (response.success) {
                io.emit("attendeeUpdated", { eventId: req.params.id, attendees: response.attendees });
            }
        } catch (error) {
            console.error(error);
        }
    });


    router.post('/:id/unregister', authUser, async (req, res) => {
        try {
            const response = await EventController.unregisterForEventController(req, res);
            if (response.success) {
                io.emit("attendeeUpdated", { eventId: req.params.id, attendees: response.attendees });
            }
        } catch (error) {
            console.error(error);
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