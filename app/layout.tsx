import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { ThemeProvider } from "@/components/ui/theme-provider";
import Footer from "@/components/footer";
import { AuthProvider } from "./context/auth-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Master Skills Online with Free & Curated Video Courses",
  description:
    "Discover high-quality video courses across tech, business, design & more — curated from YouTube, ad-free, and ready to learn at your own pace.",
  keywords: [
    "free online courses",
    "curated video courses",
    "creative commons learning",
    "skill development 2025",
    "youtube course platform",
    "learn new skills",
    "online learning",
    "ad-free education",
    "self-paced courses",
    "tech courses",
    "design tutorials",
    "business training online",
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
            <main className="flex-1">
              <Navbar />
              {children}
              <Footer />
            </main>
          </ThemeProvider>
        </body>
      </html>
    </AuthProvider>
  );
}
