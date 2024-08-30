import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
  useRef,
} from "react";
import { MessageProp } from "@/types";
import { sendQueryToAIAgent } from "@/lib/helper";
import { registerTool, toolMapping } from "@/lib/toolMapping";
import { useSolanaWalletHelper } from "@/hooks/useSolanaWalletHelper";

interface AppContextType {
  messages: MessageProp[];
  setMessages: (messages: MessageProp[]) => void;
  aiAgentAndToolMapping: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { wallet } = useSolanaWalletHelper();
  const [messages, setMessages] = useState<MessageProp[]>([]);
  const toolRegisteredRef = useRef(false);
  async function aiAgentAndToolMapping() {
    // try {
    //   console.log("Starting aiAgentAndToolMapping function");

    //   if (messages[messages.length - 1]?.sender === "user") {
    //     console.log("Last message sender is user. Proceeding with AI query.");

    //     const aiResponse = await sendQueryToAIAgent(
    //       messages[messages.length - 1].text
    //     );
    //     console.log("AI response received:", aiResponse);

    //     aiResponse?.forEach((item) => {
    //       console.log("Processing tool action:", item.tool);

    //       if (item.tool === "notify_user_onchat_tool") {
    //         console.log(
    //           "notify_user_onchat_tool detected, adding message to state."
    //         );
    //         setMessages((prevMessages) => [
    //           ...prevMessages,
    //           {
    //             text: item.arguments?.message || "Default message",
    //             sender: "bot",
    //           },
    //         ]);
    //       }

    //       const mappedItem = toolMapping.find(
    //         (toolMap) => toolMap.tool === item.tool
    //       );
    //       if (mappedItem) {
    //         console.log(`Executing function for tool: ${item.tool}`);
    //         const response = mappedItem.function({ ...item.arguments });
    //         console.log(`Response: ${response}`);
    //         if (!response) {
    //           setMessages((prevMessages) => [...prevMessages.slice(0, -1)]);
    //           throw new Error("Unable to process request");
    //         }
    //       } else {
    //         console.log(`No mapped function found for tool: ${item.tool}`);
    //       }
    //     });
    //   } else {
    //     console.log("Last message sender is not a user. No AI query needed.");
    //   }
    // } catch (error) {
    //   console.error("Error in aiAgentAndToolMapping:", error);
    // }
  }
  useEffect(() => {
    if (!toolRegisteredRef.current) {
      registerTool("notify_user_onchat_tool", (message: string) => {
        console.log("debug 2", message)
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
        aiAgentAndToolMapping,
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
