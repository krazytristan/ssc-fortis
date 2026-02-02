import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCoins,
  FaUsers,
  FaMobileAlt,
  FaPrint,
  FaCheckCircle,
  FaIdBadge,
  FaUpload,
} from "react-icons/fa";

// ✅ IMPORT YOUR QR IMAGE HERE
import gcashQR from "../assets/qrcode.jpg";

/* ===============================
   DATA
================================ */
const pages = [
  {
    title: "Membership Fee",
    text: "₱100 – One-time SSC Membership Fee",
    icon: <FaCoins />,
  },
  {
    title: "Member Privileges",
    text: "Join SSC events, leadership programs, community services, and exclusive activities.",
    icon: <FaUsers />,
  },
  {
    title: "How to Pay",
    text: "Pay via GCash and upload your payment proof.",
    icon: <FaMobileAlt />,
    payment: true,
  },
];

/* ===============================
   MAIN COMPONENT
================================ */
export default function MembershipFee() {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [paid, setPaid] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);

  const nextPage = () => setPage((p) => Math.min(p + 1, pages.length - 1));
  const prevPage = () => setPage((p) => Math.max(p - 1, 0));

  const handleUpload = () => {
    setUploading(true);

    // 🔗 Replace with backend API later
    setTimeout(() => {
      setUploading(false);
      setPaid(true);
      setShowReceipt(true);
    }, 1500);
  };

  return (
    <>
      {/* ===============================
          FLOATING BUTTON (AUTO-HIDE)
      ================================ */}
      <AnimatePresence>
        {!open && (
          <motion.div
            className="fixed left-0 top-1/4 z-50"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <button
              onClick={() => {
                setOpen(true);
                setPage(0);
              }}
              className="
                flex items-center gap-2
                bg-maroon/80 backdrop-blur-md text-yellow
                px-4 py-3 rounded-r-full shadow-2xl
                font-bold hover:scale-105 transition
              "
            >
              {/* ICON (always visible) */}
              <FaIdBadge className="text-xl" />

              {/* TEXT (desktop only) */}
              <span className="hidden md:inline">
                Membership
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===============================
          PAID BADGE
      ================================ */}
      {paid && (
        <div
          className="fixed bottom-6 right-6 z-50
                     bg-green-600 text-white
                     px-5 py-3 rounded-full
                     flex items-center gap-2 shadow-xl"
        >
          <FaIdBadge /> Paid Member
        </div>
      )}

      {/* ===============================
          MODAL
      ================================ */}
      <AnimatePresence>
        {open && (
          <>
            {/* OVERLAY */}
            <motion.div
              className="fixed inset-0 bg-black/80 z-40"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* MODAL BOX */}
            <motion.div
              className="
                fixed z-50 top-1/2 left-1/2
                w-[95%] md:w-[540px]
                max-h-[85vh]
                bg-gradient-to-br from-yellow to-amber-200
                text-maroon rounded-2xl
                shadow-[0_25px_70px_rgba(0,0,0,.6)]
                flex flex-col overflow-hidden
              "
              initial={{ scale: 0.85, opacity: 0, x: "-50%", y: "-50%" }}
              animate={{ scale: 1, opacity: 1, x: "-50%", y: "-50%" }}
              exit={{ scale: 0.85, opacity: 0 }}
            >
              {/* HEADER */}
              <div className="bg-maroon text-yellow px-6 py-4 flex justify-between items-center">
                <h2 className="text-xl font-extrabold">
                  SSC Membership
                </h2>
                <button
                  onClick={() => setOpen(false)}
                  className="text-2xl"
                >
                  ✕
                </button>
              </div>

              {/* CONTENT */}
              <div className="flex-1 p-6 overflow-y-auto">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={page}
                    className="flex flex-col items-center text-center gap-5"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                  >
                    <div className="text-5xl">
                      {pages[page].icon}
                    </div>

                    <h3 className="text-2xl font-extrabold">
                      {pages[page].title}
                    </h3>

                    <p className="text-lg max-w-md">
                      {pages[page].text}
                    </p>

                    {/* PAYMENT */}
                    {pages[page].payment && !paid && (
                      <div className="w-full bg-white/90 rounded-xl p-4 shadow-inner">
                        <p className="font-bold mb-3 text-center">
                          GCash Payment
                        </p>

                        <div
                          className="w-44 h-44 mx-auto mb-4
                                     rounded-xl overflow-hidden
                                     border-4 border-maroon
                                     shadow-lg bg-white"
                        >
                          <img
                            src={gcashQR}
                            alt="GCash QR Code"
                            className="w-full h-full object-contain"
                          />
                        </div>

                        <p className="text-sm mb-4 text-center leading-relaxed">
                          Account Name:<br />
                          <b>Kathryne Anne G. Sapon</b><br />
                          <span className="text-xs">(SSC Treasurer)</span>
                          <br /><br />
                          Amount: <b>₱100.00</b>
                        </p>

                        <label className="block w-full cursor-pointer">
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleUpload}
                          />
                          <div
                            className="flex items-center justify-center gap-2
                                       bg-maroon text-yellow py-3 rounded-lg
                                       font-bold hover:bg-darkblue transition"
                          >
                            <FaUpload />
                            {uploading ? "Uploading..." : "Upload Payment Proof"}
                          </div>
                        </label>
                      </div>
                    )}

                    {/* CONFIRMATION */}
                    {paid && (
                      <div className="flex flex-col items-center text-green-700">
                        <FaCheckCircle className="text-5xl" />
                        <p className="font-bold text-lg mt-2">
                          Membership Activated
                        </p>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* FOOTER */}
              <div className="bg-maroon text-yellow px-6 py-4 flex justify-between items-center">
                <button
                  onClick={prevPage}
                  disabled={page === 0}
                  className="bg-yellow text-maroon px-4 py-2 rounded disabled:opacity-40"
                >
                  ◀ Back
                </button>

                <span className="text-sm font-semibold">
                  {page + 1} / {pages.length}
                </span>

                <button
                  onClick={nextPage}
                  disabled={page === pages.length - 1}
                  className="bg-yellow text-maroon px-4 py-2 rounded disabled:opacity-40"
                >
                  Next ▶
                </button>
              </div>
            </motion.div>

            {/* RECEIPT */}
            <AnimatePresence>
              {showReceipt && (
                <>
                  <motion.div
                    className="fixed inset-0 bg-black/70 z-50"
                    onClick={() => setShowReceipt(false)}
                  />
                  <motion.div
                    className="
                      fixed z-[60] top-1/2 left-1/2
                      w-[90%] md:w-[420px]
                      bg-white rounded-xl p-6
                      text-maroon shadow-2xl
                    "
                    initial={{ scale: 0.8, opacity: 0, x: "-50%", y: "-50%" }}
                    animate={{ scale: 1, opacity: 1, x: "-50%", y: "-50%" }}
                    exit={{ scale: 0.8, opacity: 0 }}
                  >
                    <h3 className="text-xl font-extrabold mb-4">
                      SSC Membership Receipt
                    </h3>

                    <p className="text-sm">Amount: <b>₱100</b></p>
                    <p className="text-sm">Payment Method: <b>GCash</b></p>
                    <p className="text-sm mb-4">
                      Status: <b className="text-green-600">Confirmed</b>
                    </p>

                    <div className="flex gap-3">
                      <button
                        onClick={() => window.print()}
                        className="flex-1 flex items-center justify-center gap-2
                                   bg-maroon text-yellow py-2 rounded-lg"
                      >
                        <FaPrint /> Print / Save PDF
                      </button>
                      <button
                        onClick={() => setShowReceipt(false)}
                        className="flex-1 bg-gray-200 py-2 rounded-lg"
                      >
                        Close
                      </button>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
