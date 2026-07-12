import { AnimatePresence, motion } from 'framer-motion';

export default function ConfirmDialog({ isOpen, onConfirm, onCancel, title, message, confirmLabel = 'Confirm', danger = false }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onCancel} />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative w-full max-w-sm bg-[#1F2937] rounded-2xl border border-[#374151] shadow-2xl p-6"
          >
            <h3 className="text-lg font-bold text-[#F9FAFB] mb-2">{title}</h3>
            <p className="text-[#9CA3AF] text-sm mb-6">{message}</p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={onCancel}
                className="px-4 py-2 rounded-lg border border-[#374151] text-[#9CA3AF] hover:text-[#F9FAFB] hover:bg-[#374151] transition-colors text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  danger
                    ? 'bg-red-500 hover:bg-red-600 text-white'
                    : 'bg-[#F59E0B] hover:bg-[#D97706] text-black'
                }`}
              >
                {confirmLabel}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
