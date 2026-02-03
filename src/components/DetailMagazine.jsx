import { useState, useEffect } from "react";
import { SSC_ANNOUNCEMENTS } from "./sscData";

export default function DetailMagazine({ data }) {
  const pages = ["cover", "story", "gallery", "reflection", "credits"];
  const [page, setPage] = useState(0);

  useEffect(() => {
    const k = (e) => {
      if (e.key === "ArrowRight") setPage((p) => Math.min(p + 1, pages.length - 1));
      if (e.key === "ArrowLeft") setPage((p) => Math.max(p - 1, 0));
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, []);

  const related = SSC_ANNOUNCEMENTS.events.find(
    (e) => e.id === data.relatedEvent
  );

  return (
    <div className="print-page space-y-6">
      {pages[page] === "cover" && (
        <img src={data.cover} className="w-full h-64 object-cover rounded-xl" />
      )}

      {pages[page] === "story" && (
        <>
          <h2 className="text-3xl font-bold text-maroon">{data.title}</h2>
          <p>{data.text}</p>
          {related && (
            <p className="italic text-sm text-gray-600">
              Related SSC Event: {related.title} ({related.date})
            </p>
          )}
        </>
      )}

      {pages[page] === "gallery" && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {data.images.map((img, i) => (
            <img key={i} src={img} className="h-40 w-full object-cover rounded-lg" />
          ))}
        </div>
      )}

      {pages[page] === "reflection" && (
        <p className="italic">
          This accomplishment reflects the SSC’s commitment to leadership and service.
        </p>
      )}

      {pages[page] === "credits" && (
        <p className="text-sm">
          Supreme Student Council – FORTIS<br />
          {SSC_ANNOUNCEMENTS.academicYear}
        </p>
      )}

      <div className="flex justify-between pt-4 border-t">
        <button onClick={() => setPage((p) => Math.max(p - 1, 0))}>◀</button>
        <span>Page {page + 1} / {pages.length}</span>
        <button onClick={() => setPage((p) => Math.min(p + 1, pages.length - 1))}>▶</button>
      </div>
    </div>
  );
}
