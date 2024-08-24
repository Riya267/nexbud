import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { AuthFormInterface } from './login';

const RegisterForm: React.FC<AuthFormInterface> = ({ toggleAuthForm }) => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6">Create an Account</h2>
        <form>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Enter username"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Enter email address"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Enter password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <button className="w-full py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition mb-4">
            Sign Up
          </button>
        </form>
        <div className="text-center text-gray-500 mb-4">Or</div>
        <button className="w-full py-3 border border-gray-300 flex items-center justify-center rounded-lg hover:bg-gray-100 transition">
          <FcGoogle className="mr-2" /> Continue with Google
        </button>
        <div className="text-center mt-6">
          <p className="text-gray-500">
            Already have an account? <a onClick={toggleAuthForm} className="text-black font-semibold hover:underline">Sign in</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
