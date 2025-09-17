import { Button } from "@/components/ui/button";
import { Calendar, Clock, Star, ChevronRight } from "lucide-react";
import heroImage from "@/assets/red-lamborghini-hero.jpg";
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
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden" style={{ marginLeft: 0 }}>
      {/* Background Image */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <img 
          src={heroImage} 
          alt="Professional car wash service"
          className="w-full h-full object-cover"
          style={{ left: 0, position: 'absolute', width: '100vw', height: '100%', objectFit: 'cover' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-white/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full border border-primary/20 mb-6" style={{ background: 'rgba(172,31,50,0.08)' }}>
            <Star className="w-4 h-4 text-primary mr-2" />
            <span className="text-sm font-medium text-primary" style={{ fontFamily: 'Archivo, Inter, sans-serif' }}>Premium Car Wash Service</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight" style={{ fontFamily: 'Archivo, Inter, sans-serif', color: '#18181B' }}>
            Professional Car Wash
            <span className="block text-primary" style={{ fontFamily: 'Archivo, Inter, sans-serif' }}>
              With Smart Booking
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl mb-8 max-w-2xl mx-auto leading-relaxed" style={{ color: '#18181B', fontFamily: 'Inter, Archivo, sans-serif', opacity: 0.85 }}>
            Experience premium car wash services with intelligent license plate recognition, automated time tracking, and seamless online payments. Enjoy exclusive package deals and instant booking.
          </p>

          {/* Stats & Features */}
          <div className="flex flex-wrap justify-center gap-8 mb-10">
            <div className="text-center">
              <div className="text-2xl font-bold" style={{ color: '#AC1F32', fontFamily: 'Archivo, Inter, sans-serif' }}>20 min</div>
              <div className="text-sm" style={{ color: '#18181B', opacity: 0.7 }}>Wash Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold" style={{ color: '#AC1F32', fontFamily: 'Archivo, Inter, sans-serif' }}>€30</div>
              <div className="text-sm" style={{ color: '#18181B', opacity: 0.7 }}>Starting Price</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold" style={{ color: '#AC1F32', fontFamily: 'Archivo, Inter, sans-serif' }}>3 slots</div>
              <div className="text-sm" style={{ color: '#18181B', opacity: 0.7 }}>Per Hour</div>
            </div>
          </div>

          {/* CTA Buttons + New Features */}
          <div className="flex flex-col items-center justify-center gap-2 mt-8">
            {/* Package Deal and Timer Above Buttons */}
            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-2">
              <div className="text-right">
                <span className="text-3xl font-bold text-foreground" style={{ fontFamily: 'Archivo, Inter, sans-serif' }}>-€{packageDeal.pricePerWash}/wash</span>
                <div className="text-lg text-primary" style={{ fontFamily: 'Archivo, Inter, sans-serif' }}>Save €{packageDeal.savings} for {packageDeal.washes} car washes</div>
              </div>
              <div className="text-left">
                <span className="text-3xl font-bold flex items-center justify-left gap-2 text-foreground" style={{ fontFamily: 'Archivo, Inter, sans-serif' }}>
                  <Clock className="w-8 h-8 text-foreground" />
                  {minutes}:{seconds.toString().padStart(2, '0')}
                </span>
                <div className="text-lg text-primary" style={{ fontFamily: 'Archivo, Inter, sans-serif' }}>Next Available Slot at {nextSlot}</div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button size="lg" className="shadow-button group" onClick={onBookNowClick}>
                <Calendar className="w-5 h-5 mr-2" />
                Book Now
                <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg" className="shadow-button group" style={{ borderColor: '#AC1F32', color: '#AC1F32' }}>
                <Clock className="w-5 h-5 mr-2" />
                View Schedule
              </Button>
            </div>
          </div>

          {/* Features */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="flex items-center justify-center space-x-2 text-muted-foreground">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span className="text-sm">License Plate Recognition</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-muted-foreground">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span className="text-sm">Automatic Time Tracking</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-muted-foreground">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span className="text-sm">Contactless Payment</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};