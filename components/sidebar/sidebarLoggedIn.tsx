import { usePathname } from "next/navigation";
import React, { useState } from "react";
import {
  FiHome,
  FiLogOut,
  FiBox,
  FiDollarSign,
  FiSettings,
} from "react-icons/fi";
import { LuPanelLeftOpen, LuPanelLeftClose } from "react-icons/lu";

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathName = usePathname();
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
console.log("pathName", pathName)
  return (
    <div
      className={`flex flex-col h-screen bg-slate-950 text-gray-300 transition-all duration-300 border-r border-gray-700 ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      <div className={`flex flex-col ${isOpen ? 'items-end' : 'items-center' } justify-end p-4`}>
        <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-700 rounded-md">
          {isOpen ? (
            <LuPanelLeftClose
              className="cursor-pointer text-2xl text-red"
              onClick={toggleSidebar}
            />
          ) : (
            <LuPanelLeftOpen
              className="cursor-pointer text-2xl text-red"
              onClick={toggleSidebar}
            />
          )}
        </div>
      </div>

      <nav className="flex flex-col flex-grow p-4">
        <div className="flex items-center justify-center cursor-pointer p-3 hover:bg-gray-700 rounded-full mb-6 bg-gray-300">
          <FiHome className="text-xl" color={pathName === '/dashboard' ? 'black': 'gray'} />
          {isOpen && <span className={`${pathName === '/dashboard' ? 'text-black' : 'text-gray-900'}  px-4`}>Dashboard</span>}
        </div>
        <div className="flex items-center justify-center cursor-pointer p-2 hover:bg-gray-700 rounded-full mb-6">
          <FiDollarSign className="text-xl" color={pathName === '/wallets' ? 'black': 'gray'} />
          {isOpen && <span className={`${pathName === '/wallets' ? 'text-black' : 'text-gray-400'}  px-4`}>Manage Wallets</span>}
        </div>
        <div className="flex items-center justify-center cursor-pointer p-2 hover:bg-gray-700 rounded-full mb-6">
          <FiBox className="text-xl" color={pathName === '/explore' ? 'black': 'gray'} />
          {isOpen && <span className={`${pathName === '/explore' ? 'text-black' : 'text-gray-400'}  px-4`}>Explore Blockchain</span>}
        </div>
        <div className="flex items-center justify-center cursor-pointer p-2 hover:bg-gray-700 rounded-full mb-6">
          <FiSettings className="text-xl" color={pathName === '/settings' ? 'black': 'gray'} />
          {isOpen && <span className={`${pathName === '/settings' ? 'text-black' : 'text-gray-400'}  px-4`}>Settings</span>}
        </div>
      </nav>

      <div className="flex items-center space-x-2 cursor-pointer p-4 hover:bg-gray-700 rounded-md">
        <FiLogOut className="text-xl" />
        {isOpen && <span>Log Out</span>}
      </div>
    </div>
  );
};

export default Sidebar;
