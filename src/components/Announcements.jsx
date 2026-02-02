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

const EVENT_DATE = new Date(2026, 1, 12); // Feb 12, 2026

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
  images: ["assets/lint1.jpg", "assets/lint2.jpg", "assets/lint3.jpg"],
  activities: [
    { icon: FaMusic, label: "Request Song Booth" },
    { icon: FaMicrophone, label: "Radio Broadcasting Station" },
    { icon: FaBookOpen, label: "Confession into Story" },
    { icon: FaCamera, label: "Photo Booth Studio" },
    { icon: FaHeart, label: "Crochet Flowers for You" },
    { icon: FaHamburger, label: "Food Tech Booth" },
    { icon: FaFilm, label: "Movie Film Booth" },
    { icon: FaLightbulb, label: "Pitching Competition" },
    { icon: FaLaptopCode, label: "Web Design Competition" },
    { icon: FaCrown, label: "Mr. & Ms. LinTECH na FEB-Ibig 2026" },
  ],
};

/* ================= FLOATING HEARTS ================= */

function FloatingHearts() {
  const colors = [
    "text-yellow-300",
    "text-maroon",
    "text-blue-400",
    "text-green-400",
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {[...Array(22)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute ${colors[i % colors.length]} opacity-30`}
          initial={{
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 80,
            scale: Math.random() * 0.6 + 0.4,
          }}
          animate={{
            y: -140,
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

/* ================= REAL-TIME MINI CALENDAR ================= */

function MiniCalendar() {
  const [today, setToday] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setToday(new Date()), 60000);
    return () => clearInterval(t);
  }, []);

  const year = today.getFullYear();
  const month = today.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const isEventMonth =
    year === EVENT_DATE.getFullYear() &&
    month === EVENT_DATE.getMonth();

  return (
    <div className="bg-maroon text-yellow rounded-2xl p-4 shadow-lg">
      <div className="flex items-center justify-center gap-2 mb-3">
        <FaCalendarAlt />
        <span className="font-bold">
          {today.toLocaleString("default", { month: "long" })} {year}
        </span>
      </div>

      <div className="grid grid-cols-7 text-[10px] text-center mb-2">
        {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
          <span key={d} className="opacity-70">{d}</span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-xs">
        {[...Array(firstDay)].map((_, i) => (
          <span key={`e-${i}`} />
        ))}

        {[...Array(daysInMonth)].map((_, i) => {
          const day = i + 1;
          const isToday =
            day === today.getDate() && month === today.getMonth();
          const isEventDay = isEventMonth && day === EVENT_DATE.getDate();

          return (
            <span
              key={day}
              className={`py-1 rounded-full
                ${
                  isEventDay
                    ? "bg-yellow text-maroon font-bold"
                    : isToday
                    ? "border border-yellow"
                    : "opacity-80"
                }`}
            >
              {day}
            </span>
          );
        })}
      </div>

      <p className="mt-3 text-[10px] text-center text-yellow/80">
        ⭐ Event Date Highlighted
      </p>
    </div>
  );
}

/* ================= MAIN COMPONENT ================= */

export default function Announcements() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <section
        id="news"
        className="relative py-20 px-4 bg-maroon text-yellow overflow-hidden"
      >
        {/* FLOATING HEARTS */}
        <FloatingHearts />

        <h2 className="relative z-10 text-4xl md:text-5xl font-bold mb-14 text-center">
          Announcement Highlight
        </h2>

        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.div
            className="relative bg-white text-darkblue p-8 rounded-3xl shadow-2xl ring-4 ring-yellow/70"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* FEATURED BADGE */}
            <div className="absolute -top-4 -right-4 bg-yellow text-maroon px-3 py-1 rounded-full text-xs font-bold flex gap-1 z-20">
              <FaStar /> FEATURED
            </div>

            <div className="grid md:grid-cols-[1fr_260px] gap-8 items-start">
              {/* LEFT */}
              <div>
                <div className="w-14 h-14 bg-maroon/10 rounded-full flex items-center justify-center mb-4 text-2xl text-maroon">
                  <FaHeart />
                </div>

                <h3 className="text-3xl font-extrabold mb-1">
                  {announcement.title}
                </h3>

                <p className="italic text-maroon/80 mb-3">
                  {announcement.tagline}
                </p>

                <p className="text-darkblue/90">{announcement.desc}</p>

                <button
                  onClick={() => setOpen(true)}
                  className="mt-6 bg-maroon text-yellow px-7 py-3 rounded-full font-semibold shadow-lg hover:bg-darkblue transition"
                >
                  View Full Details
                </button>
              </div>

              {/* RIGHT CALENDAR */}
              <MiniCalendar />
            </div>
          </motion.div>
        </div>
      </section>

      {/* MODAL (unchanged – still includes activities + images) */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/70 z-50"
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="fixed z-[60] top-1/2 left-1/2 w-[95%] max-w-4xl bg-gradient-to-br from-maroon to-darkblue text-yellow rounded-3xl p-6 shadow-2xl overflow-y-auto max-h-[85vh]"
              initial={{ scale: 0.85, x: "-50%", y: "-50%" }}
              animate={{ scale: 1, x: "-50%", y: "-50%" }}
            >
              <h3 className="text-3xl font-bold mb-4">
                {announcement.title}
              </h3>

              <p className="whitespace-pre-line mb-6">
                {announcement.details}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {announcement.activities.map((a, i) => {
                  const Icon = a.icon;
                  return (
                    <div key={i} className="bg-yellow/10 p-3 rounded-xl flex gap-3 items-center">
                      <Icon className="text-xl" />
                      <span className="text-sm">{a.label}</span>
                    </div>
                  );
                })}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {announcement.images.map((img, i) => (
                  <img key={i} src={img} alt="" className="h-36 w-full object-cover rounded-xl" />
                ))}
              </div>

              <div className="text-right">
                <button
                  onClick={() => setOpen(false)}
                  className="bg-yellow text-maroon px-6 py-2 rounded-full font-semibold"
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
