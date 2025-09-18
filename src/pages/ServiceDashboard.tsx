import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Camera, Clock, CheckCircle, Car, ArrowRight } from "lucide-react";

// Mock camera feed and license plate recognition
const mockLicensePlate = "B-MW 2024";

const MAX_TIME = 1800; // 30 min max allowed

export const ServiceDashboard = () => {
  const [step, setStep] = useState(1);
  const [licensePlate, setLicensePlate] = useState("");
  const [outsideTime, setOutsideTime] = useState(0);
  const [insideTime, setInsideTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [timeLeft, setTimeLeft] = useState(MAX_TIME);
  const [inOutside, setInOutside] = useState(false);
  const [inInside, setInInside] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);

  // Simulate license plate recognition
  useEffect(() => {
    if (step === 1) {
      setTimeout(() => {
        setLicensePlate(mockLicensePlate);
        setStep(2);
      }, 2000);
    }
  }, [step]);

  // Simulate time tracking
  useEffect(() => {
    let outsideInterval: any;
    let insideInterval: any;
    let totalInterval: any;
    if (step === 2) {
      setInOutside(true);
      outsideInterval = setInterval(() => {
        setOutsideTime((t) => t + 1);
        setTotalTime((t) => t + 1);
        setTimeLeft((t) => t - 1);
      }, 1000);
      // Simulate car entering inside area after 10s
      setTimeout(() => {
        setInInside(true);
        setInOutside(false);
        clearInterval(outsideInterval);
        insideInterval = setInterval(() => {
          setInsideTime((t) => t + 1);
          setTotalTime((t) => t + 1);
          setTimeLeft((t) => t - 1);
        }, 1000);
        // Simulate service end after 20s inside
        setTimeout(() => {
          clearInterval(insideInterval);
          setStep(3);
        }, 20000);
      }, 10000);
      // Simulate timeout
      totalInterval = setInterval(() => {
        if (timeLeft <= 0) {
          clearInterval(outsideInterval);
          clearInterval(insideInterval);
          clearInterval(totalInterval);
          setStep(3);
        }
      }, 1000);
    }
    return () => {
      clearInterval(outsideInterval);
      clearInterval(insideInterval);
      clearInterval(totalInterval);
    };
  }, [step, timeLeft]);

  // Step 1: Live Camera & License Plate
  if (step === 1) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Card className="max-w-xl w-full shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="w-6 h-6 text-accent" />
              Live Camera
            </CardTitle>
            <CardDescription>Detecting license plate...</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-6">
            <div className="w-full h-48 bg-muted rounded-lg flex items-center justify-center text-muted-foreground text-xl">
              [Camera Feed]
            </div>
            <Badge className="bg-accent text-background text-lg px-6 py-2">Detecting...</Badge>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Step 2: Time Tracking
  if (step === 2) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Card className="max-w-xl w-full shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Car className="w-6 h-6 text-accent" />
              License Plate: <span className="font-mono text-accent">{licensePlate}</span>
            </CardTitle>
            <CardDescription>Tracking car location and time</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted rounded-lg p-4 text-center">
                <h4 className="font-semibold mb-2">Outside Area</h4>
                <p className="text-2xl font-bold text-accent">{outsideTime}s</p>
                {inOutside && <Badge className="bg-[#ffb700] text-accent">Active</Badge>}
              </div>
              <div className="bg-muted rounded-lg p-4 text-center">
                <h4 className="font-semibold mb-2">Inside Area</h4>
                <p className="text-2xl font-bold text-accent">{insideTime}s</p>
                {inInside && <Badge className="bg-[#ffb700] text-accent">Active</Badge>}
              </div>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Total Time Spent</p>
                <p className="text-lg font-bold">{totalTime}s</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Time Left</p>
                <p className="text-lg font-bold text-warning">{timeLeft}s</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Step 3: Service Overview
  if (step === 3) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Card className="max-w-xl w-full shadow-elegant">
          <CardHeader>
            <CardTitle>Service time</CardTitle>
            <CardDescription>Review your service details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <span>License Plate:</span>
                <span className="font-mono text-accent">{licensePlate}</span>
              </div>
              <div className="flex justify-between">
                <span>Time in Outside Area:</span>
                <span>{outsideTime}s</span>
              </div>
              <div className="flex justify-between">
                <span>Time in Inside Area:</span>
                <span>{insideTime}s</span>
              </div>
              <div className="flex justify-between">
                <span>Total Time Spent:</span>
                <span>{totalTime}s</span>
              </div>
            </div>
            <Button size="lg" className="w-full bg-[#ffb700] text-accent" onClick={() => setStep(4)}>
              <CreditCard className="w-5 h-5 mr-2" />
              Pay & Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Step 4: Payment
  if (step === 4) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Card className="max-w-xl w-full shadow-elegant">
          <CardHeader>
            <CardTitle>Payment</CardTitle>
            <CardDescription>Complete your payment to finish</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-between items-center">
              <span className="font-semibold">Total Price:</span>
              <span className="text-2xl font-bold text-accent">€30</span>
            </div>
            <Button size="lg" className="w-full bg-[#ffb700] text-accent" onClick={() => setStep(5)}>
              <CreditCard className="w-5 h-5 mr-2" />
              Pay Now
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Step 5: Confirmation
  if (step === 5) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Card className="max-w-xl w-full shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-success">
              <CheckCircle className="w-6 h-6" />
              Payment Successful!
            </CardTitle>
            <CardDescription>Thank you for using Al Pioppeto Car Wash</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 text-center">
            <p className="text-lg">Your service is complete. You can download your invoice below.</p>
            <Button size="lg" variant="outline" className="w-full">
              Download Invoice
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return null;
};
