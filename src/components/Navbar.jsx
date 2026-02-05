import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ByLaws from "./ByLaws";

/* ================= CONFIG ================= */

const PRINTING_FORM_URL =
  "https://forms.gle/bN2V1zq2mmv7SzRW9";

const PROJECT_ACE_EMAIL =
  "sscfortis@gmail.com"; // 🔁 palitan if may official email

/* ================= STUDENT SERVICES MODAL ================= */

function StudentServices({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* BACKDROP */}
          <motion.div
            className="fixed inset-0 bg-black/60 z-50"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* MODAL */}
          <motion.div
            className="
              fixed z-50 top-1/2 left-1/2
              w-[92%] max-w-lg
              bg-white rounded-2xl shadow-2xl
              overflow-hidden
            "
            initial={{ scale: 0.9, x: "-50%", y: "-50%" }}
            animate={{ scale: 1, x: "-50%", y: "-50%" }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            {/* HEADER */}
            <div className="bg-maroon text-yellow px-5 py-4 flex justify-between items-center">
              <h3 className="font-bold tracking-wide">
                SSC Student Services
              </h3>
              <button onClick={onClose}>✕</button>
            </div>

            {/* CONTENT */}
            <div className="p-6 space-y-8 text-darkblue">
              {/* PROJECT ACE */}
              <div>
                <h4 className="font-bold text-lg text-maroon mb-1">
                  Project ACE
                </h4>
                <p className="text-sm leading-relaxed mb-4">
                  Assistant Care with Excellence (ACE) is an SSC-led
                  initiative that provides academic assistance,
                  peer mentoring, and student welfare support.
                </p>

                <a
                  href={`mailto:${PROJECT_ACE_EMAIL}?subject=Project ACE Student Concern`}
                  className="
                    inline-block
                    bg-maroon text-yellow
                    px-5 py-2 rounded-full
                    text-sm font-semibold
                    hover:bg-maroon/90
                    transition
                  "
                >
                  📧 Email SSC Officers
                </a>
              </div>

              {/* PRINTING SERVICE */}
              <div>
                <h4 className="font-bold text-lg text-maroon mb-1">
                  SSC Printing Services
                </h4>
                <p className="text-sm leading-relaxed mb-4">
                  Affordable and student-friendly printing services
                  offered by the SSC to support academic and
                  organizational needs.
                </p>

                <a
                  href={PRINTING_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    inline-block
                    bg-maroon text-yellow
                    px-6 py-3 rounded-full
                    font-semibold text-sm
                    hover:bg-maroon/90 transition
                  "
                >
                  📤 Upload Documents for Printing
                </a>
              </div>
            </div>

            {/* FOOTER */}
            <div className="px-6 py-4 border-t text-right">
              <button
                onClick={onClose}
                className="
                  bg-maroon text-yellow
                  px-5 py-2 rounded-full
                  font-semibold
                "
              >
                Close
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ================= NAVBAR ================= */

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [pdfOpen, setPdfOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const links = [
    { label: "Home", id: "home" },
    { label: "About", id: "about" },
    { label: "News", id: "news" },
    { label: "Events", id: "events" },
    { label: "Officers", id: "officers" },
  ];

  /* ACTIVE LINK ON SCROLL */
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 140;

      if (window.scrollY < 100) {
        setActive("home");
        return;
      }

      for (const link of links) {
        if (link.id === "home") continue;
        const section = document.getElementById(link.id);
        if (!section) continue;

        if (
          scrollPos >= section.offsetTop &&
          scrollPos < section.offsetTop + section.offsetHeight
        ) {
          setActive(link.id);
          break;
        }
      }

      if (open) setOpen(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [open]);

  const goHome = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setActive("home");
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-40 bg-darkblue/70 backdrop-blur-lg border-b border-white/10 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
          {/* LOGO */}
          <button onClick={goHome} className="flex items-center gap-3">
            <img
              src="assets/ssc-logo.png"
              alt="SSC Logo"
              className="w-9 h-9 object-contain"
            />
            <div className="leading-tight text-yellow text-left">
              <div className="text-sm md:text-base font-extrabold tracking-widest">
                SUPREME STUDENT COUNCIL
              </div>
              <div className="text-[10px] md:text-[11px] italic text-yellow/70 leading-snug">
                Federation of Organized Representative
                <br className="hidden md:block" />
                Transformative Institutional Service
              </div>
            </div>
          </button>

          {/* DESKTOP LINKS */}
          <div className="hidden md:flex items-center space-x-8 font-semibold text-sm">
            {links.map((link) =>
              link.id === "home" ? (
                <button
                  key={link.id}
                  onClick={goHome}
                  className={`relative px-2 py-1 ${
                    active === "home"
                      ? "text-yellow after:absolute after:w-full after:h-0.5 after:bg-yellow after:-bottom-1 after:left-0"
                      : "text-yellow/70 hover:text-yellow"
                  }`}
                >
                  {link.label}
                </button>
              ) : (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  className={`relative px-2 py-1 ${
                    active === link.id
                      ? "text-yellow after:absolute after:w-full after:h-0.5 after:bg-yellow after:-bottom-1 after:left-0"
                      : "text-yellow/70 hover:text-yellow"
                  }`}
                >
                  {link.label}
                </a>
              )
            )}

            <button
              onClick={() => setServicesOpen(true)}
              className="text-yellow/70 hover:text-yellow"
            >
              Student Services
            </button>

            <button
              onClick={() => setPdfOpen(true)}
              className="text-yellow/70 hover:text-yellow"
            >
              By-Laws
            </button>
          </div>

          {/* MOBILE TOGGLE */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-3xl text-yellow"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* MODALS */}
      <ByLaws isOpen={pdfOpen} onClose={() => setPdfOpen(false)} />
      <StudentServices
        isOpen={servicesOpen}
        onClose={() => setServicesOpen(false)}
      />
    </>
  );
}
