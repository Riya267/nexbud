import GoogleProvider from 'next-auth/providers/google'
import { SessionStrategy } from 'next-auth'

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.CLIENT_ID ?? '',
      clientSecret: process.env.CLIENT_SECRET ?? '',
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: 'jwt' as SessionStrategy,
  },
  callbacks: {
    async jwt({ token }: any) {
      return token
    },
  },
}