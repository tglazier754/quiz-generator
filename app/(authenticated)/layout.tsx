import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import { Providers } from "../providers";
import TopMenu from "@/components/navigation/topMenu";
import { Toaster } from "@/components/ui/toaster";
import { Box, Flex } from "@chakra-ui/react";

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

          </header>
          <main className="max-w-screen w-full h-full max-h-full absolute">
            <Flex
              justifyContent="center"
              direction="column"
              maxHeight="100%"
              height="100%"
              maxWidth="100%"
              width="100%"
              position="absolute">

              <Box height="4rem" flex="0 auto">
                <TopMenu />
              </Box>

              <Box maxWidth="1100px" minWidth="400px" width="100%" className="flex-grow" overflowY="auto" alignSelf="center" mb="4">
                {children}
              </Box>

            </Flex>

            <Toaster />
          </main>

        </Providers>
      </body>
    </html>
  );
}
