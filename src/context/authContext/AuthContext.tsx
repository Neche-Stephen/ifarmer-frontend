import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface AuthContextProps {
  token: string | null;
  firebaseToken: string | null; // Add firebaseToken
  baseUrl: string;
  setToken: (token: string | null, username?: string | null, role?: string | null) => void; 
  setFirebaseToken: (token: string | null) => void; // Function to set firebaseToken
  isAuthenticated: boolean;
  adminName: string | null;
  userRole: string | null; 
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

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
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('token');
  });
  const [firebaseToken, setFirebaseToken] = useState<string | null>(() => {
    return localStorage.getItem('firebaseToken'); // Initialize from localStorage
  });
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!token);
  const [adminName, setAdminName] = useState<string | null>(() => {
    return localStorage.getItem('username') || null;  
  });
  const [userRole, setUserRole] = useState<string | null>(() => {
    return localStorage.getItem('userRole') || null;
  });

  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const saveToken = (userToken: string | null, username: string | null = null, role: string | null = null) => {
    if (userToken) {
      localStorage.setItem('token', userToken);
      if (username) {
        localStorage.setItem('username', username);
        setAdminName(username);
      }
      if (role) {
        localStorage.setItem('userRole', role);
        setUserRole(role);
      }
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('userRole'); 
      setAdminName(null);
      setUserRole(null);
      setIsAuthenticated(false);
    }
    setToken(userToken);
  };

  // Function to save Firebase token
  const saveFirebaseToken = (userFirebaseToken: string | null) => {
    if (userFirebaseToken) {
      localStorage.setItem('firebaseToken', userFirebaseToken); // Save firebase token
    } else {
      localStorage.removeItem('firebaseToken'); // Clear firebase token
    }
    setFirebaseToken(userFirebaseToken); // Update state
  };

  useEffect(() => {
    const expiration = localStorage.getItem('tokenExpiration');
    if (expiration && Date.now() > parseInt(expiration)) {
      console.log('Token has expired.');
      saveToken(null);
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, firebaseToken, baseUrl, setToken: saveToken, setFirebaseToken: saveFirebaseToken, isAuthenticated, adminName, userRole }}>
      {children}
    </AuthContext.Provider>
  );
};
