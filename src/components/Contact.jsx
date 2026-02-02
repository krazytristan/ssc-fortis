import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import {
  FaFacebookF,
  FaInstagram,
  FaEnvelope,
  FaCommentDots,
} from "react-icons/fa";

export default function Contact() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [consent, setConsent] = useState(false);
  const [showButton, setShowButton] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  /* ================= HERO VISIBILITY ================= */
  useEffect(() => {
    const heroSection = document.getElementById("hero");
    if (!heroSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowButton(entry.isIntersecting);
      },
      { threshold: 0.4 }
    );

    observer.observe(heroSection);

    return () => observer.disconnect();
  }, []);

  /* ================= FORM HANDLERS ================= */
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!consent) return;

    setLoading(true);
    setSent(false);

    emailjs
      .send(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        "YOUR_PUBLIC_KEY"
      )
      .then(() => {
        setSent(true);
        setFormData({ name: "", email: "", message: "" });
        setConsent(false);
      })
      .catch(() => alert("Failed to send message."))
      .finally(() => setLoading(false));
  };

  return (
    <>
      {/* ================= FLOATING BUTTON ================= */}
      <AnimatePresence>
        {!open && showButton && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            onClick={() => setOpen(true)}
            className="
              fixed bottom-6 right-6 z-40
              bg-yellow text-maroon
              p-4 rounded-full shadow-xl
              hover:bg-maroon hover:text-yellow
              transition transform hover:scale-110
            "
            aria-label="Contact SSC"
          >
            <FaCommentDots className="text-xl" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ================= CONTACT MODAL ================= */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[999] bg-black/70 flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="
                bg-darkblue text-yellow
                max-w-lg w-full rounded-3xl p-8
                shadow-2xl
              "
            >
              <h3 className="text-2xl font-bold mb-6 text-center">
                Contact Supreme Student Council
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  className="w-full p-3 rounded-xl bg-yellow text-darkblue font-semibold"
                />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  required
                  className="w-full p-3 rounded-xl bg-yellow text-darkblue font-semibold"
                />

                <textarea
                  rows="4"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  required
                  className="w-full p-3 rounded-xl bg-yellow text-darkblue font-semibold"
                />

                {/* DATA PRIVACY */}
                <label className="flex items-start gap-2 text-sm text-yellow/80">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-1"
                    required
                  />
                  I consent to the collection and processing of my personal data
                  in accordance with the Data Privacy Act of 2012.
                </label>

                <button
                  type="submit"
                  disabled={loading || !consent}
                  className="
                    w-full bg-yellow text-maroon font-bold
                    py-3 rounded-full
                    hover:bg-maroon hover:text-yellow
                    transition disabled:opacity-50
                  "
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>

                {sent && (
                  <p className="text-green-400 text-sm text-center font-semibold">
                    ✔ Message sent successfully!
                  </p>
                )}
              </form>

              {/* SOCIAL */}
              <div className="mt-6 flex justify-center gap-5">
                <a
                  href="https://web.facebook.com/profile.php?id=61580744985540"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-yellow text-maroon hover:bg-maroon hover:text-yellow"
                >
                  <FaFacebookF />
                </a>

                <a
                  href="mailto:ssc.amacclipa@gmail.com"
                  className="p-3 rounded-full bg-yellow text-maroon hover:bg-maroon hover:text-yellow"
                >
                  <FaEnvelope />
                </a>

                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-yellow text-maroon hover:bg-maroon hover:text-yellow"
                >
                  <FaInstagram />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
