/* =========================================================
   ANNOUNCEMENTS.JSX
   SSC Website – AMA Computer College Lipa
========================================================= */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  FaStar,
  FaComments,
  FaEnvelope,
  FaFacebook,
  FaCalendarAlt,
  FaBell,
  FaCamera,
  FaDownload
} from "react-icons/fa";

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
    <div className="flex gap-3 mt-4 flex-wrap">

      {Object.entries(time).map(([k, v]) => (

        <div key={k} className={box}>
          <span className="text-xl font-extrabold">{v}</span>
          <span className="text-[10px] uppercase">{k}</span>
        </div>

      ))}

    </div>
  );
}

/* =========================================================
   SSC NEWS
========================================================= */

function SSCNews() {

  const news = [

    {
      title: "LinTECH na FEB-Ibig 2.0",
      date: "February 12, 2026",
      desc: "Celebrating innovation and creativity through competitions and booths."
    },

    {
      title: "SSC Consultation",
      date: "March 20, 2026",
      desc: "Open discussion between SSC officers and students."
    }

  ];

  return (

    <div>

      <div className="flex items-center gap-2 text-xl font-bold mb-4">
        <FaComments />
        SSC News
      </div>

      <div className="grid sm:grid-cols-2 gap-6">

        {news.map((item, i) => (

          <div
            key={i}
            className="bg-darkblue p-6 rounded-3xl shadow-2xl border border-yellow/30"
          >

            <h4 className="font-bold">{item.title}</h4>
            <p className="text-xs text-yellow/70">{item.date}</p>
            <p className="text-sm mt-2">{item.desc}</p>

          </div>

        ))}

      </div>

    </div>

  );

}

/* =========================================================
   EVENT GALLERY
========================================================= */

function EventGallery() {

  const images = [

    `${import.meta.env.BASE_URL}gallery/1.jpg`,
    `${import.meta.env.BASE_URL}gallery/2.jpg`,
    `${import.meta.env.BASE_URL}gallery/3.jpg`,
    `${import.meta.env.BASE_URL}gallery/4.jpg`

  ];

  return (

    <div>

      <div className="flex items-center gap-2 text-xl font-bold mb-4">
        <FaCamera />
        Event Gallery
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

        {images.map((img, i) => (

          <img
            key={i}
            src={img}
            alt="event"
            className="rounded-xl shadow-lg hover:scale-105 transition object-cover w-full h-40"
          />

        ))}

      </div>

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
        <li>• LinTECH winners announced</li>
        <li>• SSC consultation upcoming</li>
        <li>• Website feedback now open</li>
      </ul>

    </div>

  );

}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function Announcements() {

  const [openFeedback, setOpenFeedback] = useState(false);
  const [openCalendar, setOpenCalendar] = useState(false);

  const pdfUrl =
    `${import.meta.env.BASE_URL}files/collegiate-calendar-term2563.pdf`;

  const bgImage =
    `${import.meta.env.BASE_URL}assets/announcement-bg.jpg`;

  return (
    <>

      <section
        id="news"
        className="relative py-20 px-4 text-yellow overflow-hidden"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >

        {/* overlay */}
        <div className="absolute inset-0 bg-maroon/90"></div>

        <div className="relative z-10">

          <h2 className="text-4xl md:text-5xl font-bold mb-14 text-center">
            Announcements
          </h2>

          <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">

            {/* LEFT */}
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

                <h3 className="text-2xl font-extrabold">
                  Educational Tour 2026
                </h3>

                <p className="italic text-maroon/80 text-sm">
                  March 12, 2026
                </p>

                <Countdown targetDate="2026-03-12T04:30:00" />

                <p className="text-sm mt-4">
                  Students will visit PAGASA, BSP Money Museum,
                  Mall of Asia and Enchanted Kingdom.
                </p>

              </motion.div>

              <SSCNews />

              <EventGallery />

            </div>

            {/* RIGHT PANEL */}
            <div className="space-y-6">

              {/* CALENDAR */}
              <div className="bg-darkblue border border-yellow/30 rounded-3xl p-6 shadow-2xl">

                <div className="flex items-center gap-2 font-bold mb-3">
                  <FaCalendarAlt />
                  Collegiate Calendar – Term 2563
                </div>

                <button
                  onClick={() => setOpenCalendar(true)}
                  className="bg-yellow text-maroon px-4 py-2 rounded-full font-semibold"
                >
                  View Calendar
                </button>

              </div>

              <LiveAnnouncements />

              {/* FEEDBACK */}
              <div className="bg-darkblue border border-yellow/30 rounded-3xl p-6 shadow-2xl">

                <div className="flex items-center gap-2 mb-2 text-lg">
                  <FaComments />
                  <h3 className="font-bold">Website Feedback</h3>
                </div>

                <button
                  onClick={() => setOpenFeedback(true)}
                  className="bg-yellow text-maroon px-5 py-2 rounded-full font-semibold"
                >
                  Give Feedback
                </button>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* CALENDAR MODAL */}

      <AnimatePresence>
        {openCalendar && (

          <motion.div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">

            <motion.div
              className="bg-darkblue text-yellow w-full max-w-5xl rounded-3xl shadow-2xl p-4"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
            >

              <div className="flex justify-between items-center mb-4">

                <h3 className="font-bold text-lg">
                  Collegiate Calendar – Term 2563
                </h3>

                <div className="flex gap-3">

                  <a
                    href={pdfUrl}
                    download
                    className="bg-yellow text-maroon px-4 py-2 rounded-full font-semibold flex items-center gap-2"
                  >
                    <FaDownload /> Download
                  </a>

                  <button
                    onClick={() => setOpenCalendar(false)}
                    className="bg-yellow/20 px-4 py-2 rounded-full"
                  >
                    Close
                  </button>

                </div>

              </div>

              <div className="w-full h-[70vh] bg-white rounded-xl overflow-hidden">

                <iframe
                  src={pdfUrl}
                  title="calendar"
                  className="w-full h-full"
                />

              </div>

            </motion.div>

          </motion.div>

        )}
      </AnimatePresence>

    </>
  );
}