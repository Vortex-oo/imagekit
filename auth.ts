import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import dbConnect from "./lib/db"
import signInSchema from "./schemas/signin.schema";
import User from "@/app/models/user.model";
import bcrypt from "bcryptjs";
import GitHub from "next-auth/providers/github"


export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        GitHub,
        Credentials({
            credentials: {
                email: {
                    type: "email",
                    label: "Email"
                },
                password: {
                    type: "password",
                    label: "password"
                }
            },
            authorize: async (credentials) => {
                await dbConnect();

                try {
                    const { email, password } = await signInSchema.parseAsync(credentials)

                    const user = await User.findOne({ email: email })

                    if (!user) {
                        throw new Error("user not found")
                    }

                    const isValid = await bcrypt.compare(
                        String(password),
                        String(user.password)
                    )

                    if (isValid) {
                        return user
                    } else {
                        throw new Error("Invalid password")
                    }
                } catch (error: any) {
                    throw new Error(error.message || "SignIn Error")
                }
            },
        })
    ],

    pages: {
        signIn: '/signin',
        signOut: '/signout',
        error: '/auth/error',
        verifyRequest: '/auth/verify',
    },

    callbacks: {
        async session({ session, token }) {
            if (session.user) {
                session.user.id = String(token.id)
                session.user.username = String(token.username);
            }
            return session
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id || user._id?.toString(),
                token.username = (user as any).username || user.name || user.email;
            }
            return token
        },
    },
    session: {
        strategy: "jwt",
        maxAge: 60 * 60, // 3600 seconds (1 hour)
        updateAge: 15 * 60 // 15 minutes
    },
    secret: process.env.AUTH_SECRET,
    debug: process.env.NODE_ENV === "development",
})  