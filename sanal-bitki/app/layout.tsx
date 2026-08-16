// Bu satırı en üste ekliyoruz
import type { Metadata } from 'next'; 

// Sende globals.css veya font importları varsa onlar aynen kalsın
import './globals.css'; 

export const metadata: Metadata = {
  title: "CoupleFlix",
  description: "Elif ve Benim Hikayem",
  manifest: "/manifest.json", 
  appleWebApp: {
    capable: true, 
    statusBarStyle: "black-translucent", 
    title: "CoupleFlix",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}