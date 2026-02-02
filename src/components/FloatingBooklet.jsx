import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import jsPDF from "jspdf";
import { FaBookOpen } from "react-icons/fa";

/* ===============================
   DATA
================================ */
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
    text: "A tribute honoring educators through performances, appreciation messages, and student-led initiatives.",
    cover: "/assets/img1.jpg",
    images: ["/assets/img1.jpg", "/assets/img2.jpg", "/assets/img3.jpg"],
  },
  {
    title: "NSTP PROJECT COLLABORATION",
    subtitle: "Community & Environmental Outreach",
    text: "A joint outreach initiative fostering civic responsibility, sustainability, and teamwork.",
    cover: "/assets/nstp1.jpg",
    images: ["/assets/nstp1.jpg", "/assets/nstp2.jpg", "/assets/nstp3.jpg"],
  },
  {
    title: "CHRISTMAS STATION ID 2025",
    subtitle: "Unity, Hope & Service",
    text: "A creative production celebrating unity, hope, and service through the holiday season.",
    cover: "/assets/id1.jpg",
    images: ["/assets/id1.jpg", "/assets/id2.jpg", "/assets/id3.jpg"],
  },
  {
    title: "PARTNERSHIP WITH PROJECT SPARK",
    subtitle: "Community & Outreach",
    text: "A collaborative initiative promoting sustainability, student engagement, and community development.",
    cover: "/assets/spark1.jpg",
    images: [
      "/assets/spark1.jpg",
      "/assets/spark2.jpg",
      "/assets/spark3.jpg",
      "/assets/spark4.jpg",
      "/assets/spark5.jpg",
    ],
  },
];

/* ===============================
   MAIN COMPONENT
================================ */
export default function FloatingBooklet() {
  const [open, setOpen] = useState(false);
  const [stage, setStage] = useState("cover");
  const [selectedIndex, setSelectedIndex] = useState(null);

  /* ===============================
     SIDE EFFECTS
  ================================= */

  // Lock background scroll + ESC close
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  /* ===============================
     PDF EXPORT
  ================================= */
  const exportPDF = () => {
    const doc = new jsPDF("p", "mm", "a4");

    doc.setFontSize(20);
    doc.text(coverPage.title, 105, 20, { align: "center" });
    doc.setFontSize(16);
    doc.text(coverPage.subtitle, 105, 30, { align: "center" });
    doc.text(coverPage.year, 105, 40, { align: "center" });

    let y = 60;

    accomplishments.forEach((item) => {
      doc.setFontSize(14);
      doc.text(item.title, 20, y);
      y += 8;
      doc.setFontSize(12);
      doc.text(item.subtitle, 20, y);
      y += 8;
      doc.text(item.text, 20, y, { maxWidth: 170 });
      y += 18;

      if (y > 260) {
        doc.addPage();
        y = 20;
      }
    });

    doc.save("SSC-FORTIS-Accomplishment-Report.pdf");
  };

  const showBackButton = stage !== "cover";

  return (
    <>
      {/* ===============================
          FLOATING BUTTON
      ================================ */}
      <AnimatePresence>
        {!open && (
          <motion.div
            className="fixed left-0 top-1/3 z-50"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.4 }}
          >
            <button
              onClick={() => setOpen(true)}
              className="
                flex items-center gap-2
                bg-maroon/80 backdrop-blur-md text-yellow
                px-4 py-3 rounded-r-full shadow-xl
                hover:bg-maroon hover:scale-105 transition
              "
            >
              <FaBookOpen className="text-lg" />
              <span className="hidden md:inline font-semibold tracking-wide">
                Accomplishments
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===============================
          MODAL
      ================================ */}
      <AnimatePresence>
        {open && (
          <>
            {/* OVERLAY */}
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* MODAL */}
            <motion.div
              className="
                fixed z-50 top-1/2 left-1/2
                w-[92%] max-w-5xl h-[85vh]
                bg-white/95 backdrop-blur-xl
                rounded-2xl shadow-[0_0_60px_rgba(128,0,0,0.4)]
                flex flex-col overflow-hidden
              "
              initial={{ opacity: 0, scale: 0.85, x: "-50%", y: "-50%" }}
              animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
              exit={{ opacity: 0, scale: 0.85 }}
            >
              {/* HEADER */}
              <div className="bg-maroon/90 text-yellow px-5 py-3 flex justify-between items-center">
                <h2 className="font-bold text-xs md:text-sm tracking-widest">
                  SUPREME STUDENT COUNCIL
                </h2>

                <div className="flex items-center gap-2">
                  {showBackButton && (
                    <button
                      onClick={() =>
                        stage === "detail"
                          ? setStage("grid")
                          : setStage("cover")
                      }
                      className="bg-yellow text-maroon px-3 py-1 rounded text-xs hover:bg-maroon hover:text-yellow"
                    >
                      Back
                    </button>
                  )}

                  <button
                    onClick={exportPDF}
                    className="bg-yellow text-maroon px-3 py-1 rounded text-xs hover:bg-maroon hover:text-yellow"
                  >
                    PDF
                  </button>

                  <button
                    onClick={() => setOpen(false)}
                    className="text-lg font-bold"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* CONTENT */}
              <div className="flex-1 relative p-3 overflow-y-auto">
                <AnimatePresence mode="wait">
                  {stage === "cover" && (
                    <motion.div
                      key="cover"
                      className="absolute inset-0 cursor-pointer"
                      onClick={() => setStage("grid")}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <CoverPage data={coverPage} />
                    </motion.div>
                  )}

                  {stage === "grid" && (
                    <motion.div
                      key="grid"
                      className="absolute inset-0 flex flex-wrap justify-center gap-5"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {accomplishments.map((item, i) => (
                        <MiniBookMagazine
                          key={i}
                          data={item}
                          onClick={() => {
                            setSelectedIndex(i);
                            setStage("detail");
                          }}
                        />
                      ))}
                    </motion.div>
                  )}

                  {stage === "detail" && selectedIndex !== null && (
                    <motion.div
                      key="detail"
                      className="absolute inset-0 p-2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                    >
                      <DetailMagazine
                        data={accomplishments[selectedIndex]}
                      />
                    </motion.div>
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

/* ===============================
   SUB COMPONENTS
================================ */

function CoverPage({ data }) {
  return (
    <div
      className="h-full w-full flex items-center justify-center text-center rounded-xl overflow-hidden"
      style={{
        backgroundImage: `url(${data.coverImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 text-yellow px-6">
        <h1 className="text-3xl md:text-4xl font-extrabold">{data.title}</h1>
        <h2 className="text-lg font-semibold">{data.subtitle}</h2>
        <p className="tracking-widest text-sm">{data.year}</p>
        <p className="mt-2 text-xs opacity-80">Tap to view accomplishments</p>
      </div>
    </div>
  );
}

function MiniBookMagazine({ data, onClick }) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: 1.06 }}
      className="w-64 h-72 rounded-2xl overflow-hidden shadow-xl cursor-pointer"
    >
      <img
        src={data.cover}
        alt={data.title}
        className="w-full h-full object-cover"
      />
    </motion.div>
  );
}

function DetailMagazine({ data }) {
  return (
    <div className="space-y-4">
      <img
        src={data.cover}
        alt={data.title}
        className="w-full h-64 rounded-xl object-cover"
      />

      <h3 className="text-xl font-bold text-maroon">{data.title}</h3>
      <h4 className="text-sm font-semibold text-gray-700">{data.subtitle}</h4>
      <p className="text-sm text-gray-800 leading-relaxed">{data.text}</p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {data.images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt=""
            className="w-full h-40 object-cover rounded-lg"
          />
        ))}
      </div>
    </div>
  );
}
