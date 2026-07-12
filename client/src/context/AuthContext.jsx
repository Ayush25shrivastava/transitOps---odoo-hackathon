import { createContext, useContext, useState, useEffect } from 'react';
import axiosInstance from '../api/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('transitops_token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      axiosInstance
        .get('/auth/me')
        .then(res => setUser(res.data.data || res.data))
        .catch(() => {
          setToken(null);
          localStorage.removeItem('transitops_token');
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [token]);

  const login = async (email, password) => {
    const res = await axiosInstance.post('/auth/login', { email, password });
    const { token: t, user: u } = res.data.data || res.data;
    localStorage.setItem('transitops_token', t);
    setToken(t);
    setUser(u);
    return u;
  };

  const logout = () => {
    localStorage.removeItem('transitops_token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
