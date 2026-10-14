import type { Metadata } from "next";
import { Cookie, IBM_Plex_Serif, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const plexSerif = IBM_Plex_Serif({
  variable: "--font-plex-serif",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});
const cookie = Cookie({ variable: "--font-cookie", subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Smart Store UI",
  description: "Internal design refinements and UI experiments",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${plexSerif.variable} ${cookie.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
