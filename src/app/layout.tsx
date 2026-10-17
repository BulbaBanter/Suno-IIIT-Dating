import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Suno — talk first",
  description: "Voice-first, language-matched connections for IIIT-H.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
