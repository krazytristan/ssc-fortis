import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaHeart,
  FaStar,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaMusic,
  FaCamera,
  FaFilm,
  FaLightbulb,
  FaLaptopCode,
  FaCrown,
  FaMicrophone,
  FaHamburger,
  FaBookOpen,
} from "react-icons/fa";

/* ================= EVENT DATA ================= */

const announcement = {
  title: "LinTECH na FEB-Ibig 2.0",
  tagline: "Where Love Meets Technology",
  desc:
    "Love, music, creativity, and innovation take over the campus this February!",
  details: `Join us at LinTECH na FEB-Ibig 2.0, where technology meets passion and student
talents come alive through exciting booths, performances, and competitions.

Let’s celebrate love, creativity, and community while empowering student leaders
and making campus life unforgettable.`,
  date: "February 12, 2026",
  venue: "AMA Computer College – Lipa",
  images: ["/assets/lint1.jpg", "/assets/lint2.jpg", "/assets/lint3.jpg"],
  activities: [
    { icon: <FaMusic />, label: "Request Song Booth" },
    { icon: <FaMicrophone />, label: "Radio Broadcasting Station" },
    { icon: <FaBookOpen />, label: "Confession into Story" },
    { icon: <FaCamera />, label: "Photo Booth Studio" },
    { icon: <FaHeart />, label: "Crochet Flowers for You" },
    { icon: <FaHamburger />, label: "Food Tech Booth" },
    { icon: <FaFilm />, label: "Movie Film Booth" },
    { icon: <FaLightbulb />, label: "Pitching Competition" },
    { icon: <FaLaptopCode />, label: "Web Design Competition" },
    { icon: <FaCrown />, label: "Mr. & Ms. LinTECH na FEB-Ibig 2026" },
  ],
};

/* ================= COUNTDOWN ================= */

function Countdown() {
  const target = new Date("February 12, 2026 00:00:00").getTime();
  const [time, setTime] = useState({});

  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();
      const diff = target - now;
      if (diff <= 0) return;

      setTime({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-wrap gap-4 mt-6">
      {Object.entries(time).map(([label, value]) => (
        <div
          key={label}
          className="bg-gray-100 px-4 py-3 rounded-xl min-w-[70px] text-center"
        >
          <div className="text-2xl font-extrabold text-maroon">
            {value ?? 0}
          </div>
          <div className="text-xs uppercase text-gray-500">{label}</div>
        </div>
      ))}
    </div>
  );
}

/* ================= FLOATING HEARTS ================= */

function FloatingHearts() {
  const colors = ["text-yellow-300", "text-blue-300", "text-green-300"];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute ${colors[i % colors.length]} opacity-30`}
          initial={{
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 50,
            scale: Math.random() * 0.6 + 0.4,
          }}
          animate={{
            y: -120,
            opacity: [0.2, 0.5, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 12,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear",
          }}
        >
          <FaHeart className="text-2xl md:text-3xl" />
        </motion.div>
      ))}
    </div>
  );
}

/* ================= COMPONENT ================= */

export default function Announcements() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem("lintech_seen");
    if (!seen) {
      setOpen(true);
      localStorage.setItem("lintech_seen", "true");
    }
  }, []);

  return (
    <>
      {/* ================= SECTION ================= */}
      <section
        id="news"
        className="relative py-20 px-4 bg-maroon text-yellow overflow-hidden"
      >
        <FloatingHearts />

        <h2 className="relative z-10 text-4xl md:text-5xl font-bold mb-14 text-center">
          Announcement Highlight
        </h2>

        <div className="relative z-10 max-w-3xl mx-auto">
          <motion.div
            className="relative bg-white text-darkblue p-8 md:p-10 rounded-3xl shadow-2xl ring-4 ring-yellow/70"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="absolute -top-4 -right-4 bg-yellow text-maroon px-3 py-1 rounded-full text-xs font-bold flex gap-1">
              <FaStar /> FEATURED
            </div>

            <div className="w-16 h-16 bg-maroon/10 rounded-full flex items-center justify-center mb-4 text-2xl text-maroon">
              <FaHeart />
            </div>

            <h3 className="text-3xl font-extrabold mb-1">
              {announcement.title}
            </h3>

            <p className="italic text-maroon/80 mb-4">
              {announcement.tagline}
            </p>

            <p className="text-darkblue/90">{announcement.desc}</p>

            <Countdown />

            <button
              onClick={() => setOpen(true)}
              className="mt-8 bg-maroon text-yellow px-7 py-3 rounded-full font-semibold shadow-lg hover:bg-darkblue hover:text-yellow transition"
            >
              View Full Details
            </button>
          </motion.div>
        </div>
      </section>

      {/* ================= MODAL ================= */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/70 z-50"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              className="fixed z-[60] top-1/2 left-1/2 w-[95%] max-w-3xl bg-gradient-to-br from-maroon to-darkblue text-yellow rounded-3xl p-6 md:p-8 shadow-2xl overflow-y-auto max-h-[85vh]"
              initial={{ opacity: 0, scale: 0.85, x: "-50%", y: "-50%" }}
              animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
              exit={{ opacity: 0, scale: 0.85 }}
            >
              <h3 className="text-3xl font-bold mb-3">
                {announcement.title}
              </h3>

              <div className="flex gap-4 text-sm mb-5">
                <div className="flex items-center gap-2">
                  <FaCalendarAlt /> {announcement.date}
                </div>
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt /> {announcement.venue}
                </div>
              </div>

              <p className="whitespace-pre-line mb-6 text-yellow/90">
                {announcement.details}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {announcement.activities.map((act, i) => (
                  <div
                    key={i}
                    className="bg-yellow/10 rounded-xl p-3 flex items-center gap-3"
                  >
                    <span className="text-xl">{act.icon}</span>
                    <span className="text-sm">{act.label}</span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                {announcement.images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt=""
                    className="rounded-xl object-cover h-28 w-full"
                  />
                ))}
              </div>

              <div className="text-right">
                <button
                  onClick={() => setOpen(false)}
                  className="bg-yellow text-maroon px-6 py-2 rounded-full font-semibold hover:bg-darkblue hover:text-yellow transition"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
