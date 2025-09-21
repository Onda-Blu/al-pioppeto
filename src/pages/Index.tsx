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
  const [currentView, setCurrentView] = useState<'dashboard' | 'profile' | 'packages' | 'admin' | 'booking'>('booking');
  const [showDashboard, setShowDashboard] = useState(false);

  const handleNavigationClick = (view: 'dashboard' | 'profile' | 'packages' | 'admin' | 'booking') => {
    setCurrentView(view);
  };

  const renderUserContent = () => {
    switch (currentView) {
      case 'profile':
        return <UserProfile />;
      case 'packages':
        return <PackagesDiscounts />;
      case 'admin':
        return user?.publicMetadata?.role === 'admin' ? <AdminDashboard /> : <ServiceDashboard />;
      case 'booking':
        return <UnifiedBooking />;
      default:
        return <ServiceDashboard />;
    }
  };

  return (
  <div style={{ minHeight: '100vh', background: '#fff', fontFamily: 'Inter, Archivo, sans-serif', color: '#18181B', marginTop: '3rem' }}>
      <Navigation
        onBookNowClick={() => setShowBookingWizard(true)}
        onNavigationClick={handleNavigationClick}
        currentView={currentView}
        showAdminTab={user?.publicMetadata?.role !== 'admin'}
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
