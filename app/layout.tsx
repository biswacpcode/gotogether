import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NextAuthProvider } from "@/providers/next-auth-providers";
import Navbar from "@/components/layout/Navbar";
import PageTransition from "@/components/layout/PageTransition";
import { ThemeProvider } from "next-themes";
import ParticleBackground from "@/components/layout/ParticleBackground";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GoTogether",
  description: "A cab sharing application by WebnD",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ParticleBackground/>
          <PageTransition>
          {/* <Toaster/> */}
          
          <Navbar/>
        {children}
        {/* <Footer /> */}
        </PageTransition>
        </ThemeProvider>
        </NextAuthProvider>

        </body>
    </html>
  );
}
