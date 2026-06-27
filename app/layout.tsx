import type { Metadata, Viewport } from "next";
import { Nunito, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SyntheticDataBanner from "@/components/SyntheticDataBanner";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";

// Display face — rounded, warm, friendly (headings + the wordmark).
const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
});
// Body face — humanist, highly readable for long-form resources.
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "MaKonnect — mentorship for the Makomborero family",
    template: "%s · MaKonnect",
  },
  description:
    "Hear from — and reach — someone who got where you're trying to go. A mentorship-first network for Makomborero alumni, students and staff.",
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#bac132",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${nunito.variable} ${jakarta.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <ServiceWorkerRegister />
        <SyntheticDataBanner />
        <SiteHeader />
        <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:py-10">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
