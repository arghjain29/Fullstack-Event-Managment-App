/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false); // Track connection status
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    // Check if the backend is available (you can replace this with any check you prefer)
    const checkBackendAvailability = async () => {
      try {
        const response = await fetch(backendUrl); // Try a simple fetch request
        if (response.ok) {
          return true; // Backend is available
        }
      } catch (error) {
        console.error("Backend is not available", error);
      }
      return false; // Backend is unavailable
    };

    const establishSocketConnection = async () => {
      const isBackendAvailable = await checkBackendAvailability();
      if (isBackendAvailable) {
        const socketInstance = io(backendUrl);
        setSocket(socketInstance);

        socketInstance.on("connection", () => {
          setIsConnected(true); // Update connection status
          console.log("Socket connected");
        });

        socketInstance.on("disconnect", () => {
          setIsConnected(false); // Update connection status
          console.log("Socket disconnected");
        });

        // Cleanup on component unmount
        return () => {
          socketInstance.disconnect();
        };
      } else {
        console.log("Waiting for backend to be available...");
      }
    };

    establishSocketConnection();

  }, [backendUrl]);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};
