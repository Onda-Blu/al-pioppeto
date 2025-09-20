import { useState } from "react";
import { Navigation } from "@/components/ui/navigation";
import { HeroSection } from "@/components/ui/hero-section";
import { BookingCalendar } from "@/components/ui/booking-calendar";
import { UnifiedBooking } from "@/components/ui/unified-booking";
import { BookingWizard } from "@/components/ui/booking-wizard";
import { CustomerArea } from "@/components/ui/customer-area";
import { ServiceDashboard } from "./ServiceDashboard";
import { useUser } from '@clerk/clerk-react';

const Index = () => {
  const { isSignedIn } = useUser();
  const [showBookingWizard, setShowBookingWizard] = useState(false);
  const [showCustomerArea, setShowCustomerArea] = useState(false);

  const [showDashboard, setShowDashboard] = useState(false);

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: 'Inter, Archivo, sans-serif', color: '#18181B' }}>
      <Navigation
        onBookNowClick={() => setShowBookingWizard(true)}
      />
      {!isSignedIn && (
        <HeroSection onBookNowClick={() => setShowBookingWizard(true)} />
      )}
      {isSignedIn && !showDashboard && (
        <main style={{ maxWidth: '1200px', margin: '3rem auto', padding: '2rem 1rem' }}>
          <UnifiedBooking onComplete={() => setShowDashboard(true)} />
        </main>
      )}
      {isSignedIn && showDashboard && (
        <ServiceDashboard />
      )}
      {showBookingWizard && (
        <BookingWizard onClose={() => setShowBookingWizard(false)} />
      )}
      {showCustomerArea && (
        <CustomerArea onClose={() => setShowCustomerArea(false)} />
      )}
    </div>
  );
};

export default Index;
