import { useState } from "react";
import { useUser } from '@clerk/clerk-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { Car, CreditCard, User, Building, Gift, DollarSign } from "lucide-react";

interface UserProfileData {
  firstName?: string;
  lastName?: string;
  company?: string;
  vehicleDetails?: {
    make?: string;
    model?: string;
    licensePlate?: string;
    vehicleType?: string;
  };
  paymentDetails?: {
    cardLast4?: string;
    cardType?: string;
  };
  bonusWashes?: number;
}

export const UserProfile = () => {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState<UserProfileData>(() => {
    // Load from localStorage first, then fall back to Clerk metadata
    const saved = localStorage.getItem('userProfile');
    if (saved) {
      return JSON.parse(saved);
    }
    return (user?.publicMetadata as UserProfileData) || {};
  });

  const handleSaveProfile = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      // Note: publicMetadata updates require backend API access
      // For now, we'll store locally and show success message
      localStorage.setItem('userProfile', JSON.stringify(profileData));
      toast({
        title: "Profile Updated",
        description: "Your profile has been saved locally. Backend integration needed for persistence.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDonation = (amount: number) => {
    // This would integrate with payment processing
    toast({
      title: "Donation",
      description: `Thank you for your ${amount}€ donation!`,
    });
  };

  const bonusWashes = profileData.bonusWashes || 0;
  const nextBonus = bonusWashes >= 5 ? "Bonus available!" : `${5 - bonusWashes} washes until bonus`;

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="vehicle">Vehicle Details</TabsTrigger>
          <TabsTrigger value="payment">Payment Info</TabsTrigger>
          <TabsTrigger value="bonuses">Bonuses & Donations</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Personal Information
              </CardTitle>
              <CardDescription>
                Update your personal details and company information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={profileData.firstName || ''}
                    onChange={(e) => setProfileData({
                      ...profileData,
                      firstName: e.target.value
                    })}
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={profileData.lastName || ''}
                    onChange={(e) => setProfileData({
                      ...profileData,
                      lastName: e.target.value
                    })}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  value={profileData.company || ''}
                  onChange={(e) => setProfileData({
                    ...profileData,
                    company: e.target.value
                  })}
                />
              </div>
              <Button onClick={handleSaveProfile} disabled={loading}>
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vehicle" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Car className="w-5 h-5" />
                Vehicle Details
              </CardTitle>
              <CardDescription>
                Manage your vehicle information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="make">Make</Label>
                  <Input
                    id="make"
                    value={profileData.vehicleDetails?.make || ''}
                    onChange={(e) => setProfileData({
                      ...profileData,
                      vehicleDetails: {
                        ...profileData.vehicleDetails,
                        make: e.target.value
                      }
                    })}
                  />
                </div>
                <div>
                  <Label htmlFor="model">Model</Label>
                  <Input
                    id="model"
                    value={profileData.vehicleDetails?.model || ''}
                    onChange={(e) => setProfileData({
                      ...profileData,
                      vehicleDetails: {
                        ...profileData.vehicleDetails,
                        model: e.target.value
                      }
                    })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="licensePlate">License Plate</Label>
                  <Input
                    id="licensePlate"
                    value={profileData.vehicleDetails?.licensePlate || ''}
                    onChange={(e) => setProfileData({
                      ...profileData,
                      vehicleDetails: {
                        ...profileData.vehicleDetails,
                        licensePlate: e.target.value
                      }
                    })}
                  />
                </div>
                <div>
                  <Label htmlFor="vehicleType">Vehicle Type</Label>
                  <Input
                    id="vehicleType"
                    value={profileData.vehicleDetails?.vehicleType || ''}
                    onChange={(e) => setProfileData({
                      ...profileData,
                      vehicleDetails: {
                        ...profileData.vehicleDetails,
                        vehicleType: e.target.value
                      }
                    })}
                  />
                </div>
              </div>
              <Button onClick={handleSaveProfile} disabled={loading}>
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Payment Information
              </CardTitle>
              <CardDescription>
                Manage your payment methods
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {profileData.paymentDetails?.cardLast4 ? (
                <div className="flex items-center gap-4">
                  <Badge variant="secondary">
                    {profileData.paymentDetails.cardType} ending in {profileData.paymentDetails.cardLast4}
                  </Badge>
                  <Button variant="outline" size="sm">Update Card</Button>
                </div>
              ) : (
                <Button variant="outline">Add Payment Method</Button>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bonuses" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="w-5 h-5" />
                  Wash Bonuses
                </CardTitle>
                <CardDescription>
                  Get a free wash after 5 confirmed washes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-primary">{bonusWashes}/5</div>
                  <div className="text-sm text-muted-foreground">{nextBonus}</div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{ width: `${Math.min((bonusWashes / 5) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Donations
                </CardTitle>
                <CardDescription>
                  Support our car wash with a donation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-2">
                  {[5, 10, 20, 30, 50].map((amount) => (
                    <Button
                      key={amount}
                      variant="outline"
                      size="sm"
                      onClick={() => handleDonation(amount)}
                    >
                      {amount}€
                    </Button>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input placeholder="Custom amount" />
                  <Button variant="outline">Donate</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};