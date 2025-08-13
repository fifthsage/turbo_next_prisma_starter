import type { Metadata, Viewport } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { GA_TRACKING_ID } from "@repo/common";
import localFont from "next/font/local";
import "./globals.css";
import Script from "next/script";
import Providers from "../providers";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

const title = "모빌리티플러스";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_URL || "https://ev-cpo-platform-web.vercel.app",
  ),
  title,
  description: ["가장 쉬운 전기차 충전기 찾기!"].join(","),
  keywords: ["전기차 충전", "전기차 충전소"],
  openGraph: {
    type: "website",
    description:
      "가장 쉬운 전기차 충전기 찾기! 전기차 충전소를 빠르고 편리하게 찾아보세요.",
    locale: "ko_KR",
    // images: `${process.env.NEXT_PUBLIC_STATIC_URL}/statics/images/assets/og-image.png`,
    url: "https://ev-cpo-platform-web.vercel.app",
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
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <Script
        type="text/javascript"
        src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}&submodules=geocoder`}
      />
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AppRouterCacheProvider>
          <Providers>{children}</Providers>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
