'use client';

import React, { useState } from 'react';
import LoginForm from '@/components/auth/login';
import RegisterForm from '@/components/auth/register';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const AuthForm: React.FC = () => {
  const [isLoginForm, setIsLoginForm] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  if(session?.user) {
    router.push("/dashboard")
  }

  const handleToggleAuthForm = () => {
    setIsLoginForm(!isLoginForm)
  }

  return isLoginForm ? <LoginForm toggleAuthForm={handleToggleAuthForm}/> : <RegisterForm toggleAuthForm={handleToggleAuthForm}/>;
};

export default AuthForm;
