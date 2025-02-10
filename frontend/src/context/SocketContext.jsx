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
    const establishSocketConnection = () => {
      const socketInstance = io(backendUrl, {
        transports: ["websocket", "polling"], // Allow polling as a fallback
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        withCredentials: true,
      });

      setSocket(socketInstance);

      socketInstance.on("connect", () => {
        setIsConnected(true);
      });

      socketInstance.on("disconnect", () => {
        setIsConnected(false);
      });

      // Cleanup on component unmount or when backendUrl changes
      return () => {
        socketInstance.disconnect();
      };
    };

    const cleanupSocket = establishSocketConnection();

    // Cleanup socket connection when component unmounts or backendUrl changes
    return cleanupSocket;
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
