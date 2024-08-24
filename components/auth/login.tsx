import LoginWithGoogleButton from '@/components/loginWithGoogle';
import React from 'react';

export interface AuthFormInterface {
  toggleAuthForm: (e: React.SyntheticEvent) => void;
}

const LoginForm: React.FC<AuthFormInterface> = ({ toggleAuthForm }) => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-950 font-nunitoSans">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6">Welcome back</h2>
        <form>
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
          <input type="submit" className="w-full py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition mb-4" value={"Continue"} />
        </form>
        <div className="text-center text-gray-500 mb-4">Or</div>
        <LoginWithGoogleButton />
        <div className="text-center mt-6">
          <p className="text-gray-500">
            Don't have an account? <a onClick={toggleAuthForm} className="text-black font-semibold hover:underline">Join us</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
