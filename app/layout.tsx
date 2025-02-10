import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from '@/providers/theme-provider';
import { Toaster } from 'sonner';
import { ToastProvider } from '@radix-ui/react-toast';
import ReactQueryProvider from '@/providers/react-query-provider';
import ReduxProvider from '@/providers/redux-provider';

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "iAutomate",
  description: "Automate Comments and Dms on Instagram",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
        suppressHydrationWarning
        className={jakarta.className}
        >
          <ThemeProvider 
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
          >
            <ReduxProvider>
            <ReactQueryProvider>{children}</ReactQueryProvider>
            </ReduxProvider>
            <ToastProvider />
          </ThemeProvider>
        </body>
      </html>

    </ClerkProvider>
  );
}
