/* =========================================================
   ANNOUNCEMENTS.JSX
   SSC Website – AMA Computer College Lipa
   Updated Portal Version
========================================================= */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  FaHeart,
  FaStar,
  FaComments,
  FaEnvelope,
  FaFacebook,
  FaCalendarAlt,
  FaBus,
  FaBell,
  FaCamera
} from "react-icons/fa";

/* =========================================================
   FLOATING HEARTS
========================================================= */

function FloatingHearts() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-yellow opacity-20"
          initial={{
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 100
          }}
          animate={{ y: -200 }}
          transition={{
            duration: Math.random() * 12 + 12,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <FaHeart />
        </motion.div>
      ))}
    </div>
  );
}

/* =========================================================
   COUNTDOWN TIMER
========================================================= */

function Countdown({ targetDate }) {
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const target = new Date(targetDate);
      const diff = target - now;

      if (diff <= 0) return;

      setTime({
        d: Math.floor(diff / (1000 * 60 * 60 * 24)),
        h: Math.floor((diff / (1000 * 60 * 60)) % 24),
        m: Math.floor((diff / (1000 * 60)) % 60),
        s: Math.floor((diff / 1000) % 60)
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const box =
    "flex flex-col items-center bg-maroon text-yellow px-3 py-2 rounded-xl w-16 shadow-md";

  return (
    <div className="flex gap-3 mt-4">
      <div className={box}>
        <span className="text-xl font-extrabold">{time.d}</span>
        <span className="text-[10px]">DAYS</span>
      </div>
      <div className={box}>
        <span className="text-xl font-extrabold">{time.h}</span>
        <span className="text-[10px]">HRS</span>
      </div>
      <div className={box}>
        <span className="text-xl font-extrabold">{time.m}</span>
        <span className="text-[10px]">MIN</span>
      </div>
      <div className={box}>
        <span className="text-xl font-extrabold">{time.s}</span>
        <span className="text-[10px]">SEC</span>
      </div>
    </div>
  );
}

/* =========================================================
   COLLEGIATE CALENDAR (PDF)
========================================================= */

function AcademicCalendar() {
  return (
    <div className="bg-darkblue border border-yellow/30 rounded-3xl p-6 shadow-2xl">
      <div className="flex items-center gap-2 font-bold mb-3">
        <FaCalendarAlt />
        Collegiate Calendar – Term 2563
      </div>

      <p className="text-sm text-yellow/70 mb-4">
        View the official academic calendar for the term.
      </p>

      <a
        href="/files/collegiate-calendar-term2563.pdf"
        target="_blank"
        className="bg-yellow text-maroon px-4 py-2 rounded-full text-sm font-semibold"
      >
        View Calendar (PDF)
      </a>
    </div>
  );
}

/* =========================================================
   LIVE ANNOUNCEMENTS
========================================================= */

function LiveAnnouncements() {
  return (
    <div className="bg-darkblue border border-yellow/30 rounded-3xl p-6 shadow-2xl">
      <div className="flex items-center gap-2 font-bold mb-3">
        <FaBell />
        Live Announcements
      </div>

      <ul className="space-y-2 text-sm">
        <li>• Educational Tour moved to March 12, 2026</li>
        <li>• LinTECH competition winners announced</li>
        <li>• SSC consultation this month</li>
        <li>• Website feedback portal now open</li>
      </ul>
    </div>
  );
}

/* =========================================================
   EVENT GALLERY
========================================================= */

function EventGallery() {
  return (
    <div>
      <div className="flex items-center gap-2 text-xl font-bold mb-4">
        <FaCamera />
        Event Gallery
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        <img src="assets/gallery/1.jpg" className="rounded-xl shadow-lg hover:scale-105 transition" />
        <img src="assets/gallery/2.jpg" className="rounded-xl shadow-lg hover:scale-105 transition" />
        <img src="assets/gallery/3.jpg" className="rounded-xl shadow-lg hover:scale-105 transition" />
        <img src="assets/gallery/4.jpg" className="rounded-xl shadow-lg hover:scale-105 transition" />
      </div>
    </div>
  );
}

/* =========================================================
   MAIN ANNOUNCEMENTS
========================================================= */

export default function Announcements() {
  const [openFeedback, setOpenFeedback] = useState(false);

  return (
    <>
      <section
        id="news"
        className="relative py-20 px-4 bg-maroon text-yellow overflow-hidden"
      >
        <FloatingHearts />

        <h2 className="relative z-10 text-4xl md:text-5xl font-bold mb-14 text-center">
          Announcements
        </h2>

        <div className="relative z-10 max-w-7xl mx-auto grid md:grid-cols-3 gap-10">

          {/* LEFT SECTION */}
          <div className="md:col-span-2 space-y-8">

            {/* FEATURED EVENT */}
            <motion.div
              className="bg-white text-darkblue p-6 rounded-3xl shadow-2xl ring-2 ring-yellow/70"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center gap-2 text-xs bg-yellow text-maroon px-3 py-1 rounded-full w-fit mb-2">
                <FaStar /> FEATURED
              </div>

              <h3 className="text-2xl font-extrabold mb-1">
                Educational Tour 2026
              </h3>

              <p className="italic text-maroon/80 text-sm">
                March 12, 2026
              </p>

              <Countdown targetDate="2026-03-12T04:30:00" />

              <p className="text-sm mt-4">
                Students will visit PAGASA, BSP Money Museum,
                Mall of Asia, and Enchanted Kingdom for an
                immersive learning experience.
              </p>
            </motion.div>


            {/* SSC NEWS */}
            <div className="grid sm:grid-cols-2 gap-6">

              <div className="bg-darkblue p-6 rounded-3xl shadow-2xl border border-yellow/30">
                <h4 className="font-bold">LinTECH na FEB-Ibig 2.0</h4>
                <p className="text-xs text-yellow/70">February 12, 2026</p>
                <p className="text-sm mt-2">
                  A celebration of creativity and technology
                  featuring competitions and student booths.
                </p>
              </div>

              <div className="bg-darkblue p-6 rounded-3xl shadow-2xl border border-yellow/30">
                <h4 className="font-bold">SSC Consultation</h4>
                <p className="text-xs text-yellow/70">March 20, 2026</p>
                <p className="text-sm mt-2">
                  Student leaders meet to discuss campus
                  initiatives and academic concerns.
                </p>
              </div>

            </div>

            <EventGallery />

          </div>

          {/* RIGHT SECTION */}
          <div className="space-y-6">

            <AcademicCalendar />

            <LiveAnnouncements />

            {/* FEEDBACK */}
            <div className="bg-darkblue border border-yellow/30 rounded-3xl p-6 shadow-2xl">
              <div className="flex items-center gap-2 mb-2 text-lg">
                <FaComments />
                <h3 className="font-bold">Website Feedback</h3>
              </div>

              <p className="text-sm mb-4">
                Help improve the SSC website by submitting
                your feedback.
              </p>

              <button
                onClick={() => setOpenFeedback(true)}
                className="bg-yellow text-maroon px-5 py-2 rounded-full text-sm font-semibold"
              >
                Give Feedback
              </button>
            </div>

          </div>

        </div>
      </section>


      {/* FEEDBACK MODAL */}

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
                SSC Website Feedback
              </h3>

              <div className="flex flex-wrap gap-4">

                <a
                  href="https://forms.gle/pMmevBzD5Sy9ixTA7"
                  target="_blank"
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
                  href="https://facebook.com"
                  target="_blank"
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