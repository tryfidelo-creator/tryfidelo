import { createContext, useContext, useState, useEffect, useCallback, useRef, type ReactNode } from 'react';
import type { AuthState } from '@/types/user';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, firstName: string, lastName?: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const refreshTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /**
   * Refresh JWT token before expiration
   */
  const refreshToken = useCallback(async (): Promise<boolean> => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return false;
      }

      const response = await fetch(`${API_URL}/auth/refresh`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (!response.ok || !data.data?.token) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
        return false;
      }

      const newToken = data.data.token;
      localStorage.setItem('token', newToken);
      
      // Schedule next refresh
      scheduleTokenRefresh();
      return true;
    } catch (err) {
      console.error('Token refresh failed:', err);
      return false;
    }
  }, []);

  /**
   * Schedule token refresh 5 minutes before expiration
   */
  const scheduleTokenRefresh = useCallback(() => {
    if (refreshTimeoutRef.current) {
      clearTimeout(refreshTimeoutRef.current);
    }

    // Refresh 5 minutes before expiration (default 24 hour expiry = 86400 seconds)
    const refreshIn = (24 * 60 * 60 - 5 * 60) * 1000; // 23 hours 55 minutes
    
    refreshTimeoutRef.current = setTimeout(() => {
      refreshToken();
    }, refreshIn);
  }, [refreshToken]);

  // Check for stored auth token and validate on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');

        if (token && user) {
          // Verify token is still valid by calling /api/user/profile
          const response = await fetch(`${API_URL}/user/profile`, {
            credentials: 'include',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });

          if (response.ok) {
            const data = await response.json();
            setAuthState({
              user: data.data,
              isAuthenticated: true,
              isLoading: false,
            });
            // Schedule token refresh
            scheduleTokenRefresh();
          } else {
            // Token expired or invalid, try to refresh
            const refreshed = await refreshToken();
            if (!refreshed) {
              localStorage.removeItem('token');
              localStorage.removeItem('user');
              setAuthState({
                user: null,
                isAuthenticated: false,
                isLoading: false,
              });
            }
          }
        } else {
          setAuthState({
            user: null,
            isAuthenticated: false,
            isLoading: false,
          });
        }
      } catch (err) {
        console.error('Auth check failed:', err);
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();

    return () => {
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current);
      }
    };
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      const token = data.data.token;
      const user = data.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
      });

      // Schedule token refresh
      scheduleTokenRefresh();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [scheduleTokenRefresh]);

  const register = useCallback(async (email: string, password: string, firstName: string, lastName?: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          first_name: firstName,
          last_name: lastName || ''
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      const token = data.data.token;
      const user = data.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
      });

      // Schedule token refresh
      scheduleTokenRefresh();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Registration failed';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [scheduleTokenRefresh]);

  const logout = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        await fetch(`${API_URL}/auth/logout`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
      }
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      // Clear refresh timeout
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current);
      }

      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
      setError(null);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...authState, login, logout, register, isLoading, error }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;;
}