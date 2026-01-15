import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

import { Providers } from "@/components/Providers";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Home Chore Hero | Gamified Household Chores",
  description: "Transform boring chores into an epic family quest with points, levels, and leaderboards!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} font-outfit antialiased bg-slate-50 text-slate-900`}
      >
        <div className="max-w-md mx-auto min-h-screen bg-white shadow-2xl relative overflow-x-hidden">
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
