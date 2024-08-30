import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
  useRef,
} from "react";
import { MessageProp } from "@/types";
import { registerTool } from "@/lib/toolMapping";
import { useSolanaWalletHelper } from "@/hooks/useSolanaWalletHelper";

interface AppContextType {
  messages: MessageProp[];
  setMessages: (messages: MessageProp[]) => void;
  loading: boolean
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { wallet } = useSolanaWalletHelper();
  const [messages, setMessages] = useState<MessageProp[]>([]);
  const [loading, setLoading] = useState(false);
  const toolRegisteredRef = useRef(false);

  useEffect(() => {
    if (!toolRegisteredRef.current) {
      registerTool("notify_user_onchat_tool", (message: string) => {
        console.log("debug 2", message);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            text: message ?? "",
            sender: "bot",
          },
        ]);
      });
      toolRegisteredRef.current = true;
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        messages,
        setMessages,
        loading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
