import React, { useState } from 'react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [input, setInput] = useState<string>('');

  const handleSend = () => {
    if (input.trim() !== '') {
      onSendMessage(input);
      setInput('');
    }
  };

  return (
    <div className="p-4 lg:p-0 lg:py-4 bg-stone-950 flex flex-col lg:flex-row justify-center items-center">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-grow p-4 text-gray-900 border border-gray-300 rounded-lg focus:outline-none mb-4 lg:mb-0"
        placeholder="Type your message..."
      />
      <button
        onClick={handleSend}
        className="ml-0 lg:ml-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 lg:py-4 rounded-lg hover:from-purple-600 hover:to-pink-600 transition"
      >
        Ask
      </button>
    </div>
  );
};

export default ChatInput;
