import React, { useState } from 'react';
import { Header } from '@/components/shared/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { 
  BarChart3, 
  Users, 
  Shield, 
  AlertTriangle, 
  Download,
  TrendingUp,
  TrendingDown,
  Calendar,
  FileText,
  Settings,
  Eye,
  UserX,
  Edit
} from 'lucide-react';

const AdminDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const handleExport = (type: string) => {
    toast({
      title: "Export Started",
      description: `${type} report is being generated and will be downloaded shortly.`,
    });
  };

  const handleUserAction = (action: string, userId: string) => {
    toast({
      title: `User ${action}`,
      description: `Action "${action}" has been applied to user ${userId}.`,
    });
  };

  const analyticsData = {
    totalIncidents: 156,
    incidentsChange: 12,
    totalUsers: 8947,
    usersChange: -5,
    responseTime: 3.2,
    responseChange: -8,
    safetyScore: 87,
    safetyChange: 4
  };

  const incidentsByCity = [
    { city: 'New Delhi', incidents: 45, change: '+8%' },
    { city: 'Mumbai', incidents: 32, change: '-3%' },
    { city: 'Jaipur', incidents: 28, change: '+15%' },
    { city: 'Agra', incidents: 24, change: '-2%' },
    { city: 'Goa', incidents: 18, change: '+5%' },
    { city: 'Kolkata', incidents: 15, change: '-12%' }
  ];

  const recentIncidents = [
    {
      id: 'INC001',
      date: '2024-01-15',
      location: 'Red Fort, Delhi',
      type: 'Theft',
      status: 'Resolved',
      officer: 'Inspector Kumar'
    },
    {
      id: 'INC002',
      date: '2024-01-14',
      location: 'Gateway of India, Mumbai',
      type: 'Medical Emergency',
      status: 'Resolved',
      officer: 'Constable Sharma'
    },
    {
      id: 'INC003',
      date: '2024-01-14',
      location: 'Hawa Mahal, Jaipur',
      type: 'Lost Tourist',
      status: 'Investigating',
      officer: 'Inspector Singh'
    },
    {
      id: 'INC004',
      date: '2024-01-13',
      location: 'Taj Mahal, Agra',
      type: 'Harassment',
      status: 'Under Review',
      officer: 'Officer Gupta'
    }
  ];

  const userManagementData = {
    tourists: [
      {
        id: 'TID-2024-A5X9K2',
        name: 'Sarah Johnson',
        email: 'sarah.j@email.com',
        country: 'Canada',
        status: 'Active',
        joinDate: '2024-01-10'
      },
      {
        id: 'TID-2024-B8M3L7',
        name: 'David Chen',
        email: 'david.chen@email.com',
        country: 'Singapore',
        status: 'Active',
        joinDate: '2024-01-08'
      },
      {
        id: 'TID-2024-C2N8R5',
        name: 'Emma Wilson',
        email: 'emma.wilson@email.com',
        country: 'UK',
        status: 'Suspended',
        joinDate: '2024-01-05'
      }
    ],
    police: [
      {
        id: 'POL-001',
        name: 'Inspector Raj Kumar',
        email: 'raj.kumar@police.gov.in',
        badgeId: 'DL-POL-2024-1234',
        station: 'New Delhi Central',
        status: 'Active'
      },
      {
        id: 'POL-002',
        name: 'Constable Priya Sharma',
        email: 'priya.sharma@police.gov.in',
        badgeId: 'MH-POL-2024-5678',
        station: 'Mumbai South',
        status: 'Active'
      }
    ]
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'default';
      case 'suspended': return 'destructive';
      case 'investigating': return 'secondary';
      case 'resolved': return 'outline';
      case 'under review': return 'secondary';
      default: return 'outline';
    }
  };

  const getChangeIcon = (change: number) => {
    return change > 0 ? <TrendingUp className="h-4 w-4 text-success" /> : <TrendingDown className="h-4 w-4 text-danger" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-light to-muted">
      <Header showSearch={true}>
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" onClick={() => handleExport('CSV')}>
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleExport('PDF')}>
            <FileText className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </Header>
      
      <main className="container mx-auto px-4 lg:px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8 animate-fade-up">
          <h1 className="text-dashboard-title mb-2">
            Admin Control Panel ⚙️
          </h1>
          <p className="text-muted-foreground">
            System analytics, user management, and incident oversight • {user?.departmentCode}
          </p>
        </div>

        {/* Analytics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="card-metric">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Incidents</p>
                  <p className="text-2xl font-bold text-primary">{analyticsData.totalIncidents}</p>
                  <div className="flex items-center space-x-1 text-xs mt-1">
                    {getChangeIcon(analyticsData.incidentsChange)}
                    <span className={analyticsData.incidentsChange > 0 ? 'text-success' : 'text-danger'}>
                      {Math.abs(analyticsData.incidentsChange)}% this month
                    </span>
                  </div>
                </div>
                <AlertTriangle className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="card-metric">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                  <p className="text-2xl font-bold text-secondary">{analyticsData.totalUsers.toLocaleString()}</p>
                  <div className="flex items-center space-x-1 text-xs mt-1">
                    {getChangeIcon(analyticsData.usersChange)}
                    <span className={analyticsData.usersChange > 0 ? 'text-success' : 'text-danger'}>
                      {Math.abs(analyticsData.usersChange)}% this month
                    </span>
                  </div>
                </div>
                <Users className="h-8 w-8 text-secondary" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="card-metric">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg Response Time</p>
                  <p className="text-2xl font-bold text-success">{analyticsData.responseTime}m</p>
                  <div className="flex items-center space-x-1 text-xs mt-1">
                    {getChangeIcon(analyticsData.responseChange)}
                    <span className={analyticsData.responseChange > 0 ? 'text-success' : 'text-danger'}>
                      {Math.abs(analyticsData.responseChange)}% faster
                    </span>
                  </div>
                </div>
                <Shield className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="card-metric">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Safety Score</p>
                  <p className="text-2xl font-bold text-warning">{analyticsData.safetyScore}%</p>
                  <div className="flex items-center space-x-1 text-xs mt-1">
                    {getChangeIcon(analyticsData.safetyChange)}
                    <span className={analyticsData.safetyChange > 0 ? 'text-success' : 'text-danger'}>
                      {Math.abs(analyticsData.safetyChange)}% this month
                    </span>
                  </div>
                </div>
                <BarChart3 className="h-8 w-8 text-warning" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Analytics Charts */}
            <Card className="card-dashboard">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  <span>Incident Analytics</span>
                </CardTitle>
                <CardDescription>
                  Incident distribution and trends across major tourist destinations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Mock Bar Chart */}
                <div className="space-y-4">
                  <h3 className="font-semibold">Incidents by City (This Month)</h3>
                  {incidentsByCity.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{item.city}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm">{item.incidents}</span>
                          <span className={`text-xs ${item.change.startsWith('+') ? 'text-success' : 'text-danger'}`}>
                            {item.change}
                          </span>
                        </div>
                      </div>
                      <Progress value={(item.incidents / 50) * 100} className="h-2" />
                    </div>
                  ))}
                </div>

                {/* Mock Line Chart Placeholder */}
                <div className="space-y-4">
                  <h3 className="font-semibold">Safety Score Trend</h3>
                  <div className="h-40 bg-accent/30 rounded-lg flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <BarChart3 className="h-8 w-8 mx-auto mb-2" />
                      <p className="text-sm">Interactive chart showing safety trends over time</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Incident History */}
            <Card className="card-dashboard">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-secondary" />
                  <span>Recent Incident History</span>
                </CardTitle>
                <CardDescription>
                  Latest incidents and their resolution status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Incident ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Officer</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentIncidents.map((incident) => (
                      <TableRow key={incident.id}>
                        <TableCell className="font-medium">{incident.id}</TableCell>
                        <TableCell>{incident.date}</TableCell>
                        <TableCell>{incident.location}</TableCell>
                        <TableCell>{incident.type}</TableCell>
                        <TableCell>
                          <Badge variant={getStatusBadge(incident.status)}>{incident.status}</Badge>
                        </TableCell>
                        <TableCell>{incident.officer}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Edit className="h-4 w-4" />
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

          {/* Right Column - User Management */}
          <div className="space-y-6">
            <Card className="card-dashboard">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-primary" />
                  <span>User Management</span>
                </CardTitle>
                <CardDescription>
                  Manage tourists and police officers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="tourists" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="tourists">Tourists</TabsTrigger>
                    <TabsTrigger value="police">Police</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="tourists" className="space-y-4">
                    {userManagementData.tourists.map((tourist) => (
                      <Card key={tourist.id} className="border-border">
                        <CardContent className="p-4">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium">{tourist.name}</h4>
                              <Badge variant={getStatusBadge(tourist.status)}>{tourist.status}</Badge>
                            </div>
                            <div className="text-sm space-y-1">
                              <p className="text-muted-foreground">ID: {tourist.id}</p>
                              <p className="text-muted-foreground">Country: {tourist.country}</p>
                              <p className="text-muted-foreground">Joined: {tourist.joinDate}</p>
                            </div>
                            <div className="flex space-x-2">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleUserAction('View', tourist.id)}
                              >
                                View
                              </Button>
                              <Button 
                                size="sm" 
                                variant={tourist.status === 'Active' ? 'destructive' : 'default'}
                                onClick={() => handleUserAction(tourist.status === 'Active' ? 'Suspend' : 'Activate', tourist.id)}
                              >
                                {tourist.status === 'Active' ? <UserX className="h-4 w-4" /> : 'Activate'}
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>
                  
                  <TabsContent value="police" className="space-y-4">
                    {userManagementData.police.map((officer) => (
                      <Card key={officer.id} className="border-border">
                        <CardContent className="p-4">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium">{officer.name}</h4>
                              <Badge variant={getStatusBadge(officer.status)}>{officer.status}</Badge>
                            </div>
                            <div className="text-sm space-y-1">
                              <p className="text-muted-foreground">Badge: {officer.badgeId}</p>
                              <p className="text-muted-foreground">Station: {officer.station}</p>
                            </div>
                            <div className="flex space-x-2">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleUserAction('View', officer.id)}
                              >
                                View
                              </Button>
                              <Button 
                                size="sm" 
                                variant="ghost"
                                onClick={() => handleUserAction('Edit', officer.id)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* System Status */}
            <Card className="card-dashboard">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="h-5 w-5 text-secondary" />
                  <span>System Status</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Database</span>
                    <Badge variant="default">Online</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">API Services</span>
                    <Badge variant="default">Operational</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Monitoring</span>
                    <Badge variant="default">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Backup</span>
                    <Badge variant="secondary">Scheduled</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="card-dashboard">
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm space-y-2">
                  <div className="flex justify-between">
                    <span>Active Tourists</span>
                    <span className="font-medium">2,847</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Police Officers</span>
                    <span className="font-medium">145</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Resolved Cases Today</span>
                    <span className="font-medium">23</span>
                  </div>
                  <div className="flex justify-between">
                    <span>System Uptime</span>
                    <span className="font-medium text-success">99.8%</span>
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

export default AdminDashboard;