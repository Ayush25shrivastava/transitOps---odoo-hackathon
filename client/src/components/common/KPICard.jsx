import { motion } from 'framer-motion';

export default function KPICard({ title, value, icon: Icon, color, subtitle }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-[#1F2937] rounded-xl p-6 border border-[#374151] flex items-center gap-4"
    >
      <div className={`p-3 rounded-xl ${color}`}>
        <Icon size={24} className="text-white" />
      </div>
      <div>
        <p className="text-[#9CA3AF] text-sm">{title}</p>
        <p className="text-2xl font-bold text-[#F9FAFB]">{value}</p>
        {subtitle && <p className="text-xs text-[#9CA3AF] mt-0.5">{subtitle}</p>}
      </div>
    </motion.div>
  );
}
