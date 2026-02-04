function DetailMagazine({ data }) {
  const pages = ["article", "gallery", "credits"];
  const [page, setPage] = useState(0);
  const [imgIndex, setImgIndex] = useState(0);

  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const [pageTouchStart, setPageTouchStart] = useState(null);
  const [pageTouchEnd, setPageTouchEnd] = useState(null);

  const IMAGE_SWIPE = 60;
  const PAGE_SWIPE = 90;

  useEffect(() => {
    setImgIndex(0);
  }, [page, data]);

  /* ================= IMAGE SWIPE ================= */
  const imageStart = (e) => setTouchStart(e.targetTouches[0].clientX);
  const imageMove = (e) => setTouchEnd(e.targetTouches[0].clientX);
  const imageEnd = () => {
    if (!touchStart || !touchEnd) return;
    const d = touchStart - touchEnd;
    if (d > IMAGE_SWIPE && imgIndex < data.images.length - 1)
      setImgIndex((i) => i + 1);
    if (d < -IMAGE_SWIPE && imgIndex > 0)
      setImgIndex((i) => i - 1);
    setTouchStart(null);
    setTouchEnd(null);
  };

  /* ================= PAGE SWIPE ================= */
  const pageStart = (e) =>
    setPageTouchStart(e.targetTouches[0].clientX);
  const pageMove = (e) =>
    setPageTouchEnd(e.targetTouches[0].clientX);
  const pageEnd = () => {
    if (!pageTouchStart || !pageTouchEnd) return;
    const d = pageTouchStart - pageTouchEnd;
    if (d > PAGE_SWIPE && page < pages.length - 1)
      setPage((p) => p + 1);
    if (d < -PAGE_SWIPE && page > 0)
      setPage((p) => p - 1);
    setPageTouchStart(null);
    setPageTouchEnd(null);
  };

  return (
    <div className="h-full flex flex-col">
      {/* ================= PROGRESS ================= */}
      <div className="h-1 bg-gray-200">
        <div
          className="h-full bg-maroon transition-all"
          style={{
            width: `${((page + 1) / pages.length) * 100}%`,
          }}
        />
      </div>

      {/* ================= CONTENT ================= */}
      <div
        className="flex-1 p-6 overflow-y-auto overscroll-contain"
        onTouchStart={pageStart}
        onTouchMove={pageMove}
        onTouchEnd={pageEnd}
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {/* ================= ARTICLE ================= */}
        {pages[page] === "article" && (
          <article className="max-w-3xl mx-auto space-y-5 text-gray-800 leading-relaxed">
            {/* HEADLINE */}
            <h2 className="text-4xl font-extrabold text-maroon leading-tight">
              {data.title}
            </h2>

            {/* SUBHEAD */}
            <p className="text-lg italic text-gray-600">
              {data.subtitle}
            </p>

            {/* HERO IMAGE */}
            {data.images?.[0] && (
              <img
                src={data.images[0]}
                alt={data.title}
                className="
                  w-full max-h-[60vh]
                  object-contain rounded-xl
                  bg-gray-100 my-6
                "
              />
            )}

            {/* MAIN CONTENT */}
            <p>{data.text}</p>

            <p>
              Organized by the Supreme Student Council, this initiative
              served as a platform for students to actively engage in
              meaningful programs that promote leadership, collaboration,
              and responsible participation within the academic
              community.
            </p>

            <p>
              The planning phase involved close coordination among council
              officers, advisers, and volunteers to ensure that the goals
              of the activity aligned with institutional values and the
              needs of the student body. Through teamwork and shared
              responsibility, the council successfully translated ideas
              into action.
            </p>

            <p>
              Participation during the event reflected strong student
              involvement and enthusiasm. Attendees were encouraged to
              take part not only as spectators but as contributors,
              reinforcing a culture of inclusivity and shared ownership
              of student-led initiatives.
            </p>

            <p>
              Beyond its immediate outcomes, the activity demonstrated
              the council’s commitment to sustainable leadership and
              service. It highlighted the importance of continuous
              engagement, adaptability, and innovation in responding to
              the evolving needs of the academic community.
            </p>

            <p>
              As the Supreme Student Council moves forward, experiences
              gained from this accomplishment will serve as valuable
              references for future programs, strengthening the council’s
              role as a catalyst for positive change and student
              empowerment.
            </p>
          </article>
        )}

        {/* ================= GALLERY ================= */}
        {pages[page] === "gallery" && (
          <div
            className="
              h-full flex flex-col items-center justify-center gap-4
              select-none
            "
            onTouchStart={imageStart}
            onTouchMove={imageMove}
            onTouchEnd={imageEnd}
          >
            <div className="bg-white border rounded-2xl p-4 w-full max-w-4xl shadow-md">
              <img
                src={data.images[imgIndex]}
                alt={`Gallery ${imgIndex + 1}`}
                className="
                  w-full max-h-[65vh]
                  object-contain rounded-lg
                  bg-gray-100 cursor-zoom-in
                  active:scale-110 transition
                "
              />
            </div>

            {/* DOT INDICATORS */}
            <div className="flex gap-2">
              {data.images.map((_, i) => (
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

        {/* ================= CREDITS ================= */}
        {pages[page] === "credits" && (
          <div className="text-center text-sm text-gray-600 mt-24 space-y-1">
            <p className="font-semibold">
              Supreme Student Council – FORTIS
            </p>
            <p>Academic Year 2025–2026</p>
            <p className="italic">
              Empowering students through leadership and service
            </p>
          </div>
        )}
      </div>

      {/* ================= PAGE NAV ================= */}
      <div className="p-4 flex justify-between items-center border-t">
        <button
          disabled={page === 0}
          onClick={() => setPage((p) => p - 1)}
          className="disabled:opacity-40"
        >
          ◀ Previous
        </button>

        <span className="text-xs">
          Page {page + 1} of {pages.length}
        </span>

        <button
          disabled={page === pages.length - 1}
          onClick={() => setPage((p) => p + 1)}
          className="disabled:opacity-40"
        >
          Next ▶
        </button>
      </div>
    </div>
  );
}
