import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Mock users database
  const validUsers = [
    { email: 'l.pinte@ernath.eu', password: 'test', name: 'Lucas Pinte' }
  ];

  const login = (email, password) => {
    // Mock login - in production, this would call an API
    const validUser = validUsers.find(u => u.email === email && u.password === password);

    if (validUser) {
      setUser({ email: validUser.email, name: validUser.name });
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
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
