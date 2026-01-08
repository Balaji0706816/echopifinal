import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import VoiceWidget from "../components/voice/VoiceWidget";
import Footer from "../components/Footer";
import Navbar from "../components/header/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Echopi | AI Interview Practice",
  description: "Master your next interview with immersive AI Avatars.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* We apply the variables to the body. 
        Note: We are using standard CSS class names 'font-sans' and 'antialiased' 
        which we will define in your globals.css since Tailwind config is absent.
      */}
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="app-container">
          <Navbar />
          <Suspense fallback={null}>
            <VoiceWidget />
          </Suspense>
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}