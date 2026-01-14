import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Canvas Predictor",
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
