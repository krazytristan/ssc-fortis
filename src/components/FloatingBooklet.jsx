/* ============================================================
   FLOATING BOOKLET – SSC FORTIS
   Newspaper-Style Accomplishment Report
============================================================ */

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import jsPDF from "jspdf";
import { FaBookOpen } from "react-icons/fa";

import {
  SSC_ACCOMPLISHMENTS,
  SSC_ANNOUNCEMENTS,
} from "./sscData";

/* ============================================================
   COVER META
============================================================ */

const coverPage = {
  title: "SSC–FORTIS",
  subtitle: "Accomplishment Report",
  year: "AY 2025–2026",
  coverImage:
    "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1400&q=80",
};

/* ============================================================
   MAIN COMPONENT
============================================================ */

export default function FloatingBooklet() {
  const [open, setOpen] = useState(false);
  const [stage, setStage] = useState("cover");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const esc = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", esc);
    };
  }, [open]);

  const exportPDF = useCallback(() => {
    const doc = new jsPDF("p", "mm", "a4");

    doc.setFontSize(22);
    doc.text(coverPage.title, 105, 30, { align: "center" });
    doc.setFontSize(16);
    doc.text(coverPage.subtitle, 105, 42, { align: "center" });
    doc.setFontSize(12);
    doc.text(coverPage.year, 105, 52, { align: "center" });

    SSC_ACCOMPLISHMENTS.forEach((item) => {
      doc.addPage();
      doc.setFontSize(16);
      doc.text(item.title, 20, 30);
      doc.setFontSize(12);
      doc.text(item.text, 20, 45, { maxWidth: 170 });
    });

    doc.save("SSC-FORTIS-Accomplishment-Report.pdf");
  }, []);

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed left-0 top-1/3 z-50
                     bg-maroon/80 text-yellow
                     px-4 py-3 rounded-r-full shadow-xl
                     flex items-center gap-2"
        >
          <FaBookOpen />
          <span className="hidden md:inline">Accomplishments</span>
        </button>
      )}

      <AnimatePresence>
        {open && (
          <>
            <div
              className="fixed inset-0 bg-black/60 z-40"
              onClick={() => setOpen(false)}
            />

            <motion.div
              className="
                fixed z-50 top-[54%] left-1/2
                w-[94%] max-w-6xl h-[88vh]
                bg-white rounded-2xl shadow-2xl
                overflow-hidden flex flex-col
              "
              initial={{ scale: 0.9, x: "-50%", y: "-50%" }}
              animate={{ scale: 1, x: "-50%", y: "-50%" }}
            >
              {/* HEADER */}
              <div className="bg-maroon text-yellow px-5 py-3 flex justify-between">
                <span className="text-xs tracking-widest">
                  SUPREME STUDENT COUNCIL – FORTIS
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
              <div className="flex-1 overflow-hidden">
                {stage === "cover" && (
                  <CoverPage onClick={() => setStage("toc")} />
                )}

                {stage === "toc" && (
                  <TableOfContents
                    items={SSC_ACCOMPLISHMENTS}
                    onSelect={(i) => {
                      setIndex(i);
                      setStage("detail");
                    }}
                  />
                )}

                {stage === "detail" && (
                  <DetailMagazine
                    data={SSC_ACCOMPLISHMENTS[index]}
                  />
                )}
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
      <div className="bg-black/60 p-10 rounded-xl text-yellow text-center">
        <h1 className="text-5xl font-extrabold">{coverPage.title}</h1>
        <p className="text-xl">{coverPage.subtitle}</p>
        <p className="tracking-widest mt-2">{coverPage.year}</p>
      </div>
    </div>
  );
}

function TableOfContents({ items, onSelect }) {
  return (
    <div className="p-8 overflow-y-auto h-full">
      <h2 className="text-2xl font-bold text-maroon mb-6">
        Table of Contents
      </h2>
      <div className="space-y-4">
        {items.map((item, i) => (
          <button
            key={item.id}
            onClick={() => onSelect(i)}
            className="block w-full text-left p-4 border rounded-lg
                       hover:bg-maroon/10 transition"
          >
            <strong>{item.title}</strong>
            <div className="text-sm text-gray-600">
              {item.subtitle}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function DetailMagazine({ data }) {
  const [page, setPage] = useState(0);
  const pages = ["article", "gallery", "credits"];

  const related = data.relatedEvent
    ? SSC_ANNOUNCEMENTS.events.find(
        (e) => e.id === data.relatedEvent
      )
    : null;

  return (
    <div className="h-full flex flex-col">
      <div className="h-1 bg-gray-200">
        <div
          className="h-full bg-maroon"
          style={{ width: `${((page + 1) / pages.length) * 100}%` }}
        />
      </div>

      <div className="flex-1 p-6 overflow-y-auto">
        {/* ARTICLE – NEWSPAPER STYLE */}
        {pages[page] === "article" && (
          <article className="newspaper text-gray-800">
            <h2 className="text-4xl font-bold text-maroon mb-2">
              {data.title}
            </h2>
            <p className="italic mb-6">{data.subtitle}</p>

            {data.images?.[0] && (
              <img
                src={data.images[0]}
                alt={data.title}
                className="
                  w-full md:w-1/2
                  float-none md:float-right
                  mb-4 md:ml-6
                  rounded-lg object-cover
                "
              />
            )}

            <p>{data.text}</p>

            <p>
              This accomplishment highlights the Supreme Student
              Council’s commitment to leadership, collaboration,
              and meaningful student engagement within the
              academic community.
            </p>

            <p>
              Through well-coordinated efforts and strong
              participation, the initiative strengthened unity
              and reinforced the Council’s role as a catalyst
              for positive change.
            </p>

            {related && (
              <p className="mt-6 italic text-sm text-gray-600">
                Related SSC Event:{" "}
                <strong>{related.title}</strong> ({related.date})
              </p>
            )}
          </article>
        )}

        {/* GALLERY */}
        {pages[page] === "gallery" && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {data.images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Gallery ${i + 1}`}
                className="h-36 md:h-44 w-full object-cover rounded-lg"
              />
            ))}
          </div>
        )}

        {/* CREDITS */}
        {pages[page] === "credits" && (
          <p className="text-sm text-gray-600">
            Supreme Student Council – FORTIS
            <br />
            AY 2025–2026
          </p>
        )}
      </div>

      <div className="p-4 flex justify-between border-t">
        <button onClick={() => setPage((p) => Math.max(p - 1, 0))}>
          ◀ Previous
        </button>
        <span className="text-xs">
          Page {page + 1} of {pages.length}
        </span>
        <button
          onClick={() =>
            setPage((p) => Math.min(p + 1, pages.length - 1))
          }
        >
          Next ▶
        </button>
      </div>
    </div>
  );
}
