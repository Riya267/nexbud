import AuthForm from '@/components/auth';
import React from 'react';
import Image from "next/image";

const WelcomeScreen: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen bg-gray-950 text-white">
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8">
        <div className="rounded-full mb-4">
          <Image 
            src={"/logo.png"}
            alt="Logo"
            width={80}
            height={50}
            className="rounded-full"
          />
        </div>
        <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-center">
          Welcome Back to <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">NexBud</span>
        </h2>
        <p className="text-base lg:text-lg text-center">
          Your Personal AI Assistant for all web3 needs
        </p>
      </div>
      <div className="w-full lg:w-1/2 border-t lg:border-t-0 border-gray-800 p-4 lg:p-0">
        <AuthForm />
      </div>
    </div>
  );
};

export default WelcomeScreen;
