import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import connectdata from "../../../lib/db.js"; // Ensure the file extension is included

export default NextAuth.default({
  providers: [
    CredentialsProvider.default({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        name: { label: "Username", type: "text" },
      },
      
      async authorize(credentials) {
        const { email } = credentials;

        // Connect to the database
        const database = await connectdata();

        // Check if the user exists
        const user = await database.get("SELECT * FROM users WHERE email = ?", [email]);

        if (user) {
          // Return user data if found
         // res.status(200).json({ success: true });
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          };
        } else {
         // return res.status(401).json({ success: false, message: "Invalid username or password" });
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id,
        name: token.name,
        email: token.email,
        role: token.role,
      };
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
})
