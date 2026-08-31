import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import CookieConsent from "@/components/CookieConsent";
import LeadPopup from "@/components/LeadPopup";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import type { ReactNode } from "react";
import { ContactModalProvider } from "@/components/contact/ContactModalContext";
import ContactModal from "@/components/contact/ContactModal";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <ContactModalProvider>
      <div className="flex min-h-full flex-col">
        <ScrollProgressBar />
        <Header />
        <main className="flex-1 pt-[4.75rem] sm:pt-20">{children}</main>
        <Footer />
        <WhatsAppButton />
        <CookieConsent />
        <ContactModal />
        <LeadPopup />
      </div>
    </ContactModalProvider>
  );
}
