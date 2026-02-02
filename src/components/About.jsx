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

const stats = [
  { label: "Years of Service", value: currentYear - foundingYear },
  { label: "Major Events", value: 15 },
  { label: "Student Leaders", value: 30 },
];

const coreOfficers = [
  { name: "John Mark M. Espiritu", role: "President", photo: "assets/jm.jpg" },
  { name: "Regine Suarez Candido", role: "Internal Vice President", photo: "assets/regine.jpg" },
  { name: "Kathleen Thea D. Recede", role: "External Vice President", photo: "assets/kthea.jpg" },
  { name: "Vanessa Mendoza Sangalang", role: "Secretary", photo: "assets/vanessa.jpg" },
];

const committees = [
  {
    name: "Gender and Development",
    members: [
      { name: "Benji Alurin Maquina", role: "Committee Head", photo: "assets/benji.jpg" },
    ],
  },
  {
    name: "Technical Operations",
    members: [
      { name: "Bejay Allen G. Macatangay", role: "Committee Head", photo: "assets/bejay.jpg" },
      { name: "Charles Lois Neil Tan Viñalon", role: "Member", photo: "assets/Charles.jpg" },
    ],
  },
  {
    name: "Creatives & Media",
    members: [
      { name: "Florencio John B. Fonte III", role: "Graphic Designer", photo: "assets/fonte.jpg" },
    ],
  },
  {
    name: "Finance & Audit",
    members: [
      { name: "Kathryne Anne Garcia Sapon", role: "Treasurer | Auditor", photo: "assets/kath.jpg" },
    ],
  },
  {
    name: "Board of Directors",
    members: [
      { name: "Nadine G. De Guzman", role: "Director", photo: "assets/nadine.jpg" },
      { name: "Marvin Paul Orozco", role: "Director", photo: "assets/marvin.jpg" },
    ],
  },
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

/* ================= VERTICAL CAROUSEL ================= */

function VerticalCarousel({ items }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false });

  return (
    <div ref={ref} className="relative overflow-hidden h-[360px]">
      <motion.div
        className="flex flex-col gap-5"
        animate={inView ? { y: ["0%", "-50%"] } : {}}
        transition={{ duration: 22, ease: "linear", repeat: Infinity }}
      >
        {[...items, ...items].map((card, i) => (
          <div
            key={i}
            className={`bg-gradient-to-br ${card.color} text-yellow p-5 rounded-2xl shadow-lg`}
          >
            <div className="text-2xl mb-2">{card.icon}</div>
            <h3 className="text-base font-bold mb-1">{card.title}</h3>
            <p className="text-sm text-yellow/90">{card.desc}</p>
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
      <motion.div
        className="max-w-6xl mx-auto text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          About SSC-FORTIS
        </h2>
        <p className="text-lg max-w-3xl mx-auto text-darkblue/90">
          Developing leaders, empowering students, and creating meaningful impact.
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto grid gap-20 lg:grid-cols-2">
        {/* LEFT */}
        <div className="space-y-20">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {stats.map((s, i) => (
              <div key={i} className="bg-darkblue text-yellow p-6 rounded-2xl text-center shadow-lg">
                <CountUp value={s.value} />
                <p className="mt-2 text-yellow/80">{s.label}</p>
              </div>
            ))}
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-8">👥 Core Officers</h3>
            <div className="grid grid-cols-2 gap-6">
              {coreOfficers.map((o, i) => (
                <div key={i} className="bg-darkblue text-yellow p-4 rounded-xl text-center">
                  <img
                    src={o.photo}
                    alt={o.name}
                    className="w-16 h-16 mx-auto rounded-full border-2 border-yellow mb-2 object-cover"
                  />
                  <h4 className="font-semibold text-sm">{o.name}</h4>
                  <p className="text-[11px] text-yellow/80">{o.role}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-8">🏆 Achievements</h3>
            <div className="grid gap-3">
              {achievements.map((a, i) => (
                <div key={i} className="bg-darkblue text-yellow p-4 rounded-xl text-sm">
                  {a}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-20">
          <div>
            <h3 className="text-2xl font-bold mb-8">🎯 Mission • Vision • Values</h3>
            <VerticalCarousel items={aboutCards} />
          </div>

          {/* COMMITTEES – SMALL CARDS */}
          <div>
            <h3 className="text-2xl font-bold mb-8">🧑‍🤝‍🧑 Committees</h3>

            <div className="grid md:grid-cols-2 gap-8">
              {committees.map((c, i) => (
                <div key={i}>
                  <h4 className="text-lg font-semibold mb-3 text-maroon">
                    {c.name}
                  </h4>

                  <div className="grid grid-cols-2 gap-4">
                    {c.members.map((m, idx) => (
                      <div
                        key={idx}
                        className="bg-darkblue text-yellow p-3 rounded-lg text-center"
                      >
                        <img
                          src={m.photo}
                          alt={m.name}
                          className="w-14 h-14 mx-auto rounded-full border-2 border-yellow mb-2 object-cover"
                        />
                        <p className="text-xs font-semibold leading-tight">
                          {m.name}
                        </p>
                        <p className="text-[10px] text-yellow/70">
                          {m.role}
                        </p>
                      </div>
                    ))}
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
