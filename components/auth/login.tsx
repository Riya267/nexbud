import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import LoginWithGoogleButton from '@/components/loginWithGoogle';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import toast from 'react-hot-toast';
export interface AuthFormInterface {
  toggleAuthForm: (e: React.SyntheticEvent) => void;
}

interface LoginFormInputs {
  email: string;
  password: string;
}

const LoginForm: React.FC<AuthFormInterface> = ({ toggleAuthForm }) => {
  const router = useRouter();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      const { email, password } = data;
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (!result?.error) {
        toast("Login successful!", {
          icon: '👍🏻',
          style: {
            borderRadius: '10px',
            background: '#058009',
            color: '#ffffff',
          },
        });
        router.push("/dashboard")
      } else {
        toast("Something went wrong while Logging in.", {
          icon: '👎🏻',
          style: {
            borderRadius: '10px',
            background: '#ab210a',
            color: '#ffffff',
          },
        });
      }
    } catch (error) {
      console.error('An error occurred:', error);
      toast("Something went wrong while Logging in.", {
        icon: '👎🏻',
        style: {
          borderRadius: '10px',
          background: '#ab210a',
          color: '#ffffff',
        },
      });
    }
  };
  
  return (
    <div className="flex items-center justify-center h-screen bg-gray-950 font-nunitoSans text-gray-950">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-2 text-dark-purple">Welcome</h2>
        <p className="text-xl text-center mb-4 text-gray-400">Sign into your account</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <input
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Invalid email address',
                },
              })}
              type="email"
              placeholder="Enter email address"
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>
          <div className="mb-4">
            <input
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
              type="password"
              placeholder="Enter password"
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>
          <input
            type="submit"
            className="w-full py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition mb-4"
            value="Continue"
          />
        </form>
        <div className="text-center text-gray-500 mb-4">Or</div>
        <LoginWithGoogleButton />
        <div className="text-center mt-6">
          <p className="text-gray-500">
            Dont have an account?{' '}
            <a onClick={toggleAuthForm} className="text-black font-semibold hover:underline cursor-pointer">
              Join us
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
