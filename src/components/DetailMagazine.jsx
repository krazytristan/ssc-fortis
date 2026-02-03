function DetailMagazine({ data }) {
  const pages = ["article", "gallery", "credits"];
  const [page, setPage] = useState(0);
  const [imgIndex, setImgIndex] = useState(0);

  // swipe support
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const minSwipeDistance = 50;

  useEffect(() => {
    setImgIndex(0);
  }, [page, data]);

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEndHandler = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;

    if (distance > minSwipeDistance) {
      // swipe left → next image
      setImgIndex((i) =>
        Math.min(i + 1, data.images.length - 1)
      );
    }

    if (distance < -minSwipeDistance) {
      // swipe right → previous image
      setImgIndex((i) => Math.max(i - 1, 0));
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* PROGRESS */}
      <div className="h-1 bg-gray-200">
        <div
          className="h-full bg-maroon"
          style={{ width: `${((page + 1) / pages.length) * 100}%` }}
        />
      </div>

      {/* CONTENT */}
      <div className="flex-1 p-6 overflow-y-auto">
        {/* ================= ARTICLE ================= */}
        {pages[page] === "article" && (
          <article className="newspaper-article text-gray-800">
            <h2 className="headline">{data.title}</h2>
            <p className="subhead">{data.subtitle}</p>

            {data.images?.[0] && (
              <img src={data.images[0]} alt={data.title} />
            )}

            <p>{data.text}</p>

            <p>
              This accomplishment highlights the Supreme Student Council’s
              dedication to leadership, collaboration, and service.
            </p>

            <p>
              Through active participation and shared responsibility,
              the initiative strengthened unity within the academic
              community.
            </p>
          </article>
        )}

        {/* ================= GALLERY (ONE IMAGE + SWIPE) ================= */}
        {pages[page] === "gallery" && (
          <div
            className="h-full flex flex-col items-center justify-center gap-4"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEndHandler}
          >
            <div className="bg-white border rounded-xl p-4 w-full flex justify-center">
              <img
                src={data.images[imgIndex]}
                alt={`Gallery ${imgIndex + 1}`}
                className="
                  max-h-[65vh]
                  w-full
                  object-contain
                  rounded-lg
                "
              />
            </div>

            <span className="text-xs text-gray-500">
              Image {imgIndex + 1} of {data.images.length}
            </span>

            {/* DESKTOP BUTTONS */}
            <div className="hidden md:flex gap-4">
              <button
                disabled={imgIndex === 0}
                onClick={() =>
                  setImgIndex((i) => Math.max(i - 1, 0))
                }
                className="px-3 py-1 border rounded disabled:opacity-40"
              >
                ◀ Previous Image
              </button>

              <button
                disabled={imgIndex === data.images.length - 1}
                onClick={() =>
                  setImgIndex((i) =>
                    Math.min(i + 1, data.images.length - 1)
                  )
                }
                className="px-3 py-1 border rounded disabled:opacity-40"
              >
                Next Image ▶
              </button>
            </div>
          </div>
        )}

        {/* ================= CREDITS ================= */}
        {pages[page] === "credits" && (
          <p className="text-sm text-gray-600">
            Supreme Student Council – FORTIS
            <br />
            AY 2025–2026
          </p>
        )}
      </div>

      {/* PAGE NAV */}
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
