import type {Metadata} from "next";
import {Inter as FontSans} from "next/font/google";
import "./globals.css";
import {cn} from "@/lib/utils";
import Providers from "@/app/Providers";
import {auth} from "@/lib/auth";

const fontSans = FontSans({
    subsets: ["latin", "cyrillic"],
    variable: "--font-sans",
})

export const metadata: Metadata = {
    title: "ММУ Партнёр",
    icons: {icon: 'favicon.jpg'}
};

export default async function RootLayout({
                                             children,
                                         }: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await auth()
    return (
        <html lang="ru">
        <body
            className={cn(
                "min-h-screen bg-background font-sans antialiased",
                fontSans.variable
            )}
        >
        <Providers session={session!}>
            {children}
        </Providers>
        </body>
        </html>
    );
}
