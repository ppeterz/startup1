import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Analytics from "@/components/analytics";
import { Toaster } from "@/components/ui/toaster";
import { FirebaseClientProvider } from "@/firebase";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: {
    template: "%s | CompetitorLens",
    default: "CompetitorLens - Get Your Free AI-Powered Competitor Analysis",
  },
  description:
    "Join the waitlist for CompetitorLens and get ahead of the curve. Our AI analyzes your competitors' websites to reveal their tech stack, key features, and actionable insights.",
  openGraph: {
    title: "CompetitorLens - AI-Powered Competitor Analysis",
    description: "Uncover your competitors' secrets. Join the waitlist for early access.",
    url: "https://your-domain.com", // Replace with your actual domain
    siteName: "CompetitorLens",
    images: [
      {
        url: "/og-image.png", // Replace with your actual OG image path
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CompetitorLens - AI-Powered Competitor Analysis",
    description: "Uncover your competitors' secrets. Join the waitlist for early access.",
    // creator: "@your-twitter-handle", // Replace with your Twitter handle
    images: ["/twitter-image.png"], // Replace with your actual Twitter image path
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={cn(
          "font-body antialiased",
          poppins.variable
        )}
      >
        <FirebaseClientProvider>
          {children}
          <Toaster />
          <Analytics />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
