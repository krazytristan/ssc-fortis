import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ByLaws from "./ByLaws";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("hero");
  const [pdfOpen, setPdfOpen] = useState(false);

  // Navigation links
  const links = [
    { label: "Hero", id: "hero" },
    { label: "About", id: "about" },
    { label: "News", id: "news" },
    { label: "Events", id: "events" },
    { label: "Officers", id: "officers" },
  ];

  /* ================= ACTIVE LINK ON SCROLL ================= */
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 140;

      for (const link of links) {
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
  }, [open, links]); // ✅ FIXED: added `links`

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-darkblue/70 backdrop-blur-lg border-b border-white/10 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">

          {/* ================= LOGO ================= */}
          <a href="#hero" className="flex items-center gap-3 group">
            <img
              src="/assets/ssc-logo.png"
              alt="SSC Logo"
              className="w-9 h-9 object-contain group-hover:scale-105 transition"
            />
            <div className="leading-tight text-yellow">
              <div className="text-sm md:text-base font-extrabold tracking-widest">
                SUPREME STUDENT COUNCIL
              </div>
              <div className="text-[10px] md:text-[11px] italic text-yellow/70">
                Federation of Organized Representative
                <br className="hidden md:block" />
                Transformative Institutional Service
              </div>
            </div>
          </a>

          {/* ================= DESKTOP LINKS ================= */}
          <div className="hidden md:flex items-center space-x-8 font-semibold text-sm">
            {links.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`
                  relative px-2 py-1 transition-all duration-300
                  ${
                    active === link.id
                      ? "text-yellow after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-0.5 after:bg-yellow"
                      : "text-yellow/70 hover:text-yellow/90"
                  }
                `}
              >
                {link.label}
              </a>
            ))}

            <button
              onClick={() => setPdfOpen(true)}
              className="text-yellow/70 hover:text-yellow/90 transition"
            >
              By-Laws
            </button>
          </div>

          {/* ================= MOBILE TOGGLE ================= */}
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            className="md:hidden text-3xl text-yellow focus:outline-none"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>

        {/* ================= MOBILE MENU ================= */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden bg-darkblue/90 backdrop-blur-lg border-t border-white/10"
            >
              <div className="flex flex-col px-6 py-4 space-y-3 font-semibold text-base">
                {links.map((link) => (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={() => setOpen(false)}
                    className={`
                      px-4 py-2 rounded-lg transition
                      ${
                        active === link.id
                          ? "bg-maroon text-yellow"
                          : "text-yellow/80 hover:bg-maroon/60"
                      }
                    `}
                  >
                    {link.label}
                  </a>
                ))}

                <button
                  onClick={() => {
                    setPdfOpen(true);
                    setOpen(false);
                  }}
                  className="px-4 py-2 rounded-lg text-yellow/80 hover:bg-maroon/60 text-left"
                >
                  By-Laws
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ================= BY-LAWS MODAL ================= */}
      <ByLaws isOpen={pdfOpen} onClose={() => setPdfOpen(false)} />
    </>
  );
}
