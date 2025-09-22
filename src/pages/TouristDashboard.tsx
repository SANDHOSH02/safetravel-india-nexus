import React, { useState } from 'react';
import { Header } from '@/components/shared/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { 
  Shield, 
  MapPin, 
  Bell, 
  Download, 
  QrCode, 
  Heart, 
  Phone, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Navigation,
  Camera
} from 'lucide-react';
import indiaMapDashboard from '@/assets/india-map-dashboard.jpg';

const TouristDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [safetyScore] = useState(85);

  const handlePanicButton = () => {
    toast({
      title: "🚨 Emergency Alert Sent!",
      description: "Help is on the way! Your location has been shared with nearby authorities.",
      variant: "destructive",
    });
  };

  const handleDownloadId = () => {
    toast({
      title: "ID Card Downloaded",
      description: "Your digital ID has been saved to downloads.",
    });
  };

  const safetyBreakdown = [
    { label: 'Location Safety', value: 90, status: 'High', color: 'success' },
    { label: 'Health Status', value: 85, status: 'Good', color: 'success' },
    { label: 'Weather Conditions', value: 75, status: 'Fair', color: 'warning' },
    { label: 'Crowd Density', value: 80, status: 'Moderate', color: 'primary' }
  ];

  const recentAlerts = [
    {
      id: 1,
      type: 'warning',
      title: 'High crowd density in Red Fort area',
      location: 'New Delhi',
      time: '2 hours ago',
      read: false
    },
    {
      id: 2,
      type: 'info',
      title: 'Weather update: Light rain expected',
      location: 'Delhi NCR',
      time: '4 hours ago',
      read: true
    },
    {
      id: 3,
      type: 'success',
      title: 'Safe zone: India Gate area clear',
      location: 'New Delhi',
      time: '6 hours ago',
      read: true
    },
    {
      id: 4,
      type: 'warning',
      title: 'Traffic congestion on NH-8',
      location: 'Delhi-Jaipur Highway',
      time: '8 hours ago',
      read: true
    },
    {
      id: 5,
      type: 'info',
      title: 'Tourist police checkpoint active',
      location: 'Connaught Place',
      time: '1 day ago',
      read: true
    }
  ];

  const touristHotspots = [
    { name: 'Taj Mahal', city: 'Agra', safety: 'High', visitors: '15K today' },
    { name: 'Red Fort', city: 'Delhi', safety: 'Medium', visitors: '8K today' },
    { name: 'Gateway of India', city: 'Mumbai', safety: 'High', visitors: '12K today' },
    { name: 'Hawa Mahal', city: 'Jaipur', safety: 'High', visitors: '6K today' }
  ];

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning': return <AlertTriangle className="h-4 w-4 text-warning" />;
      case 'success': return <CheckCircle className="h-4 w-4 text-success" />;
      default: return <Bell className="h-4 w-4 text-primary" />;
    }
  };

  const getSafetyColor = (safety: string) => {
    switch (safety.toLowerCase()) {
      case 'high': return 'success';
      case 'medium': return 'warning';
      case 'low': return 'danger';
      default: return 'secondary';
    }
  };

  return (
    <div className="min-h-screen bg-hero">
      <Header />
      
      <main className="container mx-auto px-4 lg:px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8 animate-fade-up">
          <h1 className="text-dashboard-title mb-2">
            Welcome back, {user?.name}! 🧳
          </h1>
          <p className="text-muted-foreground">
            Your safety is our priority. Stay informed and travel safely across Incredible India.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Digital ID Card */}
            <Card className="card-dashboard bg-gradient-to-br from-primary-light to-accent">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <span>Blockchain-Secured Digital ID</span>
                </CardTitle>
                <CardDescription>
                  Your verified tourist identification card
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Full Name</span>
                      <span className="font-medium">{user?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">ID Number</span>
                      <span className="font-medium">TID-2024-{user?.id?.slice(-6).toUpperCase()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Home Country</span>
                      <span className="font-medium">{user?.homeCountry || 'International'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Valid Until</span>
                      <span className="font-medium">Dec 31, 2024</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <div className="bg-card p-4 rounded-lg">
                      <QrCode className="h-16 w-16 text-primary" />
                    </div>
                    <span className="text-xs text-muted-foreground">Scan for verification</span>
                  </div>
                </div>
                <Button onClick={handleDownloadId} className="w-full btn-cultural">
                  <Download className="mr-2 h-4 w-4" />
                  Download Digital ID
                </Button>
              </CardContent>
            </Card>

            {/* Safety Score */}
            <Card className="card-dashboard">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Heart className="h-5 w-5 text-success" />
                  <span>Real-Time Safety Score</span>
                </CardTitle>
                <CardDescription>
                  Your current safety assessment based on multiple factors
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-metric mb-2">{safetyScore}%</div>
                  <div className="relative w-32 h-32 mx-auto">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-success to-success-light opacity-20"></div>
                    <div className="absolute inset-2 rounded-full bg-card flex items-center justify-center">
                      <Shield className="h-8 w-8 text-success" />
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">Currently Safe</p>
                </div>
                
                <div className="space-y-3">
                  {safetyBreakdown.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{item.label}</span>
                        <Badge variant={getSafetyColor(item.status) as any}>{item.status}</Badge>
                      </div>
                      <Progress value={item.value} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Interactive Map */}
            <Card className="card-dashboard">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>Tourist Hotspots & Safety Map</span>
                </CardTitle>
                <CardDescription>
                  Live safety status of popular destinations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative rounded-lg overflow-hidden mb-4">
                  <img 
                    src={indiaMapDashboard} 
                    alt="India Tourist Map" 
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  <div className="absolute top-4 right-4">
                    <Button size="sm" variant="secondary">
                      <Navigation className="mr-2 h-4 w-4" />
                      Navigate
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {touristHotspots.map((spot, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-accent/30 rounded-lg">
                      <div>
                        <h4 className="font-medium">{spot.name}</h4>
                        <p className="text-sm text-muted-foreground">{spot.city} • {spot.visitors}</p>
                      </div>
                      <Badge variant={getSafetyColor(spot.safety) as any}>{spot.safety}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Emergency Panic Button */}
            <Card className="card-alert">
              <CardHeader>
                <CardTitle className="text-danger">Emergency Assistance</CardTitle>
                <CardDescription>
                  Immediate help when you need it most
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  onClick={handlePanicButton}
                  className="w-full btn-emergency text-lg py-6"
                >
                  🚨 PANIC BUTTON
                </Button>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4" />
                    <span>Tourist Helpline: 1363</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4" />
                    <span>Emergency: 112</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notifications Panel */}
            <Card className="card-dashboard">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Bell className="h-5 w-5 text-primary" />
                    <span>Alerts & Updates</span>
                  </div>
                  <Badge variant="secondary">{recentAlerts.filter(a => !a.read).length} new</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="space-y-2">
                  {recentAlerts.map((alert) => (
                    <AccordionItem key={alert.id} value={`alert-${alert.id}`}>
                      <AccordionTrigger className="text-left py-3">
                        <div className="flex items-start space-x-3 flex-1">
                          {getAlertIcon(alert.type)}
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <h4 className={`text-sm font-medium ${!alert.read ? 'text-primary' : ''}`}>
                                {alert.title}
                              </h4>
                              {!alert.read && <div className="w-2 h-2 bg-primary rounded-full"></div>}
                            </div>
                            <p className="text-xs text-muted-foreground text-left">
                              {alert.location} • {alert.time}
                            </p>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="text-sm text-muted-foreground pt-2">
                        <div className="space-y-2">
                          <p>
                            {alert.type === 'warning' ? 
                              'Exercise caution in this area. Consider alternative routes or wait for conditions to improve.' :
                              alert.type === 'success' ?
                              'This area has been verified as safe for tourists. Enjoy your visit!' :
                              'Stay informed about current conditions and follow local guidelines.'
                            }
                          </p>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">View Details</Button>
                            <Button size="sm" variant="ghost">
                              <Camera className="h-4 w-4 mr-1" />
                              Report
                            </Button>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="card-dashboard">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <MapPin className="mr-2 h-4 w-4" />
                  Find Nearest Tourist Police
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Heart className="mr-2 h-4 w-4" />
                  Medical Assistance
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Phone className="mr-2 h-4 w-4" />
                  Embassy Contacts
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Clock className="mr-2 h-4 w-4" />
                  Travel History
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TouristDashboard;