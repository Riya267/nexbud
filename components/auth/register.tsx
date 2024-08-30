import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { AuthFormInterface } from "@/components/auth/login";
import LoginWithGoogleButton from "@/components/loginWithGoogle";
import bcrypt from "bcryptjs";
import prisma from "@/db";

interface RegisterFormInputs {
  username: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

const RegisterForm: React.FC<AuthFormInterface> = ({ toggleAuthForm }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormInputs>();
  
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    setLoading(true);
    try {
      const { email, password, phone, username: name } = data;
      const hashedPassword = await bcrypt.hash(password, 10);
      
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });
  
      if (existingUser) {
        alert("Email already in use. Please choose a different email.");
        return;
      }
  
      await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
          phone,
        },
      });
  
      alert("Registration successful! Please log in.");
  
    } catch (error) {
      console.error("Error registering user:", error);
      alert("An error occurred while registering. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  

  const password = watch("password");

  return (
    <div className="flex items-center justify-center h-screen bg-gray-950 text-gray-950">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6 text-dark-purple">
          Create an Account
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <input
              {...register("username", { required: "Username is required" })}
              type="text"
              placeholder="Enter username"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
              type="email"
              placeholder="Enter email address"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <input
              {...register("phone", {
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Invalid phone number",
                },
              })}
              type="text"
              placeholder="Enter phone number"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              type="password"
              placeholder="Enter password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <input
              {...register("confirmPassword", {
                required: "Confirm Password is required",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              type="password"
              placeholder="Confirm password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className={`w-full py-3 rounded-lg transition mb-4 ${
              loading
                ? "bg-gray-600 text-white cursor-not-allowed"
                : "bg-black text-white hover:bg-gray-800"
            }`}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Sign Up"}
          </button>
        </form>
        <div className="text-center text-gray-500 mb-4">Or</div>
        <LoginWithGoogleButton />
        <div className="text-center mt-6">
          <p className="text-gray-500">
            Already have an account?{" "}
            <button
              onClick={toggleAuthForm}
              className="text-black font-semibold hover:underline cursor-pointer"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
