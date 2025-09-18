import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Car, 
  Calendar, 
  CreditCard, 
  FileText, 
  Clock, 
  CheckCircle, 
  Package,
  Download,
  Eye,
  Settings,
  LogOut
} from "lucide-react";

// Mock data
const mockCustomer = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+49 123 456 789",
  memberSince: "January 2024",
  totalWashes: 23,
  totalSpent: 1150
};

const mockWashHistory = [
  {
    id: "1",
    date: "2024-03-15",
    service: "Premium Wash",
    vehicle: "BMW X5",
    licensePlate: "B-MW 2024",
    duration: 25,
    price: 45,
    status: "Completed"
  },
  {
    id: "2", 
    date: "2024-03-10",
    service: "Basic Wash",
    vehicle: "BMW X5",
    licensePlate: "B-MW 2024",
    duration: 18,
    price: 30,
    status: "Completed"
  },
  {
    id: "3",
    date: "2024-03-05",
    service: "Deluxe Wash",
    vehicle: "BMW X5", 
    licensePlate: "B-MW 2024",
    duration: 35,
    price: 65,
    status: "Completed"
  }
];

const mockInvoices = [
  {
    id: "INV-2024-001",
    date: "2024-03-15",
    amount: 45,
    status: "Paid",
    services: ["Premium Wash"]
  },
  {
    id: "INV-2024-002",
    date: "2024-03-10", 
    amount: 30,
    status: "Paid",
    services: ["Basic Wash"]
  },
  {
    id: "INV-2024-003",
    date: "2024-03-05",
    amount: 65,
    status: "Paid", 
    services: ["Deluxe Wash"]
  }
];

const mockPackages = [
  {
    id: "1",
    name: "5 Wash Package",
    purchased: "2024-02-01",
    used: 3,
    total: 5,
    expires: "2024-05-01",
    status: "Active"
  },
  {
    id: "2",
    name: "10 Wash Package",
    purchased: "2024-01-15",
    used: 10,
    total: 10,
    expires: "2024-04-15",
    status: "Completed"
  }
];

const mockPaymentMethods = [
  {
    id: "1",
    type: "Visa",
    last4: "4242",
    expiry: "12/26",
    isDefault: true
  },
  {
    id: "2", 
    type: "Mastercard",
    last4: "8888",
    expiry: "08/25",
    isDefault: false
  }
];

export const CustomerArea = ({ onClose }: { onClose: () => void }) => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Card className="shadow-elegant min-h-[80vh]">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="text-lg bg-primary text-primary-foreground">
                    {mockCustomer.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-2xl">Welcome back, {mockCustomer.name}!</CardTitle>
                  <CardDescription>
                    Member since {mockCustomer.memberSince} • {mockCustomer.totalWashes} washes completed
                  </CardDescription>
                </div>
              </div>
              <Button variant="ghost" onClick={onClose}>✕</Button>
            </div>
          </CardHeader>

          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="overview" className={activeTab === "overview" ? "border-2 border-[#ffb700] rounded-lg" : ""}>Overview</TabsTrigger>
                <TabsTrigger value="history" className={activeTab === "history" ? "border-2 border-[#ffb700] rounded-lg" : ""}>History</TabsTrigger>
                <TabsTrigger value="invoices" className={activeTab === "invoices" ? "border-2 border-[#ffb700] rounded-lg" : ""}>Invoices</TabsTrigger>
                <TabsTrigger value="packages" className={activeTab === "packages" ? "border-2 border-[#ffb700] rounded-lg" : ""}>Packages</TabsTrigger>
                <TabsTrigger value="payment" className={activeTab === "payment" ? "border-2 border-[#ffb700] rounded-lg" : ""}>Payment</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-primary/10 rounded-full">
                          <Car className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <p className="text-2xl font-bold">{mockCustomer.totalWashes}</p>
                          <p className="text-sm text-muted-foreground">Total Washes</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-primary/10 rounded-full">
                          <CreditCard className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <p className="text-2xl font-bold">€{mockCustomer.totalSpent}</p>
                          <p className="text-sm text-muted-foreground">Total Spent</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-primary/10 rounded-full">
                          <Package className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <p className="text-2xl font-bold">2</p>
                          <p className="text-sm text-muted-foreground">Active Packages</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockWashHistory.slice(0, 3).map((wash) => (
                        <div key={wash.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-success" />
                            <div>
                              <p className="font-medium">{wash.service}</p>
                              <p className="text-sm text-muted-foreground">
                                {wash.vehicle} • {wash.licensePlate} • {new Date(wash.date).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">€{wash.price}</p>
                            <p className="text-sm text-muted-foreground">{wash.duration} min</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* History Tab */}
              <TabsContent value="history" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Wash History</CardTitle>
                    <CardDescription>Complete history of your car wash services</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockWashHistory.map((wash) => (
                        <div key={wash.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-medium">{wash.service}</h4>
                              <p className="text-sm text-muted-foreground">
                                {new Date(wash.date).toLocaleDateString()} • {wash.duration} minutes
                              </p>
                            </div>
                            <Badge className="bg-[#ffb700] text-accent border border-[#ffb700]">{wash.status}</Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="text-sm">
                              <span className="font-medium">{wash.vehicle}</span> • {wash.licensePlate}
                            </div>
                            <span className="font-semibold">€{wash.price}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Invoices Tab */}
              <TabsContent value="invoices" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Invoices & Billing</CardTitle>
                    <CardDescription>Download and view your invoices</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockInvoices.map((invoice) => (
                        <div key={invoice.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="font-medium">{invoice.id}</h4>
                              <p className="text-sm text-muted-foreground">
                                {new Date(invoice.date).toLocaleDateString()} • {invoice.services.join(", ")}
                              </p>
                            </div>
                            <div className="flex items-center gap-3">
                              <Badge className="bg-[#ffb700] text-accent border border-[#ffb700]">
                                {invoice.status}
                              </Badge>
                              <span className="font-semibold">€{invoice.amount}</span>
                              <div className="flex gap-1">
                                <Button size="sm" variant="outline">
                                  <Eye className="w-4 h-4" />
                                </Button>
                                <Button size="sm" variant="outline">
                                  <Download className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Packages Tab */}
              <TabsContent value="packages" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Wash Packages</CardTitle>
                    <CardDescription>Manage your wash packages and credits</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockPackages.map((pkg) => (
                        <div key={pkg.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h4 className="font-medium">{pkg.name}</h4>
                              <p className="text-sm text-muted-foreground">
                                Purchased: {new Date(pkg.purchased).toLocaleDateString()}
                              </p>
                            </div>
                            <Badge className="bg-[#ffb700] text-accent border border-[#ffb700]">
                              {pkg.status}
                            </Badge>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Progress:</span>
                              <span>{pkg.used} / {pkg.total} used</span>
                            </div>
                            <div className="w-full bg-muted h-2 rounded-full">
                              <div 
                                className="bg-primary h-2 rounded-full transition-all"
                                style={{ width: `${(pkg.used / pkg.total) * 100}%` }}
                              />
                            </div>
                            {pkg.status === "Active" && (
                              <p className="text-sm text-muted-foreground">
                                Expires: {new Date(pkg.expires).toLocaleDateString()}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Payment Tab */}
              <TabsContent value="payment" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Methods</CardTitle>
                    <CardDescription>Manage your saved payment methods</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockPaymentMethods.map((method) => (
                        <div key={method.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                              <CreditCard className="w-5 h-5 text-muted-foreground" />
                              <div>
                                <p className="font-medium">{method.type} •••• {method.last4}</p>
                                <p className="text-sm text-muted-foreground">Expires {method.expiry}</p>
                              </div>
                              {method.isDefault && (
                                <Badge className="bg-[#ffb700] text-accent border border-[#ffb700]">Default</Badge>
                              )}
                            </div>
                            <Button size="sm" variant="outline">
                              <Settings className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                      
                      <Button variant="outline" className="w-full">
                        <CreditCard className="w-4 h-4 mr-2" />
                        Add New Payment Method
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <Separator className="my-6" />
            
            {/* Account Actions */}
            <div className="flex justify-between">
              <Button variant="outline">
                <Settings className="w-4 h-4 mr-2" />
                Account Settings
              </Button>
              <Button variant="destructive">
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};