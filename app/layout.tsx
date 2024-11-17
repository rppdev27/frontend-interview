export const dynamic = 'force-dynamic'

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeContextProvider from '@/app/providers/ThemeProviders'


export const metadata: Metadata = {
  title: "Bitwyre Learning Space",
  description: "Bitwyre Edu Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
        <body>
            <ThemeContextProvider>
              {children}
            </ThemeContextProvider>
          </body>
      </html>
  );
}

