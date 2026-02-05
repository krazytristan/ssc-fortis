import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ByLaws from "./ByLaws";

/* ================= CONFIG ================= */

const PRINTING_FORM_URL =
  "https://forms.gle/bN2V1zq2mmv7SzRW9";

const PROJECT_ACE_EMAIL =
  "sscfortis@gmail.com";

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
                  Assistant Care with Excellence (ACE) provides
                  academic assistance, peer mentoring, and student
                  welfare support.
                </p>

                <a
                  href={`mailto:${PROJECT_ACE_EMAIL}?subject=Project ACE Student Concern`}
                  className="
                    inline-block bg-maroon text-yellow
                    px-5 py-2 rounded-full
                    text-sm font-semibold
                  "
                >
                  📧 Email SSC Officers
                </a>
              </div>

              {/* PRINTING */}
              <div>
                <h4 className="font-bold text-lg text-maroon mb-1">
                  SSC Printing Services
                </h4>
                <p className="text-sm leading-relaxed mb-4">
                  Student-friendly printing services for academic
                  and organizational needs.
                </p>

                <a
                  href={PRINTING_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    inline-block bg-maroon text-yellow
                    px-6 py-3 rounded-full
                    text-sm font-semibold
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
  const [menuOpen, setMenuOpen] = useState(false);
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

  /* ACTIVE LINK */
  useEffect(() => {
    const onScroll = () => {
      const pos = window.scrollY + 140;

      if (window.scrollY < 100) {
        setActive("home");
        return;
      }

      links.forEach((l) => {
        if (l.id === "home") return;
        const sec = document.getElementById(l.id);
        if (
          sec &&
          pos >= sec.offsetTop &&
          pos < sec.offsetTop + sec.offsetHeight
        ) {
          setActive(l.id);
        }
      });

      setMenuOpen(false);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goHome = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setActive("home");
    setMenuOpen(false);
  };

  return (
    <>
      {/* NAV */}
      <nav className="fixed top-0 left-0 w-full z-40 bg-darkblue/70 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
          {/* LOGO */}
          <button onClick={goHome} className="flex gap-3 items-center">
            <img src="assets/ssc-logo.png" className="w-9 h-9" />
            <div className="text-yellow text-left">
              <div className="font-extrabold tracking-widest text-sm md:text-base">
                SUPREME STUDENT COUNCIL
              </div>
              <div className="text-[10px] italic text-yellow/70 leading-snug">
                Federation of Organized Representative
                <br className="hidden md:block" />
                Transformative Institutional Service
              </div>
            </div>
          </button>

          {/* DESKTOP */}
          <div className="hidden md:flex gap-8 text-sm font-semibold">
            {links.map((l) =>
              l.id === "home" ? (
                <button
                  key={l.id}
                  onClick={goHome}
                  className={active === "home" ? "text-yellow" : "text-yellow/70"}
                >
                  {l.label}
                </button>
              ) : (
                <a
                  key={l.id}
                  href={`#${l.id}`}
                  className={
                    active === l.id ? "text-yellow" : "text-yellow/70"
                  }
                >
                  {l.label}
                </a>
              )
            )}

            <button onClick={() => setServicesOpen(true)}>
              Student Services
            </button>
            <button onClick={() => setPdfOpen(true)}>By-Laws</button>
          </div>

          {/* MOBILE TOGGLE */}
          <button
            className="md:hidden text-3xl text-yellow"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden bg-darkblue/95 px-6 py-4 space-y-3"
            >
              {links.map((l) => (
                <a
                  key={l.id}
                  href={l.id === "home" ? "#" : `#${l.id}`}
                  onClick={() => l.id === "home" && goHome()}
                  className="block px-4 py-2 rounded-lg text-yellow/80 hover:bg-maroon/60"
                >
                  {l.label}
                </a>
              ))}

              <button
                onClick={() => {
                  setServicesOpen(true);
                  setMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 rounded-lg text-yellow/80 hover:bg-maroon/60"
              >
                Student Services
              </button>

              <button
                onClick={() => {
                  setPdfOpen(true);
                  setMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 rounded-lg text-yellow/80 hover:bg-maroon/60"
              >
                By-Laws
              </button>
            </motion.div>
          )}
        </AnimatePresence>
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
