import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Shield, Eye, EyeOff, Check, X } from 'lucide-react';
import tajMahalBg from '@/assets/taj-mahal-bg.jpg';
import stsmsLogo from '@/assets/stsms-logo.png';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'tourist' as UserRole,
    phoneNumber: '',
    homeCountry: '',
    emergencyContact: '',
    badgeId: '',
    stationLocation: '',
    departmentCode: '',
    agreeTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register, isLoading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[a-z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    return strength;
  };

  const passwordStrength = getPasswordStrength(formData.password);
  const passwordsMatch = formData.password && formData.confirmPassword && formData.password === formData.confirmPassword;

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return false;
    }

    if (passwordStrength < 75) {
      toast({
        title: "Weak Password",
        description: "Please choose a stronger password",
        variant: "destructive",
      });
      return false;
    }

    if (!formData.agreeTerms) {
      toast({
        title: "Terms Required",
        description: "Please accept the terms and conditions",
        variant: "destructive",
      });
      return false;
    }

    // Role-specific validation
    if (formData.role === 'tourist' && !formData.phoneNumber) {
      toast({
        title: "Phone Required",
        description: "Phone number is required for tourists",
        variant: "destructive",
      });
      return false;
    }

    if (formData.role === 'police' && (!formData.badgeId || !formData.stationLocation)) {
      toast({
        title: "Police Details Required",
        description: "Badge ID and station location are required",
        variant: "destructive",
      });
      return false;
    }

    if (formData.role === 'admin' && !formData.departmentCode) {
      toast({
        title: "Department Code Required",
        description: "Department code is required for administrators",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      await register({
        name: formData.name,
        email: formData.email,
        role: formData.role,
        phoneNumber: formData.phoneNumber || undefined,
        homeCountry: formData.homeCountry || undefined,
        emergencyContact: formData.emergencyContact || undefined,
        badgeId: formData.badgeId || undefined,
        stationLocation: formData.stationLocation || undefined,
        departmentCode: formData.departmentCode || undefined,
      }, formData.password);
      
      toast({
        title: "Registration Successful!",
        description: `Welcome to STSMS, ${formData.name}!`,
      });
      
      // Navigate to role-specific dashboard
      navigate(`/${formData.role}/dashboard`);
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "An error occurred during registration",
        variant: "destructive",
      });
    }
  };

  const indianCities = [
    'New Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad',
    'Pune', 'Ahmedabad', 'Surat', 'Jaipur', 'Lucknow', 'Kanpur', 'Nagpur',
    'Indore', 'Thane', 'Bhopal', 'Visakhapatnam', 'Pimpri', 'Patna', 'Vadodara'
  ];

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat py-8"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 123, 255, 0.1), rgba(0, 123, 255, 0.2)), url(${tajMahalBg})`
      }}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 animate-fade-up">
            <div className="flex items-center justify-center mb-4">
              <img src={stsmsLogo} alt="STSMS Logo" className="h-16 w-16 animate-float" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Join STSMS</h1>
            <p className="text-muted-foreground">Create your account for safer travels</p>
            <p className="text-sm text-primary font-medium">Safe Travels in Incredible India</p>
          </div>

          {/* Registration Form */}
          <Card className="card-elevated animate-slide-in">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center">Create Account</CardTitle>
              <CardDescription className="text-center">
                Fill in your details to get started
              </CardDescription>
            </CardHeader>
            
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="role">User Type *</Label>
                    <Select value={formData.role} onValueChange={(value) => handleChange('role', value as UserRole)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tourist">
                          <div className="flex items-center space-x-2">
                            <span>🧳</span>
                            <span>Tourist</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="police">
                          <div className="flex items-center space-x-2">
                            <Shield className="h-4 w-4" />
                            <span>Police Officer</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="admin">
                          <div className="flex items-center space-x-2">
                            <span>⚙️</span>
                            <span>Administrator</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    required
                  />
                </div>

                {/* Password Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">Password *</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a strong password"
                        value={formData.password}
                        onChange={(e) => handleChange('password', e.target.value)}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                    {formData.password && (
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span>Password Strength</span>
                          <span className={passwordStrength >= 75 ? 'text-success' : passwordStrength >= 50 ? 'text-warning' : 'text-danger'}>
                            {passwordStrength >= 75 ? 'Strong' : passwordStrength >= 50 ? 'Medium' : 'Weak'}
                          </span>
                        </div>
                        <Progress value={passwordStrength} className="h-2" />
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password *</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={(e) => handleChange('confirmPassword', e.target.value)}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                      {formData.confirmPassword && (
                        <div className="absolute right-10 top-1/2 transform -translate-y-1/2">
                          {passwordsMatch ? (
                            <Check className="h-4 w-4 text-success" />
                          ) : (
                            <X className="h-4 w-4 text-danger" />
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Role-specific fields */}
                {formData.role === 'tourist' && (
                  <div className="space-y-4 p-4 bg-accent/30 rounded-lg">
                    <h3 className="font-semibold text-primary">Tourist Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phoneNumber">Phone Number *</Label>
                        <Input
                          id="phoneNumber"
                          placeholder="+91-9876543210"
                          value={formData.phoneNumber}
                          onChange={(e) => handleChange('phoneNumber', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="homeCountry">Home Country</Label>
                        <Input
                          id="homeCountry"
                          placeholder="e.g., Canada, USA, UK"
                          value={formData.homeCountry}
                          onChange={(e) => handleChange('homeCountry', e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="emergencyContact">Emergency Contact</Label>
                      <Input
                        id="emergencyContact"
                        placeholder="Name and phone number"
                        value={formData.emergencyContact}
                        onChange={(e) => handleChange('emergencyContact', e.target.value)}
                      />
                    </div>
                  </div>
                )}

                {formData.role === 'police' && (
                  <div className="space-y-4 p-4 bg-danger/10 rounded-lg">
                    <h3 className="font-semibold text-danger">Police Officer Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="badgeId">Badge ID *</Label>
                        <Input
                          id="badgeId"
                          placeholder="DL-POL-2024-1234"
                          value={formData.badgeId}
                          onChange={(e) => handleChange('badgeId', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="stationLocation">Station Location *</Label>
                        <Select value={formData.stationLocation} onValueChange={(value) => handleChange('stationLocation', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select station" />
                          </SelectTrigger>
                          <SelectContent>
                            {indianCities.map(city => (
                              <SelectItem key={city} value={city}>{city} Police Station</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                )}

                {formData.role === 'admin' && (
                  <div className="space-y-4 p-4 bg-secondary/10 rounded-lg">
                    <h3 className="font-semibold text-secondary">Administrator Information</h3>
                    <div className="space-y-2">
                      <Label htmlFor="departmentCode">Department Code *</Label>
                      <Input
                        id="departmentCode"
                        placeholder="TOURISM-ADMIN-001"
                        value={formData.departmentCode}
                        onChange={(e) => handleChange('departmentCode', e.target.value)}
                      />
                    </div>
                  </div>
                )}

                {/* Terms and Conditions */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={formData.agreeTerms}
                    onCheckedChange={(checked) => handleChange('agreeTerms', checked as boolean)}
                  />
                  <Label htmlFor="terms" className="text-sm">
                    I agree to the{' '}
                    <Button variant="link" className="p-0 h-auto text-primary">
                      Terms of Service
                    </Button>
                    {' '}and{' '}
                    <Button variant="link" className="p-0 h-auto text-primary">
                      Privacy Policy
                    </Button>
                  </Label>
                </div>
              </CardContent>

              <CardFooter className="flex flex-col space-y-4">
                <Button 
                  type="submit" 
                  className="w-full btn-hero"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    'Create Account'
                  )}
                </Button>

                <div className="text-center text-sm">
                  Already have an account?{' '}
                  <Link to="/login" className="text-primary hover:underline font-medium">
                    Sign in here
                  </Link>
                </div>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Register;