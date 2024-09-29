import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import AppRoutes from "./routes/AppRoutes";
import Notificacion from "./components/atoms/Notificacion";
import { useAuthStore } from "./state/authStore";
import useSocketStore from "./state/useSocketStore";
import { useEffect } from "react";

library.add(fas);

function App() {
  const { isAuthenticated, user } = useAuthStore();
  const { socket } = useSocketStore();

  useEffect(() => {
    // Unirse a la sala del usuario por su ID
    if (isAuthenticated && user?.id) {
      socket?.emit("joinRoom", user?.id.toString()); // Unirse a la sala con el user.id
      console.log("Me uni a la sala =>", user?.id);
    }

    // Limpiar la sala al salir
    return () => {
      if (user?.id) {
        socket?.emit("leaveRoom", user.id); // Abandonar la sala al desmontar el componente
      }
    };
  }, [user?.id]);

  // verificar si el usuario esta autenticado conectarse al socket
  useEffect(() => {
    if (isAuthenticated) {
      const { conectarSocket } = useSocketStore.getState();
      conectarSocket();
    }
  }, [isAuthenticated]);

  return (
    <>
      <div className="App">
        <Notificacion />
        <AppRoutes />
      </div>
    </>
  );
}

export default App;
