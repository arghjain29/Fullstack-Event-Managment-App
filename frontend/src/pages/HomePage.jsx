import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/comp.jpg?height=1080&width=1920"
          alt="Background"
          className="w-full h-full object-cover opacity-60"
        />
      </div>

      {/* Content */}
      <div
        className="z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto 
            bg-white/10 backdrop-blur-lg rounded-2xl p-8 sm:p-12 
            shadow-lg border border-white/20 transition-all duration-300 ease-in-out"
      >
        <h1
          className="text-7xl sm:text-7xl font-extrabold text-blue-900 mb-6 
              transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          Welcome to EventPro
        </h1>

        <p
          className="text-2xl sm:text-2xl text-gray-800 mb-12 
              transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          Create, Manage, and Experience unforgettable events. <br /> Join our
          community and make every moment count!
        </p>

        <div
          className="flex flex-col sm:flex-row justify-center items-center 
                space-y-4 sm:space-y-0 sm:space-x-6"
        >
          <Link
            to="/dashboard"
            className="w-64 sm:w-auto bg-teal-600 text-white px-8 py-4 rounded-full text-lg font-semibold 
                     hover:bg-teal-700 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
          >
            Explore Events
          </Link>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-blue-500 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-teal-500 rounded-full opacity-20 animate-pulse"></div>
    </div>
  );
};

export default HomePage;
