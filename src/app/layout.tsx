import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const customFont = localFont({
  src: "../fonts/nicomoji-plus_v2-5.ttf",
  display: "swap",
  variable: "--font-custom",
});

export const metadata: Metadata = {
  title: "Todo-App",
  description: "シンプルなタスク管理アプリです。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={customFont.variable}>
      <body>{children}</body>
    </html>
  );
}
