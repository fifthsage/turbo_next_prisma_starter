import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Providers from "../providers";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

const title = "모빌리티플러스 ERP";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_URL || "https://ev-cpo-platform-erp.vercel.app",
  ),
  title,
  description: ["모빌리티플러스 ERP"].join(","),
  openGraph: {
    type: "website",
    description: "모빌리티플러스 통합 관리웹",
    locale: "ko_KR",
    // images: `${process.env.NEXT_PUBLIC_STATIC_URL}/statics/images/assets/og-image.png`,
    url: "https://ev-cpo-platform-erp.vercel.app",
    siteName: title,
  },
  icons: {
    icon: "/favicons/favicon.ico",
    shortcut: "/favicons/favicon.ico",
    apple: "/favicons/apple-touch-icon.png",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/apple-touch-icon-precomposed.png",
    },
  },
  // other: {
  //   "naver-site-verification": "efee6188fdc09710d1c6676e4a49982ceb548fbe",
  //   "google-adsense-account": `${process.env.NEXT_PUBLIC_GOOGLE_AD_SENSE_CLIENT_ID || ""}`,
  // },
};

export const viewport: Viewport = {
  viewportFit: "cover",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false, // Also supported by less commonly used  // interactiveWidget: 'resizes-visual',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
