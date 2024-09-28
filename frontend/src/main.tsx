// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ChatProvider } from "./context/ChatContext.tsx";
import { SocketProvider } from "./context/SocketContext.tsx";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <SocketProvider>
    <ChatProvider>
      <App />
    </ChatProvider>
  </SocketProvider>
  // </StrictMode>,
);
