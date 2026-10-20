import { createContext, useContext, useMemo, useState } from 'react';

const AuthContext = createContext(null);
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('devdirectory-session')) ?? null; } catch { return null; }
  });
  const login = (userPayload) => {
    const session = userPayload || { name: 'Team lead' };
    setUser(session);
    localStorage.setItem('devdirectory-session', JSON.stringify(session));
  };
  const logout = () => { setUser(null); localStorage.removeItem('devdirectory-session'); };
  const value = useMemo(() => ({ isAuthenticated: Boolean(user), user, login, logout }), [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider');
  return context;
}
