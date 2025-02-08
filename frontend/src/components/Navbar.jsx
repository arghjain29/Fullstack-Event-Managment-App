import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 

const Navbar = () => {
  const { user, logout } = useAuth(); // Access user state and logout function from AuthContext

  return (
    <nav className="bg-blue-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          Event Platform
        </Link>
        <div>
          <Link to="/dashboard" className="px-4 py-2">Events</Link>
          <Link to="/create-event" className="px-4 py-2">Create Event</Link>

          {!user ? (
            <>
              <Link to="/login" className="px-4 py-2">Login</Link>
              <Link to="/register" className="px-4 py-2">Register</Link>
            </>
          ) : (
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-500 hover:bg-red-700 rounded-md"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
