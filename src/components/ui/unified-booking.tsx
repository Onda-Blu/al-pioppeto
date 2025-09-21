import React, { useState, useEffect } from 'react';
import { Car } from "lucide-react";
const vehicleTypes = [
  { id: "regular", name: "Regular Size Car", price: 30, icon: <Car className="w-8 h-8" /> },
  { id: "medium", name: "Medium Size Car", price: 35, icon: <Car className="w-8 h-8" /> },
  { id: "suv", name: "Compact SUV", price: 40, icon: <Car className="w-8 h-8" /> },
  { id: "minivan", name: "Minivan", price: 45, icon: <Car className="w-8 h-8" /> },
  { id: "pickup", name: "Pickup Truck", price: 50, icon: <Car className="w-8 h-8" /> },
  { id: "cargo", name: "Cargo Truck", price: 60, icon: <Car className="w-8 h-8" /> }
];
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
  const [step, setStep] = useState(1);
  const [carType, setCarType] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const [carBrand, setCarBrand] = useState('');
  const [carModel, setCarModel] = useState('');
  const [personalName, setPersonalName] = useState('');
  const [personalEmail, setPersonalEmail] = useState('');
  const [personalPhone, setPersonalPhone] = useState('');
  const [selectedPackage, setSelectedPackage] = useState<string>('premium');
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
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
        const dateStr = selectedDate;
        const dateObj = new Date(dateStr);
        const res = await fetch(`${CALENDAR_API_URL}/slots?date=${dateStr}`);
        if (!res.ok) throw new Error('Failed to fetch slots');
        const data = await res.json();
        // Parse busy periods from API response
        const busyPeriods = (data.calendars?.[CALENDAR_ID]?.busy || []).map((b: any) => ({
          start: b.start,
          end: b.end
        }));
        setTimeSlots(getTimeSlots(dateObj, busyPeriods));
      } catch (err: any) {
        setErrorSlots(err.message || 'Error loading slots');
      } finally {
        setLoadingSlots(false);
      }
    }
    fetchSlots();
  }, [selectedDate]);

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
      {/* Progress Bar */}
      <div className="w-full h-2 bg-muted rounded-full overflow-hidden mb-8">
        <div
          className="h-full bg-[#ffb700] transition-all"
          style={{ width: `${(step - 1) * 33.33}%` }}
        />
      </div>

      {step === 1 && (
        <>
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
                  } ${pkg.popular && selectedPackage === pkg.id ? 'border-[3px] border-[#ffb700]' : 'border border-transparent'}`}
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
          {/* Date & Time Selection */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Select Date
            </h3>
            <input
              type="date"
              className="border rounded px-3 py-2 mb-2"
              value={selectedDate}
              min={new Date().toISOString().split('T')[0]}
              onChange={e => {
                setSelectedDate(e.target.value);
                setSelectedTime('');
              }}
            />
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Available Times
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
          {/* Summary & Book Now Button (with date) */}
          {selectedPackage && selectedTime && (
            <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20 mt-6">
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
                        <span>{selectedDate} at {selectedTime}</span>
                      </div>
                      <div className="text-lg font-bold text-primary">
                        Total: €{selectedPkg?.price}
                      </div>
                    </div>
                  </div>
                  <Button 
                    size="lg" 
                    className="shadow-button group w-full md:w-auto"
                    onClick={() => setStep(2)}
                  >
                    <Calendar className="w-5 h-5 mr-2" />
                    Book Now
                    <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}

      {step === 2 && (
        <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Car Details</h3>
            <div className="mb-6">
              <h4 className="text-base font-medium mb-2">Select Vehicle Type</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                {vehicleTypes.map((vehicle) => (
                  <Card 
                    key={vehicle.id}
                    className={`cursor-pointer transition-all ${
                      carType === vehicle.id 
                        ? 'border-primary bg-primary/10' 
                        : 'hover:border-primary/50'
                    }`}
                    onClick={() => setCarType(vehicle.id)}
                  >
                    <CardContent className="p-4 text-center">
                      <div className="flex justify-center mb-2 text-primary">
                        {vehicle.icon}
                      </div>
                      <h4 className="font-medium">{vehicle.name}</h4>
                      <p className="text-sm text-muted-foreground">+€{vehicle.price}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">License Plate</label>
                  <input type="text" className="w-full border rounded px-3 py-2" value={licensePlate} onChange={e => setLicensePlate(e.target.value)} placeholder="e.g. ABC123" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Car Brand</label>
                  <input type="text" className="w-full border rounded px-3 py-2" value={carBrand} onChange={e => setCarBrand(e.target.value)} placeholder="e.g. BMW" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Car Model</label>
                  <input type="text" className="w-full border rounded px-3 py-2" value={carModel} onChange={e => setCarModel(e.target.value)} placeholder="e.g. X5" />
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(1)}>
                Previous
              </Button>
              <Button className="bg-[#ffb700] text-black" onClick={() => setStep(3)}>
                Next
                <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 3 && (
        <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <input type="text" className="w-full border rounded px-3 py-2" value={personalName} onChange={e => setPersonalName(e.target.value)} placeholder="Your Name" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input type="email" className="w-full border rounded px-3 py-2" value={personalEmail} onChange={e => setPersonalEmail(e.target.value)} placeholder="you@email.com" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <input type="tel" className="w-full border rounded px-3 py-2" value={personalPhone} onChange={e => setPersonalPhone(e.target.value)} placeholder="+39 123 456 7890" />
              </div>
            </div>
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(2)}>
                Previous
              </Button>
              <Button className="bg-[#ffb700] text-black" onClick={() => setStep(4)}>
                Next
                <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 4 && (
        <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Payment & Confirmation</h3>
            <div className="mb-6">
              <p className="text-muted-foreground mb-2">Review your booking and proceed to payment.</p>
              <div className="space-y-2 text-sm">
                <div><strong>Package:</strong> {selectedPkg?.name}</div>
                <div><strong>Time:</strong> {selectedTime}</div>
                <div><strong>Car:</strong> {carType}, {carBrand} {carModel} ({licensePlate})</div>
                <div><strong>Name:</strong> {personalName}</div>
                <div><strong>Email:</strong> {personalEmail}</div>
                <div><strong>Phone:</strong> {personalPhone}</div>
                <div className="text-lg font-bold text-primary">Total: €{selectedPkg?.price}</div>
              </div>
            </div>
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(3)}>
                Previous
              </Button>
              <Button 
                size="lg" 
                className="shadow-button group w-full md:w-auto bg-[#ffb700] text-black"
                onClick={handleBooking}
                disabled={bookingLoading}
              >
                {bookingLoading ? 'Booking...' : 'Confirm & Pay'}
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