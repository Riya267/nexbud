'use client';

import { signOut, useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import React, { useState, useMemo, useCallback } from 'react';
import { FiHome, FiLogOut, FiBox, FiDollarSign, FiSettings } from 'react-icons/fi';
import { LuPanelLeftOpen, LuPanelLeftClose } from 'react-icons/lu';

const colors = [
  'bg-red-500',
  'bg-blue-500',
  'bg-green-500',
  'bg-yellow-500',
  'bg-purple-500',
  'bg-pink-500',
  'bg-indigo-500',
  'bg-teal-500',
];


function getRandomColor() {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}


const Sidebar: React.FC = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const pathName = usePathname();

  const toggleSidebar = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const userProfile = useMemo(() => {
    if (!session?.user) return null;

    return (
      <div className="flex items-center justify-center cursor-pointer rounded-full my-6">
        <div className={`rounded-full ${getRandomColor()} px-4 py-2`}>
          { session.user?.name?.charAt(0)}
        </div>
        {isOpen && <span className="px-4">
           <span className="italic">Hi,</span> {session.user.name}
          </span>}
      </div>
    );
  }, [session, isOpen]);

  const navItems = useMemo(
    () => [
      { href: '/dashboard', icon: FiHome, label: 'Dashboard' },
      { href: '/wallets', icon: FiDollarSign, label: 'Manage Wallets' },
      { href: '/explore', icon: FiBox, label: 'Explore Blockchain' },
      { href: '/settings', icon: FiSettings, label: 'Settings' },
    ],
    []
  );

  return (
    <div
      className={`flex flex-col h-screen bg-slate-950 text-gray-300 transition-all duration-300 border-r border-gray-700 ${
        isOpen ? 'w-[512px]' : 'w-20'
      }`}
    >
      <div className={`flex flex-col ${isOpen ? 'items-end' : 'items-center'} justify-end p-4 hidden lg:flex`}>
        <div className="flex items-center space-x-2 cursor-pointer rounded-md">
          {isOpen ? (
            <LuPanelLeftClose className="cursor-pointer text-2xl text-red" onClick={toggleSidebar} />
          ) : (
            <LuPanelLeftOpen className="cursor-pointer text-2xl text-red" onClick={toggleSidebar} />
          )}
        </div>
      </div>

      {userProfile}

      <nav className="flex flex-col flex-grow p-4">
        {navItems.map(({ href, icon: Icon, label }) => (
          <div
            key={href}
            className={`flex items-center justify-center cursor-pointer p-2 hover:bg-gray-700 rounded-full mb-6 ${
              pathName === href ? 'bg-gray-300' : ''
            }`}
          >
            <Icon className="text-xl" color={pathName === href ? 'black' : 'gray'} />
            {isOpen && (
              <span className={`${pathName === href ? 'text-black' : 'text-gray-400'} text-sm px-4`}>
                {label}
              </span>
            )}
          </div>
        ))}
      </nav>

      <button
        className="flex items-center justify-center space-x-2 cursor-pointer p-4 hover:bg-gray-700 rounded-md"
        onClick={async () => {
          await signOut()
        }}
      >
        <FiLogOut className="text-xl" />
        {isOpen && <span>Log Out</span>}
      </button>
    </div>
  );
};

export default Sidebar;
