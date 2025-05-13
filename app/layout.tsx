import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { AuthProvider } from "./context/auth-provider";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ClipCourse – Structured Video Courses from CC Content",
  description:
    "ClipCourse offers curated online courses built from Creative Commons YouTube videos. Pay once and learn with structured, legal, high-quality content.",
  keywords: [
    "Creative Commons courses",
    "paid online courses",
    "curated YouTube lessons",
    "structured video learning",
    "CC video education",
    "ClipCourse",
    "legal video courses",
    "reusable content courses",
    "learn with YouTube",
    "premium learning paths",
  ],
  openGraph: {
    title: "Master Skills Online with Free & Curated Video Courses",
    description:
      "Discover high-quality video courses across tech, business, design & more — curated from YouTube, ad-free, and ready to learn at your own pace.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased relative min-h-screen flex flex-col`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <main className="flex-1">{children}</main>
          </ThemeProvider>
        </body>
      </html>
    </AuthProvider>
  );
}
