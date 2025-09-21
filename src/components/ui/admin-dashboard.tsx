import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Users, TrendingUp, DollarSign, Car, Camera } from "lucide-react";

// Mock data - in real app this would come from your database
const mockBookings = [
  {
    id: 1,
    carType: "SUV",
    bookingType: "Premium Wash",
    carModel: "BMW X5",
    licensePlate: "ABC123",
    carWash: "Complete Detail",
    bookingTime: "2024-01-15 10:00",
    cashIncome: 45.00,
    photoBefore: null,
    photoAfter: null,
    status: "completed"
  },
  {
    id: 2,
    carType: "Sedan",
    bookingType: "Basic Wash",
    carModel: "Mercedes C-Class",
    licensePlate: "XYZ789",
    carWash: "Exterior Only",
    bookingTime: "2024-01-15 11:30",
    cashIncome: 25.00,
    photoBefore: null,
    photoAfter: null,
    status: "in-progress"
  }
];

const mockClients = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    company: "Tech Corp",
    carType: "SUV",
    licensePlate: "ABC123"
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    company: "Marketing Inc",
    carType: "Sedan",
    licensePlate: "XYZ789"
  }
];

export const AdminDashboard = () => {
  const [incomeFilter, setIncomeFilter] = useState("daily");
  const [costs, setCosts] = useState({
    materials: 500,
    labor: 2000,
    utilities: 300,
    maintenance: 200
  });
  const [bookings, setBookings] = useState(mockBookings);

  const totalCosts = Object.values(costs).reduce((sum, cost) => sum + cost, 0);
  const mockRevenue = 5500; // This would come from your booking data
  const ebit = mockRevenue - totalCosts;

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Badge variant="secondary">Administrator</Badge>
        </div>

        <Tabs defaultValue="bookings" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="clients">Clients Archive</TabsTrigger>
            <TabsTrigger value="analytics">Data Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="bookings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Booking Management
                </CardTitle>
                <CardDescription>
                  View and manage all car wash bookings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Car Type</TableHead>
                      <TableHead>Booking Type</TableHead>
                      <TableHead>Car Model</TableHead>
                      <TableHead>License Plate</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Cash Income</TableHead>
                      <TableHead>Photo Before</TableHead>
                      <TableHead>Photo After</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookings.map((booking, idx) => (
                      <TableRow key={booking.id}>
                        <TableCell>{booking.carType}</TableCell>
                        <TableCell>{booking.bookingType}</TableCell>
                        <TableCell>{booking.carModel}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{booking.licensePlate}</Badge>
                        </TableCell>
                        <TableCell>{booking.carWash}</TableCell>
                        <TableCell>{booking.bookingTime}</TableCell>
                        <TableCell className="font-medium">
                          <Input
                            type="number"
                            value={booking.cashIncome}
                            min={0}
                            className="w-24"
                            onChange={e => {
                              const value = parseFloat(e.target.value) || 0;
                              setBookings(prev => prev.map((b, i) => i === idx ? { ...b, cashIncome: value } : b));
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            <Camera className="w-4 h-4" />
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            <Camera className="w-4 h-4" />
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={booking.status === "completed" ? "default" : "secondary"}
                          >
                            {booking.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {booking.status === 'in-progress' && (
                            <Button
                              size="sm"
                              onClick={() => setBookings(prev => prev.map((b, i) => i === idx ? { ...b, status: 'completed' } : b))}
                            >
                              Confirm
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="clients" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Client Archive
                </CardTitle>
                <CardDescription>
                  Complete database of registered clients
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Surname</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Car Type</TableHead>
                      <TableHead>License Plate</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockClients.map((client) => (
                      <TableRow key={client.id}>
                        <TableCell className="font-medium">{client.firstName}</TableCell>
                        <TableCell>{client.lastName}</TableCell>
                        <TableCell>{client.company}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Car className="w-4 h-4" />
                            {client.carType}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{client.licensePlate}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Revenue
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">€{mockRevenue.toFixed(2)}</div>
                  <p className="text-sm text-muted-foreground">This month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    Total Costs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">€{totalCosts.toFixed(2)}</div>
                  <p className="text-sm text-muted-foreground">This month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>EBIT</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold ${ebit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    €{ebit.toFixed(2)}
                  </div>
                  <p className="text-sm text-muted-foreground">Earnings Before Interest and Taxes</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Income Filter</CardTitle>
                  <CardDescription>Select time period for income analysis</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="income-filter">Time Period</Label>
                    <Select value={incomeFilter} onValueChange={setIncomeFilter}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily Income</SelectItem>
                        <SelectItem value="weekly">Weekly Income</SelectItem>
                        <SelectItem value="monthly">Monthly Income</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="text-lg font-semibold">
                    Selected Period: {incomeFilter} - €{mockRevenue.toFixed(2)}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Cost Settings</CardTitle>
                  <CardDescription>Manage operational costs</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="materials">Materials</Label>
                      <Input
                        id="materials"
                        type="number"
                        value={costs.materials}
                        onChange={(e) => setCosts({
                          ...costs,
                          materials: parseFloat(e.target.value) || 0
                        })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="labor">Labor</Label>
                      <Input
                        id="labor"
                        type="number"
                        value={costs.labor}
                        onChange={(e) => setCosts({
                          ...costs,
                          labor: parseFloat(e.target.value) || 0
                        })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="utilities">Utilities</Label>
                      <Input
                        id="utilities"
                        type="number"
                        value={costs.utilities}
                        onChange={(e) => setCosts({
                          ...costs,
                          utilities: parseFloat(e.target.value) || 0
                        })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="maintenance">Maintenance</Label>
                      <Input
                        id="maintenance"
                        type="number"
                        value={costs.maintenance}
                        onChange={(e) => setCosts({
                          ...costs,
                          maintenance: parseFloat(e.target.value) || 0
                        })}
                      />
                    </div>
                  </div>
                  <Button className="w-full">Update Cost Settings</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};