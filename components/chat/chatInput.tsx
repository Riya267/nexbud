import { ChatInputProps } from '@/types';
import React, { useState } from 'react';
import { MdSend } from "react-icons/md";

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [input, setInput] = useState<string>('');
  
  const handleSend = () => {
    if (input.trim() !== '') {
      onSendMessage({ text: input, sender: "user"});
      setInput('');
    }
  };

  return (
    <div className="lg:p-0 lg:py-1 bg-theme-background flex flex-col flex-wrap lg:flex-row justify-center items-center w-[85%] lg:w-[70%]">
      <div className='bg-white w-full flex mx-2 p-2 rounded-lg'>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="flex-grow text-gray-900 border border-gray-300 rounded-lg focus:outline-none w-full border-none"
          placeholder="Type your message..."
        />
        <MdSend color='black' size={25} onClick={handleSend} className='cursor-pointer'/>
        </div>
    </div>
  );
};

export default ChatInput;
