import { motion } from "framer-motion";
import { FaCalendarAlt } from "react-icons/fa";

const events = [
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
];

export default function Events() {
  return (
    <section
      id="events"
      className="relative py-20 px-4 bg-darkblue text-yellow overflow-hidden"
    >
      {/* Soft background glow */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-yellow/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-maroon/20 rounded-full blur-3xl" />

      <h2 className="text-4xl md:text-5xl font-bold mb-14 text-center tracking-wide relative z-10">
        Upcoming Events
      </h2>

      <div className="relative z-10 grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {events.map((event, i) => (
          <motion.div
            key={i}
            className="
              bg-white text-darkblue p-7 rounded-3xl
              shadow-xl hover:shadow-2xl
              hover:-translate-y-2 transition-all duration-300
              flex flex-col justify-between
            "
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
          >
            {/* DATE */}
            <div className="flex items-center gap-3 mb-4 text-maroon">
              <FaCalendarAlt className="text-lg" />
              <p className="text-sm font-semibold italic">
                {event.date}
              </p>
            </div>

            {/* TITLE */}
            <h3 className="text-2xl font-bold mb-3">
              {event.title}
            </h3>

            {/* DESCRIPTION */}
            <p className="text-sm text-darkblue/80 leading-relaxed">
              {event.description}
            </p>

            {/* COMING SOON */}
            <div className="mt-6 self-start bg-maroon text-yellow px-5 py-2 rounded-full text-sm font-bold tracking-wide shadow-md">
              🚧 Coming Soon
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
