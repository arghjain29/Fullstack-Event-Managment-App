/* eslint-disable no-unused-vars */
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "../config/axios";
import { useNavigate } from "react-router-dom";

const EventCreate = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    category: "Conference",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("/api/events/create", formData)
      .then((response) => {
        toast.success("Event created successfully");
        navigate("/dashboard");
      })
      .catch((error) => {
        toast.error("Error creating event");
      });
  };

  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-[690px] hover:bg-teal-50 mt-2 rounded-xl p-6 shadow-md transition-all duration-300 hover:shadow-xl">
        <h2 className="text-4xl text-blue-900 font-semibold mb-4 text-center">Create New Event</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="border p-2 w-full"
              required
            />
          </div>
          <div>
            <label className="block">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="border p-2 w-full"
              required
            />
          </div>
          <div>
            <label className="block">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="border p-2 w-full"
              required
            />
          </div>
          <div>
            <label className="block">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="border p-2 w-full"
              required
            />
          </div>
          <div>
            <label className="block">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="border p-2 w-full mb-2"
              required
            >
              <option value="Conference">Conference</option>
              <option value="Meetup">Meetup</option>
              <option value="Workshop">Workshop</option>
              <option value="Webinar">Webinar</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-teal-600 hover:bg-teal-700 transition-all ease-in-out duration-300 text-white px-4 py-2 rounded-md mt-4"
          >
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default EventCreate;
