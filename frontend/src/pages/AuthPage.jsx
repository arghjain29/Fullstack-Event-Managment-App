/* eslint-disable no-unused-vars */
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "../config/axios";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });
  const [registerDetails, setRegisterDetails] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/users/login", {
        email: loginDetails.email,
        password: loginDetails.password,
      });
      login(response.data.token);
      navigate("/dashboard");
      setLoginDetails({}); 
      toast.success("Login successful!");
    } catch (err) {
      toast.error("Invalid credentials. Please try again.");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (registerDetails.password !== registerDetails.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      await axios.post("/api/users/register", {
        username: registerDetails.username,
        email: registerDetails.email,
        password: registerDetails.password,
      });
      toast.success(
        <h2>
          Registration successful
          <br /> Please Log in
        </h2>
      );
      setIsLogin(true);
      setRegisterDetails({});
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="h-[650px] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full">
        <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Left Panel - Login/Register Form */}

            <div className="w-full md:w-1/2 p-8 relative z-10 min-h-[500px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                {isLogin ? (
                  <motion.div
                    key="login"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-3xl font-bold text-blue-900 mb-6">
                      Welcome Back!
                    </h2>
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div>
                        <label
                          htmlFor="login-email"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Email
                        </label>
                        <input
                          id="login-email"
                          type="email"
                          value={loginDetails.email}
                          onChange={(e) =>
                            setLoginDetails({
                              ...loginDetails,
                              email: e.target.value,
                            })
                          }
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="login-password"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Password
                        </label>
                        <input
                          id="login-password"
                          type="password"
                          value={loginDetails.password}
                          onChange={(e) =>
                            setLoginDetails({
                              ...loginDetails,
                              password: e.target.value,
                            })
                          }
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 ease-in-out transform hover:scale-[0.98]"
                      >
                        Sign In
                      </button>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="register"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-3xl font-bold text-blue-900 mb-6">
                      Create Account
                    </h2>
                    <form onSubmit={handleRegister} className="space-y-4">
                      <div>
                        <label
                          htmlFor="username"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Username
                        </label>
                        <input
                          id="username"
                          type="text"
                          value={registerDetails.username}
                          onChange={(e) =>
                            setRegisterDetails({
                              ...registerDetails,
                              username: e.target.value,
                            })
                          }
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="register-email"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Email
                        </label>
                        <input
                          id="register-email"
                          type="email"
                          value={registerDetails.email}
                          onChange={(e) =>
                            setRegisterDetails({
                              ...registerDetails,
                              email: e.target.value,
                            })
                          }
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="register-password"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Password
                        </label>
                        <input
                          id="register-password"
                          type="password"
                          value={registerDetails.password}
                          onChange={(e) =>
                            setRegisterDetails({
                              ...registerDetails,
                              password: e.target.value,
                            })
                          }
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="confirm-password"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Confirm Password
                        </label>
                        <input
                          id="confirm-password"
                          type="password"
                          value={registerDetails.confirmPassword}
                          onChange={(e) =>
                            setRegisterDetails({
                              ...registerDetails,
                              confirmPassword: e.target.value,
                            })
                          }
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 ease-in-out transform hover:scale-[0.98]"
                      >
                        Register
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right Panel - Welcome Message */}
            <div className="w-full md:w-1/2 bg-gradient-to-br from-blue-900 to-teal-700 p-8 text-white flex flex-col justify-center items-center text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h2 className="text-4xl font-bold mb-4">
                  {isLogin ? "New Here ?" : "Welcome Back!"}
                </h2>
                <p className="mb-8 text-lg">
                  {isLogin
                    ? "Enter your personal details and start your journey with us"
                    : "To keep connected with us please login with your personal info"}
                </p>
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="px-8 py-3 border-2 border-white rounded-md text-white hover:bg-white hover:text-teal-700 transition-all duration-300 ease-in-out transform hover:scale-[0.98]"
                >
                  {isLogin ? "Register" : "Sign In"}
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
