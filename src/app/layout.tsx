import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header/header";
import { Providers } from "./providers";
import { Footer } from "@/components/layout/footer/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Typetale",
  description: "Read and share yours history with thousands of peoples!!!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} antialiased`}>
        <Providers>
          <Header />
          <main className="wrapper">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
