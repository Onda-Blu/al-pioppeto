import { useState } from "react";
import { Navigation } from "@/components/ui/navigation";
import { HeroSection } from "@/components/ui/hero-section";
import { BookingCalendar } from "@/components/ui/booking-calendar";
import { UnifiedBooking } from "@/components/ui/unified-booking";
import { BookingWizard } from "@/components/ui/booking-wizard";
import { CustomerArea } from "@/components/ui/customer-area";

const Index = () => {
  const [showBookingWizard, setShowBookingWizard] = useState(false);
  const [showCustomerArea, setShowCustomerArea] = useState(false);

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: 'Inter, Archivo, sans-serif', color: '#18181B' }}>
      <Navigation
        onLoginClick={() => setShowCustomerArea(true)}
        onBookNowClick={() => setShowBookingWizard(true)}
      />
      <HeroSection onBookNowClick={() => setShowBookingWizard(true)} />

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
        <UnifiedBooking onComplete={(booking) => console.log('Booking:', booking)} />
      </main>
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
