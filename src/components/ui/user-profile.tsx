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
  type?: 'individual' | 'company';
  firstName?: string;
  lastName?: string;
  company?: string;
  companyFullName?: string;
  companyVAT?: string;
  companyAddress?: string;
  companyIBAN?: string;
  companyContact?: string;
  vehicleDetails?: {
    make?: string;
    model?: string;
    licensePlate?: string;
    vehicleType?: string;
  };
  paymentDetails?: {
    cardLast4?: string;
    cardType?: string;
    iban?: string;
    method?: 'card' | 'iban';
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
      // Update Clerk publicMetadata
      if (typeof user.update === 'function') {
        await user.update({ publicMetadata: { ...profileData } });
        toast({
          title: "Profile Updated",
          description: "Your profile has been saved to Clerk.",
        });
      } else {
        // Fallback: localStorage only
        localStorage.setItem('userProfile', JSON.stringify(profileData));
        toast({
          title: "Profile Updated (Local Only)",
          description: "Your profile has been saved locally. Clerk update not available.",
        });
      }
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
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="vehicle">Vehicle Details</TabsTrigger>
          <TabsTrigger value="payment">Payment Info</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="bonuses">Bonuses & Donations</TabsTrigger>
        </TabsList>
        {/* Invoices Tab */}
        <TabsContent value="invoices" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Car className="w-5 h-5" />
                Invoices
              </CardTitle>
              <CardDescription>
                View and download your car wash invoices
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Example data, replace with real data source if available */}
              <div className="overflow-x-auto">
                {(() => {
                  const invoiceData = [
                    {
                      date: '2024-05-01',
                      service: 'Premium Wash',
                      payment: 'Package',
                      car: 'BMW 3 Series (ABC123)',
                      invoice: '#INV-001',
                      invoiceUrl: '#'
                    },
                    {
                      date: '2024-04-15',
                      service: 'Express Wash',
                      payment: 'Direct',
                      car: 'Audi A4 (XYZ789)',
                      invoice: '#INV-002',
                      invoiceUrl: '#'
                    }
                  ];
                  return (
                    <table className="min-w-full text-sm text-left">
                      <thead>
                        <tr className="border-b">
                          <th className="px-2 py-2">Date</th>
                          <th className="px-2 py-2">Service</th>
                          <th className="px-2 py-2">Payment Type</th>
                          <th className="px-2 py-2">Car</th>
                          <th className="px-2 py-2">Invoice</th>
                        </tr>
                      </thead>
                      <tbody>
                        {invoiceData.map((wash, idx) => (
                          <tr key={idx} className="border-b hover:bg-muted/50">
                            <td className="px-2 py-2 whitespace-nowrap">{wash.date}</td>
                            <td className="px-2 py-2 whitespace-nowrap">{wash.service}</td>
                            <td className="px-2 py-2 whitespace-nowrap">{wash.payment}</td>
                            <td className="px-2 py-2 whitespace-nowrap">{wash.car}</td>
                            <td className="px-2 py-2 whitespace-nowrap">
                              <a href={wash.invoiceUrl} className="text-primary underline" target="_blank" rel="noopener noreferrer">
                                {wash.invoice}
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  );
                })()}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="personal" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Personal Information
              </CardTitle>
              <CardDescription>
                Update your personal details or company information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4 mb-4">
                <Button
                  variant={profileData.type === 'individual' || !profileData.type ? 'default' : 'outline'}
                  onClick={() => setProfileData({ ...profileData, type: 'individual' })}
                >
                  Individual
                </Button>
                <Button
                  variant={profileData.type === 'company' ? 'default' : 'outline'}
                  onClick={() => setProfileData({ ...profileData, type: 'company' })}
                >
                  Company
                </Button>
              </div>
              {(!profileData.type || profileData.type === 'individual') && (
                <>
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
                </>
              )}
              {profileData.type === 'company' && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="companyFullName">Full Company Name</Label>
                      <Input
                        id="companyFullName"
                        value={profileData.companyFullName || ''}
                        onChange={e => setProfileData({ ...profileData, companyFullName: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="companyVAT">VAT Number</Label>
                      <Input
                        id="companyVAT"
                        value={profileData.companyVAT || ''}
                        onChange={e => setProfileData({ ...profileData, companyVAT: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="companyAddress">Company Address</Label>
                      <Input
                        id="companyAddress"
                        value={profileData.companyAddress || ''}
                        onChange={e => setProfileData({ ...profileData, companyAddress: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="companyIBAN">Company IBAN</Label>
                      <Input
                        id="companyIBAN"
                        value={profileData.companyIBAN || ''}
                        onChange={e => setProfileData({ ...profileData, companyIBAN: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="companyContact">Contact Person</Label>
                    <Input
                      id="companyContact"
                      value={profileData.companyContact || ''}
                      onChange={e => setProfileData({ ...profileData, companyContact: e.target.value })}
                    />
                  </div>
                </>
              )}
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
              <div className="flex gap-4">
                <Label>
                  <input
                    type="radio"
                    name="payment-method"
                    checked={profileData.paymentDetails?.method === 'card'}
                    onChange={() => setProfileData({
                      ...profileData,
                      paymentDetails: {
                        ...profileData.paymentDetails,
                        method: 'card'
                      }
                    })}
                  /> Card
                </Label>
                <Label>
                  <input
                    type="radio"
                    name="payment-method"
                    checked={profileData.paymentDetails?.method === 'iban'}
                    onChange={() => setProfileData({
                      ...profileData,
                      paymentDetails: {
                        ...profileData.paymentDetails,
                        method: 'iban'
                      }
                    })}
                  /> IBAN
                </Label>
              </div>
              {profileData.paymentDetails?.method === 'card' && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="cardType">Card Type</Label>
                    <Input
                      id="cardType"
                      value={profileData.paymentDetails?.cardType || ''}
                      onChange={e => setProfileData({
                        ...profileData,
                        paymentDetails: {
                          ...profileData.paymentDetails,
                          cardType: e.target.value
                        }
                      })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="cardLast4">Card Last 4 Digits</Label>
                    <Input
                      id="cardLast4"
                      value={profileData.paymentDetails?.cardLast4 || ''}
                      maxLength={4}
                      onChange={e => setProfileData({
                        ...profileData,
                        paymentDetails: {
                          ...profileData.paymentDetails,
                          cardLast4: e.target.value.replace(/[^0-9]/g, '')
                        }
                      })}
                    />
                  </div>
                </div>
              )}
              {profileData.paymentDetails?.method === 'iban' && (
                <div>
                  <Label htmlFor="iban">IBAN</Label>
                  <Input
                    id="iban"
                    value={profileData.paymentDetails?.iban || ''}
                    onChange={e => setProfileData({
                      ...profileData,
                      paymentDetails: {
                        ...profileData.paymentDetails,
                        iban: e.target.value
                      }
                    })}
                  />
                </div>
              )}
              <Button onClick={handleSaveProfile} disabled={loading} className="mt-4">
                {loading ? "Saving..." : "Save Payment Info"}
              </Button>
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