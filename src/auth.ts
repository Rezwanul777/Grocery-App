import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import connectToDatabase from "./lib/db";
import User from "./models/user.model";
import bcrypt from "bcryptjs";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, request) {
        await connectToDatabase();
        const email = credentials?.email;
  const password = credentials?.password;
        // Add your own logic here to find the user and verify the password
if (!email || !password) return null;
        const user = await User.findOne({ email }).select("+password");
        if (!user) throw new Error("No user found with the given email");
        if (!user.password) throw new Error("Password not available");
        const isPasswordValid = await bcrypt.compare(password as string, user.password);
        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
    Google({
    clientId: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    })
  ],

  callbacks: {
    // callback is called when a user is signed in google
   async signIn({ user, account }) {
  if (account?.provider === "google") {
    try {
      await connectToDatabase();
      let dbUser = await User.findOne({ email: user.email });
      
      if (!dbUser) {
        console.log("Creating new Google user...");
        // Use Type Assertion 'as string' to satisfy TypeScript
        dbUser = await User.create({
          name: user.name as string,
          email: user.email as string,
          image: user.image as string,
          password: "", 
        });
      }
      
      // Manually attach metadata to the user object for the JWT/Session callbacks
      user.id = dbUser._id.toString();
      user.role = dbUser.role;
      
    } catch (error) {
      console.error("DATABASE_CREATE_ERROR:", error);
      return false; 
    }
  }
  return true;
}, 
    // JWT callback is called when a token is created or updated
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60 , // 30 days,
  },
  secret: process.env.AUTH_SECRET,
});
