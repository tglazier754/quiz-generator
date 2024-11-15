import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import { Providers } from "../providers";
import TopMenu from "@/components/navigation/topMenu";
import { Toaster } from "@/components/ui/toaster";

const geistSans = localFont({
  src: "../../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Quiz Generator",
  description: "Generate a quiz from any url",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <header>
            <TopMenu />
          </header>
          <main className="max-w-screen w-screen h-[calc(100vh-3rem)] max-h-[calc(100vh-3rem)] absolute overflow-y-scroll">
            {children}

            <Toaster />
          </main>

        </Providers>
      </body>
    </html>
  );
}
