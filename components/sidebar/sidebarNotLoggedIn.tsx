import React, { useState } from 'react';
import { FiMenu, FiLogIn, FiInfo } from 'react-icons/fi';

const SidebarNotLoggedIn: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`flex flex-col h-screen bg-gray-900 text-gray-300 transition-width duration-300 ${isOpen ? 'w-64' : 'w-20'}`}>
      <div className="flex items-center justify-between p-4">
        <span className="text-green-400 text-lg font-bold">{isOpen ? 'Web3Genius' : 'W3G'}</span>
        <FiMenu 
          className="cursor-pointer text-2xl"
          onClick={toggleSidebar}
        />
      </div>

      <nav className="flex flex-col flex-grow p-2 space-y-2">
        <div className="flex items-center space-x-2 cursor-pointer p-2 hover:bg-gray-700 rounded-md">
          <FiInfo className="text-xl"/>
          {isOpen && <span>About Web3Genius</span>}
        </div>
      </nav>

      <div className="flex items-center space-x-2 cursor-pointer p-4 hover:bg-gray-700 rounded-md">
        <FiLogIn className="text-xl"/>
        {isOpen && <span>Log In</span>}
      </div>
    </div>
  );
};

export default SidebarNotLoggedIn;
