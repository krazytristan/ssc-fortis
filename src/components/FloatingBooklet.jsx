/* ============================================================
   FLOATING BOOKLET – SSC FORTIS
   Accomplishment Report | AY 2025–2026
============================================================ */

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import jsPDF from "jspdf";
import { FaBookOpen } from "react-icons/fa";

/* ============================================================
   CONSTANTS
============================================================ */

const PAGE_ORDER = ["cover", "title", "story", "gallery", "credits"];

const PAGE_LABELS = {
  cover: "Cover",
  title: "Overview",
  story: "Narrative",
  gallery: "Gallery",
  credits: "Credits",
};

/* ============================================================
   DATA
============================================================ */

const coverPage = {
  title: "SSC–FORTIS",
  subtitle: "Accomplishment Report",
  year: "AY 2025–2026",
  coverImage:
    "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1400&q=80",
};

const accomplishments = [
  {
    title: "TEACHERS MONTH CELEBRATION",
    subtitle: "Celebrating educators and leadership",
    text:
      "A tribute honoring educators through performances, appreciation messages, and student-led initiatives that strengthened unity and gratitude within the academic community.",
    cover: "/assets/img1.jpg",
    images: ["/assets/img1.jpg", "/assets/img2.jpg", "/assets/img3.jpg"],
  },
  {
    title: "NSTP PROJECT COLLABORATION",
    subtitle: "Community & Environmental Outreach",
    text:
      "A joint outreach initiative fostering civic responsibility, sustainability, and teamwork among students through environmental and social engagement.",
    cover: "/assets/nstp1.jpg",
    images: ["/assets/nstp1.jpg", "/assets/nstp2.jpg", "/assets/nstp3.jpg"],
  },
  {
    title: "CHRISTMAS STATION ID 2025",
    subtitle: "Unity, Hope & Service",
    text:
      "A creative holiday production celebrating unity, hope, and service through student collaboration and multimedia storytelling.",
    cover: "/assets/id1.jpg",
    images: ["/assets/id1.jpg", "/assets/id2.jpg", "/assets/id3.jpg"],
  },
  {
    title: "PARTNERSHIP WITH PROJECT SPARK",
    subtitle: "Community & Outreach",
    text:
      "A collaborative initiative promoting sustainability, student engagement, and long-term community development through partnership programs.",
    cover: "/assets/spark1.jpg",
    images: [
      "/assets/spark1.jpg",
      "/assets/spark2.jpg",
      "/assets/spark3.jpg",
      "/assets/spark4.jpg",
    ],
  },
];

/* ============================================================
   MAIN COMPONENT
============================================================ */

export default function FloatingBooklet() {
  const [open, setOpen] = useState(false);
  const [stage, setStage] = useState("cover");
  const [index, setIndex] = useState(0);

  /* LOCK SCROLL + ESC */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const esc = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", esc);
    };
  }, [open]);

  /* PDF EXPORT */
  const exportPDF = useCallback(() => {
    const doc = new jsPDF("p", "mm", "a4");

    doc.setFontSize(24);
    doc.text(coverPage.title, 105, 40, { align: "center" });
    doc.setFontSize(16);
    doc.text(coverPage.subtitle, 105, 55, { align: "center" });
    doc.setFontSize(12);
    doc.text(coverPage.year, 105, 65, { align: "center" });

    accomplishments.forEach((item, i) => {
      doc.addPage();
      doc.setFontSize(18);
      doc.text(`Event ${i + 1}`, 20, 25);
      doc.setFontSize(14);
      doc.text(item.title, 20, 40);
      doc.setFontSize(12);
      doc.text(item.subtitle, 20, 50);
      doc.text(item.text, 20, 65, {
        maxWidth: 170,
        lineHeightFactor: 1.6,
      });
    });

    doc.save("SSC-FORTIS-Accomplishment-Report.pdf");
  }, []);

  return (
    <>
      {/* FLOATING BUTTON */}
      {!open && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => setOpen(true)}
          className="fixed left-0 top-1/3 z-50
                     bg-maroon/90 text-yellow
                     px-4 py-3 rounded-r-full shadow-xl
                     flex items-center gap-2"
        >
          <FaBookOpen />
          <span className="hidden md:inline">Accomplishments</span>
        </motion.button>
      )}

      {/* MODAL */}
      <AnimatePresence>
        {open && (
          <>
            {/* OVERLAY (outside click closes modal) */}
            <motion.div
              className="fixed inset-0 bg-black/70 z-40"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* CENTERED MODAL WRAPPER */}
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* 🔑 STOP CLICK PROPAGATION HERE */}
              <motion.div
                onClick={(e) => e.stopPropagation()}
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 260, damping: 25 }}
                className="w-[94%] max-w-5xl h-[88vh]
                           bg-white rounded-2xl shadow-2xl
                           overflow-hidden"
              >
                {/* HEADER */}
                <div className="bg-maroon text-yellow px-5 py-3 flex justify-between">
                  <span className="text-xs tracking-widest">
                    SUPREME STUDENT COUNCIL — FORTIS
                  </span>
                  <div className="flex gap-2">
                    {stage !== "cover" && (
                      <button
                        onClick={() => setStage("cover")}
                        className="bg-yellow text-maroon px-3 py-1 rounded text-xs"
                      >
                        Back
                      </button>
                    )}
                    <button
                      onClick={exportPDF}
                      className="bg-yellow text-maroon px-3 py-1 rounded text-xs"
                    >
                      PDF
                    </button>
                    <button onClick={() => setOpen(false)}>✕</button>
                  </div>
                </div>

                {/* CONTENT */}
                <AnimatePresence mode="wait">
                  {stage === "cover" && (
                    <CoverPage onClick={() => setStage("toc")} />
                  )}

                  {stage === "toc" && (
                    <TableOfContents
                      items={accomplishments}
                      onSelect={(i) => {
                        setIndex(i);
                        setStage("detail");
                      }}
                    />
                  )}

                  {stage === "detail" && (
                    <DetailMagazine
                      data={accomplishments[index]}
                      index={index}
                      total={accomplishments.length}
                    />
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

/* ============================================================
   SUB COMPONENTS
============================================================ */

function CoverPage({ onClick }) {
  return (
    <div
      onClick={onClick}
      className="h-full flex items-center justify-center cursor-pointer"
      style={{
        backgroundImage: `url(${coverPage.coverImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-black/70 p-10 rounded-xl text-yellow text-center">
        <h1 className="text-5xl font-extrabold">{coverPage.title}</h1>
        <p className="text-xl">{coverPage.subtitle}</p>
        <p className="tracking-widest mt-2">{coverPage.year}</p>
        <p className="mt-6 text-xs opacity-80">Click to open report</p>
      </div>
    </div>
  );
}

function TableOfContents({ items, onSelect }) {
  return (
    <div className="p-8 h-full overflow-y-auto">
      <h2 className="text-2xl font-bold text-maroon mb-6">
        Table of Contents
      </h2>
      <div className="space-y-4">
        {items.map((item, i) => (
          <button
            key={i}
            onClick={() => onSelect(i)}
            className="w-full p-4 border rounded-lg text-left
                       hover:bg-maroon/10 transition"
          >
            <span className="text-xs text-gray-400">
              Event {i + 1}
            </span>
            <div className="font-semibold">{item.title}</div>
            <div className="text-sm text-gray-600">{item.subtitle}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

function DetailMagazine({ data, index, total }) {
  const [page, setPage] = useState(0);

  return (
    <div className="h-full flex flex-col">
      {/* TOP INFO */}
      <div className="px-6 py-2 text-xs text-gray-500 flex justify-between">
        <span>{PAGE_LABELS[PAGE_ORDER[page]]}</span>
        <span>
          Event {index + 1} of {total}
        </span>
      </div>

      {/* PROGRESS */}
      <div className="h-1 bg-gray-200">
        <motion.div
          className="h-full bg-maroon"
          animate={{
            width: `${((page + 1) / PAGE_ORDER.length) * 100}%`,
          }}
        />
      </div>

      {/* PAGE */}
      <AnimatePresence mode="wait">
        <motion.div
          key={page}
          initial={{ opacity: 0, rotateY: -15 }}
          animate={{ opacity: 1, rotateY: 0 }}
          exit={{ opacity: 0, rotateY: 15 }}
          transition={{ duration: 0.35 }}
          className="flex-1 p-8 overflow-y-auto"
        >
          {PAGE_ORDER[page] === "cover" && (
            <img
              src={data.cover}
              className="w-full h-80 object-cover rounded-xl"
            />
          )}

          {PAGE_ORDER[page] === "title" && (
            <>
              <h2 className="text-3xl font-bold text-maroon">
                {data.title}
              </h2>
              <p className="italic text-gray-600">{data.subtitle}</p>
            </>
          )}

          {PAGE_ORDER[page] === "story" && (
            <p className="leading-relaxed text-gray-800">
              {data.text}
            </p>
          )}

          {PAGE_ORDER[page] === "gallery" && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {data.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  className="h-40 w-full object-cover rounded-lg"
                />
              ))}
            </div>
          )}

          {PAGE_ORDER[page] === "credits" && (
            <p className="text-sm text-gray-600">
              Prepared by the Supreme Student Council – FORTIS <br />
              AY 2025–2026
            </p>
          )}
        </motion.div>
      </AnimatePresence>

      {/* NAV */}
      <div className="p-4 flex justify-between border-t">
        <button onClick={() => setPage((p) => Math.max(p - 1, 0))}>
          ◀ Previous
        </button>
        <div className="flex gap-2">
          {PAGE_ORDER.map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className={`w-2 h-2 rounded-full ${
                page === i ? "bg-maroon" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
        <button
          onClick={() =>
            setPage((p) => Math.min(p + 1, PAGE_ORDER.length - 1))
          }
        >
          Next ▶
        </button>
      </div>
    </div>
  );
}
