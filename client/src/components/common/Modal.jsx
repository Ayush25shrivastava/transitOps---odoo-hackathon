import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';

const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-2xl',
};

export default function Modal({ isOpen, onClose, title, children, size = 'md' }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: 'spring', duration: 0.3 }}
            className={`relative w-full ${sizeClasses[size]} bg-[#1F2937] rounded-2xl border border-[#374151] shadow-2xl`}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-[#374151]">
              <h2 className="text-lg font-bold text-[#F9FAFB]">{title}</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-lg text-[#9CA3AF] hover:text-[#F9FAFB] hover:bg-[#374151] transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            <div className="p-6">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
