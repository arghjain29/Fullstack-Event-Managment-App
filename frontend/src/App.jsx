
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import EventDashboard from './pages/EventDashboard';
import EventCreate from './pages/EventCreate';
import PrivateRoute from './components/PrivateRoute';
import Profile from './pages/Profile';
import AuthPage from './pages/AuthPage';

const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.4, ease: "easeInOut" },
};

const Layout = () => {
  const location = useLocation(); // Now inside Router context

  return (
    <>
      {/* Show Navbar on all pages EXCEPT HomePage */}
      {location.pathname !== "/" && <Navbar />}

      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageTransition}
          className={`min-h-screen flex flex-col ${location.pathname !== '/' ? 'pt-16' : ''}`}
        >
          <Routes location={location} key={location.pathname}>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/dashboard" element={<EventDashboard />} />

            {/* Private Routes */}
            <Route 
              path="/create-event" 
              element={
                <PrivateRoute>
                  <EventCreate />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              } 
            />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

function App() {
  return (
    <Router>
      <div className="min-h-screen overflow-y-scroll">
      <Layout />
      </div>
    </Router>
  );
}

export default App;
