import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";

import "@/styles.css";

import { Toaster } from "@/components/ui/sonner";
import { QueryProvider } from "@/lib/query/query-provider";

export const metadata: Metadata = {
  title: "Mugnavo Next.js Starter",
  description: "Minimal Next.js starter kit",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background min-h-screen font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>{children}</QueryProvider>
          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
