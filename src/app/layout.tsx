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
