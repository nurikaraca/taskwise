
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ReactQueryClientProvider } from "@/components/ReactQueryClientProvider";
import AuthProvider from "@/utils/providers/AuthProvider";
import Providers from "../context/Providers";
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <AuthProvider>
      <ReactQueryClientProvider>
        <html lang="en" suppressHydrationWarning>

          <body
            className={`${geistSans.variable} ${geistMono.variable} `}
          >
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >

            
            <Providers>
              <div className="min-h-screen flex flex-col ">
                <nav className="h-[5rem] w-full ">
                  <Navbar />
                </nav>
                <main className="flex-grow w-full mx-auto container h-[calc(100vh-5rem)] ">

                  {children}


                </main>
                <Toaster />
              </div>
            </Providers>
          </ThemeProvider>
        </body>
      </html>
    </ReactQueryClientProvider>
    </AuthProvider >
  );
}

