import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';export interface User {
  username: string;
}

interface AuthContextType {
  currentUser: User | null;
  login: (username: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Khôi phục user từ localStorage khi mới load app
    const savedUser = localStorage.getItem('gs_pgs_current_user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (username: string) => {
    const user = { username };
    setCurrentUser(user);
    localStorage.setItem('gs_pgs_current_user', JSON.stringify(user));
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('gs_pgs_current_user');
  };

  if (loading) {
    return null; // Hoặc màn hình loading
  }

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
