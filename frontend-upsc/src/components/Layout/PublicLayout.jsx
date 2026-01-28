import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footer";
import AIStudentDashboardBanner from "../AIStudentDashboardBanner";
import WatsupWidget from "../../../src/pages/public/components/WatsupWidget";
import EnquiryWidget from "../../pages/public/EnquiryWidget";
import MessageDisplay from "../utility/MessageDisplay";
import ContactForm from "../../../src/pages/public/components/Form";
import SEOHead from "../SEO/SEOHead";

export default function PublicLayout({
  children,
  showNavbar = true,
  showFooter = true,
}) {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const location = useLocation();

  useEffect(() => {
    // Only show popup on the home page
    if (location.pathname === "/") {
      setIsFormOpen(false);
      const timerId = setTimeout(() => setIsFormOpen(true), 5000);
      return () => clearTimeout(timerId);
    } else {
      setIsFormOpen(false);
    }
  }, [location.pathname, showNavbar]);

  // Scroll to top when route changes
  useEffect(() => {
    // Use requestAnimationFrame to ensure DOM is ready
    const scrollToTop = () => {
      requestAnimationFrame(() => {
        // Method 1: Direct scroll
        window.scrollTo(0, 0);
        
        // Method 2: Document element scroll
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        
        // Method 3: Additional scroll after content loads
        setTimeout(() => {
          window.scrollTo(0, 0);
          document.documentElement.scrollTop = 0;
          document.body.scrollTop = 0;
        }, 100);
      });
    };
    
    scrollToTop();
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-white">
      <SEOHead pathname={location.pathname} />
      <MessageDisplay />

      {/* AI Student Dashboard Announcement Banner - Above Navbar */}
      {showNavbar && location.pathname === "/" && <AIStudentDashboardBanner />}

      {/* Top Navbar */}
      {showNavbar && <Navbar />}

      

      {/* Page Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      {showFooter && <Footer />}

      {/* WhatsApp Widget - visible on all public pages */}
      <WatsupWidget />

      {/* Enquiry Widget - visible on all public pages, vertically centered on right side */}
      <EnquiryWidget onClick={() => setIsFormOpen(true)} />

      {/* Contact Form Modal - opened from widget or delayed popup */}
      {isFormOpen && (
        <ContactForm onClose={() => setIsFormOpen(false)} />
      )}
    </div>
  );
}
