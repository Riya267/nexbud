import React from "react";

interface QuickChatsProps {
  onQuickChatSelect: (chat: string) => void;
}

const QuickChats: React.FC<QuickChatsProps> = ({ onQuickChatSelect }) => {
  const quickChats = [
    "Check my Ethereum balance",
    "What's the latest in Web3?",
    "Connect to Solana wallet",
    "Show my transaction history",
    "Get the latest token prices",
    "Guide me through a transaction",
  ];

  return (
    <div className="p-4 rounded-t-lg">
      <ul className="flex flex-wrap space-x-2 justify-center items-center">
        {quickChats.map((chat, index) => (
          <li key={index} className="mb-2">
            <div
              className="border border-orange-500 rounded-lg p-4 bg-white shadow-md hover:shadow-lg cursor-pointer transition"
              onClick={() => onQuickChatSelect(chat)}
            >
              <h3 className="text-lg text-gray-800 font-bold mb-2">{chat}</h3>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuickChats;
