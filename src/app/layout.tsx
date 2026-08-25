import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import "./globals.css";

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["hebrew", "latin"],
});

export const metadata: Metadata = {
  title: "AutoSmart - אוטומציה עסקית לעסקים קטנים ובינוניים",
  description:
    "AutoSmart מסייעת לעסקים קטנים ובינוניים לחסוך זמן ולשפר תהליכים באמצעות אוטומציה חכמה.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="he" dir="rtl" className={`${rubik.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <ScrollProgressBar />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
