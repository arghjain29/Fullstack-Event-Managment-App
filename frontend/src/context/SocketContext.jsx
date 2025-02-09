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
    console.log("Attempting to establish socket connection...");

    const establishSocketConnection = () => {
      console.log("Forcing socket connection...");

      const socketInstance = io(backendUrl, {
        transports: ["websocket"], // Force WebSocket
      });


      setSocket(socketInstance);

      socketInstance.on("connect", () => {
        console.log("⚡ SOCKET CONNECTED:", socketInstance.id);
        setIsConnected(true);
      });

      socketInstance.on("disconnect", () => {
        console.log("⚠️ SOCKET DISCONNECTED");
        setIsConnected(false);
      });

      // Cleanup on component unmount or when backendUrl changes
      return () => {
        console.log("Disconnecting socket...");
        socketInstance.disconnect();
      };
    };

    const cleanupSocket = establishSocketConnection();

    // Cleanup socket connection when component unmounts or backendUrl changes
    return cleanupSocket;
  }, [backendUrl]);

  useEffect(() => {
    console.log("isConnected state changed:", isConnected);
  }, [isConnected]);

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
