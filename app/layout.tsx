import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Orbitron } from "next/font/google"; // Import Orbitron
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark, neobrutalism } from '@clerk/themes'
import Navbar from "@/components/globalComponents/navbar";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { ThemeProvider } from "@/components/globalComponents/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "700"], // Add desired weights
  display: "swap",
});

export const metadata: Metadata = {
  title: "HackScraper - The Ultimate Hackathon Radar",
  description: "Find the perfect hackathon for you with HackScraper, the ultimate hackathon finder",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: [neobrutalism],
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <body
          className={` ${orbitron.variable} font-orbitron min-h-screen antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <AnimatedBackground className="min-h-screen">
              <Navbar />
              <main className="pt-20 container mx-auto px-4">
                {children}
              </main>
            </AnimatedBackground>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
