import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import "../auth.css"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Регистрация",
  description: "Страница регистрации",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
