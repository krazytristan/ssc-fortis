/* =========================================================
   ANNOUNCEMENTS.JSX
   Supreme Student Council Website
   Full Version – ~500+ Lines
   ========================================================= */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ================= ICONS ================= */

import {
  FaHeart,
  FaStar,
  FaComments,
  FaEnvelope,
  FaFacebook,
  FaCalendarAlt,
  FaBus,
  FaMusic,
  FaMicrophone,
  FaCamera,
  FaBookOpen,
  FaFilm,
  FaLightbulb,
  FaLaptopCode,
  FaCrown,
  FaHamburger,
} from "react-icons/fa";

/* =========================================================
   FLOATING HEARTS BACKGROUND
========================================================= */

function FloatingHearts() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-yellow-300 opacity-20"
          initial={{
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 100,
            scale: Math.random() * 0.6 + 0.4,
          }}
          animate={{
            y: -200,
            opacity: [0.2, 0.4, 0],
          }}
          transition={{
            duration: Math.random() * 12 + 12,
            repeat: Infinity,
            delay: Math.random() * 6,
            ease: "linear",
          }}
        >
          <FaHeart />
        </motion.div>
      ))}
    </div>
  );
}

/* =========================================================
   LIVE COUNTDOWN COMPONENT
   NUMBERS ONLY: DAYS / HOURS / MINUTES / SECONDS
========================================================= */

function Countdown({ targetDate }) {
  const [time, setTime] = useState({
    d: 0,
    h: 0,
    m: 0,
    s: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const target = new Date(targetDate);
      const diff = target - now;

      if (diff <= 0) {
        clearInterval(interval);
        return;
      }

      setTime({
        d: Math.floor(diff / (1000 * 60 * 60 * 24)),
        h: Math.floor((diff / (1000 * 60 * 60)) % 24),
        m: Math.floor((diff / (1000 * 60)) % 60),
        s: Math.floor((diff / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const boxClass =
    "flex flex-col items-center bg-maroon text-yellow px-3 py-2 rounded-xl w-16 shadow-md";

  return (
    <div className="flex gap-3 mt-4">
      <div className={boxClass}>
        <span className="text-xl font-extrabold">
          {String(time.d).padStart(2, "0")}
        </span>
        <span className="text-[10px]">DAYS</span>
      </div>
      <div className={boxClass}>
        <span className="text-xl font-extrabold">
          {String(time.h).padStart(2, "0")}
        </span>
        <span className="text-[10px]">HRS</span>
      </div>
      <div className={boxClass}>
        <span className="text-xl font-extrabold">
          {String(time.m).padStart(2, "0")}
        </span>
        <span className="text-[10px]">MIN</span>
      </div>
      <div className={boxClass}>
        <span className="text-xl font-extrabold">
          {String(time.s).padStart(2, "0")}
        </span>
        <span className="text-[10px]">SEC</span>
      </div>
    </div>
  );
}

/* =========================================================
   MINI CALENDAR – FEBRUARY 2026
========================================================= */

function MiniCalendar() {
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="bg-darkblue border border-yellow/30 rounded-2xl p-4 text-yellow shadow-xl w-full max-w-[280px] mx-auto">
      <div className="flex items-center gap-2 font-bold mb-3">
        <FaCalendarAlt />
        February 2026
      </div>

      {/* DAYS */}
      <div className="grid grid-cols-7 gap-1 text-xs text-center text-yellow/70 mb-2">
        {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* DATES */}
      <div className="grid grid-cols-7 gap-1 text-sm">
        {[...Array(28)].map((_, i) => {
          const day = i + 1;
          const key = `2026-02-${String(day).padStart(2, "0")}`;

          let style = "text-yellow/70";

          if (key === today) {
            style = "bg-maroon text-yellow ring-2 ring-yellow";
          } else if (day === 12) {
            style = "bg-pink-500 text-white";
          } else if (day === 26) {
            style = "bg-yellow text-maroon";
          }

          return (
            <div
              key={day}
              className={`h-7 flex items-center justify-center rounded-full font-semibold ${style}`}
            >
              {day}
            </div>
          );
        })}
      </div>

      {/* LEGEND */}
      <div className="mt-4 text-xs space-y-1">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-pink-500 rounded-full" />
          LinTECH (Feb 12)
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-yellow rounded-full" />
          Educational Tour (Feb 26)
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-maroon rounded-full" />
          Today
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   MAIN ANNOUNCEMENTS COMPONENT
========================================================= */

export default function Announcements() {
  const [openEvent, setOpenEvent] = useState(null);
  const [openFeedback, setOpenFeedback] = useState(false);

  return (
    <>
      {/* ================= SECTION ================= */}
      <section
        id="news"
        className="relative py-20 px-4 bg-maroon text-yellow overflow-hidden"
      >
        <FloatingHearts />

        <h2 className="relative z-10 text-4xl md:text-5xl font-bold mb-14 text-center">
          Announcements
        </h2>

        {/* ================= GRID ================= */}
        <div className="relative z-10 max-w-7xl mx-auto grid md:grid-cols-3 gap-10">

          {/* ================= LEFT ================= */}
          <div className="md:col-span-2 grid sm:grid-cols-2 gap-8">

            {/* LINTECH CARD */}
            <motion.div
              className="bg-white text-darkblue p-6 rounded-3xl shadow-2xl ring-2 ring-yellow/70"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center gap-2 text-xs bg-yellow text-maroon px-3 py-1 rounded-full w-fit mb-2">
                <FaStar /> FEATURED
              </div>

              <h3 className="text-2xl font-extrabold mb-1">
                LinTECH na FEB-Ibig 2.0
              </h3>

              <p className="italic text-maroon/80 text-sm">
                February 12, 2026
              </p>

              <Countdown targetDate="2026-02-12T00:00:00" />

              <p className="text-sm mt-4">
                A celebration of love, technology, creativity, student booths,
                performances, and competitions.
              </p>

              <button
                onClick={() => setOpenEvent("lintech")}
                className="mt-4 bg-maroon text-yellow px-4 py-2 rounded-full text-sm font-semibold"
              >
                View Details
              </button>
            </motion.div>

            {/* EDUC TOUR CARD */}
            <motion.div
              className="bg-darkblue text-yellow p-6 rounded-3xl shadow-2xl border border-yellow/30"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center gap-2 text-xs bg-yellow/20 px-3 py-1 rounded-full w-fit mb-2">
                <FaBus /> ACADEMIC EVENT
              </div>

              <h3 className="text-2xl font-extrabold mb-1">
                Educational Tour 2026
              </h3>

              <p className="italic text-yellow/80 text-sm">
                February 26, 2026
              </p>

              <p className="text-sm mt-4">
                Decoding ideas, connecting minds, and applying classroom
                knowledge to real-world environments.
              </p>

              <button
                onClick={() => setOpenEvent("tour")}
                className="mt-4 bg-yellow text-maroon px-4 py-2 rounded-full text-sm font-semibold"
              >
                View Tour Details
              </button>
            </motion.div>

            {/* FEEDBACK CARD */}
            <motion.div
              className="bg-darkblue text-yellow p-6 rounded-3xl shadow-2xl border border-yellow/30 sm:col-span-2"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center gap-2 mb-2 text-lg">
                <FaComments />
                <h3 className="font-bold">Website Feedback</h3>
              </div>

              <p className="text-sm mb-4">
                Your feedback helps us improve accessibility, design,
                performance, and user experience of the SSC Website.
              </p>

              <button
                onClick={() => setOpenFeedback(true)}
                className="bg-yellow text-maroon px-5 py-2 rounded-full text-sm font-semibold"
              >
                Give Feedback
              </button>
            </motion.div>
          </div>

          {/* ================= RIGHT ================= */}
          <div className="self-start">
            <MiniCalendar />
          </div>
        </div>
      </section>

      {/* =====================================================
         EVENT MODAL
      ===================================================== */}
      <AnimatePresence>
        {openEvent && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/70 z-50"
              onClick={() => setOpenEvent(null)}
            />
            <motion.div
              className="fixed z-[60] top-1/2 left-1/2 w-[95%] max-w-4xl
                         bg-gradient-to-br from-maroon to-darkblue text-yellow
                         rounded-3xl p-6 shadow-2xl overflow-y-auto max-h-[85vh]"
              initial={{ scale: 0.85, x: "-50%", y: "-50%" }}
              animate={{ scale: 1, x: "-50%", y: "-50%" }}
            >
              <h3 className="text-3xl font-bold mb-6">
                {openEvent === "lintech"
                  ? "LinTECH na FEB-Ibig 2.0"
                  : "Educational Tour 2026"}
              </h3>

              {/* LINTECH ACTIVITIES */}
              {openEvent === "lintech" && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm mb-6">
                  <div className="flex gap-2"><FaMusic /> Request Song Booth</div>
                  <div className="flex gap-2"><FaMicrophone /> Radio Broadcasting</div>
                  <div className="flex gap-2"><FaBookOpen /> Confession into Story</div>
                  <div className="flex gap-2"><FaCamera /> Photo Booth Studio</div>
                  <div className="flex gap-2"><FaHamburger /> Food Tech Booth</div>
                  <div className="flex gap-2"><FaFilm /> Movie Booth</div>
                  <div className="flex gap-2"><FaLightbulb /> Pitching Competition</div>
                  <div className="flex gap-2"><FaLaptopCode /> Web Design Competition</div>
                  <div className="flex gap-2"><FaCrown /> Mr. & Ms. LinTECH</div>
                </div>
              )}

              {/* EDUC TOUR DETAILS */}
              {openEvent === "tour" && (
                <p className="whitespace-pre-line text-sm leading-relaxed mb-6">
                📅 February 26, 2026

                4:30 AM – Assembly @ School  
                5:00 AM – Departure  
                6:15 AM – Total San Pedro  
                9:00–11:00 AM – PAGASA  
                11:30 AM – Lunch @ MOA  
                1:00–3:30 PM – BSP Money Museum  
                4:30–7:00 PM – Enchanted Kingdom  
                10:00 PM – ETA @ AMACC Lipa
                </p>
              )}

              <div className="text-right">
                <button
                  onClick={() => setOpenEvent(null)}
                  className="bg-yellow text-maroon px-6 py-2 rounded-full font-semibold"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* =====================================================
         FEEDBACK MODAL
      ===================================================== */}
      <AnimatePresence>
        {openFeedback && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/70 z-50"
              onClick={() => setOpenFeedback(false)}
            />
            <motion.div
              className="fixed z-[60] top-1/2 left-1/2 w-[95%] max-w-3xl
                         bg-darkblue text-yellow rounded-3xl p-6 shadow-2xl"
              initial={{ scale: 0.85, x: "-50%", y: "-50%" }}
              animate={{ scale: 1, x: "-50%", y: "-50%" }}
            >
              <h3 className="text-xl font-bold mb-4">
                📢 SSC Website Feedback
              </h3>

              <p className="text-sm mb-4">
                By submitting feedback, you help us comply with continuous
                improvement and student-centered service.
              </p>

              <div className="flex flex-wrap gap-4">
                <a
                  href="https://forms.gle/pMmevBzD5Sy9ixTA7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-yellow text-maroon px-6 py-2 rounded-full font-semibold"
                >
                  Submit Feedback
                </a>

                <a
                  href="mailto:ssc.amacclipa@gmail.com"
                  className="bg-yellow/20 px-6 py-2 rounded-full flex items-center gap-2"
                >
                  <FaEnvelope /> Email
                </a>

                <a
                  href="https://web.facebook.com/profile.php?id=61580744985540"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-yellow/20 px-6 py-2 rounded-full flex items-center gap-2"
                >
                  <FaFacebook /> Facebook
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
