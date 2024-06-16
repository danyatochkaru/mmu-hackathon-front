import NextAuth from "next-auth"
import Credentials from "@auth/core/providers/credentials";

export const {handlers, signIn, signOut, auth} = NextAuth({
    providers: [
        Credentials({
            name: "credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "text",
                    placeholder: "Email",
                },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "Password",
                },
            },
            async authorize(credentials) {
                if (credentials.email === "admin" && credentials.password === "123") {
                    return {name: "admin", email: 'admin@mail.ru'};
                }
                return null;
            },
        })
    ],
})