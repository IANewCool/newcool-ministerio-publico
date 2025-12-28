import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ministerio Publico Chile - Fiscalias | NewCooltura Informada",
  description: "Buscador de fiscalias, como denunciar delitos y derechos de las victimas en Chile",
  keywords: ["ministerio publico", "fiscalia", "denunciar delitos", "derechos victimas", "fiscales"],
  openGraph: {
    title: "Ministerio Publico - NewCooltura Informada",
    description: "Fiscalias y denuncias de delitos",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
