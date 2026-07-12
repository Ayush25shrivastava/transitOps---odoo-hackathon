import { motion } from 'framer-motion';

export default function KPICard({ title, value, icon: Icon, color, subtitle }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-[var(--color-bg-card)] rounded-xl p-6 border border-border flex items-center gap-4 hover-scale transition-all duration-300"
    >
      <div className={`p-3 rounded-xl ${color}`}>
        <Icon size={24} className="text-white" />
      </div>
      <div>
        <p className="text-text-secondary text-sm">{title}</p>
        <p className="text-2xl font-bold text-text-primary">{value}</p>
        {subtitle && <p className="text-xs text-text-secondary mt-0.5">{subtitle}</p>}
      </div>
    </motion.div>
  );
}
