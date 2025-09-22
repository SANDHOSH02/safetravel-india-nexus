import React, { useState } from 'react';
import { Header } from '@/components/shared/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { 
  Shield, 
  MapPin, 
  AlertTriangle, 
  Users, 
  Clock, 
  MessageSquare,
  Filter,
  RefreshCw,
  Eye,
  Phone,
  Navigation,
  Activity
} from 'lucide-react';
import indiaMapDashboard from '@/assets/india-map-dashboard.jpg';

const PoliceDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const handleRespond = (alertId: string) => {
    toast({
      title: "Response Initiated",
      description: `Emergency response team dispatched for Alert #${alertId}`,
    });
  };

  const handleRefresh = () => {
    toast({
      title: "Data Refreshed",
      description: "Dashboard updated with latest information",
    });
  };

  const emergencyAlerts = [
    {
      id: 'EA001',
      touristId: 'TID-2024-A5X9K2',
      touristName: 'Sarah Johnson',
      location: 'Red Fort, Delhi',
      time: '5 minutes ago',
      type: 'Panic Button',
      status: 'Active',
      priority: 'High'
    },
    {
      id: 'EA002',
      touristId: 'TID-2024-B8M3L7',
      touristName: 'David Chen',
      location: 'Connaught Place, Delhi',
      time: '18 minutes ago',
      type: 'Medical Emergency',
      status: 'Responding',
      priority: 'High'
    },
    {
      id: 'EA003',
      touristId: 'TID-2024-C2N8R5',
      touristName: 'Emma Wilson',
      location: 'India Gate, Delhi',
      time: '35 minutes ago',
      type: 'Lost/Separated',
      status: 'Resolved',
      priority: 'Medium'
    },
    {
      id: 'EA004',
      touristId: 'TID-2024-D6P1Q9',
      touristName: 'Marco Silva',
      location: 'Chandni Chowk, Delhi',
      time: '1 hour ago',
      type: 'Theft Report',
      status: 'Investigating',
      priority: 'Medium'
    }
  ];

  const highRiskZones = [
    {
      zone: 'Old Delhi Market Area',
      riskLevel: 'High',
      activeAlerts: 5,
      tourists: 150,
      lastUpdate: '2 mins ago',
      reason: 'High crowd density, pickpocketing reports'
    },
    {
      zone: 'Red Fort Complex',
      riskLevel: 'Medium',
      activeAlerts: 2,
      tourists: 89,
      lastUpdate: '8 mins ago',
      reason: 'Large tourist groups, moderate security'
    },
    {
      zone: 'Connaught Place',
      riskLevel: 'Medium',
      activeAlerts: 3,
      tourists: 200,
      lastUpdate: '12 mins ago',
      reason: 'Busy traffic, commercial area'
    },
    {
      zone: 'India Gate Lawns',
      riskLevel: 'Low',
      activeAlerts: 1,
      tourists: 75,
      lastUpdate: '5 mins ago',
      reason: 'Open area, good visibility'
    },
    {
      zone: 'Humayun\'s Tomb',
      riskLevel: 'Low',
      activeAlerts: 0,
      tourists: 45,
      lastUpdate: '3 mins ago',
      reason: 'Controlled entry, security present'
    },
    {
      zone: 'Lotus Temple',
      riskLevel: 'Low',
      activeAlerts: 0,
      tourists: 60,
      lastUpdate: '7 mins ago',
      reason: 'Peaceful environment, managed access'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'destructive';
      case 'responding': return 'default';
      case 'resolved': return 'secondary';
      case 'investigating': return 'outline';
      default: return 'secondary';
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'outline';
    }
  };

  const getRiskBadge = (risk: string) => {
    switch (risk.toLowerCase()) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'outline';
    }
  };

  const filteredAlerts = emergencyAlerts.filter(alert => {
    if (selectedStatus !== 'all' && alert.status.toLowerCase() !== selectedStatus) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-cultural">
      <Header showSearch={true}>
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" onClick={handleRefresh}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Select value={selectedCity} onValueChange={setSelectedCity}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All Cities" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Cities</SelectItem>
              <SelectItem value="delhi">New Delhi</SelectItem>
              <SelectItem value="mumbai">Mumbai</SelectItem>
              <SelectItem value="jaipur">Jaipur</SelectItem>
              <SelectItem value="agra">Agra</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Header>
      
      <main className="container mx-auto px-4 lg:px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8 animate-fade-up">
          <h1 className="text-dashboard-title mb-2">
            Police Command Center 🚔
          </h1>
          <p className="text-muted-foreground">
            Real-time monitoring and response system for tourist safety • {user?.stationLocation}
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="card-metric">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Alerts</p>
                  <p className="text-2xl font-bold text-danger">8</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-danger" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="card-metric">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Tourists Monitored</p>
                  <p className="text-2xl font-bold text-primary">1,247</p>
                </div>
                <Users className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="card-metric">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Response Time</p>
                  <p className="text-2xl font-bold text-success">3.2m</p>
                </div>
                <Clock className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="card-metric">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Cases Today</p>
                  <p className="text-2xl font-bold text-secondary">23</p>
                </div>
                <Shield className="h-8 w-8 text-secondary" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tourist Heatmap */}
            <Card className="card-dashboard">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>Tourist Density Heatmap</span>
                </CardTitle>
                <CardDescription>
                  Real-time tourist location clustering and risk assessment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative rounded-lg overflow-hidden mb-4">
                  <img 
                    src={indiaMapDashboard} 
                    alt="Police Heatmap" 
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  
                  {/* Heatmap Overlays */}
                  <div className="absolute top-4 left-4 space-y-2">
                    <div className="bg-card/90 backdrop-blur-sm p-3 rounded-lg">
                      <h3 className="font-semibold text-sm mb-2">Live Status</h3>
                      <div className="space-y-1 text-xs">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-danger rounded-full"></div>
                          <span>High Risk Zones</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-warning rounded-full"></div>
                          <span>Medium Risk Zones</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-success rounded-full"></div>
                          <span>Safe Zones</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute top-4 right-4 space-y-2">
                    <Button size="sm" variant="secondary">
                      <Navigation className="mr-2 h-4 w-4" />
                      Deploy Units
                    </Button>
                    <Button size="sm" variant="outline">
                      <Eye className="mr-2 h-4 w-4" />
                      Full Screen
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Alerts Table */}
            <Card className="card-dashboard">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <AlertTriangle className="h-5 w-5 text-danger" />
                      <span>Emergency Alerts</span>
                    </CardTitle>
                    <CardDescription>
                      Incoming emergency calls and panic button activations
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Filter className="h-4 w-4 text-muted-foreground" />
                    <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="All Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="responding">Responding</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
                        <SelectItem value="investigating">Investigating</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Alert ID</TableHead>
                      <TableHead>Tourist</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAlerts.map((alert) => (
                      <TableRow key={alert.id}>
                        <TableCell className="font-medium">{alert.id}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{alert.touristName}</div>
                            <div className="text-xs text-muted-foreground">{alert.touristId}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-3 w-3" />
                            <span>{alert.location}</span>
                          </div>
                          <div className="text-xs text-muted-foreground">{alert.time}</div>
                        </TableCell>
                        <TableCell>{alert.type}</TableCell>
                        <TableCell>
                          <Badge variant={getPriorityBadge(alert.priority)}>{alert.priority}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getStatusBadge(alert.status)}>{alert.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button 
                              size="sm" 
                              variant={alert.status === 'Active' ? 'default' : 'outline'}
                              onClick={() => handleRespond(alert.id)}
                            >
                              {alert.status === 'Active' ? 'Respond' : 'View'}
                            </Button>
                            <Button size="sm" variant="ghost">
                              <MessageSquare className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* High-Risk Zones */}
            <Card className="card-dashboard">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5 text-warning" />
                  <span>High-Risk Zones</span>
                </CardTitle>
                <CardDescription>
                  Areas requiring enhanced monitoring
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {highRiskZones.map((zone, index) => (
                  <Card key={index} className="border-border">
                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-sm">{zone.zone}</h4>
                        <Badge variant={getRiskBadge(zone.riskLevel)}>{zone.riskLevel}</Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-muted-foreground">Alerts: </span>
                          <span className="font-medium text-danger">{zone.activeAlerts}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Tourists: </span>
                          <span className="font-medium">{zone.tourists}</span>
                        </div>
                      </div>
                      
                      <p className="text-xs text-muted-foreground">{zone.reason}</p>
                      
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-muted-foreground">Updated {zone.lastUpdate}</span>
                        <Button size="sm" variant="outline" className="h-6 text-xs">
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="card-dashboard">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Phone className="mr-2 h-4 w-4" />
                  Contact Tourist
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Shield className="mr-2 h-4 w-4" />
                  Deploy Patrol
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Issue Alert
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MapPin className="mr-2 h-4 w-4" />
                  Update Zone Status
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="card-dashboard">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span>Patrol unit deployed to Red Fort</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Tourist reported safe arrival</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-warning rounded-full"></div>
                    <span>Zone risk level updated</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-danger rounded-full"></div>
                    <span>Emergency response completed</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PoliceDashboard;