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
    <div className="p-4 bg-black flex border-t border-gray-500">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-grow p-4 text-gray-900 border border-gray-300 rounded-lg focus:outline-none"
        placeholder="Type your message..."
      />
      <button
        onClick={handleSend}
        className="mx-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 rounded-lg hover:from-purple-600 hover:to-pink-600 transition"
      >
        Ask
      </button>
    </div>
  );
};

export default ChatInput;
