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

const ChatInterface: React.FC = () => {
  const { wallet, connection } = useSolanaWalletHelper();
  const { messages, setMessages } = useAppContext();
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    console.log("called", wallet.connected,messages)
      console.log("last message", messages[messages.length-1])
      async function aiAgentAndToolMapping() {
       if(wallet.connected) {
        try {
          setLoading(true)
          console.log("Starting aiAgentAndToolMapping function");
          if (messages[messages.length - 1]?.sender === "user") {
            console.log("Last message sender is user. Proceeding with AI query.");
    
            const aiResponse = await sendQueryToAIAgent(
              messages[messages.length - 1].text,
              messages.filter(item => item.sender === "user").length
            );
            console.log("AI response received:", aiResponse);
            let context = {};
            for(const item of aiResponse!) {
                console.log("Processing tool action:", item.tool);
                const mappedItem = toolMapping.find(
                  (toolMap) => toolMap.tool === item.tool
                );
                let response;
                if (mappedItem) {
                  console.log(`Executing function for tool: ${item.tool}`);
                  if(item.tool !== "notify_user_onchat_tool"){
                    response = await mappedItem.function({ ...item.arguments });
                    console.log(`Response: ${response}`);
                    context = {...context, ...{ [`${mappedItem?.context}`]: `${response}` }}
                    if (!response) {
                      throw new Error("Unable to process request");
                    }
                  } else {
                    console.log("debug 1", context);
                    await mappedItem.function(`${item.arguments?.message}`+ `${JSON.stringify(context)}`);
                  }
                } else {
                  console.log(`No mapped function found for tool: ${item.tool}`);
                }
            }
          } else {
            console.log("Last message sender is not a user. No AI query needed.");
          }
          setLoading(false)
        } catch (error) {
          console.error("Error in aiAgentAndToolMapping:", error);
          setMessages([...messages, { 
            text: "Unable to process request", 
            sender: "bot"
          }]);
          setLoading(false)
        }
       }
      }
      aiAgentAndToolMapping()
  }, [wallet, connection, messages]);

  const handleSendMessage = (message: MessageProp) => {
    console.log("message added")
    setMessages([...messages, message]);
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center bg-theme-background w-full">
      <div className='flex justify-center items-center h-5/6 w-[70%] lg:max-w-[1024px]'>
        {messages.length > 0 ? 
          <Messages messages={messages} loading={loading}/> :
          <QuickChats onQuickChatSelect={handleSendMessage} />
        }
      </div>
      <div className='w-full p-4 flex justify-center mt-2'>
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default ChatInterface;