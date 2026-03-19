import type { Metadata } from "next";
import "./globals.css";
import AppContextProvider from "./_app-context";

export const metadata: Metadata = {
  title: "Notemaster",
  description: "Retro-themed notes application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background text-primary" suppressHydrationWarning>
        <AppContextProvider>{children}</AppContextProvider>
      </body>
    </html>
  );
}
