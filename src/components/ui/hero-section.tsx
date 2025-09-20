import { Button } from "@/components/ui/button";
import { Calendar, Clock, Star, ChevronRight, Scan, Timer, CreditCard } from "lucide-react";
import heroImage from "@/assets/carwash-hero.jpg";
import React from "react";
import { useUser, SignIn, SignUp, UserButton, useClerk } from '@clerk/clerk-react';
export const HeroSection = ({ onBookNowClick }: { onBookNowClick?: () => void }) => {
  const [showSignUp, setShowSignUp] = React.useState(false);
  const clerk = useClerk();
  // Find the closest available slot (mock logic)
  const now = new Date();
  const slots = ["09:00", "09:40", "10:00", "10:40"];
  // Assume next slot is always 10 minutes from now for demo
  const nextSlot = slots[0];
  const [timer, setTimer] = React.useState(600); // 10 min in seconds
  React.useEffect(() => {
    const interval = setInterval(() => {
      setTimer((t) => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;
  const { isSignedIn } = useUser();

  // Package deal info
  const packageDeal = {
    pricePerWash: 26,
    savings: 40,
    washes: 10,
  };

  const handleOpenSignIn = () => {
    clerk.openSignIn();
  };

  return (
    <section className="relative min-h-screen w-full flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <img 
          src={heroImage} 
          alt="Professional car wash service with Al Pioppeto"
          className="w-full h-full object-cover"
          style={{ left: 0, position: 'absolute', width: '100vw', height: '100%', objectFit: 'cover' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/85 via-white/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="max-w-6xl">
          
          {/* Mobile Layout */}
          <div className="lg:hidden">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full border border-accent/20 mb-4 bg-accent/5">
              <Star className="w-4 h-4 text-accent mr-2" />
              <span className="text-sm font-medium text-accent">Premium Car Wash Service</span>
            </div>

            {/* Main Heading - Smaller on Mobile */}
            <h1 className="text-2xl sm:text-3xl font-bold mb-6 leading-tight text-foreground">
              Professional Car Wash
              <span className="block text-accent">
                With Smart Booking
              </span>
            </h1>

            {/* Package Deal & Timer - Top on Mobile */}
            <div className="mb-6 w-full max-w-sm mx-auto">
              {isSignedIn ? (
                <UserButton afterSignOutUrl="/al-pioppeto/" />
              ) : (
                <SignIn afterSignInUrl="/al-pioppeto/" />
              )}
            </div>

            {/* Book Now Button - Prominent */}
            <div className="mb-6">
              <Button
                size="lg"
                className="w-full shadow-button group"
                onClick={!isSignedIn ? handleOpenSignIn : onBookNowClick}
              >
                <Calendar className="w-5 h-5 mr-2" />
                Book Now
                <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            {/* Subtitle */}
            <p className="text-base mb-6 leading-relaxed text-muted-foreground">
              Experience premium car wash services with intelligent license plate recognition, automated time tracking, and seamless online payments.
            </p>

            {/* Features with Better Icons */}
            <div className="grid grid-cols-1 gap-3 mb-6">
              <div className="flex items-center space-x-3 bg-white/60 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/20">
                <div className="flex items-center justify-center w-10 h-10 bg-accent/10 rounded-full">
                  <Scan className="w-5 h-5 text-accent" />
                </div>
                <span className="text-sm font-medium text-foreground">License Plate Recognition</span>
              </div>
              <div className="flex items-center space-x-3 bg-white/60 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/20">
                <div className="flex items-center justify-center w-10 h-10 bg-accent/10 rounded-full">
                  <Timer className="w-5 h-5 text-accent" />
                </div>
                <span className="text-sm font-medium text-foreground">Automatic Time Tracking</span>
              </div>
              <div className="flex items-center space-x-3 bg-white/60 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/20">
                <div className="flex items-center justify-center w-10 h-10 bg-accent/10 rounded-full">
                  <CreditCard className="w-5 h-5 text-accent" />
                </div>
                <span className="text-sm font-medium text-foreground">Contactless Payment</span>
              </div>
            </div>

            {/* View Schedule Button */}
            <div className="mb-6">
              <Button
                variant="outline"
                size="lg"
                className="w-full shadow-button group border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                onClick={!isSignedIn ? handleOpenSignIn : undefined}
              >
                <Clock className="w-5 h-5 mr-2" />
                View Schedule
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center bg-white/60 backdrop-blur-sm rounded-lg p-3">
                <div className="text-lg font-bold text-accent">20</div>
                <div className="text-xs text-muted-foreground">min wash</div>
              </div>
              <div className="text-center bg-white/60 backdrop-blur-sm rounded-lg p-3">
                <div className="text-lg font-bold text-accent">€30</div>
                <div className="text-xs text-muted-foreground">starting</div>
              </div>
              <div className="text-center bg-white/60 backdrop-blur-sm rounded-lg p-3">
                <div className="text-lg font-bold text-accent">3</div>
                <div className="text-xs text-muted-foreground">slots/hour</div>
              </div>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Column - Main Content */}
            <div className="text-left">
              {/* Badge */}
              <div className="inline-flex items-center px-4 py-2 rounded-full border border-accent/20 mb-4 bg-accent/5">
                <Star className="w-4 h-4 text-accent mr-2" />
                <span className="text-sm font-medium text-accent">Premium Car Wash Service</span>
              </div>

              {/* Main Heading - Smaller */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight text-foreground">
                Professional Car Wash
                <span className="block text-accent">
                  With Smart Booking
                </span>
              </h1>

              {/* Subtitle - Smaller */}
              <p className="text-lg mb-6 max-w-xl leading-relaxed text-muted-foreground">
                Experience premium car wash services with intelligent license plate recognition, automated time tracking, and seamless online payments.
              </p>

              {/* Features with Better Icons */}
              <div className="grid grid-cols-1 gap-4 mb-8 max-w-lg">
                <div className="flex items-center space-x-3 bg-white/60 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/20">
                  <div className="flex items-center justify-center w-10 h-10 bg-accent/10 rounded-full">
                    <Scan className="w-5 h-5 text-accent" />
                  </div>
                  <span className="text-sm font-medium text-foreground">License Plate Recognition</span>
                </div>
                <div className="flex items-center space-x-3 bg-white/60 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/20">
                  <div className="flex items-center justify-center w-10 h-10 bg-accent/10 rounded-full">
                    <Timer className="w-5 h-5 text-accent" />
                  </div>
                  <span className="text-sm font-medium text-foreground">Automatic Time Tracking</span>
                </div>
                <div className="flex items-center space-x-3 bg-white/60 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/20">
                  <div className="flex items-center justify-center w-10 h-10 bg-accent/10 rounded-full">
                    <CreditCard className="w-5 h-5 text-accent" />
                  </div>
                  <span className="text-sm font-medium text-foreground">Contactless Payment</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="shadow-button group"
                  style={{ background: '#ffb700', color: '#222' }}
                  onClick={!isSignedIn ? handleOpenSignIn : onBookNowClick}
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Book Now
                  <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="shadow-button group border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                  onClick={!isSignedIn ? handleOpenSignIn : undefined}
                >
                  <Clock className="w-5 h-5 mr-2" />
                  View Schedule
                </Button>
              </div>
            </div>

            {/* Right Column - Clerk Login Area */}
            <div className="flex flex-col items-center justify-center lg:items-end">
              <div className="w-full max-w-sm">
                {isSignedIn ? (
                  <UserButton afterSignOutUrl="/al-pioppeto/" />
                ) : (
                  <SignIn afterSignInUrl="/al-pioppeto/" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};