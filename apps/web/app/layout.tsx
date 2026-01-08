import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "UI Platform",
  description: "Low-data, high-performance web platform for Africa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
