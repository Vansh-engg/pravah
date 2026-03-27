import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Toaster } from 'react-hot-toast';
import Navbar from "@/components/layout/Navbar";
import Script from "next/script";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pravah Holidays | Flow with Travel",
  description: "Experience the flow of travel with Pravah Holidays. Premium tours and travel experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${inter.variable} ${outfit.variable} antialiased bg-[#05070a] text-slate-100 min-h-screen selection:bg-cyan-500 selection:text-white`}
      >
        <div className="relative isolate min-h-screen overflow-x-hidden">
          {/* Animated Background Blob */}
          <div className="fixed inset-0 -z-10 bg-[#05070a]">
             <div className="absolute top-0 -left-4 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
             <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
             <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
          </div>
          
          <Navbar />
          <main className="relative z-10">
            {children}
          </main>
          <Toaster position="bottom-right" />
        </div>
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
