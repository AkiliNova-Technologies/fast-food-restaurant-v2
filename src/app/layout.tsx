import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";
import { VisitTracker } from "@/components/visit-tracker";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://fastbite.vercel.app"),
  title: {
    default: "FastBite Restaurant | Fresh Fast Food, Delivery & Online Orders",
    template: "%s | FastBite Restaurant",
  },
  description:
    "Order fresh burgers, pizza, chicken, sides, drinks, and limited-time offers from FastBite Restaurant. Fast online ordering, easy checkout, and reliable delivery.",
  keywords: [
    "fast food restaurant",
    "online food ordering",
    "burger delivery",
    "pizza delivery",
    "chicken meals",
    "restaurant menu",
    "food delivery Uganda",
  ],
  authors: [{ name: "FastBite Restaurant" }],
  creator: "FastBite Restaurant",
  publisher: "FastBite Restaurant",
  openGraph: {
    title: "FastBite Restaurant | Fresh Fast Food & Online Orders",
    description:
      "Explore our menu, discover fresh offers, and order your favorite meals online.",
    url: "https://fastbite.vercel.app",
    siteName: "FastBite Restaurant",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "FastBite Restaurant food menu and online ordering",
      },
    ],
    locale: "en_UG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FastBite Restaurant | Fresh Fast Food & Online Orders",
    description:
      "Order burgers, pizza, chicken, sides, drinks, and fresh restaurant offers online.",
    images: ["/og-image.jpg"],
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
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        inter.variable,
      )}
    >
      <body className="min-h-full flex flex-col">
        <TooltipProvider>
          <VisitTracker />
          {children}
        </TooltipProvider>
        <Toaster />
      </body>
    </html>
  );
}
