import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";
import React from "react";

interface TimeSlot {
  time: string;
  available: boolean;
  price: number;
}

interface DaySchedule {
  date: string;
  day: string;
  slots: TimeSlot[];
}

const mockSchedule: DaySchedule[] = [
  {
    date: "2024-01-15",
    day: "Today",
    slots: [
      { time: "09:00", available: true, price: 30 },
      { time: "09:20", available: false, price: 30 },
      { time: "09:40", available: true, price: 30 },
      { time: "10:00", available: true, price: 30 },
      { time: "10:20", available: false, price: 30 },
      { time: "10:40", available: true, price: 30 },
    ]
  },
  {
    date: "2024-01-16",
    day: "Tomorrow",
    slots: [
      { time: "09:00", available: true, price: 30 },
      { time: "09:20", available: true, price: 30 },
      { time: "09:40", available: false, price: 30 },
      { time: "10:00", available: true, price: 30 },
      { time: "10:20", available: true, price: 30 },
      { time: "10:40", available: true, price: 30 },
    ]
  },
  {
    date: "2024-01-17",
    day: "Wed",
    slots: [
      { time: "09:00", available: true, price: 30 },
      { time: "09:20", available: true, price: 30 },
      { time: "09:40", available: true, price: 30 },
      { time: "10:00", available: false, price: 30 },
      { time: "10:20", available: true, price: 30 },
      { time: "10:40", available: true, price: 30 },
    ]
  }
];

export const BookingCalendar = () => {

  const [selectedSlot, setSelectedSlot] = useState<{ date: string; time: string } | null>(null);
  const [countdown, setCountdown] = useState<number | null>(null);

  // Find closest available slot (today)
  const now = new Date();
  const todaySchedule = mockSchedule[0];
  const closestSlot = todaySchedule.slots.find(slot => slot.available && parseInt(slot.time.replace(':', ''), 10) > (now.getHours() * 100 + now.getMinutes()));

  // Calculate countdown in seconds
  let closestTime = null;
  if (closestSlot) {
    const [h, m] = closestSlot.time.split(":").map(Number);
    const slotDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, m);
    closestTime = Math.floor((slotDate.getTime() - now.getTime()) / 1000);
  }

  // Timer effect
  React.useEffect(() => {
    if (closestTime !== null && closestTime > 0) {
      setCountdown(closestTime);
      const interval = setInterval(() => {
        setCountdown(prev => (prev && prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [closestTime]);

  const handleSlotSelect = (date: string, time: string, available: boolean) => {
    if (!available) return;
    setSelectedSlot({ date, time });
  };

  return (
    <section id="booking" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
        {closestSlot && countdown !== null && countdown > 0 && (
          <div className="mb-6 flex flex-col items-center justify-center">
            <span className="text-sm text-primary font-semibold mb-1" style={{ fontFamily: 'Archivo, Inter, sans-serif' }}>Next available slot:</span>
            <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full shadow-elegant">
              <Clock className="w-5 h-5 text-primary" />
              <span className="text-lg font-bold text-primary" style={{ fontFamily: 'Archivo, Inter, sans-serif' }}>{closestSlot.time}</span>
              <span className="text-md text-primary font-semibold" style={{ fontFamily: 'Archivo, Inter, sans-serif' }}>
                {`${Math.floor(countdown / 60)}:${(countdown % 60).toString().padStart(2, '0')}`}
              </span>
            </div>
          </div>
        )}
          <h2 className="text-3xl font-bold text-foreground mb-4" style={{ fontFamily: 'Archivo, Inter, sans-serif' }}>
            Book Your Car Wash
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Select your preferred time slot. Each wash takes 20 minutes in the wash area 
            plus 15 minutes in the drying area.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid gap-6 md:grid-cols-3">
            {mockSchedule.map((day) => (
              <Card key={day.date} className="shadow-card bg-gradient-card">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center justify-between">
                    <span>{day.day}</span>
                    <Badge variant="outline" className="text-xs">
                      {new Date(day.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {day.slots.map((slot) => (
                    <Button
                      key={slot.time}
                      variant={
                        selectedSlot?.date === day.date && selectedSlot?.time === slot.time
                          ? "default"
                          : slot.available
                          ? "outline"
                          : "ghost"
                      }
                      className={`w-full justify-between ${
                        !slot.available 
                          ? "opacity-50 cursor-not-allowed" 
                          : "hover:shadow-sm"
                      }`}
                      onClick={() => handleSlotSelect(day.date, slot.time, slot.available)}
                      disabled={!slot.available}
                    >
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        {slot.time}
                      </div>
                      <div className="flex items-center">
                        {slot.available ? (
                          <>
                            <span className="text-sm font-medium">€{slot.price}</span>
                            <CheckCircle className="w-4 h-4 ml-2 text-success" />
                          </>
                        ) : (
                          <XCircle className="w-4 h-4 text-destructive" />
                        )}
                      </div>
                    </Button>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>

          {selectedSlot && (
            <Card className="mt-8 shadow-elegant bg-gradient-primary">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="text-primary-foreground">
                    <h3 className="font-semibold mb-1" style={{ fontFamily: 'Archivo, Inter, sans-serif' }}>Selected Time Slot</h3>
                    <p className="text-primary-foreground/80">
                      {mockSchedule.find(d => d.date === selectedSlot.date)?.day} at {selectedSlot.time}
                    </p>
                  </div>
                  <Button variant="secondary" size="lg" className="shadow-button">
                    Continue to Vehicle Selection
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
};