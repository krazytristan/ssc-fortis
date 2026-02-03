/* ============================================================
   FLOATING BOOKLET – SSC FORTIS
   Accomplishment Report | AY 2025–2026
============================================================ */

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import jsPDF from "jspdf";
import { FaBookOpen } from "react-icons/fa";

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
    cover: "assets/img1.JPG",
    images: ["assets/img1.JPG", "assets/img2.JPG", "assets/img3.JPG"],
  },
  {
    title: "NSTP PROJECT COLLABORATION",
    subtitle: "Community & Environmental Outreach",
    text:
      "A joint outreach initiative fostering civic responsibility, sustainability, and teamwork among students through environmental and social engagement.",
    cover: "assets/nstp1.jpg",
    images: ["assets/nstp1.jpg", "assets/nstp2.jpg", "assets/nstp3.jpg"],
  },
  {
    title: "CHRISTMAS STATION ID 2025",
    subtitle: "Unity, Hope & Service",
    text:
      "A creative holiday production celebrating unity, hope, and service through student collaboration and multimedia storytelling.",
    cover: "assets/id1.jpg",
    images: ["assets/id1.jpg", "assets/id2.jpg", "assets/id3.jpg"],
  },
  {
    title: "PARTNERSHIP WITH PROJECT SPARK",
    subtitle: "Community & Outreach",
    text:
      "A collaborative initiative promoting sustainability, student engagement, and long-term community development through partnership programs.",
    cover: "assets/spark1.jpg",
    images: [
      "assets/spark1.jpg",
      "assets/spark2.jpg",
      "assets/spark3.jpg",
      "assets/spark4.jpg",
      "assets/spark5.jpg",
    ],
  },
];

/* ============================================================
   MAIN COMPONENT (DEFAULT EXPORT)
============================================================ */

export default function FloatingBooklet() {
  const [open, setOpen] = useState(false);
  const [stage, setStage] = useState("cover"); // cover | toc | detail
  const [index, setIndex] = useState(null);

  /* LOCK SCROLL + ESC */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  /* PDF EXPORT */
  const exportPDF = useCallback(() => {
    const doc = new jsPDF("p", "mm", "a4");

    doc.setFontSize(22);
    doc.text(coverPage.title, 105, 30, { align: "center" });
    doc.setFontSize(16);
    doc.text(coverPage.subtitle, 105, 42, { align: "center" });
    doc.setFontSize(12);
    doc.text(coverPage.year, 105, 52, { align: "center" });

    accomplishments.forEach((item, i) => {
      doc.addPage();
      doc.setFontSize(16);
      doc.text(item.title, 20, 30);
      doc.setFontSize(12);
      doc.text(item.subtitle, 20, 40);
      doc.text(item.text, 20, 55, { maxWidth: 170 });
    });

    doc.save("SSC-FORTIS-Accomplishment-Report.pdf");
  }, []);

  return (
    <>
      {/* FLOATING BUTTON */}
      {!open && (
        <motion.button
          onClick={() => setOpen(true)}
          className="fixed left-0 top-1/3 z-50
                     bg-maroon/80 text-yellow
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
            <motion.div
              className="fixed inset-0 bg-black/60 z-40"
              onClick={() => setOpen(false)}
            />

            <motion.div
              className="fixed z-50 top-1/2 left-1/2
                         w-[92%] max-w-5xl h-[85vh]
                         bg-white rounded-2xl shadow-2xl
                         overflow-hidden"
              initial={{ scale: 0.9, x: "-50%", y: "-50%" }}
              animate={{ scale: 1, x: "-50%", y: "-50%" }}
            >
              {/* HEADER */}
              <div className="bg-maroon text-yellow px-5 py-3 flex justify-between">
                <span className="text-xs tracking-widest">
                  SUPREME STUDENT COUNCIL
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
              <div className="h-full overflow-hidden">
                <AnimatePresence mode="wait">
                  {stage === "cover" && (
                    <CoverPage
                      data={coverPage}
                      onClick={() => setStage("toc")}
                    />
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

                  {stage === "detail" && index !== null && (
                    <DetailMagazine data={accomplishments[index]} />
                  )}
                </AnimatePresence>
              </div>
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

function CoverPage({ data, onClick }) {
  return (
    <div
      onClick={onClick}
      className="h-full w-full flex items-center justify-center cursor-pointer"
      style={{
        backgroundImage: `url(${data.coverImage})`,
        backgroundSize: "cover",
      }}
    >
      <div className="bg-black/60 p-8 rounded-xl text-yellow text-center">
        <h1 className="text-4xl font-extrabold">{data.title}</h1>
        <p className="text-lg">{data.subtitle}</p>
        <p className="tracking-widest">{data.year}</p>
        <p className="mt-4 text-xs opacity-80">
          Click to open table of contents
        </p>
      </div>
    </div>
  );
}

function TableOfContents({ items, onSelect }) {
  return (
    <div className="p-8 space-y-4 overflow-y-auto h-full">
      <h2 className="text-2xl font-bold text-maroon mb-6">
        Table of Contents
      </h2>
      {items.map((item, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          className="block w-full text-left p-4 border rounded-lg
                     hover:bg-maroon/10 transition"
        >
          <strong>{item.title}</strong>
          <div className="text-sm text-gray-600">{item.subtitle}</div>
        </button>
      ))}
    </div>
  );
}

function DetailMagazine({ data }) {
  const pages = ["cover", "title", "story", "gallery", "credits"];
  const [page, setPage] = useState(0);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") setPage((p) => Math.min(p + 1, pages.length - 1));
      if (e.key === "ArrowLeft") setPage((p) => Math.max(p - 1, 0));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [pages.length]);

  return (
    <div className="h-full flex flex-col">
      {/* PROGRESS */}
      <div className="h-1 bg-gray-200">
        <div
          className="h-full bg-maroon"
          style={{ width: `${((page + 1) / pages.length) * 100}%` }}
        />
      </div>

      {/* PAGE */}
      <div className="flex-1 p-8 overflow-y-auto">
        {pages[page] === "cover" && (
          <img
            src={data.cover}
            className="w-full h-80 object-cover rounded-xl"
          />
        )}

        {pages[page] === "title" && (
          <>
            <h2 className="text-3xl font-bold text-maroon">{data.title}</h2>
            <p className="italic text-gray-600">{data.subtitle}</p>
          </>
        )}

        {pages[page] === "story" && (
          <p className="leading-relaxed text-gray-800">{data.text}</p>
        )}

        {pages[page] === "gallery" && (
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

        {pages[page] === "credits" && (
          <p className="text-sm text-gray-600">
            Prepared by the Supreme Student Council – FORTIS <br />
            AY 2025–2026
          </p>
        )}
      </div>

      {/* NAV */}
      <div className="p-4 flex justify-between items-center border-t">
        <button onClick={() => setPage((p) => Math.max(p - 1, 0))}>
          ◀ Previous
        </button>
        <span className="text-xs">
          Page {page + 1} of {pages.length}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(p + 1, pages.length - 1))}
        >
          Next ▶
        </button>
      </div>
    </div>
  );
}
