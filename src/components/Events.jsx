import { motion } from "framer-motion";
import { FaCalendarAlt } from "react-icons/fa";
import { useState } from "react";

/* ================= EVENTS DATA ================= */

const events = [
  {
    title: "Local Sportfest",
    date: "To Be Announced",
    description:
      "A campus-wide sports celebration promoting teamwork, school spirit, and healthy competition among students.",
  },
  {
    title: "AMA Summit 2026",
    date: "To Be Announced",
    description:
      "Flagship leadership summit with keynote speakers and interactive workshops.",
  },
  {
    title: "Tree Planting Program",
    date: "To Be Announced",
    description:
      "Annual environmental initiative promoting sustainability and community engagement.",
  },
  {
    title: "MR & MS ECO Global",
    date: "To Be Announced",
    description:
      "Values-driven pageant advocating SDGs, environmental awareness, and youth leadership.",
  },

  /* ===== NEW SSC PROGRAMS ===== */

  {
    title: "Project ACE",
    date: "Ongoing",
    description:
      "Assistant Care with Excellence (ACE) is an SSC-led student support initiative focused on academic assistance, peer mentoring, and student welfare.",
  },
  {
    title: "SSC Printing Services",
    date: "Ongoing",
    description:
      "Affordable and student-friendly printing services provided by the SSC to support academic and organizational needs.",
  },
  {
    title: "hAMAgsikan",
    date: "To Be Announced",
    description:
      "A cultural and arts-centered program celebrating Filipino creativity, music, spoken word, and campus talent.",
  },
];

/* ================= COMPONENT ================= */

export default function Events() {
  const [showMore, setShowMore] = useState(false);

  const visibleEvents = showMore ? events : events.slice(0, 4);

  return (
    <section
      id="events"
      className="relative py-20 px-4 bg-darkblue text-yellow overflow-hidden"
    >
      {/* Soft background glow */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-yellow/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-maroon/20 rounded-full blur-3xl" />

      {/* TITLE */}
      <h2 className="text-4xl md:text-5xl font-bold mb-14 text-center tracking-wide relative z-10">
        Upcoming SSC Events
      </h2>

      {/* EVENTS GRID */}
      <div className="relative z-10 grid md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto">
        {visibleEvents.map((event, i) => (
          <motion.div
            key={`${event.title}-${i}`}
            className="
              bg-white text-darkblue p-7 rounded-3xl
              shadow-xl hover:shadow-2xl
              hover:-translate-y-2 transition-all duration-300
              flex flex-col justify-between
            "
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.12 }}
          >
            {/* DATE */}
            <div className="flex items-center gap-3 mb-4 text-maroon">
              <FaCalendarAlt className="text-lg" />
              <p className="text-sm font-semibold italic">
                {event.date}
              </p>
            </div>

            {/* TITLE */}
            <h3 className="text-xl font-bold mb-3">
              {event.title}
            </h3>

            {/* DESCRIPTION */}
            <p className="text-sm text-darkblue/80 leading-relaxed">
              {event.description}
            </p>

            {/* STATUS */}
            <div className="mt-6 self-start bg-maroon text-yellow px-5 py-2 rounded-full text-sm font-bold tracking-wide shadow-md">
              🚧 Coming Soon
            </div>
          </motion.div>
        ))}
      </div>

      {/* SEE MORE BUTTON */}
      <div className="relative z-10 mt-14 text-center">
        <button
          onClick={() => setShowMore((prev) => !prev)}
          className="
            bg-yellow text-darkblue
            px-8 py-3 rounded-full
            font-bold tracking-wide
            shadow-lg hover:shadow-xl
            transition-all duration-300
          "
        >
          {showMore ? "See Less Events ↑" : "See More Events ↓"}
        </button>
      </div>
    </section>
  );
}
