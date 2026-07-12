import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, TrendingUp } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';

const data = [
  { name: 'Fuel', value: 4000 },
  { name: 'Maintenance', value: 3000 },
  { name: 'Payroll', value: 3000 },
  { name: 'Insurance', value: 2000 },
];

const COLORS = ['#3b82f6', '#f59e0b', '#10b981', '#ef4444'];

const Reports = () => {
  return (
    <div className="w-full space-y-6 fade-in">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center">
            <FileText className="w-8 h-8 mr-3 text-purple-400" />
            Reports & Analytics
          </h1>
          <p className="text-gray-400 mt-2">Comprehensive insights into your fleet operations.</p>
        </div>
        <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors">
          <Download className="w-5 h-5 mr-2" />
          Export PDF
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[var(--color-bg-card)] p-6 rounded-xl border border-border hover-scale transition-all duration-300"
        >
          <h2 className="text-xl font-semibold mb-6 text-text-primary">Expense Breakdown</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid var(--color-border)', borderRadius: '0.5rem' }}
                  itemStyle={{ color: 'var(--color-text-primary)' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center space-x-4 mt-4 text-sm">
            {data.map((entry, index) => (
              <div key={entry.name} className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index] }}></div>
                <span className="text-text-secondary">{entry.name}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[var(--color-bg-card)] p-6 rounded-xl border border-border flex flex-col justify-center items-center text-center hover-scale transition-all duration-300"
        >
           <div className="p-4 bg-emerald-500/10 rounded-full mb-4">
             <TrendingUp className="w-12 h-12 text-emerald-400" />
           </div>
            <h3 className="text-2xl font-bold text-text-primary mb-2">Efficiency Score: 94%</h3>
            <p className="text-text-secondary">Your fleet is operating at high efficiency compared to last quarter.</p>
            <button className="mt-6 px-4 py-2 border border-border rounded-lg text-text-secondary hover:bg-[var(--color-border)] hover:text-text-primary transition-colors hover-scale">
             View Detailed Metrics
           </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Reports;
