/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Register = () => {

  const [RegisterDetails, setRegisterDetails] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

   
  const handleRegister = async (e) => {
    e.preventDefault();
    if (RegisterDetails.password !== RegisterDetails.confirmPassword) {
      toast.error("Passwords do not match"); // Error toast
      return;
    }
    try {
      await axios.post(`${backendUrl}/api/users/register`, {
        email: RegisterDetails.email,
        password: RegisterDetails.password,
      });
      toast.success("Registration successful. Please log in."); // Success toast
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      toast.error("Something went wrong. Please try again."); // Error toast
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleRegister}
        className="bg-white p-6 rounded shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl mb-4">Register</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            value={RegisterDetails.email}
            onChange={(e) => setRegisterDetails({...RegisterDetails, email: e.target.value})}
            className="mt-1 p-2 w-full border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            value={RegisterDetails.password}
            onChange={(e) => setRegisterDetails({...RegisterDetails, password: e.target.value})}
            className="mt-1 p-2 w-full border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={RegisterDetails.confirmPassword}
            onChange={(e) => setRegisterDetails({...RegisterDetails, confirmPassword: e.target.value})}
            className="mt-1 p-2 w-full border border-gray-300 rounded"
            required
          />
        </div>
        <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded">Register</button>
      </form>
    </div>
  );
};

export default Register;
