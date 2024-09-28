import React, { createContext, useContext, useEffect, useState } from "react";
import { useSocket } from "../hooks/useSocket";
// import { variables } from "../config/vars";
import { Socket } from "socket.io-client";
// import { AuthContext } from "./AuthContext";
// import { ChatContext } from "./chat/ChatContext";
// import { types } from "../types/types";
// import { scrollToBottomAnimated } from "../helpers/scrollToBottom";

// Definir la interfaz del contexto
interface SocketContextProps {
  socket: Socket | null;
  online: boolean;
}

export const SocketContext = createContext({} as SocketContextProps);

interface SocketProviderProps {
  children: React.ReactNode;
}

export const SocketProvider = ({ children }: SocketProviderProps) => {
  const { socket, online, conectarSocket, desconectarSocket } = useSocket();

  const [auth, setAuth] = useState({
    logged: false,
  });

  useEffect(() => {
    if (auth.logged) {
      conectarSocket();
    }
  }, [auth, conectarSocket]);

  useEffect(() => {
    if (!auth.logged) {
      desconectarSocket();
    }
  }, [auth, desconectarSocket]);

  // Escuchar los cambios en los usuarios conectados
  // useEffect(() => {
  //   socket?.on("lista-usuarios", (usuarios) => {
  //     dispatch({
  //       type: types.usuariosCargados,
  //       payload: usuarios,
  //     });
  //   });
  // }, [socket, dispatch]);

  // useEffect(() => {
  //   socket?.on("mensaje-personal", (mensaje) => {
  //     dispatch({
  //       type: types.nuevoMensaje,
  //       payload: mensaje,
  //     });

  //     console.log("mensaje-personal", mensaje);

  //     // scrollToBottomAnimated("mensajes");
  //   });
  // }, [socket, dispatch]);

  return (
    <SocketContext.Provider value={{ socket, online }}>
      {children}
    </SocketContext.Provider>
  );
};
