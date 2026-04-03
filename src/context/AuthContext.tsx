import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';

interface AuthContextType {
  user: User | null;
  role: UserRole;
  setRole: (role: UserRole) => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>('admin');
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Simulate user login
    setUser({
      id: '1',
      name: 'yogeeta',
      email: 'yogeeta1312@gmail.com',
      role: role,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=yogeeta'
    });
  }, [role]);

  const isAdmin = role === 'admin';

  return (
    <AuthContext.Provider value={{ user, role, setRole, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
