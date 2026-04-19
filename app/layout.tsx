import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";

import Header from "@/components/Header/Header";
import Providers from "./providers";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter-next",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://traveltrucks.vercel.app",
  ),
  title: {
    default: "TravelTrucks — Campers of your dreams",
    template: "%s | TravelTrucks",
  },
  description:
    "Rent a camper van and hit the road. Browse the TravelTrucks catalog and book your next adventure.",
  keywords: [
    "camper rental",
    "campervan",
    "travel",
    "TravelTrucks",
    "road trip",
  ],
  openGraph: {
    type: "website",
    siteName: "TravelTrucks",
    title: "TravelTrucks — Campers of your dreams",
    description:
      "Rent a camper van and hit the road. Browse the TravelTrucks catalog and book your next adventure.",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Providers>
          <Header />
          <main>{children}</main>
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                fontFamily:
                  'var(--font-inter-next), "Inter", system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
                fontSize: "16px",
                lineHeight: "24px",
              },
              success: {
                iconTheme: {
                  primary: "#829b91",
                  secondary: "#fff",
                },
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
