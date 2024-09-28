import {
  createContext,
  ReactNode,
  useState,
} from "react";

interface ChatProviderProps {
  children: ReactNode;
}

export const ChatContext = createContext({});

export const ChatProvider = ({ children }: ChatProviderProps) => {
  const [chatState, setChatState] = useState("");

  return (
    <ChatContext.Provider value={{ chatState }}>
      {children}
    </ChatContext.Provider>
  );
};
