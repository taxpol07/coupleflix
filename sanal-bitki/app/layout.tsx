import type { Metadata } from "next";
import { Quicksand, Caveat } from "next/font/google";
import "./globals.css";

// Modern ve yumuşak bir okuma fontu
const quicksand = Quicksand({ 
  subsets: ["latin"],
  variable: "--font-quicksand",
});

// Romantik el yazısı fontu
const caveat = Caveat({ 
  subsets: ["latin"],
  variable: "--font-caveat",
});

export const metadata: Metadata = {
  title: "Senin İçin...",
  description: "Özel bir sürpriz",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={`${quicksand.variable} ${caveat.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}