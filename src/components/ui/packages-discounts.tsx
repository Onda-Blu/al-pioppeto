import { PackageSelection } from "@/components/ui/package-selection";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Gift, Star } from "lucide-react";

export const PackagesDiscounts = () => {
  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Packages & Discounts</h1>
          <p className="text-muted-foreground">
            Choose the perfect package for your car wash needs
          </p>
        </div>

        {/* Active Promotions */}
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gift className="w-5 h-5 text-primary" />
              Active Promotions
            </CardTitle>
            <CardDescription>
              Don't miss out on these limited-time offers
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-4 bg-background rounded-lg border">
                <div>
                  <h3 className="font-semibold">Loyalty Bonus</h3>
                  <p className="text-sm text-muted-foreground">5th wash free</p>
                </div>
                <Badge variant="secondary">
                  <Star className="w-3 h-3 mr-1" />
                  Active
                </Badge>
              </div>
              <div className="flex items-center justify-between p-4 bg-background rounded-lg border">
                <div>
                  <h3 className="font-semibold">First Time Customer</h3>
                  <p className="text-sm text-muted-foreground">20% off first wash</p>
                </div>
                <Badge variant="secondary">
                  <Star className="w-3 h-3 mr-1" />
                  New
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Package Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Available Packages</CardTitle>
            <CardDescription>
              Select from our range of professional car wash services
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PackageSelection />
          </CardContent>
        </Card>

        {/* Membership Benefits */}
        <Card>
          <CardHeader>
            <CardTitle>Membership Benefits</CardTitle>
            <CardDescription>
              Enjoy exclusive perks as a registered member
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Gift className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold">Loyalty Rewards</h3>
                <p className="text-sm text-muted-foreground">
                  Earn points with every wash and get free services
                </p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Star className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold">Priority Booking</h3>
                <p className="text-sm text-muted-foreground">
                  Skip the wait with member-exclusive time slots
                </p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Badge className="w-6 h-6 bg-primary/10 text-primary border-0" />
                </div>
                <h3 className="font-semibold">Member Discounts</h3>
                <p className="text-sm text-muted-foreground">
                  Exclusive pricing and seasonal promotions
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};