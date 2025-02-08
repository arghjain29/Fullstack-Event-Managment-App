import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="text-center py-20">
      <h1 className="text-5xl font-bold text-blue-800 mb-6">Welcome to the Event Management Platform!</h1>
      <p className="text-xl text-gray-700 mb-8">
        Create, manage, and view events easily. Join our community and never miss an event again!
      </p>
      <div className="space-x-4">
        <Link to="/dashboard" className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700">
          View Events
        </Link>
        <Link to="/login" className="bg-gray-600 text-white px-6 py-3 rounded-md hover:bg-gray-700">
          Login
        </Link>
        <Link to="/register" className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700">
          Register
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
