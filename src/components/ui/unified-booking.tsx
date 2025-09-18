import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ChevronRight, Package, Timer } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Package {
  id: string;
  name: string;
  duration: number;
  price: number;
  originalPrice?: number;
  description: string;
  features: string[];
  popular?: boolean;
}

interface TimeSlot {
  time: string;
  status: 'available' | 'busy' | 'almost-full';
}

const packages: Package[] = [
  {
    id: 'basic',
    name: 'Basic Wash',
    duration: 20,
    price: 15,
    description: 'Essential exterior wash',
    features: ['Exterior wash', 'Wheel cleaning', 'Basic dry']
  },
  {
    id: 'premium',
    name: 'Premium Wash',
    duration: 30,
    price: 26,
    originalPrice: 30,
    description: 'Complete interior & exterior',
    features: ['Exterior & interior', 'Wheel cleaning', 'Wax protection', 'Vacuum'],
    popular: true
  },
  {
    id: 'deluxe',
    name: 'Deluxe Detail',
    duration: 45,
    price: 40,
    description: 'Full detailing service',
    features: ['Complete detail', 'Paint protection', 'Interior deep clean', 'Premium wax']
  }
];

const timeSlots: TimeSlot[] = [
  { time: '09:00', status: 'available' },
  { time: '09:40', status: 'available' },
  { time: '10:20', status: 'almost-full' },
  { time: '11:00', status: 'available' },
  { time: '11:40', status: 'busy' },
  { time: '12:20', status: 'available' }
];

export const UnifiedBooking = ({ onComplete }: { onComplete?: (booking: any) => void }) => {
  const [selectedPackage, setSelectedPackage] = useState<string>('premium');
  const [selectedTime, setSelectedTime] = useState<string>('');
  
  const handleBooking = () => {
    if (selectedPackage && selectedTime) {
      const booking = {
        package: packages.find(p => p.id === selectedPackage),
        time: selectedTime
      };
      onComplete?.(booking);
    }
  };

  const selectedPkg = packages.find(p => p.id === selectedPackage);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">Choose Your Package & Time</h2>
        <p className="text-muted-foreground">Select your preferred wash package and available time slot</p>
      </div>

      {/* Package Selection */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Package className="w-5 h-5 text-primary" />
          Select Package
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {packages.map((pkg) => (
            <Card 
              key={pkg.id}
              className={`cursor-pointer transition-all duration-300 hover:shadow-elegant ${
                selectedPackage === pkg.id 
                  ? 'ring-2 ring-primary bg-primary/5' 
                  : 'hover:bg-muted/30'
              } ${pkg.popular ? 'border-[3px] border-[#ffb700]' : 'border border-transparent'} ${pkg.popular ? '' : ''}`}
              onClick={() => setSelectedPackage(pkg.id)}
            >
              <CardContent className="p-4 relative">
                {pkg.popular && (
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                    <span className="bg-[#ffb700] text-accent text-xs px-3 py-1 rounded-full font-medium border border-[#ffb700]">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="text-center space-y-3">
                  <h4 className="font-semibold text-foreground">{pkg.name}</h4>
                  <div>
                    {pkg.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        €{pkg.originalPrice}
                      </span>
                    )}
                    <div className="text-2xl font-bold text-accent">€{pkg.price}</div>
                    <div className="text-sm text-muted-foreground">{pkg.duration} minutes</div>
                  </div>
                  <p className="text-sm text-muted-foreground">{pkg.description}</p>
                  <ul className="text-xs space-y-1">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="text-muted-foreground">• {feature}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Time Selection */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary" />
          Available Times Today
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {timeSlots.map((slot) => (
            <Button 
              key={slot.time}
              variant={selectedTime === slot.time ? "default" : "outline"}
              size="sm"
              disabled={slot.status === 'busy'}
              className={`h-12 flex flex-col ${
                slot.status === 'almost-full' ? 'border-warning text-warning' : ''
              } ${selectedTime === slot.time ? 'shadow-button' : ''}`}
              onClick={() => setSelectedTime(slot.time)}
            >
              <span className="font-medium">{slot.time}</span>
              <span className="text-xs opacity-70">
                {slot.status === 'busy' ? 'Full' : 
                 slot.status === 'almost-full' ? '1 left' : 'Open'}
              </span>
            </Button>
          ))}
        </div>
      </div>

      {/* Summary & Book Button */}
      {selectedPackage && selectedTime && (
        <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="space-y-2">
                <h4 className="text-lg font-semibold text-foreground">Booking Summary</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-primary" />
                    <span>{selectedPkg?.name} - {selectedPkg?.duration} minutes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Timer className="w-4 h-4 text-primary" />
                    <span>Today at {selectedTime}</span>
                  </div>
                  <div className="text-lg font-bold text-primary">
                    Total: €{selectedPkg?.price}
                  </div>
                </div>
              </div>
              <Button 
                size="lg" 
                className="shadow-button group w-full md:w-auto"
                onClick={handleBooking}
              >
                <Calendar className="w-5 h-5 mr-2" />
                Book Now
                <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};