import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Mock users database
  const validUsers = [
    { email: 'l.pinte@ernath.eu', password: 'test', name: 'Lucas Pinte', role: 'user' },
    { email: 'admin@sherwin.com', password: 'admin123', name: 'Admin', role: 'admin' },
    { email: 'admin@ernath.eu', password: 'admin', name: 'Admin Ernath', role: 'admin' }
  ];

  const login = (email, password) => {
    // Mock login - in production, this would call an API
    const validUser = validUsers.find(u => u.email === email && u.password === password);

    if (validUser) {
      setUser({ email: validUser.email, name: validUser.name, role: validUser.role });
      setIsAuthenticated(true);
      setIsAdmin(validUser.role === 'admin');
      return { success: true, isAdmin: validUser.role === 'admin' };
    }
    return { success: false };
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      isAdmin,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
