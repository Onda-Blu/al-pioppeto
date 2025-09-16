import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";

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

  const handleSlotSelect = (date: string, time: string, available: boolean) => {
    if (!available) return;
    setSelectedSlot({ date, time });
  };

  return (
    <section id="booking" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
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
                    <h3 className="font-semibold mb-1">Selected Time Slot</h3>
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