import React, { useState, useEffect } from 'react';
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

const SLOT_DURATION = 20; // minutes
const CALENDAR_API_URL = 'https://al-pioppeto-calendar-production.up.railway.app/api/calendar'; // Replace with your deployed service URL
const CALENDAR_ID = '07b3067fce6c958cd2ce7b642da7e5f65ccb43ae4b933e5757e52facc5c958b2@group.calendar.google.com'; // Replace with your calendar ID

function getTimeSlots(date: Date, busyPeriods: {start: string, end: string}[]) {
  const slots: TimeSlot[] = [];
  let current = new Date(date);
  current.setHours(9, 0, 0, 0); // Start at 09:00
  const end = new Date(date);
  end.setHours(18, 0, 0, 0); // End at 18:00

  while (current < end) {
    const slotStart = new Date(current);
    const slotEnd = new Date(current);
    slotEnd.setMinutes(slotEnd.getMinutes() + SLOT_DURATION);

    // Check if slot overlaps with any busy period
    const isBusy = busyPeriods.some(period => {
      const busyStart = new Date(period.start);
      const busyEnd = new Date(period.end);
      return slotStart < busyEnd && slotEnd > busyStart;
    });

    slots.push({
      time: slotStart.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
      status: isBusy ? 'busy' : 'available'
    });

    current.setMinutes(current.getMinutes() + SLOT_DURATION);
  }
  return slots;
}

export const UnifiedBooking = ({ onComplete }: { onComplete?: (booking: any) => void }) => {
  const [selectedPackage, setSelectedPackage] = useState<string>('premium');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [errorSlots, setErrorSlots] = useState<string | null>(null);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState<string | null>(null);

  const selectedPkg = packages.find(p => p.id === selectedPackage);

  useEffect(() => {
    async function fetchSlots() {
      setLoadingSlots(true);
      setErrorSlots(null);
      try {
        const today = new Date();
        const dateStr = today.toISOString().split('T')[0];
        const res = await fetch(`${CALENDAR_API_URL}/slots?date=${dateStr}`);
        if (!res.ok) throw new Error('Failed to fetch slots');
        const data = await res.json();
        // Parse busy periods from API response
        const busyPeriods = (data.calendars?.[CALENDAR_ID]?.busy || []).map((b: any) => ({
          start: b.start,
          end: b.end
        }));
        setTimeSlots(getTimeSlots(today, busyPeriods));
      } catch (err: any) {
        setErrorSlots(err.message || 'Error loading slots');
      } finally {
        setLoadingSlots(false);
      }
    }
    fetchSlots();
  }, []);

  const handleBooking = async () => {
    setBookingError(null);
    setBookingSuccess(null);
    setBookingLoading(true);
    try {
      if (selectedPackage && selectedTime && selectedPkg) {
        const today = new Date();
        const [hour, minute] = selectedTime.split(':');
        const start = new Date(today);
        start.setHours(Number(hour), Number(minute), 0, 0);
        const end = new Date(start);
        end.setMinutes(end.getMinutes() + selectedPkg.duration);

        const res = await fetch(`${CALENDAR_API_URL}/book`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            start: start.toISOString(),
            end: end.toISOString(),
            summary: selectedPkg.name,
            description: selectedPkg.description
          })
        });
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || 'Booking failed');
        }
        const result = await res.json();
        setBookingSuccess('Booking confirmed!');
        onComplete?.(result);
      }
    } catch (err: any) {
      setBookingError(err.message || 'Error booking slot');
    } finally {
      setBookingLoading(false);
    }
  };

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
        {loadingSlots ? (
          <div className="text-center text-muted-foreground">Loading available slots...</div>
        ) : errorSlots ? (
          <div className="text-center text-destructive">{errorSlots}</div>
        ) : (
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
        )}
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
                disabled={bookingLoading}
              >
                <Calendar className="w-5 h-5 mr-2" />
                {bookingLoading ? 'Booking...' : 'Book Now'}
                <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
            {bookingError && (
              <div className="text-destructive mt-2">{bookingError}</div>
            )}
            {bookingSuccess && (
              <div className="text-success mt-2">{bookingSuccess}</div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};