import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/shared/Header';
import { 
  Shield, 
  MapPin, 
  Users, 
  Activity, 
  CheckCircle, 
  Smartphone,
  Globe,
  Clock,
  Award,
  Heart
} from 'lucide-react';
import tajMahalBg from '@/assets/taj-mahal-bg.jpg';
import stsmsLogo from '@/assets/stsms-logo.png';

const Index = () => {
  const features = [
    {
      icon: Shield,
      title: 'Blockchain Security',
      description: 'Tamper-proof digital ID cards with blockchain verification for enhanced security and trust.',
      color: 'primary'
    },
    {
      icon: MapPin,
      title: 'Real-time Tracking',
  description: 'GPS-based location monitoring with geo-fencing alerts for tourist safety zones. Tourist Safety Monitoring System.',
      color: 'success'
    },
    {
      icon: Activity,
      title: 'Instant Alerts',
      description: 'Emergency panic button with immediate response from nearby police and medical services.',
      color: 'danger'
    },
    {
      icon: Users,
      title: 'Multi-role Platform',
      description: 'Dedicated dashboards for tourists, police officers, and system administrators.',
      color: 'secondary'
    }
  ];

  const stats = [
    { label: 'Active Users', value: '50K+', icon: Users },
    { label: 'Cities Covered', value: '25+', icon: MapPin },
    { label: 'Police Stations', value: '500+', icon: Shield },
    { label: 'Response Time', value: '3.2min', icon: Clock }
  ];

  const benefits = [
  { text: 'Comprehensive Tourist Safety Monitoring System', checked: true },
    { text: 'Real-time emergency response system', checked: true },
    { text: 'Cultural heritage site protection', checked: true },
    { text: 'Multi-language support', checked: true },
    { text: '24/7 tourist helpline integration', checked: true },
    { text: 'Weather and crowd alerts', checked: true }
  ];

  return (
    <div className="min-h-screen">
      <Header showSearch={false} />
      
      {/* Hero Section */}
      <section 
        className="relative py-20 lg:py-32 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 123, 255, 0.15), rgba(0, 123, 255, 0.25)), url(${tajMahalBg})`
        }}
      >
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-4xl mx-auto text-center animate-fade-up">
            <div className="flex items-center justify-center mb-8">
              <img src={stsmsLogo} alt="STSMS Logo" className="h-32 w-32 animate-float" />
            </div>
            
            <h1 className="text-hero mb-6">
              Tourist Safety Monitoring System
            </h1>
            
            <p className="text-xl lg:text-2xl text-foreground mb-4 max-w-3xl mx-auto">
              Ensuring safe and memorable travels across Incredible India with cutting-edge technology and real-time monitoring. Powered by Tourist Safety Monitoring System.
            </p>
            
            <p className="text-lg text-primary font-semibold mb-8">
              🇮🇳 Tourist Safety Monitoring System 🇮🇳
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button asChild size="lg" className="btn-hero text-lg px-8 py-4">
                <Link to="/register">Start Your Safe Journey</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-4">
                <Link to="/login">Sign In</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-hero">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Advanced Safety Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              State-of-the-art technology to ensure tourist safety across India's diverse destinations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="card-elevated text-center hover:shadow-hover transition-all duration-300">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <div className={`p-4 rounded-full bg-${feature.color}/10`}>
                      <feature.icon className={`h-8 w-8 text-${feature.color}`} />
                    </div>
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Overview */}
      <section className="py-20 bg-cultural">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
                Three Platforms, One Mission
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                STSMS serves tourists, police, and administrators with specialized interfaces designed for their unique needs while maintaining seamless coordination for maximum safety.
              </p>
              
              <div className="space-y-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                    <span className="text-foreground">{benefit.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <Card className="card-dashboard bg-gradient-to-br from-primary-light to-accent">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-primary" />
                    <span>Tourist Dashboard</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Personal safety monitoring, digital ID, emergency alerts, and real-time location sharing. Tourist Safety Monitoring System.
                  </p>
                  <div className="flex space-x-2">
                    <Badge variant="outline">Digital ID</Badge>
                    <Badge variant="outline">Panic Button</Badge>
                    <Badge variant="outline">Safety Score</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-dashboard bg-gradient-to-br from-danger-light to-red-50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-danger" />
                    <span>Police Command Center</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Real-time monitoring, emergency response coordination, and tourist cluster management. Tourist Safety Monitoring System.
                  </p>
                  <div className="flex space-x-2">
                    <Badge variant="outline">Live Tracking</Badge>
                    <Badge variant="outline">Response Units</Badge>
                    <Badge variant="outline">Risk Assessment</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-dashboard bg-gradient-to-br from-secondary-light to-gray-50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="h-5 w-5 text-secondary" />
                    <span>Admin Analytics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Comprehensive analytics, user management, and system oversight for optimal operations.
                  </p>
                  <div className="flex space-x-2">
                    <Badge variant="outline">Analytics</Badge>
                    <Badge variant="outline">User Management</Badge>
                    <Badge variant="outline">Reports</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary-glow text-primary-foreground">
        <div className="container mx-auto px-4 lg:px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <Heart className="h-16 w-16 mx-auto mb-6 animate-float" />
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Ready to Experience Safe Tourism?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of travelers who trust STSMS for their safety across India's incredible destinations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-4">
                <Link to="/register">Register Now</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-primary">
                <Link to="/login">Login to Dashboard</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-card border-t border-border">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <img src={stsmsLogo} alt="STSMS" className="h-16 w-16" />
                <div>
                  <h3 className="font-bold text-lg">TSMS</h3>
                  <p className="text-sm text-muted-foreground">Tourist Safety Monitoring System</p>
                </div>
              </div>
              <p className="text-muted-foreground mb-4">
                Ensuring safe and memorable travels across Incredible India with cutting-edge technology and real-time monitoring. Powered by Tourist Safety Monitoring System.
              </p>
              <div className="flex space-x-4">
                <Badge variant="outline">🇮🇳 Made in India</Badge>
                <Badge variant="outline">24/7 Support</Badge>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Emergency Contacts</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>Tourist Helpline: 1363</div>
                <div>Emergency: 112</div>
                <div>Police: 100</div>
                <div>Medical: 108</div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2 text-sm">
                <Link to="/register" className="block text-muted-foreground hover:text-primary">Register</Link>
                <Link to="/login" className="block text-muted-foreground hover:text-primary">Login</Link>
                <a href="#" className="block text-muted-foreground hover:text-primary">Support</a>
                <a href="#" className="block text-muted-foreground hover:text-primary">Privacy Policy</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Tourist Safety Monitoring System. All rights reserved. 🇮🇳</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
