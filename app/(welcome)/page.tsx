import AuthForm from '@/components/auth';
import LoginForm from '@/components/auth/login';
import React from 'react';

const WelcomeScreen: React.FC = () => {
  return (
    <div className="flex flex-row items-center justify-center h-screen bg-gray-950 text-white">
      <div className="w-1/2 border border-gray-950">
       <AuthForm />
      </div>
      <div className="w-1/2 h-screen bg-gradient-to-r from-dark-purple via-blueish to-pinkish text-white flex flex-col items-center justify-center p-8">
        <h2 className="text-3xl font-bold mb-4">
          Welcome Back to <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">Web3Sage</span>
        </h2>
        <p className="text-lg text-center">
          Your Personal AI Assistant for all web3 needs
        </p>
      </div>
    </div>
  );
};

export default WelcomeScreen;
