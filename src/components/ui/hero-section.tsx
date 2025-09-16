import { Button } from "@/components/ui/button";
import { Calendar, Clock, Star, ChevronRight } from "lucide-react";
import heroImage from "@/assets/red-lamborghini-hero.jpg";

export const HeroSection = ({ onBookNowClick }: { onBookNowClick?: () => void }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Professional car wash service"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-background/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Star className="w-4 h-4 text-primary mr-2" />
            <span className="text-sm font-medium text-primary">Premium Car Wash Service</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            Professional Car Wash
            <span className="block bg-gradient-primary bg-clip-text text-transparent">
              With Smart Booking
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Experience premium car wash services with intelligent license plate recognition, 
            automated time tracking, and seamless online payments.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-10">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">20 min</div>
              <div className="text-sm text-muted-foreground">Wash Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">€30</div>
              <div className="text-sm text-muted-foreground">Starting Price</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">3 slots</div>
              <div className="text-sm text-muted-foreground">Per Hour</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="shadow-button group" onClick={onBookNowClick}>
              <Calendar className="w-5 h-5 mr-2" />
              Book Now
              <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg" className="bg-background/50 backdrop-blur-sm">
              <Clock className="w-5 h-5 mr-2" />
              View Schedule
            </Button>
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