import React from 'react';

interface MessageProps {
  text: string;
  sender: 'user' | 'bot';
}

const Message: React.FC<MessageProps> = ({ text, sender }) => {
  const isUser = sender === 'user';
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-2`}>
      <div
        className={`max-w-xs p-2 rounded-lg ${
          isUser ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'
        }`}
      >
        {text}
      </div>
    </div>
  );
};

interface MessagesProps {
  messages: MessageProps[];
}

const Messages: React.FC<MessagesProps> = ({ messages }) => {
  return (
    <div className="flex flex-col space-y-2 p-4 overflow-y-auto h-64">
      {messages.map((msg, index) => (
        <Message key={index} text={msg.text} sender={msg.sender} />
      ))}
    </div>
  );
};

export default Messages;
