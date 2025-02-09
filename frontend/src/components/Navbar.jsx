import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth(); // Access user state and logout function from AuthContext

  return (
    // <nav className="bg-white shadow-md fixed top-0 w-full z-50">
    //   <div className="max-w-auto mx-auto px-1 sm:px-6 lg:px-8">
    //     <div className="flex justify-between h-16 items-center">
    //       <div className="flex items-center">
    //         <Link to="/" className="text-3xl font-bold text-blue-900">
    //           EventPro
    //         </Link>
    //       </div>
    //       <div className="hidden justify-center items-center sm:flex sm:space-x-6">
    //         <Link
    //           to="/dashboard"
    //           className="border-transparent text-gray-700 hover:border-blue-500 hover:text-blue-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
    //         >
    //           Events
    //         </Link>

    //         {!user ? (
    //           <>
    //             <Link
    //               to="/login"
    //               className="border-transparent bg-transparent rounded-md text-gray-700 hover:bg-green-500 p-2 transition-all duration-200 hover:text-white inline-flex items-center  border-b-2 text-base font-medium"
    //             >
    //               Login
    //             </Link>
    //             <Link
    //               to="/register"
    //               className="border-transparent bg-transparent rounded-md text-gray-700 hover:bg-green-500 p-2 transition-all duration-200 hover:text-white inline-flex items-center  border-b-2 text-base font-medium"
    //             >
    //               Register
    //             </Link>
    //           </>
    //         ) : (
    //           <>
    //             <Link
    //               to="/create-event"
    //               className="border-transparent text-gray-700 hover:border-blue-500 hover:text-blue-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
    //             >
    //               Create Event
    //             </Link>
    //             <Link
    //               to="/profile"
    //               className="border-transparent text-gray-700 hover:border-blue-500 hover:text-blue-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
    //             >
    //               Profile
    //             </Link>
    //             <button
    //               onClick={logout}
    //               className="border-transparent text-gray-700 hover:border-red-500 hover:text-red-900 hover:text-base transition-all ease-in-out duration-200  inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
    //             >
    //               Logout
    //             </button>
    //           </>
    //         )}
    //       </div>

    //       {/* Mobile Menu Button */}
    //       <div className="sm:hidden">
    //         <button
    //           onClick={() => setIsOpen(!isOpen)}
    //           className="p-2 text-gray-700 hover:text-blue-900 focus:outline-none"
    //         >
    //           {!isOpen ? (
    //             <svg
    //               className="h-6 w-6"
    //               fill="none"
    //               viewBox="0 0 24 24"
    //               stroke="currentColor"
    //             >
    //               <path
    //                 strokeLinecap="round"
    //                 strokeLinejoin="round"
    //                 strokeWidth={2}
    //                 d="M4 6h16M4 12h16M4 18h16"
    //               />
    //             </svg>
    //           ) : (
    //             <svg
    //               className="h-6 w-6"
    //               fill="none"
    //               viewBox="0 0 24 24"
    //               stroke="currentColor"
    //             >
    //               <path
    //                 strokeLinecap="round"
    //                 strokeLinejoin="round"
    //                 strokeWidth={2}
    //                 d="M6 18L18 6M6 6l12 12"
    //               />
    //             </svg>
    //           )}
    //         </button>
    //       </div>
    //     </div>
    //   </div>

    //   {/* Mobile Menu */}
    //   {isOpen && (
    //     <div className="sm:hidden bg-white shadow-md">
    //       <div className="py-2 space-y-1 text-center">
    //         <Link
    //           to="/dashboard"
    //           className="block py-2 text-gray-700 hover:text-blue-900"
    //         >
    //           Events
    //         </Link>

    //         {!user ? (
    //           <>
    //             <Link
    //               to="/login"
    //               className="block py-2 text-gray-700 hover:text-blue-900"
    //             >
    //               Login
    //             </Link>
    //             <Link
    //               to="/register"
    //               className="block py-2 text-gray-700 hover:text-blue-900"
    //             >
    //               Register
    //             </Link>
    //           </>
    //         ) : (
    //           <>
    //             <Link
    //               to="/create-event"
    //               className="block py-2 text-gray-700 hover:text-blue-900"
    //             >
    //               Create Event
    //             </Link>
    //             <Link
    //               to="/profile"
    //               className="block py-2 text-gray-700 hover:text-blue-900"
    //             >
    //               Profile
    //             </Link>
    //             <button
    //               onClick={logout}
    //               className="block w-full text-center py-2 bg-red-500 hover:bg-red-700 text-white"
    //             >
    //               Logout
    //             </button>
    //           </>
    //         )}
    //       </div>
    //     </div>
    //   )}
    // </nav>

    <nav className="bg-gradient-to-r from-blue-900 to-teal-700 bg-opacity-30 backdrop-blur-md shadow-md fixed top-0 w-full z-50">
      <div className="max-w-auto mx-auto px-1 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link
              to="/"
              className="text-3xl font-bold text-white drop-shadow-md"
            >
              EventPro
            </Link>
          </div>
          <div className="hidden justify-center items-center sm:flex sm:space-x-6">
            <Link
              to="/dashboard"
              className="border-transparent text-white hover:border-teal-300 hover:text-teal-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-all"
            >
              Events
            </Link>

            {!user ? (
              <>
                <Link
                  to="/login"
                  className="border-transparent bg-transparent rounded-md text-white hover:bg-teal-500 p-2 transition-all duration-200 hover:text-white inline-flex items-center border-b-2 text-base font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="border-transparent bg-transparent rounded-md text-white hover:bg-teal-500 p-2 transition-all duration-200 hover:text-white inline-flex items-center border-b-2 text-base font-medium"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/create-event"
                  className="border-transparent text-white hover:border-teal-300 hover:text-teal-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-all"
                >
                  Create Event
                </Link>
                <Link
                  to="/profile"
                  className="border-transparent text-white hover:border-teal-300 hover:text-teal-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-all"
                >
                  Profile
                </Link>
                <button
                  onClick={logout}
                  className="border-transparent text-white hover:border-red-400 hover:text-red-400 hover:text-base transition-all ease-in-out duration-200 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-white hover:text-teal-300 focus:outline-none"
            >
              {!isOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="sm:hidden bg-gradient-to-r from-blue-900 to-teal-700 bg-opacity-80 backdrop-blur-md shadow-md">
          <div className="py-2 space-y-1 text-center">
            <Link
              to="/dashboard"
              className="block py-2 text-white hover:text-teal-300"
            >
              Events
            </Link>

            {!user ? (
              <>
                <Link
                  to="/login"
                  className="block py-2 text-white hover:text-teal-300"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block py-2 text-white hover:text-teal-300"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/create-event"
                  className="block py-2 text-white hover:text-teal-300"
                >
                  Create Event
                </Link>
                <Link
                  to="/profile"
                  className="block py-2 text-white hover:text-teal-300"
                >
                  Profile
                </Link>
                <button
                  onClick={logout}
                  className="block w-full text-center py-2 bg-red-500 hover:bg-red-700 text-white"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
