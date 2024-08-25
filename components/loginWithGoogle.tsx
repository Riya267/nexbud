'use client'

import { FcGoogle } from 'react-icons/fc'
import { signIn } from 'next-auth/react'

const LoginWithGoogleButton = () => {
  return (
    <button
      onClick={async () => await signIn('google', { callbackUrl: '/dashboard' })}
      className="w-full py-3 border border-gray-300 flex items-center justify-center rounded-lg hover:bg-gray-100 transition"
    >
      <span className="flex items-center gap-2 text-gray-950">
        <FcGoogle />
        Login With Google
      </span>
    </button>
  )
}

export default LoginWithGoogleButton