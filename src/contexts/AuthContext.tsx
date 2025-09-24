import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'tourist' | 'police' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  badgeId?: string; // For police
  departmentCode?: string; // For admin
  phoneNumber?: string; // For tourist
  homeCountry?: string; // For tourist
  emergencyContact?: string; // For tourist
  stationLocation?: string; // For police
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  register: (userData: Partial<User>, password: string) => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Mock authentication functions for demo
  const login = async (email: string, password: string, role: UserRole) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock user data based on role
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
  name: role === 'tourist' ? 'Sandhosh G' : role === 'police' ? 'Inspector Raj Kumar' : 'Admin Rakesh',
      email,
      role,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      ...(role === 'tourist' && {
        phoneNumber: '+91-9876543210',
        homeCountry: 'Canada',
        emergencyContact: 'John Sharma (+1-555-0123)'
      }),
      ...(role === 'police' && {
        badgeId: 'DL-POL-2024-1234',
        stationLocation: 'New Delhi Central'
      }),
      ...(role === 'admin' && {
        departmentCode: 'TOURISM-ADMIN-001'
      })
    };
    
    setUser(mockUser);
    setIsLoading(false);
  };

  const register = async (userData: Partial<User>, password: string) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.email}`,
      ...userData
    } as User;
    
    setUser(newUser);
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    // Clear any session/local storage if used for auth
    localStorage.clear();
    sessionStorage.clear();
    // Optionally, force a navigation to login to clear history
    window.location.replace('/login');
  };

  const value = {
    user,
    login,
    logout,
    register,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};