import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Assistly",
  description:
    "Assistly is an AI-powered customer support solution that integrates seamlessly with websites, offering real-time, intelligent, and personalized assistance using cutting-edge AI, NLP, and machine learning technology.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="min-h-screen">{children}</body>
      </html>
    </ClerkProvider>
  );
}
