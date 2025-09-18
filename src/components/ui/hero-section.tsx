import { Button } from "@/components/ui/button";
import { Calendar, Clock, Star, ChevronRight, Scan, Timer, CreditCard } from "lucide-react";
import heroImage from "@/assets/carwash-hero.jpg";
import React from "react";

export const HeroSection = ({ onBookNowClick }: { onBookNowClick?: () => void }) => {
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

  // Package deal info
  const packageDeal = {
    pricePerWash: 26,
    savings: 40,
    washes: 10,
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {/* Package Deal */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-elegant border border-accent/20 text-center">
                <div className="mb-3">
                  <div className="text-xs text-muted-foreground mb-1 line-through opacity-60">€30 per wash</div>
                  <div className="text-3xl font-bold text-accent mb-1">
                    €{packageDeal.pricePerWash}
                  </div>
                  <div className="text-sm font-medium text-foreground">per wash</div>
                </div>
                <div className="border-t border-accent/20 pt-3">
                  <div className="text-lg font-bold text-success mb-1">
                    Save €{packageDeal.savings}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    for {packageDeal.washes} car washes
                  </div>
                </div>
              </div>

              {/* Timer */}
              <div className="bg-gradient-to-br from-accent/90 to-accent backdrop-blur-sm rounded-2xl p-5 shadow-elegant text-center text-white">
                <div className="mb-2">
                  <div className="text-xs opacity-90 mb-1">Next Available</div>
                  <div className="text-xl font-bold mb-1">{nextSlot}</div>
                </div>
                <div className="border-t border-white/20 pt-3">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <Clock className="w-4 h-4" />
                    <span className="text-xl font-bold">
                      {minutes}:{seconds.toString().padStart(2, '0')}
                    </span>
                  </div>
                  <div className="text-xs opacity-90">
                    Reserve now
                  </div>
                </div>
              </div>
            </div>

            {/* Book Now Button - Prominent */}
            <div className="mb-6">
              <Button size="lg" className="w-full shadow-button group" onClick={onBookNowClick}>
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
              <Button variant="outline" size="lg" className="w-full shadow-button group border-accent text-accent hover:bg-accent hover:text-accent-foreground">
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
                <Button size="lg" className="shadow-button group" onClick={onBookNowClick}>
                  <Calendar className="w-5 h-5 mr-2" />
                  Book Now
                  <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button variant="outline" size="lg" className="shadow-button group border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                  <Clock className="w-5 h-5 mr-2" />
                  View Schedule
                </Button>
              </div>
            </div>

            {/* Right Column - Pricing & Timer (More Prominent) */}
            <div className="flex flex-col items-center justify-center lg:items-end">
              
              {/* Package Deal - More Visible */}
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-elegant mb-4 border border-accent/20 text-center max-w-sm w-full">
                <div className="mb-3">
                  <div className="text-xs text-muted-foreground mb-1 line-through opacity-60">€30 per wash</div>
                  <div className="text-4xl font-bold text-accent mb-1">
                    €{packageDeal.pricePerWash}
                  </div>
                  <div className="text-sm font-medium text-foreground">per wash</div>
                </div>
                <div className="border-t border-accent/20 pt-3">
                  <div className="text-lg font-bold text-success mb-1">
                    Save €{packageDeal.savings}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    for {packageDeal.washes} car washes
                  </div>
                </div>
              </div>

              {/* Timer - More Visible */}
              <div className="bg-gradient-to-br from-accent/90 to-accent backdrop-blur-sm rounded-2xl p-5 shadow-elegant text-center text-white max-w-sm w-full mb-4">
                <div className="mb-2">
                  <div className="text-xs opacity-90 mb-1">Next Available</div>
                  <div className="text-xl font-bold mb-1">{nextSlot}</div>
                </div>
                <div className="border-t border-white/20 pt-3">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <Clock className="w-5 h-5" />
                    <span className="text-2xl font-bold">
                      {minutes}:{seconds.toString().padStart(2, '0')}
                    </span>
                  </div>
                  <div className="text-xs opacity-90">
                    Reserve now
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-3 w-full max-w-sm">
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
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-accent/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-accent rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};