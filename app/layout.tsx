import type { Metadata } from "next";

import "~/styles/globals.css";

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
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}

        <script
          id="check-theme"
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.toggle(
                      'dark',
                      localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
                    )`,
          }}
        ></script>
      </body>
    </html>
  );
}
