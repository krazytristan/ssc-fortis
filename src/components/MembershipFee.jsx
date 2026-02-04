import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import jsPDF from "jspdf";
import {
  FaCoins,
  FaUsers,
  FaMobileAlt,
  FaPrint,
  FaCheckCircle,
  FaIdBadge,
  FaUpload,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";

import gcashQR from "../assets/qrcode.jpg";

/* ===============================
   DATA
================================ */
const pages = [
  {
    title: "Membership Fee",
    text: "₱100 – SSC Membership Fee (Per Trimester)", // 🔽 UPDATED
    icon: <FaCoins />,
  },
  {
    title: "Member Privileges",
    text: "Join SSC events, leadership programs, community services, and exclusive activities.",
    icon: <FaUsers />,
  },
  {
    title: "How to Pay",
    text: "Login first, then pay via GCash and upload your payment proof.",
    icon: <FaMobileAlt />,
    payment: true,
  },
];

export default function MembershipFee({ user }) {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [paid, setPaid] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);

  const nextPage = () =>
    setPage((p) => Math.min(p + 1, pages.length - 1));
  const prevPage = () =>
    setPage((p) => Math.max(p - 1, 0));

  /* ===============================
     KEYBOARD (DESKTOP)
  ================================ */
  useEffect(() => {
    if (!open) return;

    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowRight") nextPage();
      if (e.key === "ArrowLeft") prevPage();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  /* ===============================
     BACKEND-READY UPLOAD
  ================================ */
  const handleUpload = async (e) => {
    // 🔽 UPDATED: require login
    if (!user) {
      window.location.href = "/login";
      return;
    }

    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("receipt", file);
    formData.append("amount", 100);
    formData.append("payment_method", "GCash");
    if (user?.id) formData.append("user_id", user.id);

    try {
      await fetch("/api/membership/upload", {
        method: "POST",
        body: formData,
      });

      generateReceiptPDF();
      setPaid(true);
      setShowReceipt(true);
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setUploading(false);
    }
  };

  /* ===============================
     PDF RECEIPT
  ================================ */
  const generateReceiptPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("SSC Membership Receipt", 105, 25, { align: "center" });

    doc.setFontSize(12);
    doc.text(`Name: ${user?.name || "Student"}`, 20, 50);
    doc.text("Amount: ₱100 (Per Trimester)", 20, 60); // 🔽 UPDATED
    doc.text("Payment Method: GCash", 20, 70);
    doc.text("Status: Confirmed", 20, 80);

    doc.save("SSC-Membership-Receipt.pdf");
  };

  return (
    <>
      {/* FLOATING BUTTON */}
      {!open && (
        <button
          onClick={() => {
            setOpen(true);
            setPage(0);
          }}
          className="fixed left-0 top-1/4 z-50
                     flex items-center gap-2
                     bg-maroon/80 backdrop-blur-md text-yellow
                     px-4 py-3 rounded-r-full shadow-2xl
                     font-bold hover:scale-105 transition"
        >
          <FaIdBadge className="text-xl" />
          <span className="hidden md:inline">Membership</span>
        </button>
      )}

      {/* PAID BADGE */}
      {paid && (
        <div className="fixed bottom-6 right-6 z-50
                        bg-green-600 text-white
                        px-5 py-3 rounded-full
                        flex items-center gap-2 shadow-xl">
          <FaIdBadge /> Paid Member
        </div>
      )}

      {/* MODAL */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 bg-black/80
                       flex items-center justify-center"
            onClick={() => setOpen(false)}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="w-[95%] md:w-[560px]
                         max-h-[90vh]
                         bg-gradient-to-br from-yellow to-amber-200
                         text-maroon rounded-2xl
                         shadow-[0_25px_70px_rgba(0,0,0,.6)]
                         flex flex-col overflow-hidden"
            >
              {/* HEADER */}
              <div className="bg-maroon text-yellow px-6 py-4 flex justify-between items-center">
                <h2 className="text-xl font-extrabold">
                  SSC Membership
                </h2>
                <button onClick={() => setOpen(false)}>✕</button>
              </div>

              {/* CONTENT */}
              <div className="flex-1 p-6 overflow-y-auto text-center">
                <div className="text-5xl mb-3">
                  {pages[page].icon}
                </div>

                <h3 className="text-2xl font-extrabold">
                  {pages[page].title}
                </h3>

                <p className="mt-2">{pages[page].text}</p>

                {pages[page].payment && !paid && (
                  <div className="mt-6 bg-white/90 p-4 rounded-xl">
                    <img
                      src={gcashQR}
                      alt="GCash QR"
                      className="w-44 mx-auto mb-4"
                    />

                    <p className="text-sm">
                      Account Name:<br />
                      <b>Kathryne Anne G. Sapon</b><br />
                      <span className="text-xs">(SSC Treasurer)</span><br />
                      <b>0908-655-8661</b><br /><br />
                      Amount: <b>₱100.00 (Per Trimester)</b>
                    </p>

                    {/* 🔽 UPDATED BUTTON */}
                    <label className="block mt-4 cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        disabled={!user} // 🔽 UPDATED
                        onChange={handleUpload}
                      />
                      <div className="bg-maroon text-yellow py-3 rounded-lg
                                      font-bold flex justify-center gap-2">
                        <FaUpload />
                        {!user
                          ? "Login to Upload Payment Proof"
                          : uploading
                          ? "Uploading..."
                          : "Upload Payment Proof"}
                      </div>
                    </label>
                  </div>
                )}

                {paid && (
                  <div className="mt-6 text-green-700">
                    <FaCheckCircle className="text-5xl mx-auto" />
                    <p className="font-bold mt-2">
                      Membership Activated
                    </p>
                  </div>
                )}
              </div>

              {/* FOOTER NAV */}
              <div className="bg-maroon text-yellow px-6 py-4
                              flex justify-between items-center">
                <button
                  onClick={prevPage}
                  disabled={page === 0}
                  className="bg-yellow text-maroon px-4 py-2 rounded disabled:opacity-40"
                >
                  <FaArrowLeft /> Back
                </button>

                <span className="text-sm font-semibold">
                  {page + 1} / {pages.length}
                </span>

                <button
                  onClick={nextPage}
                  disabled={page === pages.length - 1}
                  className="bg-yellow text-maroon px-4 py-2 rounded disabled:opacity-40"
                >
                  Next <FaArrowRight />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* RECEIPT */}
      <AnimatePresence>
        {showReceipt && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/70
                       flex items-center justify-center"
            onClick={() => setShowReceipt(false)}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-xl p-6 w-[90%] md:w-[420px]"
            >
              <h3 className="text-xl font-extrabold mb-4">
                SSC Membership Receipt
              </h3>
              <p>Amount: ₱100 (Per Trimester)</p>
              <p>Payment: GCash</p>
              <p className="text-green-600 font-bold">Confirmed</p>

              <button
                onClick={() => window.print()}
                className="mt-4 w-full bg-maroon text-yellow py-2 rounded-lg
                           flex justify-center gap-2"
              >
                <FaPrint /> Print / Save PDF
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
