'use client';

import React, { useState } from 'react';
import Messages from '@/components/chat/messages';
import QuickChats from '@/components/chat/quickChats';
import ChatInput from '@/components/chat/chatInput';

interface MessageType {
  text: string;
  sender: 'user' | 'bot';
}

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);

  const handleQuickChatSelect = (chat: string) => {
  };
  
  const handleSendMessage = () => {
  }

  return (
    <div className="flex flex-col h-screen justify-center items-center bg-slate-950">
    {messages.length > 0 ? 
      <div className="flex-grow overflow-hidden">
        <Messages messages={messages} />
      </div> : 
      <QuickChats onQuickChatSelect={handleQuickChatSelect} />
    }
    <div className='fixed bottom-0 w-full'>
        <ChatInput onSendMessage={handleSendMessage} />
    </div>
    </div>
  );
};

export default ChatInterface;
