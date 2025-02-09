import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext";
import { SocketProvider } from "./context/SocketContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'remixicon/fonts/remixicon.css';

createRoot(document.getElementById("root")).render(
  // <StrictMode>
    <SocketProvider>
      <AuthProvider>
        <App />
        <ToastContainer />
      </AuthProvider>
    </SocketProvider>
  // </StrictMode>
);
