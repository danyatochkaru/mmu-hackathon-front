import type {Metadata} from "next";
import {Inter as FontSans} from "next/font/google";
import "./globals.css";
import {cn} from "@/lib/utils";
import NotifyProvider from "@/app/NotifyProvider";

const fontSans = FontSans({
    subsets: ["latin", "cyrillic"],
    variable: "--font-sans",
})

export const metadata: Metadata = {
    title: "ММУ Партнёр"
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ru">
        <body
            className={cn(
                "min-h-screen bg-background font-sans antialiased",
                fontSans.variable
            )}
        >
        <NotifyProvider>
            {children}
        </NotifyProvider>
        </body>
        </html>
    );
}
