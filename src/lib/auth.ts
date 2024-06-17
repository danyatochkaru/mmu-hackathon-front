import NextAuth, {type DefaultSession} from "next-auth"
import Credentials from "@auth/core/providers/credentials";

declare module "next-auth" {
    /**
     * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: {
            id: string
            username: string
            token: string
            type: string
        } & DefaultSession["user"]
    }
}

export const {handlers, signIn, signOut, auth} = NextAuth({
    session: {
        strategy: 'jwt',
    },
    trustHost: true,
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
                const data = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/auth/local", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        identifier: credentials.email,
                        password: credentials.password,
                    }),
                })
                    .then(res => {
                        return res.json();
                    })
                    .catch(err => {
                        console.error(err)
                        return null;
                    })

                if (data.error) {
                    return null;
                }

                const _data = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/users/me?populate[0]=role", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${data.jwt}`,
                    },
                })
                    .then(res => res.json())
                    .catch(err => {
                        console.error(err)
                    })

                return {
                    name: data.user.username,
                    email: data.user.email,
                    id: data.user.id,
                    token: data.jwt,
                    type: _data.role.description,
                }
            },
        })
    ],
    callbacks: {
        jwt({token, user}) {
            if (user) {
                token.id = user.id
                // @ts-ignore
                token.token = user.token
                // @ts-ignore
                token.type = user.type
            }
            return token
        },
        session({session, token}) {
            session.user.id = token.id as string
            session.user.token = token.token as string
            session.user.type = token.type as string
            return session
        },
    }
})