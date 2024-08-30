'use client';

import { signOut, useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import React, { useState, useMemo, useCallback } from 'react';
import { FiHome, FiLogOut, FiBox, FiDollarSign, FiSettings } from 'react-icons/fi';
import { LuPanelLeftOpen, LuPanelLeftClose } from 'react-icons/lu';
import Image from 'next/image';

const Sidebar: React.FC = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const pathName = usePathname();

  // Toggle sidebar state
  const toggleSidebar = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  // User profile component
  const userProfile = useMemo(() => {
    if (!session?.user) return null;

    return (
      <div className="flex items-center justify-center cursor-pointer rounded-full my-6">
        <div className="rounded-full w-8">
          <Image
            className="w-full h-full rounded-full cursor-pointer"
            src={session.user.image || ''}
            width={100}
            height={100}
            alt="user_profile_image"
            referrerPolicy="no-referrer"
          />
        </div>
        {isOpen && <span className="block px-4">{session.user.name}</span>}
      </div>
    );
  }, [session, isOpen]);

  // Navigation items
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
