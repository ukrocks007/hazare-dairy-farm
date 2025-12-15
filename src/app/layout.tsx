import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "Hazare Dairy Farm - Pure Fresh Milk & Dairy Products",
  description: "Farm-fresh milk, curd, paneer and ghee delivered to your doorstep daily. Subscribe for purity and health.",
  icons: {
    icon: "/hazare.ico",
    shortcut: "/hazare.ico",
    apple: "/hazare.ico",
  },
  openGraph: {
    title: "Hazare Dairy Farm - Pure Fresh Milk & Dairy Products",
    description:
      "Farm-fresh milk, curd, paneer and ghee delivered to your doorstep daily.",
    images: [
      {
        url: "/android-chrome-512x512.png",
        width: 1200,
        height: 630,
        alt: "Hazare Dairy Farm"
      }
    ],
    siteName: "Hazare Dairy Farm",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hazare Dairy Farm - Pure Fresh Milk & Dairy Products",
    images: ["/android-chrome-512x512.png"]
  },
  abstract: "Hazare Dairy Farm - Pure Fresh Milk & Dairy Products",
  keywords: [
    "Hazare Dairy Farm",
    "Fresh Milk Delivery",
    "Dairy Products",
    "Organic Milk",
    "Farm Fresh Milk",
    "Milk Subscriptions",
    "Bulk Milk Orders",
    "Curd",
    "Paneer",
    "Ghee",
    "Healthy Dairy",
    "Local Dairy Farm",
    "Natural Milk",
    "Daily Milk Delivery",
    "Pure Milk",
  ],
  applicationName: "Hazare Dairy Farm",
  classification: "Dairy Products and Services",
  creator: "Hazare Dairy Farm",
  publisher: "Hazare Dairy Farm",
  category: "E-commerce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="beforeInteractive"
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/hazare.ico" />
        <link rel="apple-touch-icon" href="/android-chrome-192x192.png" />
        <meta property="og:image" content="/android-chrome-512x512.png" />
        <meta property="og:image:alt" content="Hazare Dairy Farm logo and tagline" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="/android-chrome-512x512.png" />
      </head>
      <body
        className="font-sans antialiased"
      >
        <Providers>
          {children}
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
