/* eslint-disable no-unused-vars */
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';

import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import EventDashboard from './pages/EventDashboard';
import EventCreate from './pages/EventCreate';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const { user } = useAuth();

  return (
    <Router>
      <Navbar />
      <div className="container mx-auto p-4">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Private Routes */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <EventDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/create-event"
            element={
              <PrivateRoute>
                <EventCreate />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>

      {/* Toast Notifications
      <ToastContainer /> */}
    </Router>
  );
}

export default App;
