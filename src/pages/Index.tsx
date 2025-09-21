import { useState } from "react";
import { Navigation } from "@/components/ui/navigation";
import { HeroSection } from "@/components/ui/hero-section";
import { BookingCalendar } from "@/components/ui/booking-calendar";
import { UnifiedBooking } from "@/components/ui/unified-booking";
import { BookingWizard } from "@/components/ui/booking-wizard";
import { CustomerArea } from "@/components/ui/customer-area";
import { UserProfile } from "@/components/ui/user-profile";
import { PackagesDiscounts } from "@/components/ui/packages-discounts";
import { AdminDashboard } from "@/components/ui/admin-dashboard";
import { ServiceDashboard } from "./ServiceDashboard";
import { useUser } from '@clerk/clerk-react';

const Index = () => {
  const { isSignedIn, user } = useUser();
  const [showBookingWizard, setShowBookingWizard] = useState(false);
  const [showCustomerArea, setShowCustomerArea] = useState(false);
  const [currentView, setCurrentView] = useState<'dashboard' | 'profile' | 'packages' | 'admin'>('dashboard');
  const [showDashboard, setShowDashboard] = useState(false);

  const handleNavigationClick = (view: 'dashboard' | 'profile' | 'packages' | 'admin') => {
    setCurrentView(view);
  };

  const renderUserContent = () => {
    if (!showDashboard) {
      return (
        <main style={{ maxWidth: '1200px', margin: '3rem auto', padding: '2rem 1rem' }}>
          <UnifiedBooking onComplete={() => setShowDashboard(true)} />
        </main>
      );
    }

    switch (currentView) {
      case 'profile':
        return <UserProfile />;
      case 'packages':
        return <PackagesDiscounts />;
      case 'admin':
        return user?.publicMetadata?.role === 'admin' ? <AdminDashboard /> : <ServiceDashboard />;
      default:
        return <ServiceDashboard />;
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: 'Inter, Archivo, sans-serif', color: '#18181B' }}>
      <Navigation
        onBookNowClick={() => setShowBookingWizard(true)}
        onNavigationClick={handleNavigationClick}
        currentView={currentView}
      />
      {!isSignedIn && (
        <HeroSection onBookNowClick={() => setShowBookingWizard(true)} />
      )}
      {isSignedIn && renderUserContent()}
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
