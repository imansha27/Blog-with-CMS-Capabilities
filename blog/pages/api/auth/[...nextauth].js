import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectdata as db } from "../../../lib/db";
 

export default NextAuth({
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const user = await db.get(
          "SELECT * FROM user WHERE email=? AND password=?",
          [credentials.email, credentials.password]
        );

        if (user) {
          return { id: user.id, name: user.name, email: user.email, role: user.role };
        } else {
          throw new Error("Invalid credentials");
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
  },
  pages: {
    signIn: "/page",
  },
});
