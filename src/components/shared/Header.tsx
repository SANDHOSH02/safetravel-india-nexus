import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut, Bell, Search, Shield } from 'lucide-react';
import { Input } from '@/components/ui/input';
import stsmsLogo from '@/assets/stsms-logo.png';

interface HeaderProps {
  showSearch?: boolean;
  children?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ showSearch = true, children }) => {
  const { user, logout } = useAuth();

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'tourist': return 'default';
      case 'police': return 'destructive';
      case 'admin': return 'secondary';
      default: return 'outline';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'tourist': return 'text-primary';
      case 'police': return 'text-danger';
      case 'admin': return 'text-secondary';
      default: return 'text-foreground';
    }
  };

  return (
    <header className="bg-card border-b border-border shadow-card sticky top-0 z-50">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-3 interactive-scale">
              <img src={stsmsLogo} alt="STSMS Logo" className="h-12 w-12" />
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-primary">TSMS</h1>
                <p className="text-xs text-muted-foreground">Tourist Safety Monitoring System</p>
              </div>
            </Link>
          </div>

          {/* Search Bar */}
          {showSearch && user && (
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder={
                    user.role === 'tourist' ? 'Search locations, alerts...' :
                    user.role === 'police' ? 'Search tourists, incidents...' :
                    'Search users, analytics...'
                  }
                  className="pl-10 bg-muted/50 border-border"
                />
              </div>
            </div>
          )}

          {/* Custom Header Content */}
          {children}

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {/* Notifications */}
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 bg-danger text-danger-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    3
                  </span>
                </Button>

                {/* User Profile */}
                <div className="flex items-center space-x-3">
                  <div className="hidden sm:block text-right">
                    <p className="text-sm font-medium">{user.name}</p>
                    <div className="flex items-center justify-end space-x-2">
                      <Badge variant={getRoleBadgeVariant(user.role)} className="text-xs">
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </Badge>
                      {user.role === 'police' && (
                        <Shield className={`h-3 w-3 ${getRoleColor(user.role)}`} />
                      )}
                    </div>
                  </div>
                  <Avatar className="h-8 w-8 interactive-scale">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                </div>

                {/* Logout */}
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={logout}
                  className="text-muted-foreground hover:text-danger"
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" asChild>
                  <Link to="/login">Login</Link>
                </Button>
                <Button asChild className="btn-hero">
                  <Link to="/register">Register</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};