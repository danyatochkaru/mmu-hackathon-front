import {SessionProvider} from "next-auth/react";
import {PropsWithChildren} from "react";
import NotifyProvider from "@/app/NotifyProvider";
import {Session} from "next-auth";

export default function Providers({children, session}: PropsWithChildren & { session: Session }) {
    return <SessionProvider session={session}>
        <NotifyProvider>
            {children}
        </NotifyProvider>
    </SessionProvider>
}