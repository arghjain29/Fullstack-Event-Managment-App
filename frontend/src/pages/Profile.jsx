import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import axios from "../config/axios";

const ProfilePage = () => {
  const [postedEvents, setPostedEvents] = useState([]);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [events, setEvents] = useState([]);

  const { user } = useAuth();

  const fetchEvents = async () => {
    try {
      const response = await axios.get("/api/events/all");
      setEvents(response.data);
      console.log(response.data);
      //   setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch events");
    }
  };
  useEffect(() => {
    fetchEvents();
  }, []);

  //   console.log(events[0].organizer.email);
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

  return (
    <div className="max-w-4xl mx-auto p-6 text-white">
      {/* Profile Section */}
      <div className="bg-blue-100 hover:bg-blue-200 hover:scale-105 transition-all ease-in-out duration-200 backdrop-blur-md p-6 rounded-xl shadow-lg text-center mb-8">
        <i className="ri-user-6-line text-teal-200 text-5xl bg-blue-900 rounded-full p-2"></i>
        <h2 className="text-4xl text-teal-900 font-semibold mb-2 mt-4">
          {user.username}
        </h2>
        <p className="text-teal-700 text-xl">{user.email}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-48">
        {/* Posted Events Section */}
        <div className="bg-white/10 backdrop-blur-md p-6 mx-4 rounded-xl shadow-lg">
          <h3 className="text-xl text-gray-900 font-semibold mb-4">
            My Posted Events
          </h3>
          {postedEvents.length > 0 ? (
            postedEvents.map((event) => (
              <div
                key={event._id}
                className="bg-white rounded-lg p-4 shadow-md mb-4"
              >
                <h4 className="text-lg font-bold text-blue-900">
                  {event.title}
                </h4>
                <p className="text-sm text-gray-600">
                  <i className="ri-calendar-line"></i>{" "}
                  {new Date(event.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
                <div className="flex justify-between mt-2">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded-md">
                    Update
                  </button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded-md">
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400">No events posted.</p>
          )}
        </div>

        {/* Registered Events Section */}
        <div className="bg-white/10 backdrop-blur-md p-6 mx-4 rounded-xl shadow-lg">
          <h3 className="text-xl text-gray-900 font-semibold mb-4">
            Events I&apos;m Attending
          </h3>
          {registeredEvents.length > 0 ? (
            registeredEvents.map((event) => (
              <div
                key={event._id}
                className="bg-white rounded-lg p-4 shadow-md mb-4"
              >
                <h4 className="text-lg font-bold text-blue-900">
                  {event.title}
                </h4>
                <p className="text-sm text-gray-600">
                  <i className="ri-calendar-line"></i>{" "}
                  {new Date(event.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
                {/* <button onClick={() => handleUnregister(event._id)} className="bg-red-500 text-white px-3 py-1 rounded-md mt-2">Unregister</button> */}
              </div>
            ))
          ) : (
            <p className="text-gray-400">Not registered for any events.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
