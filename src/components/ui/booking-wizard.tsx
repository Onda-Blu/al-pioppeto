import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Car, Clock, CreditCard, CheckCircle, ArrowLeft, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface VehicleType {
  id: string;
  name: string;
  price: number;
  icon: React.ReactNode;
}

interface WashPackage {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
}

const vehicleTypes: VehicleType[] = [
  { id: "regular", name: "Regular Size Car", price: 30, icon: <Car className="w-8 h-8" /> },
  { id: "medium", name: "Medium Size Car", price: 35, icon: <Car className="w-8 h-8" /> },
  { id: "suv", name: "Compact SUV", price: 40, icon: <Car className="w-8 h-8" /> },
  { id: "minivan", name: "Minivan", price: 45, icon: <Car className="w-8 h-8" /> },
  { id: "pickup", name: "Pickup Truck", price: 50, icon: <Car className="w-8 h-8" /> },
  { id: "cargo", name: "Cargo Truck", price: 60, icon: <Car className="w-8 h-8" /> }
];

const washPackages: WashPackage[] = [
  { id: "basic", name: "Basic Wash", description: "Exterior wash only", price: 20, duration: 15 },
  { id: "premium", name: "Premium Wash", description: "Exterior + Interior cleaning", price: 35, duration: 25 },
  { id: "deluxe", name: "Deluxe Wash", description: "Full service with wax", price: 50, duration: 35 }
];

interface BookingData {
  vehicleType: string;
  washPackage: string;
  licensePlate: string;
  carBrand: string;
  customerName: string;
  email: string;
  phone: string;
  selectedSlot: string;
}

export const BookingWizard = ({ onClose }: { onClose: () => void }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState<BookingData>({
    vehicleType: "",
    washPackage: "",
    licensePlate: "",
    carBrand: "",
    customerName: "",
    email: "",
    phone: "",
    selectedSlot: ""
  });
  const { toast } = useToast();

  const totalSteps = 4;
  
  const selectedVehicle = vehicleTypes.find(v => v.id === bookingData.vehicleType);
  const selectedPackage = washPackages.find(p => p.id === bookingData.washPackage);
  const totalPrice = (selectedVehicle?.price || 0) + (selectedPackage?.price || 0);

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    toast({
      title: "Booking Confirmed!",
      description: `Your wash is scheduled. Total: €${totalPrice}`,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Card className="shadow-elegant">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">Book Your Car Wash</CardTitle>
                <CardDescription>Step {currentStep} of {totalSteps}</CardDescription>
              </div>
              <Button variant="ghost" onClick={onClose}>✕</Button>
            </div>
            <div className="w-full bg-muted h-2 rounded-full">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Step 1: Service Selection */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Select Vehicle Type</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {vehicleTypes.map((vehicle) => (
                      <Card 
                        key={vehicle.id}
                        className={`cursor-pointer transition-all ${
                          bookingData.vehicleType === vehicle.id 
                            ? 'border-primary bg-primary/10' 
                            : 'hover:border-primary/50'
                        }`}
                        onClick={() => setBookingData({...bookingData, vehicleType: vehicle.id})}
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
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Select Wash Package</h3>
                  <div className="grid gap-4">
                    {washPackages.map((pkg) => (
                      <Card 
                        key={pkg.id}
                        className={`cursor-pointer transition-all ${
                          bookingData.washPackage === pkg.id 
                            ? 'border-primary bg-primary/10' 
                            : 'hover:border-primary/50'
                        }`}
                        onClick={() => setBookingData({...bookingData, washPackage: pkg.id})}
                      >
                        <CardContent className="p-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="font-medium">{pkg.name}</h4>
                              <p className="text-sm text-muted-foreground">{pkg.description}</p>
                              <div className="flex items-center gap-4 mt-1">
                                <span className="text-primary font-semibold">€{pkg.price}</span>
                                <span className="text-sm text-muted-foreground flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {pkg.duration} min
                                </span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Car Details */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Car Details</h3>
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="licensePlate">License Plate Number</Label>
                    <Input
                      id="licensePlate"
                      placeholder="e.g., ABC-123"
                      value={bookingData.licensePlate}
                      onChange={(e) => setBookingData({...bookingData, licensePlate: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="carBrand">Car Brand & Model</Label>
                    <Input
                      id="carBrand"
                      placeholder="e.g., BMW X5"
                      value={bookingData.carBrand}
                      onChange={(e) => setBookingData({...bookingData, carBrand: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Personal Details */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Personal Information</h3>
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="customerName">Full Name</Label>
                    <Input
                      id="customerName"
                      placeholder="John Doe"
                      value={bookingData.customerName}
                      onChange={(e) => setBookingData({...bookingData, customerName: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={bookingData.email}
                      onChange={(e) => setBookingData({...bookingData, email: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+49 123 456 789"
                      value={bookingData.phone}
                      onChange={(e) => setBookingData({...bookingData, phone: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Payment & Confirmation */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Payment & Confirmation</h3>
                
                {/* Booking Summary */}
                <Card className="bg-muted/50">
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-3">Booking Summary</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Vehicle:</span>
                        <span>{selectedVehicle?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Service:</span>
                        <span>{selectedPackage?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>License Plate:</span>
                        <span>{bookingData.licensePlate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Car:</span>
                        <span>{bookingData.carBrand}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-semibold">
                        <span>Total:</span>
                        <span>€{totalPrice}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Payment Method */}
                <div className="space-y-3">
                  <Label>Payment Method</Label>
                  <Card className="p-4 bg-muted/30">
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-5 h-5 text-primary" />
                      <span className="text-sm">Secure payment will be processed via Stripe</span>
                    </div>
                  </Card>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between pt-6">
              <Button 
                variant="outline" 
                onClick={prevStep} 
                disabled={currentStep === 1}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>

              {currentStep < totalSteps ? (
                <Button 
                  onClick={nextStep}
                  disabled={
                    (currentStep === 1 && (!bookingData.vehicleType || !bookingData.washPackage)) ||
                    (currentStep === 2 && (!bookingData.licensePlate || !bookingData.carBrand)) ||
                    (currentStep === 3 && (!bookingData.customerName || !bookingData.email))
                  }
                >
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button onClick={handleSubmit} className="shadow-button">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Confirm Booking
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};