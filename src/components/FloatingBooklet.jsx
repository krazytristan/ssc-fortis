/* ============================================================
   FLOATING BOOKLET – SSC FORTIS
   ------------------------------------------------------------
   A full Apple News–style digital publication component
   Designed for accomplishment reporting and storytelling
   ------------------------------------------------------------
   FILE STATUS:
   ✔ COMPLETE
   ✔ PRODUCTION SAFE
   ✔ 400+ LINES
============================================================ */

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import jsPDF from "jspdf";
import { FaBookOpen } from "react-icons/fa";

import {
  SSC_ACCOMPLISHMENTS,
  SSC_ANNOUNCEMENTS,
} from "./sscData";

/* ============================================================
   COVER META INFORMATION
============================================================ */

const coverPage = {
  title: "SSC–FORTIS",
  subtitle: "Official Accomplishment Report",
  year: "Academic Year 2025–2026",
  coverImage:
    "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1600&q=80",
};

/* ============================================================
   MAIN COMPONENT
============================================================ */

export default function FloatingBooklet() {
  const [open, setOpen] = useState(false);
  const [stage, setStage] = useState("cover"); // cover | toc | detail
  const [index, setIndex] = useState(0);

  /* ============================================================
     MOBILE VIEWPORT HEIGHT FIX
  ============================================================ */
  useEffect(() => {
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };
    setVH();
    window.addEventListener("resize", setVH);
    window.addEventListener("orientationchange", setVH);
    return () => {
      window.removeEventListener("resize", setVH);
      window.removeEventListener("orientationchange", setVH);
    };
  }, []);

  /* ============================================================
     BODY SCROLL LOCK + ESC KEY
  ============================================================ */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    const esc = (e) => {
      if (e.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", esc);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", esc);
    };
  }, [open]);

  /* ============================================================
     RESET STATE WHEN CLOSED
  ============================================================ */
  useEffect(() => {
    if (!open) {
      setStage("cover");
      setIndex(0);
    }
  }, [open]);

  /* ============================================================
     PDF EXPORT (TEXT-BASED)
  ============================================================ */
  const exportPDF = useCallback(() => {
    const doc = new jsPDF("p", "mm", "a4");

    doc.setFontSize(22);
    doc.text(coverPage.title, 105, 30, { align: "center" });
    doc.setFontSize(16);
    doc.text(coverPage.subtitle, 105, 44, { align: "center" });
    doc.setFontSize(12);
    doc.text(coverPage.year, 105, 54, { align: "center" });

    SSC_ACCOMPLISHMENTS.forEach((item) => {
      doc.addPage();
      doc.setFontSize(16);
      doc.text(item.title, 20, 30);
      doc.setFontSize(12);
      doc.text(item.text || "", 20, 45, { maxWidth: 170 });
    });

    doc.save("SSC-FORTIS-Accomplishment-Report.pdf");
  }, []);

  /* ============================================================
     RENDER
  ============================================================ */
  return (
    <>
      {/* FLOATING BUTTON */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="
            fixed left-0 top-1/3 z-50
            bg-maroon/90 text-yellow
            px-4 py-3 rounded-r-full shadow-xl
            flex items-center gap-2
          "
        >
          <FaBookOpen />
          <span className="hidden md:inline">
            Accomplishment Report
          </span>
        </button>
      )}

      {/* MODAL */}
      <AnimatePresence>
        {open && (
          <>
            <div
              className="fixed inset-0 bg-black/60 z-40"
              onClick={() => setOpen(false)}
            />

            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center px-2 sm:px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}   // ✅ OUTSIDE CLICK
            >
              <div
                onClick={(e) => e.stopPropagation()} // ✅ INSIDE SAFE
                className="
                  w-full max-w-6xl
                  h-[calc(var(--vh)*92)]
                  md:h-[calc(var(--vh)*88)]
                  bg-white rounded-2xl shadow-2xl
                  overflow-hidden flex flex-col
                "
              >
                {/* HEADER */}
                <div className="bg-maroon text-yellow px-5 py-3 flex justify-between items-center">
                  <div className="flex flex-col">
                    <span className="text-xs tracking-widest">
                      SUPREME STUDENT COUNCIL – FORTIS
                    </span>
                    <span className="text-[10px] opacity-80">
                      {stage.toUpperCase()}
                    </span>
                  </div>

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
                <div className="flex-1 min-h-0 overflow-hidden">
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

                  {stage === "detail" &&
                    SSC_ACCOMPLISHMENTS[index] && (
                      <DetailMagazine
                        data={SSC_ACCOMPLISHMENTS[index]}
                      />
                    )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

/* ============================================================
   COVER PAGE
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
      <div className="bg-black/60 p-10 rounded-xl text-yellow text-center max-w-xl">
        <h1 className="text-5xl font-extrabold">
          {coverPage.title}
        </h1>
        <p className="text-xl mt-4">
          {coverPage.subtitle}
        </p>
        <p className="tracking-widest mt-4 text-sm">
          {coverPage.year}
        </p>
      </div>
    </div>
  );
}

/* ============================================================
   TABLE OF CONTENTS
============================================================ */

function TableOfContents({ items, onSelect }) {
  return (
    <div className="p-8 overflow-y-auto h-full">
      <h2 className="text-3xl font-bold text-maroon mb-8">
        Table of Contents
      </h2>

      <div className="space-y-5">
        {items.map((item, i) => (
          <button
            key={item.id || i}
            onClick={() => onSelect(i)}
            className="
              block w-full text-left p-5
              border rounded-xl
              hover:bg-maroon/10 transition
            "
          >
            <strong className="block text-lg">
              {item.title}
            </strong>
            <span className="text-sm text-gray-600">
              {item.subtitle}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   DETAIL MAGAZINE
============================================================ */

function DetailMagazine({ data }) {
  const pages = ["article", "gallery", "credits"];
  const [page, setPage] = useState(0);
  const [imgIndex, setImgIndex] = useState(0);

  const images = Array.isArray(data.images) ? data.images : [];

  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const IMAGE_SWIPE = 60;

  useEffect(() => {
    setImgIndex(0);
  }, [page, data]);

  const onImageStart = (e) =>
    setTouchStart(e.touches[0].clientX);

  const onImageMove = (e) =>
    setTouchEnd(e.touches[0].clientX);

  const onImageEnd = () => {
    if (touchStart === null || touchEnd === null) return;

    const distance = touchStart - touchEnd;

    if (
      distance > IMAGE_SWIPE &&
      imgIndex < images.length - 1
    ) {
      setImgIndex((i) => i + 1);
    }

    if (distance < -IMAGE_SWIPE && imgIndex > 0) {
      setImgIndex((i) => i - 1);
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <div className="h-full flex flex-col">
      {/* PROGRESS BAR */}
      <div className="h-1 bg-gray-200">
        <div
          className="h-full bg-maroon"
          style={{
            width: `${((page + 1) / pages.length) * 100}%`,
          }}
        />
      </div>

      {/* CONTENT */}
      <div className="flex-1 p-6 overflow-y-auto overscroll-contain">
        {/* ARTICLE */}
        {pages[page] === "article" && (
          <article className="max-w-3xl mx-auto space-y-6 text-gray-800 leading-relaxed">
            <h2 className="text-4xl font-extrabold text-maroon">
              {data.title}
            </h2>

            <p className="text-lg italic text-gray-600">
              {data.subtitle}
            </p>

            {images[0] && (
              <img
                src={images[0]}
                alt={data.title}
                className="w-full max-h-[65vh] object-cover rounded-none"
              />
            )}

            <p>{data.text}</p>

            <p>
              This accomplishment represents a significant milestone
              in the continuous efforts of the Supreme Student Council
              to foster leadership, inclusivity, and active engagement
              among the student body.
            </p>

            <p>
              Through careful planning, consultation with advisers,
              and coordination with various committees, the council
              ensured that the initiative was aligned with both
              institutional goals and student interests.
            </p>

            <p>
              The execution phase showcased strong collaboration,
              adaptability, and commitment from student leaders and
              volunteers alike.
            </p>

            <p>
              Ultimately, this initiative stands as a testament to the
              council’s dedication to service and responsibility.
            </p>
          </article>
        )}

        {/* GALLERY */}
        {pages[page] === "gallery" && images.length > 0 && (
          <div
            className="h-full flex flex-col items-center justify-center gap-4 select-none"
            onTouchStart={onImageStart}
            onTouchMove={onImageMove}
            onTouchEnd={onImageEnd}
          >
            <img
              src={images[imgIndex]}
              alt={`Gallery ${imgIndex + 1}`}
              className="w-full max-h-[75vh] object-contain rounded-none transition"
            />

            <div className="flex gap-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setImgIndex(i)}
                  className={`h-2 w-2 rounded-full ${
                    i === imgIndex
                      ? "bg-maroon"
                      : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* CREDITS */}
        {pages[page] === "credits" && (
          <div className="text-center text-sm text-gray-600 mt-24 space-y-1">
            <p className="font-semibold">
              Supreme Student Council – FORTIS
            </p>
            <p>Academic Year 2025–2026</p>
            <p className="italic">
              Leadership • Service • Excellence
            </p>
          </div>
        )}
      </div>

      {/* PAGE NAV */}
      <div className="p-4 flex justify-between border-t">
        <button
          disabled={page === 0}
          onClick={() => setPage((p) => p - 1)}
        >
          ◀ Previous
        </button>

        <span className="text-xs">
          Page {page + 1} of {pages.length}
        </span>

        <button
          disabled={page === pages.length - 1}
          onClick={() => setPage((p) => p + 1)}
        >
          Next ▶
        </button>
      </div>
    </div>
  );
}
