'use client';

import React, { useEffect, useState } from 'react';
import Messages from '@/components/chat/messages';
import QuickChats from '@/components/chat/quickChats';
import ChatInput from '@/components/chat/chatInput';
import { useAppContext } from '@/context/appContext';
import { MessageProp } from '@/types';
import { useWalletService } from '@/hooks/useWalletService';
import { sendQueryToAIAgent } from '@/utils/helper';
import { toolMapping } from '@/utils/toolMapping';
import toast from 'react-hot-toast';

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
    setLoading(true);

    if (messages[messages.length - 1]?.sender === "user") {

      const userMessageCount = messages.filter((item) => item.sender === "user").length;

      const aiResponse = await sendQueryToAIAgent(
        messages[messages.length - 1].text,
        userMessageCount
      );

      let context = {};
      for (const item of aiResponse!) {
        const mappedItem = toolMapping.find(
          (toolMap) => toolMap.tool === item.tool
        );

        if (mappedItem) {

          if (item.tool !== "notify_user_onchat_tool") {
            const response = await mappedItem.function({ ...item.arguments });

            context = {
              ...context,
              ...{ [`${mappedItem?.context}`]: `${response}` },
            };

            if (!response) {
              console.error("Error: Unable to process request - Response is null or undefined");
              throw new Error("Unable to process request");
            }

          } else {
            let updatedContext="";
            for (const [key, value] of Object.entries(context)) {
              // Capitalize the key and replace underscores with spaces for readability
              const formattedKey = key.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
              updatedContext += `${formattedKey}: ${value}\n`;
          }
      
            await mappedItem.function(
              `${item.arguments?.message}` + `${updatedContext}`
            );
          }
        }
      }
    }
    setLoading(false);
  } catch (error) {
    console.error("Error in AiAgentAndToolMapping:", error);
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
  const { wallet, connection } = useWalletService();
  const { messages, setMessages } = useAppContext();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if(wallet.connected) {
      let timer = setTimeout(() => {
          aiAgentAndToolMapping({ setLoading, messages, setMessages });
      }, 1500);
  
      return () => {
        clearTimeout(timer);
      };
    } else {
      if(messages[messages.length - 1]?.sender === "user"){
        toast("Please Connect Your Wallet", {
          icon: '🌐',
          style: {
            borderRadius: '10px',
            background: '#313042',
            color: '#ffffff',
          },
        })
        handleSendMessage({text: "Please Connect Your Wallet", sender:"bot"})
      }
    }
  }, [wallet, connection, messages]);

  const handleSendMessage = (message: MessageProp) => {
    setMessages([...messages, message]);
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center bg-theme-background w-full">
      <div className='flex justify-center items-center h-5/6 w-auto w-full'>
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
