import type { Metadata } from "next";
import "../globals.css";
import TopMenu from "@/components/navigation/topMenu";
import { Toaster } from "@/components/ui/sonner";

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
        <header>

        </header>
        <main className="max-w-screen w-full h-full max-h-full absolute">
          <div className="justify-center flex-col max-w-full w-full max-h-full h-full absolute ">

            <div className="h-16 flex-0">
              <TopMenu />
            </div>

            {children}

          </div>

          <Toaster />
        </main>

      </body>
    </html>
  );
}
