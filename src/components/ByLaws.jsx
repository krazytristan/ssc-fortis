// src/components/ByLaws.jsx
import { motion, AnimatePresence } from "framer-motion";

export default function ByLaws({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* OVERLAY */}
          <motion.div
            className="fixed inset-0 bg-black/70 z-50"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* MODAL */}
          <motion.div
            className="fixed z-50 top-1/2 left-1/2 w-[95%] md:w-[80%] h-[85%] md:h-[90%] 
                       bg-white/95 backdrop-blur-md rounded-xl shadow-2xl flex flex-col overflow-hidden"
            initial={{ opacity: 0, scale: 0.85, x: "-50%", y: "-50%" }}
            animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
            exit={{ opacity: 0, scale: 0.85 }}
          >
            {/* HEADER */}
            <div className="flex justify-between items-center bg-maroon text-yellow px-4 py-2 shadow-md">
              <h3 className="font-bold text-sm md:text-base">SSC By Laws</h3>
              <div className="flex gap-2">
                <a
                  href="/Handbook.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-yellow text-maroon px-3 py-1 rounded hover:bg-maroon hover:text-yellow transition text-xs"
                >
                  Download PDF
                </a>
                <button
                  onClick={onClose}
                  className="text-xl hover:text-red-400 transition"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* PDF DISPLAY */}
            <iframe
              src="/Handbook.pdf"
              title="SSC By Laws"
              className="w-full h-full"
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
