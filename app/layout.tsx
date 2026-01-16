import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lilith's Canvas",
  description: "Let the AI guess",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
