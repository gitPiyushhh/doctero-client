import React, { createContext, useContext, useEffect, useMemo } from "react";
import { io } from 'socket.io-client';

/*
  Initial context
*/
const SocketContext = createContext(null);

/*
  Custom hook 
*/
export function useSocket() {
  const socket = useContext(SocketContext);
  if (!socket) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return socket;
}

/*
  Provider
*/
export const SocketProvider = ({ children }) => {
  const socket = useMemo(() => {
    return io("https://doctero-api-onrender2.onrender.com");  
    // return io("http://127.0.0.1:9000");   // For debuggging or checking
  }, []);

  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};
