'use client'

import { FaGoogle } from 'react-icons/fa6'
import { signIn } from 'next-auth/react'

const LoginWithGoogleButton = () => {
  return (
    <button
      onClick={async () => await signIn('google', { callbackUrl: '/dashboard' })}
    >
      <span className="flex items-center gap-2">
        Login
        <FaGoogle />
      </span>
    </button>
  )
}

export default LoginWithGoogleButton