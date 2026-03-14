import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PageTransition } from "@/components/layout/page-transition";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "The Young Player's Guide",
    template: "%s | The Young Player's Guide",
  },
  description:
    "A comprehensive youth soccer development resource covering sleep, nutrition, training, mental wellness, and injury prevention.",
  openGraph: {
    title: "The Young Player's Guide",
    description:
      "Evidence-based youth soccer development resource covering sleep, nutrition, training, mental wellness, and injury prevention.",
    siteName: "The Young Player's Guide",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Young Player's Guide",
    description:
      "Evidence-based youth soccer development resource for players aged 6–18.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <PageTransition>
              <main className="flex-1">{children}</main>
            </PageTransition>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
