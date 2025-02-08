/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useSocket } from '../context/SocketContext'; 

const EventDashboard = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { socket } = useSocket();
  const navigate = useNavigate();

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
    // Fetch events on page load
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/events/all`);
        setEvents(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error('Failed to fetch events');
      }
    };

    fetchEvents();

    // Real-time updates: Listen for attendee count changes
    if (socket) {
      socket.on('attendeeCountUpdated', (eventId, newCount) => {
        setEvents((prevEvents) =>
          prevEvents.map((event) =>
            event._id === eventId ? { ...event, attendeeCount: newCount } : event
          )
        );
      });
    }

    // Cleanup socket connection on component unmount
    return () => {
      if (socket) socket.off('attendeeCountUpdated');
    };
  }, [socket]);

  const handleRegister = (eventId) => {
    // Register for an event logic
    axios
      .post(`/api/events/${eventId}/register`)
      .then((response) => {
        toast.success('Successfully registered for the event');
      })
      .catch((error) => {
        toast.error('Registration failed');
      });
  };

  const handleCreateEvent = () => {
    navigate('/create-event');
  };

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-4">Event Dashboard</h2>
      <button
        onClick={handleCreateEvent}
        className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
      >
        Create New Event
      </button>

      {loading ? (
        <div>Loading events...</div>
      ) : (
        <div>
          {events.map((event) => (
            <div key={event._id} className="border p-4 mb-4 rounded-md shadow-md">
              <h3 className="text-xl font-bold">{event.title}</h3>
              <p>{event.description}</p>
              <p>
                Date: {new Date(event.date).toLocaleDateString()} | Category: {event.category}
              </p>
              <p>Attendees: {event.attendeeCount}</p>
              <button
                onClick={() => handleRegister(event._id)}
                className="bg-green-500 text-white px-4 py-2 rounded-md mt-2"
              >
                Register
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventDashboard;
