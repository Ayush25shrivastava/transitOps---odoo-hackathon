import { createContext, useContext, useState, useEffect } from 'react';
import axiosInstance from '../api/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  /* --- ACTUAL AUTH CONTEXT CODE (COMMENTED OUT FOR TESTING) ---
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
  ------------------------------------------------------------- */

  // MOCKED STATE FOR TESTING: Always logged in as Fleet Manager
  const [user, setUser] = useState({
    _id: "60d21b4667d0d8992e610c85",
    name: "Test Admin",
    email: "admin@transitops.com",
    role: "fleet_manager"
  });
  const [token, setToken] = useState("mock-jwt-token-for-testing");
  const [loading, setLoading] = useState(false); // set to false instantly

  const login = async () => {
    // Already mocked as logged in, but just in case login is called:
    return user;
  };

  const logout = () => {
    console.log("Logout clicked, but auth is bypassed for testing.");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
