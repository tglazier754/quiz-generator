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
        <main className="max-w-dvw w-full min-w-0  max-h-dvh h-full">
          <div className="flex flex-col  w-full max-w-full max-h-full h-full fixed ">

            <div className="h-16 min-h-16 max-h-16 flex-0">
              <TopMenu />
            </div>

            <div className="max-w-full min-w-full w-full min-h-0 flex-1">
              <div className="max-w-[1100px] min-w-[400px] h-full max-h-full flex-auto mx-auto flex relative">
                {children}
              </div>
            </div>
          </div>

          <Toaster />
        </main>

      </body>
    </html>
  );
}
