import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import axios from "../config/axios";
import { Calendar, Edit2, Trash2, X } from "lucide-react";

const ProfilePage = () => {
  const [postedEvents, setPostedEvents] = useState([]);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [events, setEvents] = useState([]);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUnregisterModalOpen, setIsUnregisterModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [updatedEvent, setUpdatedEvent] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    category: "",
  });

  const { user } = useAuth();

  const fetchEvents = async () => {
    try {
      const response = await axios.get("/api/events/all");
      setEvents(response.data);
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    if (user && events.length > 0) {
      setPostedEvents(
        events.filter((event) => event.organizer.email === user.email)
      );
      setRegisteredEvents(
        events.filter((event) =>
          event.attendees.some((attendee) => attendee.user === user._id)
        )
      );
    }
  }, [user, events]);

  const openUpdateModal = (event) => {
    setSelectedEvent(event);
    setUpdatedEvent({
      title: event.title,
      description: event.description,
      date: new Date(event.date).toISOString().split("T")[0],
      location: event.location,
      category: event.category,
    });
    setIsUpdateModalOpen(true);
  };

  const openDeleteModal = (event) => {
    setSelectedEvent(event);
    setIsDeleteModalOpen(true);
  };

  const openUnregisterModal = (event) => {
    setSelectedEvent(event);
    setIsUnregisterModalOpen(true);
  };

  const closeModals = () => {
    setIsUpdateModalOpen(false);
    setIsDeleteModalOpen(false);
    setIsUnregisterModalOpen(false);
    setSelectedEvent(null);
  };

  const handleUnRegister = async () => {
    const event = selectedEvent;
    try {
      const res = await axios.post(`/api/events/${event._id}/unregister`);
      if (res.status === 200) {
        toast.success("Unregistered successfully");
        fetchEvents();
        closeModals();
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `/api/events/${selectedEvent._id}`,
        updatedEvent
      );
      if (res.status === 200) {
        toast.success("Event updated successfully");
        fetchEvents();
        closeModals();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`/api/events/${selectedEvent._id}`);
      if (res.status === 200) {
        toast.success("Event deleted successfully");
        fetchEvents();
        closeModals();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50">
      {/* Profile Section */}
      <div className="bg-white hover:bg-blue-50 transition-all ease-in-out duration-300 p-8 rounded-2xl shadow-lg text-center mb-12">
        <div className="w-24 h-24 bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </div>
        <h2 className="text-4xl text-blue-900 font-bold mb-2">
          {user.username}
        </h2>
        <p className="text-teal-600 text-xl">{user.email}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Posted Events Section */}
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h3 className="text-2xl text-blue-900 font-bold mb-6">
            My Posted Events
          </h3>
          {postedEvents.length > 0 ? (
            <div className="space-y-6">
              {postedEvents.map((event) => (
                <div
                  key={event._id}
                  className="bg-gray-50 rounded-xl p-6 shadow-md transition-all duration-300 hover:shadow-xl"
                >
                  <h4 className="text-xl font-bold text-blue-900 mb-2">
                    {event.title}
                  </h4>
                  <p className="text-sm text-gray-600 mb-4 flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    {new Date(event.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                  <div className="flex justify-end space-x-4">
                    <button
                      onClick={() => openUpdateModal(event)}
                      className="bg-teal-500 text-white px-4 py-2 rounded-full flex items-center hover:bg-teal-600 transition-all duration-300 ease-in-out"
                    >
                      <Edit2 className="w-4 h-4 mr-2" />
                      Update
                    </button>
                    <button
                      onClick={() => openDeleteModal(event)}
                      className="bg-red-500 text-white px-4 py-2 rounded-full flex items-center hover:bg-red-600 transition-colors duration-300 ease-in-out"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">
              No events posted yet.
            </p>
          )}
        </div>

        {/* Registered Events Section */}
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h3 className="text-2xl text-blue-900 font-bold mb-6">
            Events I&apos;m Attending
          </h3>
          {registeredEvents.length > 0 ? (
            <div className="space-y-6">
              {/* {registeredEvents.map((event) => ( */}
              {registeredEvents
                .sort((a, b) => new Date(a.date) - new Date(b.date))
                .map((event) => (
                  <div
                    key={event._id}
                    className="bg-gray-50 rounded-xl p-6 shadow-md transition-all duration-300 hover:shadow-xl"
                  >
                    <h4 className="text-xl font-bold text-blue-900 mb-2">
                      {event.title}
                    </h4>
                    <p className="text-sm text-gray-600 mb-4 flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      {new Date(event.date).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                    <div className="flex justify-end">
                      <button
                        onClick={() => openUnregisterModal(event)}
                        className="bg-red-500 text-white px-4 py-2 rounded-full flex items-center hover:bg-red-600 transition-all duration-300 ease-in-out"
                      >
                        Unregister
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">
              Not registered for any events yet.
            </p>
          )}
        </div>
      </div>

      {/* Update Event Modal */}
      {isUpdateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md transform transition-all duration-300 ease-in-out">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-blue-900">Update Event</h3>
              <button
                onClick={closeModals}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={updatedEvent.title}
                  onChange={(e) =>
                    setUpdatedEvent({ ...updatedEvent, title: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  value={updatedEvent.description}
                  onChange={(e) =>
                    setUpdatedEvent({
                      ...updatedEvent,
                      description: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                  required
                ></textarea>
              </div>
              <div>
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  value={updatedEvent.date}
                  onChange={(e) =>
                    setUpdatedEvent({ ...updatedEvent, date: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  value={updatedEvent.location}
                  onChange={(e) =>
                    setUpdatedEvent({
                      ...updatedEvent,
                      location: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Category
                </label>
                <select
                  id="category"
                  value={updatedEvent.category}
                  onChange={(e) =>
                    setUpdatedEvent({
                      ...updatedEvent,
                      category: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select a category</option>
                  <option value="Conference">Conference</option>
                  <option value="Meetup">Meetup</option>
                  <option value="Workshop">Workshop</option>
                  <option value="Webinar">Webinar</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={closeModals}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-teal-600 focus:outline-none focus:ring-2 hover:text-white transition-all duration-300 ease-in-out"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"
                >
                  Update Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md transform transition-all duration-300 ease-in-out">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-blue-900">
                Confirm Deletion
              </h3>
              <button
                onClick={closeModals}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this event? This action cannot be
              undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={closeModals}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-teal-600 focus:outline-none focus:ring-2 hover:text-white transition-all duration-300 ease-in-out"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300 ease-in-out"
              >
                Delete Event
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Unregister Confirmation Modal */}
      {isUnregisterModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md transform transition-all duration-300 ease-in-out">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-blue-900">
                Confirm Unregistration
              </h3>
              <button
                onClick={closeModals}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to Unregister for this event?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={closeModals}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-teal-600 focus:outline-none hover:text-white focus:ring-2 transition-all duration-300 ease-in-out"
              >
                Cancel
              </button>
              <button
                onClick={handleUnRegister}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300 ease-in-out"
              >
                Unregister
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;


