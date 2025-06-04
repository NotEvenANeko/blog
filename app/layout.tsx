import type { Metadata } from "next";
import "./globals.css";
import { Menu } from "@/components/Menu";
import { ThemeProvider } from "@/components/theme-provider";

export const dynamic = "force-static";

export const metadata: Metadata = {
  metadataBase: new URL("/", process.env.NEXT_PUBLIC_URL!),
  title: "Blog",
  description: "Blog of Neko (WIP)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="mx-auto max-w-3xl">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Menu />

          <main className="min-h-full overflow-scroll">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
