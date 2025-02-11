/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../config/axios";
import { useSocket } from "../context/SocketContext";
import { useAuth } from "../context/AuthContext";
import { Calendar, MapPinned } from "lucide-react";

const EventDashboard = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const { socket } = useSocket();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [notAvailable, setnotAvailable] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    if (!socket) return;

    const handleAttendeeUpdate = ({ eventId, attendees, eventTitle }) => {
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event._id === eventId ? { ...event, attendees } : event
        )
      );
      toast.info(<div>
        <p className="text-lg font-medium text-blue-900">Attendee list updated for</p>
        <p className="text-lg font-semibold text-blue-900">{eventTitle}</p>
      </div>);
    };

    socket.on("attendeeUpdated", handleAttendeeUpdate);

    return () => {
      socket.off("attendeeUpdated", handleAttendeeUpdate);
    };
  }, [socket]);

  useEffect(() => {
    filterEvents();
  }, [selectedCategory, dateFilter]); // ✅ Runs on mount + when filters change

  const fetchEvents = async () => {
    try {
      const response = await axios.get("/api/events/all");
      setEvents(response.data);
      setCategories([...new Set(response.data.map((event) => event.category))]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Failed to fetch events");
    }
  };

  const filterEvents = () => {
    let filtered = [...events];
    let count = 0;
    if (selectedCategory) {
      filtered = filtered.filter(
        (event) => event.category === selectedCategory
      );
      count = count + 1;
      setnotAvailable(false);
    }
    if (dateFilter) {
      const today = new Date();
      if (dateFilter === "upcoming") {
        filtered = filtered.filter((event) => new Date(event.date) > today);
      } else if (dateFilter === "past") {
        filtered = filtered.filter((event) => new Date(event.date) <= today);
      }
      count = count + 1;
      setnotAvailable(false);
    }
    if (filtered.length === 0 && count > 0) {
      setnotAvailable(true);
    }
    filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
    setFilteredEvents(filtered);
  };

  const handleRegister = async (eventId, date) => {
    if (new Date(date) < new Date()) {
      toast.error("Cannot register for past events");
      return;
    }
    try {
      const res = await axios.post(`/api/events/${eventId}/register`);
      if (res.status === 200) {
        toast.success("Registered successfully");
        fetchEvents();
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleUnRegister = async (eventId) => {
    try {
      const res = await axios.post(`/api/events/${eventId}/unregister`);
      if (res.status === 200) {
        toast.success("Unregistered successfully");
        fetchEvents();
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleCreateEvent = () => {
    navigate("/create-event");
  };

  const eventList = notAvailable
    ? []
    : filteredEvents.length === 0
    ? events
    : filteredEvents;
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-4xl font-bold text-blue-900 mb-8">Event Dashboard</h2>

      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <button
          onClick={handleCreateEvent}
          hidden={!user}
          className="bg-teal-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-teal-700 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg mb-4 sm:mb-0"
        >
          Create New Event
        </button>

        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-white border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="bg-white border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Dates</option>
            <option value="upcoming">Upcoming</option>
            <option value="past">Past</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-center text-xl text-gray-600">
          Loading events...
        </div>
      ) : eventList.length === 0 ? (
        <div className="text-center text-xl text-gray-600">
          No events Available.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 cursor-pointer lg:grid-cols-3 gap-6">
          {eventList.map((event) => (
            <div
              key={event._id}
              className="bg-teal-50 m-5 rounded-lg shadow-md overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-teal-600 hover:bg-opacity-20 hover:shadow-xl"
            >
              <div className="p-6">
                <div className="flex justify-between">
                  <h3 className="text-2xl font-bold text-blue-900 mb-2">
                    {event.title.toUpperCase()}
                  </h3>
                  <div>
                  {new Date(event.date) <= new Date() && (
                    <p className="text-sm bg-red-700 inline-block p-1 px-2 rounded-lg text-gray-100 mb-4">
                      Expired
                    </p>
                  )}
                  </div>
                </div>
                <p
                  style={{ fontStyle: "italic" }}
                  className="text-gray-600 text-justify mb-4"
                >
                  {event.description}
                </p>
                <div className="flex justify-between">
                  <p className="text-sm text-gray-700 mb-2 flex items-center space-x-2">
                    <Calendar size={16} className="inline-block mr-2" />
                    {new Date(event.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                  <p className="text-sm font-semibold text-gray-700 mb-2 flex items-center space-x-2">
                    <MapPinned size={16} className="inline-block mr-2" />
                    {event.location}
                  </p>
                </div>

                <p className="text-sm bg-teal-800 inline-block p-1 px-2 rounded-md text-gray-100 mb-4">
                  Category: {event.category}
                </p>

                <p className="text-sm font-semibold text-blue-700 mb-4">
                  No. of Attendees: {event.attendees.length || 0}
                </p>
                {user && (
                  <div className="flex justify-between">
                    <button
                      onClick={() => handleRegister(event._id, event.date)}
                      className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition-colors duration-300"
                    >
                      Register
                    </button>
                    <button
                      onClick={() => handleUnRegister(event._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-colors duration-300"
                    >
                      Unregister
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventDashboard;
