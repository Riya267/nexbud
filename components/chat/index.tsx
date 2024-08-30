'use client';

import React, { useEffect, useState } from 'react';
import Messages from '@/components/chat/messages';
import QuickChats from '@/components/chat/quickChats';
import ChatInput from '@/components/chat/chatInput';
import { useAppContext } from '@/context/appContext';
import { MessageProp } from '@/types';
import { useSolanaWalletHelper } from '@/hooks/useSolanaWalletHelper';
import { sendQueryToAIAgent } from '@/lib/helper';
import { toolMapping } from '@/lib/toolMapping';

interface AiAgentAndToolMappingProps {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  messages: MessageProp[];
  setMessages: any;
}

async function aiAgentAndToolMapping({
  setLoading,
  messages,
  setMessages,
}: AiAgentAndToolMappingProps) {
  try {
    console.log("Starting aiAgentAndToolMapping function...");
    setLoading(true);

    if (messages[messages.length - 1]?.sender === "user") {
      console.log("Last message sender is user. Proceeding with AI query...");

      const userMessageCount = messages.filter((item) => item.sender === "user").length;
      console.log(`Number of user messages: ${userMessageCount}`);

      const aiResponse = await sendQueryToAIAgent(
        messages[messages.length - 1].text,
        userMessageCount
      );
      console.log("AI response received:", aiResponse);

      let context = {};
      for (const item of aiResponse!) {
        console.log(`Processing tool: ${item.tool}`);
        const mappedItem = toolMapping.find(
          (toolMap) => toolMap.tool === item.tool
        );

        if (mappedItem) {
          console.log(`Found mapped function for tool: ${item.tool}`);

          if (item.tool !== "notify_user_onchat_tool") {
            console.log(`Executing function for tool: ${item.tool} with arguments:`, item.arguments);
            const response = await mappedItem.function({ ...item.arguments });
            console.log(`Response received from tool function: ${response}`);

            context = {
              ...context,
              ...{ [`${mappedItem?.context}`]: `${response}` },
            };
            console.log("Updated context:", context);

            if (!response) {
              console.error("Error: Unable to process request - Response is null or undefined");
              throw new Error("Unable to process request");
            }

          } else {
            console.log("Executing notify_user_onchat_tool with message and context:", item.arguments?.message, context);
            await mappedItem.function(
              `${item.arguments?.message}` + `${JSON.stringify(context)}`
            );
          }
        } else {
          console.log(`No mapped function found for tool: ${item.tool}`);
        }
      }
    } else {
      console.log("Last message sender is not a user. No AI query needed.");
    }

    console.log("Finished processing AI response.");
    setLoading(false);
  } catch (error) {
    console.error("Error in aiAgentAndToolMapping:", error);
    setMessages([
      ...messages,
      {
        text: "Unable to process request",
        sender: "bot",
      },
    ]);
    setLoading(false);
  }
}

const ChatInterface: React.FC = () => {
  const { wallet, connection } = useSolanaWalletHelper();
  const { messages, setMessages } = useAppContext();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    console.log("Wallet connected:", wallet?.connected);

    let timer = setTimeout(() => {
      if (wallet?.connected) {
        console.log("Starting AI tool mapping call");
        aiAgentAndToolMapping({ setLoading, messages, setMessages });
      }
    }, 1500);

    return () => {
      clearTimeout(timer);
    };
  }, [wallet, connection, messages]);

  const handleSendMessage = (message: MessageProp) => {
    setMessages([...messages, message]);
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center bg-theme-background w-full">
      <div className='flex justify-center items-center h-5/6 w-auto lg:w-[70%] lg:max-w-[1024px]'>
        {messages.length > 0 ? 
          <Messages messages={messages} loading={loading} /> :
          <QuickChats onQuickChatSelect={handleSendMessage} />
        }
      </div>
      <div className='w-full lg:p-4 flex justify-center mt-2'>
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default ChatInterface;
