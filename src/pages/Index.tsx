import { useState } from "react";
import { Navigation } from "@/components/ui/navigation";
import { HeroSection } from "@/components/ui/hero-section";
import { BookingCalendar } from "@/components/ui/booking-calendar";
import { PackageSelection } from "@/components/ui/package-selection";
import { BookingWizard } from "@/components/ui/booking-wizard";
import { CustomerArea } from "@/components/ui/customer-area";

const Index = () => {
  const [showBookingWizard, setShowBookingWizard] = useState(false);
  const [showCustomerArea, setShowCustomerArea] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navigation 
        onLoginClick={() => setShowCustomerArea(true)}
        onBookNowClick={() => setShowBookingWizard(true)}
      />
      <HeroSection onBookNowClick={() => setShowBookingWizard(true)} />
      <BookingCalendar />
      <PackageSelection />
      
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
