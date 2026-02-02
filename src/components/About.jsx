import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/* ================= YEARS ================= */
const foundingYear = 2018;
const currentYear = new Date().getFullYear();

/* ================= DATA ================= */

const aboutCards = [
  {
    title: "Our Mission",
    desc: "To empower students through leadership opportunities, community service, and collaborative initiatives that inspire growth and responsibility.",
    icon: "🎯",
    color: "from-maroon to-darkblue",
  },
  {
    title: "Our Vision",
    desc: "To build a vibrant, inclusive, and student-driven campus community where everyone is encouraged to learn, contribute, and excel.",
    icon: "🌟",
    color: "from-darkblue to-maroon",
  },
  {
    title: "Our Values",
    desc: "Excellence, Teamwork, Integrity, Creativity, and Service — the core principles that guide SSC-FORTIS in everything we do.",
    icon: "💡",
    color: "from-maroon to-yellow",
  },
];

const timeline = [
  { year: foundingYear, event: "Establishment of the Supreme Student Council" },
  { year: foundingYear + 2, event: "Launch of student-led leadership programs" },
  { year: foundingYear + 5, event: "Expansion of community outreach initiatives" },
  { year: currentYear, event: "SSC-FORTIS era begins with innovation-driven leadership" },
];

const stats = [
  { label: "Years of Service", value: currentYear - foundingYear },
  { label: "Major Events", value: 15 },
  { label: "Student Leaders", value: 30 },
];

const committees = [
  { name: "Technical Operations", progress: 90 },
  { name: "Gender and Development", progress: 85 },
  { name: "Events & Programs", progress: 95 },
  { name: "Documentation & Secretariat", progress: 80 },
  { name: "Creatives & Media", progress: 88 },
  { name: "Finance & Audit", progress: 75 },
];

const coreOfficers = [
  { name: "John Mark M. Espiritu", role: "President", photo: "/assets/john.jpg" },
  { name: "Regine Suarez Candido", role: "External Vice President", photo: "/assets/reg.png" },
  { name: "Kathleen Thea D. Recede", role: "External Vice President", photo: "/assets/kthea.jpg" },
  { name: "Vanessa Mendoza Sangalang", role: "Secretary", photo: "/assets/vanessa.jpg" },
];

const achievements = [
  "🏆 Outstanding Student Leadership Award",
  "🌱 Annual Community Outreach & Tree Planting Programs",
  "🎓 Successful Leadership Summits & Workshops",
  "🤝 Strong Partnerships with Student Organizations",
];

/* ================= COUNT UP ================= */

function CountUp({ value }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let current = 0;
    const step = Math.ceil(value / 60);

    const timer = setInterval(() => {
      current += step;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else setCount(current);
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return <span ref={ref} className="text-3xl md:text-4xl font-bold">{count}+</span>;
}

/* ================= SWIPE VERTICAL CAROUSEL ================= */

function VerticalCarousel({ items }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false });
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div
      ref={ref}
      className="relative overflow-hidden h-[300px] sm:h-[360px] md:h-[420px]"
    >
      {/* Fade edges */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-yellow to-transparent z-10" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-yellow to-transparent z-10" />

      <motion.div
        className="flex flex-col gap-6 cursor-grab active:cursor-grabbing"
        drag="y"
        dragConstraints={{ top: -400, bottom: 0 }}
        dragElastic={0.15}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setIsDragging(false)}
        animate={inView && !isDragging ? { y: ["0%", "-50%"] } : {}}
        transition={{ duration: 22, ease: "linear", repeat: Infinity }}
      >
        {[...items, ...items].map((card, i) => (
          <div
            key={i}
            className={`bg-gradient-to-br ${card.color}
                        text-yellow p-6 rounded-3xl shadow-xl`}
          >
            <div className="text-3xl mb-3">{card.icon}</div>
            <h3 className="text-lg font-bold mb-2">{card.title}</h3>
            <p className="text-sm text-yellow/90 leading-relaxed">{card.desc}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* ================= MAIN ================= */

export default function About() {
  return (
    <section id="about" className="bg-yellow py-20 px-4 text-darkblue">
      {/* HEADER */}
      <motion.div
        className="max-w-6xl mx-auto text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          About SSC-FORTIS
        </h2>
        <p className="text-lg md:text-xl max-w-3xl mx-auto text-darkblue/90">
          Developing leaders, empowering students, and creating meaningful impact.
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto grid gap-20 lg:grid-cols-2">

        {/* LEFT COLUMN */}
        <div className="space-y-20">

          {/* STATS */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {stats.map((s, i) => (
              <div key={i} className="bg-darkblue text-yellow p-6 rounded-2xl text-center shadow-lg">
                <CountUp value={s.value} />
                <p className="mt-2 text-yellow/80">{s.label}</p>
              </div>
            ))}
          </div>

          {/* 🧭 TIMELINE (UPDATED) */}
          <div>
            <h3 className="text-2xl md:text-3xl font-bold mb-10 text-center lg:text-left">
              🧭 History of SSC
            </h3>

            <div className="relative grid gap-10">
              <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-1 bg-maroon/30" />

              {timeline.map((item, i) => (
                <motion.div
                  key={i}
                  className={`relative flex flex-col sm:flex-row ${
                    i % 2 === 0 ? "sm:flex-row-reverse" : ""
                  }`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="sm:w-1/2 px-6">
                    <div className="bg-darkblue text-yellow p-5 rounded-xl shadow-lg">
                      <h4 className="font-bold">{item.year}</h4>
                      <p className="text-sm">{item.event}</p>
                    </div>
                  </div>

                  <span className="absolute left-4 sm:left-1/2 top-4 -translate-x-1/2 w-5 h-5 bg-maroon border-4 border-yellow rounded-full" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* CORE OFFICERS */}
          <div>
            <h3 className="text-2xl md:text-3xl font-bold mb-8">👥 Core Officers</h3>
            <div className="grid grid-cols-2 gap-6">
              {coreOfficers.map((o, i) => (
                <div key={i} className="bg-darkblue text-yellow p-5 rounded-xl text-center">
                  <img
                    src={o.photo}
                    alt={o.name}
                    className="w-20 h-20 mx-auto rounded-full border-4 border-yellow mb-3 object-cover"
                  />
                  <h4 className="font-bold text-sm">{o.name}</h4>
                  <p className="text-xs text-yellow/80">{o.role}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ACHIEVEMENTS */}
          <div>
            <h3 className="text-2xl md:text-3xl font-bold mb-8">🏆 Achievements</h3>
            <div className="grid gap-4">
              {achievements.map((a, i) => (
                <div key={i} className="bg-darkblue text-yellow p-4 rounded-xl">
                  {a}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-20">

          {/* CAROUSEL */}
          <div>
            <h3 className="text-2xl md:text-3xl font-bold mb-8">
              🎯 Mission • Vision • Values
            </h3>
            <VerticalCarousel items={aboutCards} />
          </div>

          {/* COMMITTEES */}
          <div>
            <h3 className="text-2xl md:text-3xl font-bold mb-8">🧑‍🤝‍🧑 Committees</h3>
            <div className="grid gap-5">
              {committees.map((c, i) => (
                <div key={i} className="bg-darkblue text-yellow p-5 rounded-xl">
                  <div className="flex justify-between mb-2">
                    <span>{c.name}</span>
                    <span>{c.progress}%</span>
                  </div>
                  <div className="h-3 bg-yellow/20 rounded-full">
                    <div
                      className="h-3 bg-yellow rounded-full"
                      style={{ width: `${c.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
