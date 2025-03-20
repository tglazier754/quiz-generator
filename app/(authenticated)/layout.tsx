import type { Metadata } from "next";
import "../globals.css";
import { Providers } from "../providers";
import TopMenu from "@/components/navigation/topMenu";
import { Toaster } from "@/components/ui/toaster";
import { Box, Flex } from "@chakra-ui/react";

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
      <body>
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

              <Box
                maxWidth="1100px"
                minWidth="400px"
                width="100%"
                className="flex-grow"
                overflowY="hidden"
                alignSelf="center">
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
