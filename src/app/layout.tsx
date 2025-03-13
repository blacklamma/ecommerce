import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer";
import SessionProvider from "./SessionProvider";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "tEst-Commerce",
    description: "test e-commerce app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <SessionProvider>

                    <Navbar></Navbar>
                    <main className="p-4 max-w-7xl m-auto min-w-2">
                        {children}
                    </main>
                    <Footer></Footer>
                </SessionProvider>
            </body>
        </html>
    );
}
