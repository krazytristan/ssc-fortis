import {
  FaFacebookF,
  FaInstagram,
  FaEnvelope,
  FaMapMarkerAlt,
  FaShieldAlt,
  FaFileAlt,
  FaGlobe,
  FaArrowUp,
} from "react-icons/fa";
import { useEffect, useState } from "react";

export default function Footer() {
  const year = new Date().getFullYear();
  const officerTerm = `AY ${year}–${year + 1}`;

  const [showTop, setShowTop] = useState(false);
  const [showConstitution, setShowConstitution] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [lang, setLang] = useState("en");

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const TEXT = {
    en: {
      campus: "Campus Information",
      connect: "Connect With Us",
      orgs: "Student Organizations",
      legal: "Legal & Policies",
      constitution: "SSC Constitution / Charter",
      privacy: "Data Privacy Notice",
      officer: "Officer Term",
      footer: "Designed with ❤️ by the SSC Web Team",
    },
    fil: {
      campus: "Impormasyon ng Kampus",
      connect: "Makipag-ugnayan",
      orgs: "Mga Organisasyon ng Mag-aaral",
      legal: "Legal at Patakaran",
      constitution: "Saligang Batas ng SSC",
      privacy: "Abiso sa Data Privacy",
      officer: "Panunungkulan",
      footer: "Dinisenyo nang may ❤️ ng SSC Web Team",
    },
  };

  return (
    <>
      <footer className="relative bg-darkblue text-yellow pt-16 pb-8 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid gap-12 md:grid-cols-4">

          {/* ================= BRAND ================= */}
          <div className="space-y-4 text-center md:text-left">
            <div className="flex justify-center md:justify-start gap-3">
              <img
                src="/assets/ssc-logo.png"
                alt="SSC Logo"
                className="w-10 h-10 md:w-12 md:h-12 object-contain"
              />
              <img
                src="/assets/ssc-seal.png"
                alt="SSC Seal"
                className="w-10 h-10 md:w-12 md:h-12 object-contain"
              />
            </div>

            <h3 className="font-extrabold tracking-wide text-lg">
              SUPREME STUDENT COUNCIL
            </h3>

            <p className="text-xs text-yellow/70 leading-snug">
              The Federation of Organized Representative <br />
              Transformative Institutional Service
            </p>

            <p className="text-sm font-semibold">
              {TEXT[lang].officer}:{" "}
              <span className="font-bold">{officerTerm}</span>
            </p>
          </div>

          {/* ================= CAMPUS INFO ================= */}
          <div className="space-y-3 text-center md:text-left">
            <h4 className="font-bold tracking-wide uppercase">
              {TEXT[lang].campus}
            </h4>

            <p className="font-semibold">
              AMA Computer College Lipa Campus
            </p>

            <p className="flex items-center justify-center md:justify-start gap-2 text-yellow/80">
              <FaMapMarkerAlt />
              Ayala Highway, Brgy. Balintawak
            </p>

            <p className="text-yellow/70">
              Lipa City, Batangas
            </p>
          </div>

          {/* ================= CONNECT ================= */}
          <div className="space-y-4 text-center md:text-left">
            <h4 className="font-bold tracking-wide uppercase">
              {TEXT[lang].connect}
            </h4>

            <div className="flex justify-center md:justify-start gap-4 text-lg">
              <a
                href="https://web.facebook.com/profile.php?id=61580744985540"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-yellow text-darkblue hover:bg-maroon hover:text-yellow transition"
              >
                <FaFacebookF />
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-yellow text-darkblue hover:bg-maroon hover:text-yellow transition"
              >
                <FaInstagram />
              </a>

              <a
                href="mailto:ssc.amacclipa@gmail.com"
                className="p-3 rounded-full bg-yellow text-darkblue hover:bg-maroon hover:text-yellow transition"
              >
                <FaEnvelope />
              </a>
            </div>

            {/* ================= SUB ORGANIZATIONS ================= */}
            <div className="pt-4">
              <h5 className="text-xs font-bold uppercase tracking-wide mb-3 text-yellow/80">
                {TEXT[lang].orgs}
              </h5>

              <div className="flex justify-center md:justify-start flex-wrap gap-4">
                {[
                  { src: "/assets/cba-logo.png", alt: "College of Business Administration" },
                  { src: "/assets/engineering-logo.png", alt: "Engineering Students Society" },
                  { src: "/assets/ccs-matrix.png", alt: "MATRIX Organization" },
                  { src: "/assets/ccs-iconnect.png", alt: "iConnect Organization" },
                ].map((org, i) => (
                  <img
                    key={i}
                    src={org.src}
                    alt={org.alt}
                    className="w-8 h-8 md:w-9 md:h-9 object-contain opacity-90 hover:opacity-100 transition"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* ================= LEGAL ================= */}
          <div className="space-y-3 text-center md:text-left">
            <h4 className="font-bold tracking-wide uppercase">
              {TEXT[lang].legal}
            </h4>

            <button
              onClick={() => setShowConstitution(true)}
              className="flex items-center justify-center md:justify-start gap-2 text-sm text-yellow/80 hover:text-yellow transition"
            >
              <FaFileAlt /> {TEXT[lang].constitution}
            </button>

            <button
              onClick={() => setShowPrivacy(true)}
              className="flex items-center justify-center md:justify-start gap-2 text-sm text-yellow/80 hover:text-yellow transition"
            >
              <FaShieldAlt /> {TEXT[lang].privacy}
            </button>

            <button
              onClick={() => setLang(lang === "en" ? "fil" : "en")}
              className="flex items-center justify-center md:justify-start gap-2 text-sm hover:text-yellow transition"
            >
              <FaGlobe /> {lang === "en" ? "Filipino" : "English"}
            </button>
          </div>
        </div>

        {/* ================= BOTTOM ================= */}
        <div className="mt-10 text-center text-xs text-yellow/60">
          © {year} Supreme Student Council – AMA Computer College Lipa Campus
          <br />
          {TEXT[lang].footer}
        </div>

        {/* BACK TO TOP */}
        {showTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-yellow text-darkblue hover:bg-maroon hover:text-yellow shadow-xl transition"
          >
            <FaArrowUp />
          </button>
        )}
      </footer>

      {/* ================= MODALS ================= */}
      {showConstitution && (
        <Modal title={TEXT[lang].constitution} onClose={() => setShowConstitution(false)}>
          Governing document of the Supreme Student Council. PDF version coming soon.
        </Modal>
      )}

      {showPrivacy && (
        <Modal title={TEXT[lang].privacy} onClose={() => setShowPrivacy(false)}>
          The SSC complies with the Data Privacy Act of 2012 (RA 10173).
        </Modal>
      )}
    </>
  );
}

/* ================= MODAL ================= */
function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 px-4">
      <div className="bg-darkblue text-yellow max-w-lg w-full rounded-2xl p-6 shadow-2xl">
        <h3 className="text-xl font-bold mb-4">{title}</h3>
        <div className="text-sm text-yellow/90">{children}</div>
        <div className="mt-6 text-right">
          <button
            onClick={onClose}
            className="bg-yellow text-darkblue px-5 py-2 rounded-full font-semibold hover:bg-maroon hover:text-yellow transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
