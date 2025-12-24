import type { Metadata, Viewport } from "next";
import Script from "next/script";

import { ThemeProvider } from "./contexts/ThemeContext";
import "./globals.css";

const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000",
  ),
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
    url: process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000",
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
      {gtmId && (
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${gtmId}');
            `,
          }}
        />
      )}
      <body className="crt-flicker antialiased">
        {gtmId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
        <ThemeProvider>
          <div className="scan-lines pointer-events-none fixed inset-0 z-50" />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
