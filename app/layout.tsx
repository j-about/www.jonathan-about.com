import type { Metadata, Viewport } from "next";

import { ThemeProvider } from "./contexts/ThemeContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jonathan About | Software Engineer",
  description:
    "Jonathan About ~ Software Engineer ~ Data/MLOps Engineering · Web Development. Skills, projects, education and connect.",
  authors: [{ name: "Jonathan About", url: "https://www.jonathan-about.com" }],
  creator: "Jonathan About",
  publisher: "Jonathan About",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.jonathan-about.com",
    title: "Jonathan About | Software Engineer",
    description:
      "Jonathan About ~ Software Engineer ~ Data/MLOps Engineering · Web Development. Skills, projects, education and connect.",
    siteName: "Jonathan About | Software Engineer",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jonathan About | Software Engineer",
    description:
      "Jonathan About ~ Software Engineer ~ Data/MLOps Engineering · Web Development. Skills, projects, education and connect.",
    creator: "@JonathanAbout",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
    { media: "(prefers-color-scheme: light)", color: "#000000" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="crt-flicker antialiased">
        <ThemeProvider>
          <div className="scan-lines pointer-events-none fixed inset-0 z-50" />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
