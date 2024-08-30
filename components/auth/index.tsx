'use client';

import React, { useState } from 'react';
import LoginForm from '@/components/auth/login';
import RegisterForm from '@/components/auth/register';

const AuthForm: React.FC = () => {
  const [isLoginForm, setIsLoginForm] = useState(false);

  const handleToggleAuthForm = () => {
    setIsLoginForm(!isLoginForm)
  }

  return isLoginForm ? <LoginForm toggleAuthForm={handleToggleAuthForm}/> : <RegisterForm toggleAuthForm={handleToggleAuthForm}/>;
};

export default AuthForm;
