import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api } from '../services/api';
import { User, AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('@MindBlog:user');
    const storedToken = localStorage.getItem('@MindBlog:token');

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);

  const login = async ({ email, password }: { email: string; password: string }) => {
    const response = await api.post('/auth/login', { email, password });
    const { user, token } = response.data;

    localStorage.setItem('@MindBlog:user', JSON.stringify(user));
    localStorage.setItem('@MindBlog:token', token);

    setUser(user);
    setToken(token);
  };

  const register = async ({ name, email, password }: { name: string; email: string; password: string }) => {
    await api.post('/auth/register', { name, email, password });
    await login({ email, password });
  };

  const logout = () => {
    localStorage.removeItem('@MindBlog:user');
    localStorage.removeItem('@MindBlog:token');
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
