import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Button } from '../components/ui/Button';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Dispatcher');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-color-bg-base flex">
      {/* Left Panel - Dark Gradient */}
      <div className="hidden lg:flex lg:w-2/5 bg-gradient-to-br from-slate-900 via-primary-dark to-slate-900 flex-col justify-between p-16 text-white relative overflow-hidden">
        {/* Abstract Background Element */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full mix-blend-multiply filter blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-info rounded-full mix-blend-multiply filter blur-3xl opacity-30 translate-y-1/2 -translate-x-1/2"></div>
        
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="relative z-10">
          <div className="w-14 h-14 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl flex items-center justify-center mb-8">
             <div className="w-8 h-8 bg-gradient-to-tr from-primary to-info rounded-md shadow-inner"></div>
          </div>
          <h1 className="text-4xl font-bold mb-3 tracking-tight text-white">TransitOps</h1>
          <p className="text-indigo-200 text-lg font-light">Smart Transport Operations Platform</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="mt-16 relative z-10">
          <h3 className="font-semibold mb-6 text-xl tracking-tight text-white/90">One login, multiple roles</h3>
          <ul className="space-y-5">
            {['Fleet Manager', 'Dispatcher', 'Safety Officer', 'Financial Analyst'].map((r, i) => (
              <motion.li 
                initial={{ opacity: 0, x: -10 }} 
                animate={{ opacity: 1, x: 0 }} 
                transition={{ delay: 0.3 + (i * 0.1) }} 
                key={i} 
                className="flex items-center gap-4 text-indigo-100 font-medium bg-white/5 p-3 rounded-lg border border-white/10 backdrop-blur-sm"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-info shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                {r}
              </motion.li>
            ))}
          </ul>
        </motion.div>
        
        <div className="mt-auto pt-16 text-xs text-indigo-300/60 uppercase tracking-widest font-semibold relative z-10">
          TransitOps © 2026 • Enterprise Edition
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 bg-[var(--color-bg-base)] relative">
        <div className="w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="bg-[var(--color-bg-card)] p-10 rounded-2xl shadow-xl border border-[var(--color-border)]"
          >
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold text-text-primary mb-3 tracking-tight">Welcome back</h2>
              <p className="text-text-secondary text-sm font-medium">Enter your credentials to access your dashboard</p>
            </div>
            
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Email Address</label>
                <Input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="raven.k@transitops.in"
                  className="bg-[var(--color-bg-base)] border-border focus:bg-[var(--color-bg-sidebar)] transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Password</label>
                <Input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-[var(--color-bg-base)] border-border focus:bg-[var(--color-bg-sidebar)] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Role (RBAC Simulation)</label>
                <Select value={role} onChange={(e) => setRole(e.target.value)} className="bg-[var(--color-bg-base)] border-border focus:bg-[var(--color-bg-sidebar)] transition-colors">
                  <option value="Fleet Manager">Fleet Manager</option>
                  <option value="Dispatcher">Dispatcher</option>
                  <option value="Safety Officer">Safety Officer</option>
                  <option value="Financial Analyst">Financial Analyst</option>
                </Select>
              </div>
              
              <div className="flex items-center justify-between text-sm pt-2">
                <label className="flex items-center text-slate-600 font-medium cursor-pointer gap-2 hover:text-primary transition-colors">
                  <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary accent-primary" defaultChecked />
                  Remember me
                </label>
                <a href="#" className="text-primary font-semibold hover:text-primary-dark transition-colors">Forgot password?</a>
              </div>
              
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="pt-4">
                <Button type="submit" className="w-full py-3.5 bg-primary hover:bg-primary-dark text-white font-semibold text-sm rounded-xl shadow-lg shadow-primary/30 transition-all">
                  Sign In to Workspace
                </Button>
              </motion.div>
            </form>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mt-8 text-sm font-medium text-slate-500 text-center px-4">
            <p className="mb-2">Your access level is determined by your role.</p>
            <p className="text-xs text-slate-400">Contact IT support if you need to elevate permissions.</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;
