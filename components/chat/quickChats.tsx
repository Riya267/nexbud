import { QuickChatsProps } from "@/types";
import React from "react";
import { FaWallet, FaHistory, FaCoins, FaHandshake, FaChartLine } from "react-icons/fa";

const QuickChats: React.FC<QuickChatsProps> = ({ onQuickChatSelect }) => {
  const quickChats = [
    {
      label: "Check my Solana balance",
      icon: <FaWallet className="text-green-500" />,
      description: "View your current Solana balance.",
    },
    {
      label: "What's the latest in Web3?",
      icon: <FaChartLine className="text-orange-500" />,
      description: "Get updates on the latest trends in Web3.",
    },
    {
      label: "Show my transaction history",
      icon: <FaHistory className="text-blue-500" />,
      description: "See all recent transactions in your wallet.",
    },
    {
      label: "Get the latest token prices",
      icon: <FaCoins className="text-rose-500" />,
      description: "Check current prices of popular tokens.",
    },
    {
      label: "Guide me through a transaction",
      icon: <FaHandshake className="text-pink-500" />,
      description: "Step-by-step guide to make a transaction.",
    },
  ];

  return (
    <div className="p-4 lg:p-40 rounded-t-lg h-[28.125rem] lg:w-full lg:h-auto mt-[6rem] overflow-y-auto scrollbar-thumb-slate-800 scrollbar-track-slate-900 scrollbar-thin">
      <ul className="flex flex-wrap space-x-2 justify-center items-center">
        {quickChats.map((chat, index) => (
          <li key={index} className="mb-2 w-fit">
            <div
              className="border border-black rounded-lg p-4 bg-gray-800 shadow-md hover:shadow-lg cursor-pointer transition"
              onClick={() => onQuickChatSelect({ text: chat.label, sender: 'user'})}
            >
              <div className="flex items-center space-x-4">
                {chat.icon}
                <div>
                  <h3 className="text-md text-white font-bold">{chat.label}</h3>
                  <p className="text-xs text-gray-600">{chat.description}</p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuickChats;