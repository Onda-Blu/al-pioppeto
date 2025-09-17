import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Gift, Zap } from "lucide-react";
import { useState } from "react";

interface Package {
  id: string;
  name: string;
  washes: number;
  price: number;
  pricePerWash: number;
  savings?: number;
  popular?: boolean;
  features: string[];
  icon: React.ReactNode;
}

const packages: Package[] = [
  {
    id: "single",
    name: "Single Wash",
    washes: 1,
    price: 30,
    pricePerWash: 30,
    features: ["20 min wash cycle", "15 min drying area", "Basic exterior wash", "License plate recognition"],
    icon: <Zap className="w-6 h-6" />
  },
  {
    id: "pack-5",
    name: "Starter Pack",
    washes: 5,
    price: 140,
    pricePerWash: 28,
    savings: 10,
    features: ["All single wash features", "Priority booking", "2% savings", "Valid for 6 months"],
    icon: <Star className="w-6 h-6" />
  },
  {
    id: "pack-10",
    name: "Value Pack",
    washes: 10,
    price: 260,
    pricePerWash: 26,
    savings: 40,
    popular: true,
    features: ["All starter pack features", "5% savings", "Free wash on 10th visit", "Valid for 1 year"],
    icon: <Star className="w-6 h-6" />
  },
  {
    id: "pack-20",
    name: "Premium Pack",
    washes: 20,
    price: 480,
    pricePerWash: 24,
    savings: 120,
    features: ["All value pack features", "10% savings", "Priority customer support", "Valid for 18 months"],
    icon: <Star className="w-6 h-6" />
  },
  {
    id: "pack-50",
    name: "Business Pack",
    washes: 50,
    price: 1100,
    pricePerWash: 22,
    savings: 400,
    features: ["All premium features", "15% savings", "Dedicated account manager", "Fleet management", "Valid for 2 years"],
    icon: <Star className="w-6 h-6" />
  },
  {
    id: "donation",
    name: "Support Pack",
    washes: 0,
    price: 0,
    pricePerWash: 0,
    features: ["Support our car wash facility", "Choose your donation amount", "Help maintain our equipment", "Community contribution"],
    icon: <Gift className="w-6 h-6" />
  }
];

export const PackageSelection = () => {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [customWashes, setCustomWashes] = useState(10);
  const [donationAmount, setDonationAmount] = useState(25);

  const calculateCustomPrice = (washes: number) => {
    if (washes < 5) return washes * 30;
    if (washes < 10) return washes * 28;
    if (washes < 20) return washes * 26;
    if (washes < 50) return washes * 24;
    return washes * 22;
  };

  return (
    <section id="packages" className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4" style={{ fontFamily: 'Archivo, Inter, sans-serif' }}>
            Choose Your Package
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Save money with our wash packages. The more you buy, the more you save!
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {packages.map((pkg) => (
            <Card 
              key={pkg.id} 
              className={`relative shadow-card cursor-pointer transition-all duration-300 ${
                selectedPackage === pkg.id 
                  ? "shadow-elegant border-primary bg-gradient-card" 
                  : "hover:shadow-card"
              } ${pkg.popular ? "border-2 border-primary" : ""}`}
              onClick={() => setSelectedPackage(pkg.id)}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-primary text-primary-foreground px-4 py-1">
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                      {pkg.icon}
                    </div>
                    <CardTitle className="text-lg">{pkg.name}</CardTitle>
                  </div>
                  {selectedPackage === pkg.id && (
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-primary-foreground" />
                    </div>
                  )}
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="mb-4">
                  {pkg.id === "donation" ? (
                    <div className="space-y-2">
                      <div className="text-2xl font-bold text-foreground">
                        €{donationAmount}
                      </div>
                      <input
                        type="range"
                        min="5"
                        max="100"
                        value={donationAmount}
                        onChange={(e) => setDonationAmount(parseInt(e.target.value))}
                        className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="text-sm text-muted-foreground">
                        Donation amount: €5 - €100
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="text-3xl font-bold text-foreground">
                        €{pkg.price}
                        {pkg.washes > 1 && (
                          <span className="text-sm font-normal text-muted-foreground ml-2">
                            (€{pkg.pricePerWash}/wash)
                          </span>
                        )}
                      </div>
                      {pkg.savings && (
                        <div className="text-sm text-success font-medium">
                          Save €{pkg.savings}
                        </div>
                      )}
                      {pkg.washes > 0 && (
                        <div className="text-muted-foreground">
                          {pkg.washes} car wash{pkg.washes > 1 ? "es" : ""}
                        </div>
                      )}
                    </>
                  )}
                </div>

                <ul className="space-y-2 mb-6">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <Check className="w-4 h-4 text-success mr-2 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}

          {/* Custom Package */}
          <Card 
            className={`shadow-card cursor-pointer transition-all duration-300 ${
              selectedPackage === "custom" 
                ? "shadow-elegant border-primary bg-gradient-card" 
                : "hover:shadow-card"
            }`}
            onClick={() => setSelectedPackage("custom")}
          >
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    <Zap className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-lg">Custom Pack</CardTitle>
                </div>
                {selectedPackage === "custom" && (
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-primary-foreground" />
                  </div>
                )}
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="mb-4">
                <div className="text-3xl font-bold text-foreground">
                  €{calculateCustomPrice(customWashes)}
                  <span className="text-sm font-normal text-muted-foreground ml-2">
                    (€{(calculateCustomPrice(customWashes) / customWashes).toFixed(2)}/wash)
                  </span>
                </div>
                <div className="text-muted-foreground">
                  {customWashes} car wash{customWashes > 1 ? "es" : ""}
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <label className="text-sm font-medium text-foreground">
                  Number of washes: {customWashes}
                </label>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={customWashes}
                  onChange={(e) => setCustomWashes(parseInt(e.target.value))}
                  className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                />
                <div className="text-xs text-muted-foreground">
                  1 - 100 washes
                </div>
              </div>

              <ul className="space-y-2">
                <li className="flex items-center text-sm">
                  <Check className="w-4 h-4 text-success mr-2 flex-shrink-0" />
                  <span className="text-muted-foreground">Flexible quantity</span>
                </li>
                <li className="flex items-center text-sm">
                  <Check className="w-4 h-4 text-success mr-2 flex-shrink-0" />
                  <span className="text-muted-foreground">Bulk pricing applied</span>
                </li>
                <li className="flex items-center text-sm">
                  <Check className="w-4 h-4 text-success mr-2 flex-shrink-0" />
                  <span className="text-muted-foreground">Valid for 1 year</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {selectedPackage && (
          <div className="mt-12 text-center">
            <Card className="max-w-md mx-auto shadow-elegant bg-gradient-primary">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-primary-foreground mb-2" style={{ fontFamily: 'Archivo, Inter, sans-serif' }}>
                  Ready to Purchase?
                </h3>
                <p className="text-primary-foreground/80 mb-4">
                  {selectedPackage === "donation" 
                    ? `Support us with €${donationAmount}` 
                    : selectedPackage === "custom"
                    ? `${customWashes} washes for €${calculateCustomPrice(customWashes)}`
                    : `${packages.find(p => p.id === selectedPackage)?.name} - €${packages.find(p => p.id === selectedPackage)?.price}`
                  }
                </p>
                <Button variant="secondary" size="lg" className="shadow-button">
                  Proceed to Payment
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </section>
  );
};