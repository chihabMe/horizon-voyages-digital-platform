import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";
import NextAuthSessionProvider from "@/components/SessionProvider";
import { Suspense } from "react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Horizon Voyages | Explorez le Monde",
  description: "Agence de voyage premium à Alger - Séjours exclusifs, assistance visa, Omra premium et voyages de groupe.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark scroll-smooth">
      <body className={`${inter.variable} ${outfit.variable} bg-background text-on-background font-body min-h-screen flex flex-col antialiased`}>
        <NextAuthSessionProvider>
          <Navbar />
          <main className="flex-grow pt-20">
            {children}
          </main>
          <Footer />
          <Suspense fallback={null}>
            <BookingModal />
          </Suspense>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
