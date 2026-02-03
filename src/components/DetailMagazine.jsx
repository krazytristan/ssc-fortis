import { useState, useEffect, useMemo } from "react";
import { SSC_ANNOUNCEMENTS } from "./sscData";

/* ============================================================
   CONFIG
============================================================ */

const PAGES = ["cover", "story", "gallery", "reflection", "credits"];

const PAGE_LABELS = {
  cover: "Cover",
  story: "Story",
  gallery: "Gallery",
  reflection: "Reflection",
  credits: "Credits",
};

export default function DetailMagazine({ data }) {
  const [page, setPage] = useState(0);

  /* RESET PAGE WHEN DATA CHANGES */
  useEffect(() => {
    setPage(0);
  }, [data]);

  /* KEYBOARD NAV */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") {
        setPage((p) => Math.min(p + 1, PAGES.length - 1));
      }
      if (e.key === "ArrowLeft") {
        setPage((p) => Math.max(p - 1, 0));
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /* RELATED EVENT (SAFE LOOKUP) */
  const related = useMemo(() => {
    if (!data?.relatedEvent) return null;
    return SSC_ANNOUNCEMENTS?.events?.find(
      (e) => e.id === data.relatedEvent
    );
  }, [data]);

  return (
    <div className="print-page space-y-6">
      {/* PAGE LABEL + PROGRESS */}
      <div className="flex justify-between items-center text-xs text-gray-500">
        <span>{PAGE_LABELS[PAGES[page]]}</span>
        <span>
          Page {page + 1} of {PAGES.length}
        </span>
      </div>

      <div className="h-1 bg-gray-200 rounded">
        <div
          className="h-full bg-maroon rounded transition-all duration-300"
          style={{
            width: `${((page + 1) / PAGES.length) * 100}%`,
          }}
        />
      </div>

      {/* CONTENT */}
      {PAGES[page] === "cover" && data?.cover && (
        <img
          src={data.cover}
          alt={data.title}
          className="w-full h-64 object-cover rounded-xl"
        />
      )}

      {PAGES[page] === "story" && (
        <section className="space-y-4">
          <h2 className="text-3xl font-bold text-maroon">
            {data.title}
          </h2>
          <p className="leading-relaxed">{data.text}</p>

          {related && (
            <p className="italic text-sm text-gray-600">
              Related SSC Event: <strong>{related.title}</strong>{" "}
              ({related.date})
            </p>
          )}
        </section>
      )}

      {PAGES[page] === "gallery" && (
        <section className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {(data.images || []).length > 0 ? (
            data.images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Gallery ${i + 1}`}
                className="h-40 w-full object-cover rounded-lg"
              />
            ))
          ) : (
            <p className="col-span-full text-sm text-gray-500">
              No images available for this activity.
            </p>
          )}
        </section>
      )}

      {PAGES[page] === "reflection" && (
        <p className="italic leading-relaxed text-gray-700">
          This accomplishment reflects the Supreme Student Council’s
          commitment to leadership, service, and meaningful student
          engagement within the academic community.
        </p>
      )}

      {PAGES[page] === "credits" && (
        <p className="text-sm text-gray-600">
          Supreme Student Council – FORTIS
          <br />
          {SSC_ANNOUNCEMENTS.academicYear}
        </p>
      )}

      {/* NAVIGATION */}
      <div className="flex justify-between items-center pt-4 border-t">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 0))}
          disabled={page === 0}
          className="px-3 py-1 text-sm disabled:opacity-40"
        >
          ◀ Previous
        </button>

        <div className="flex gap-2">
          {PAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className={`w-2.5 h-2.5 rounded-full transition ${
                page === i ? "bg-maroon" : "bg-gray-300"
              }`}
            />
          ))}
        </div>

        <button
          onClick={() =>
            setPage((p) => Math.min(p + 1, PAGES.length - 1))
          }
          disabled={page === PAGES.length - 1}
          className="px-3 py-1 text-sm disabled:opacity-40"
        >
          Next ▶
        </button>
      </div>
    </div>
  );
}
