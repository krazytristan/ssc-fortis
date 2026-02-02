import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaHeart,
  FaStar,
  FaMusic,
  FaCamera,
  FaFilm,
  FaLightbulb,
  FaLaptopCode,
  FaCrown,
  FaMicrophone,
  FaHamburger,
  FaBookOpen,
  FaComments,
  FaEnvelope,
  FaFacebook,
} from "react-icons/fa";

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
      {[...Array(24)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute ${colors[i % colors.length]} opacity-30`}
          initial={{
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 100,
            scale: Math.random() * 0.6 + 0.4,
          }}
          animate={{
            y: -150,
            opacity: [0.2, 0.5, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 12,
            repeat: Infinity,
            delay: Math.random() * 6,
            ease: "linear",
          }}
        >
          <FaHeart className="text-2xl md:text-3xl" />
        </motion.div>
      ))}
    </div>
  );
}

/* ================= EVENT DATA ================= */

const eventAnnouncement = {
  title: "LinTECH na FEB-Ibig 2.0",
  tagline: "Where Love Meets Technology",
  desc:
    "Love, music, creativity, and innovation take over the campus this February!",
  details: `Join us at LinTECH na FEB-Ibig 2.0, where technology meets passion and student
talents come alive through exciting booths, performances, and competitions.

Let’s celebrate love, creativity, and community while empowering student leaders
and making campus life unforgettable.`,
  images: [
    "assets/lint1.jpg",
    "assets/lint2.jpg",
    "assets/lint3.jpg",
  ],
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

/* ================= MAIN COMPONENT ================= */

export default function Announcements() {
  const [openEvent, setOpenEvent] = useState(false);
  const [openFeedback, setOpenFeedback] = useState(false);

  return (
    <>
      {/* ================= SECTION ================= */}
      <section
        id="news"
        className="relative py-20 px-4 bg-maroon text-yellow overflow-hidden"
      >
        {/* FLOATING HEARTS */}
        <FloatingHearts />

        <h2 className="relative z-10 text-4xl md:text-5xl font-bold mb-14 text-center">
          Announcements
        </h2>

        <div className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
          {/* ================= FEATURED EVENT CARD ================= */}
          <motion.div
            className="relative bg-white text-darkblue p-8 rounded-3xl shadow-2xl ring-4 ring-yellow/70"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <div className="absolute -top-4 -right-4 bg-yellow text-maroon px-3 py-1 rounded-full text-xs font-bold flex gap-1">
              <FaStar /> FEATURED
            </div>

            <h3 className="text-3xl font-extrabold mb-2">
              {eventAnnouncement.title}
            </h3>

            <p className="italic text-maroon/80 mb-4">
              {eventAnnouncement.tagline}
            </p>

            <p className="text-darkblue/90 mb-6">
              {eventAnnouncement.desc}
            </p>

            <button
              onClick={() => setOpenEvent(true)}
              className="bg-maroon text-yellow px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-darkblue transition"
            >
              View Event Details
            </button>
          </motion.div>

          {/* ================= FEEDBACK CARD ================= */}
          <motion.div
            className="bg-darkblue text-yellow p-8 rounded-3xl shadow-2xl border border-yellow/30"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <div className="flex items-center gap-3 mb-4 text-2xl">
              <FaComments />
              <h3 className="text-2xl font-bold">
                Website Feedback
              </h3>
            </div>

            <p className="text-sm leading-relaxed mb-6 text-yellow/90">
              Help us improve the SSC Website by sharing your experience,
              suggestions, and ideas.
              Your feedback is valuable in making this platform better for
              everyone!
              Let's work together to create an engaging and user-friendly website.
            </p>

            <button
              onClick={() => setOpenFeedback(true)}
              className="bg-yellow text-maroon px-6 py-3 rounded-full font-semibold hover:bg-white transition"
            >
              View Feedback Announcement
            </button>
          </motion.div>
        </div>
      </section>

      {/* ================= EVENT MODAL ================= */}
      <AnimatePresence>
        {openEvent && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/70 z-50"
              onClick={() => setOpenEvent(false)}
            />
            <motion.div
              className="fixed z-[60] top-1/2 left-1/2 w-[95%] max-w-4xl
                         bg-gradient-to-br from-maroon to-darkblue text-yellow
                         rounded-3xl p-6 shadow-2xl overflow-y-auto max-h-[85vh]"
              initial={{ scale: 0.85, x: "-50%", y: "-50%" }}
              animate={{ scale: 1, x: "-50%", y: "-50%" }}
            >
              <h3 className="text-3xl font-bold mb-4">
                {eventAnnouncement.title}
              </h3>

              <p className="whitespace-pre-line mb-6">
                {eventAnnouncement.details}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {eventAnnouncement.activities.map((a, i) => {
                  const Icon = a.icon;
                  return (
                    <div
                      key={i}
                      className="bg-yellow/10 p-3 rounded-xl flex gap-3 items-center"
                    >
                      <Icon className="text-xl" />
                      <span className="text-sm">{a.label}</span>
                    </div>
                  );
                })}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {eventAnnouncement.images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt=""
                    className="h-36 w-full object-cover rounded-xl"
                  />
                ))}
              </div>

              <div className="text-right">
                <button
                  onClick={() => setOpenEvent(false)}
                  className="bg-yellow text-maroon px-6 py-2 rounded-full font-semibold"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ================= FEEDBACK MODAL ================= */}
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
              <h3 className="text-2xl font-bold mb-4">
                📢 SSC Website Feedback
              </h3>

              <p className="text-sm leading-relaxed mb-6">
                Dear Students,<br /><br />
                The Supreme Student Council (SSC) officially launched this
                website for you. We invite your suggestions to improve design,
                navigation, accessibility, and features.
              </p>

              <div className="flex flex-wrap gap-4">
                <a
                  href="https://forms.gle/pMmevBzD5Sy9ixTA7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-yellow text-maroon px-6 py-2 rounded-full font-semibold"
                >
                  Submit Feedback Form
                </a>

                <a
                  href="mailto:ssc.amacclipa@gmail.com"
                  className="bg-yellow/20 px-6 py-2 rounded-full flex items-center gap-2"
                >
                  <FaEnvelope /> Email SSC
                </a>

                <a
                  href="https://web.facebook.com/profile.php?id=61580744985540"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-yellow/20 px-6 py-2 rounded-full flex items-center gap-2"
                >
                  <FaFacebook /> Facebook Page
                </a>
              </div>

              <div className="text-right mt-6">
                <button
                  onClick={() => setOpenFeedback(false)}
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
