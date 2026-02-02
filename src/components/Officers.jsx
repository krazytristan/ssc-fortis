import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

/* ================= OFFICERS DATA ================= */

const members = [
  { name: "Mr. Tristan Jorge Cuartero", role: "Adviser", photo: "assets/adviser.jpg", type: "Adviser" },
  { name: "John Mark M. Espiritu", role: "President", photo: "assets/JohnMark.jpg", type: "Officer" },
  { name: "Regine Suarez Candido", role: "Internal Vice President", photo: "assets/Suarez.jpg", type: "Officer" },
  { name: "Kathleen Thea D. Recede", role: "External Vice President", photo: "assets/kthea.jpg", type: "Officer" },
  { name: "Vanessa Mendoza Sangalang", role: "Secretary", photo: "assets/vanessa.jpg", type: "Officer" },
  { name: "Kathryne Anne Garcia Sapon", role: "Treasurer | Auditor", photo: "assets/Kathsapon.jpg", type: "Officer" },
  { name: "Nadine G. De Guzman", role: "Board of Director", photo: "assets/nadine.jpg", type: "Officer" },
  { name: "Marvin Paul Orozco", role: "Board of Director", photo: "assets/marvin.jpg", type: "Officer" },
  { name: "Benji Alurin Maquina", role: "Committee Head – Gender and Development", photo: "assets/benji.jpg", type: "Officer" },
  { name: "Rodolfo Guce III", role: "Committee Head – Health and Sports", photo: "assets/dither.jpg", type: "Officer" },
  { name: "Charles Lois Neil Tan Viñalon", role: "Committee Head – Technical Operations", photo: "assets/CharlesLois.jpg", type: "Officer" },
  { name: "Bejay Allen G. Macatangay", role: "Committee Head – Technical Operations", photo: "assets/bejay.jpg", type: "Officer" },
  { name: "Florencio John B. Fonte III", role: "Graphic Designer / Layout", photo: "assets/fonte.jpg", type: "Officer" },
];

// duplicate for seamless loop
const loopMembers = [...members, ...members];

/* ================= COMPONENT ================= */

export default function Officers() {
  const controls = useAnimation();
  const trackRef = useRef(null);

  useEffect(() => {
    if (!trackRef.current) return;

    const width = trackRef.current.scrollWidth / 2;

    controls.start({
      x: [0, -width],
      transition: {
        duration: 55,
        ease: "linear",
        repeat: Infinity,
      },
    });
  }, [controls]);

  return (
    <section
      id="officers"
      className="relative py-20 px-4 overflow-hidden"
      style={{
        backgroundImage: "url(assets/officers-bg.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* WHITE OVERLAY */}
      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm" />

      {/* CONTENT */}
      <div className="relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-darkblue">
          SSC Officers
        </h2>

        <div className="overflow-hidden">
          <motion.div
            ref={trackRef}
            className="flex space-x-5 cursor-grab active:cursor-grabbing"
            animate={controls}
            drag="x"
            dragConstraints={{ left: -9999, right: 0 }}
            whileTap={{ cursor: "grabbing" }}
          >
            {loopMembers.map((member, i) => (
              <div
                key={i}
                className="
                  flex-shrink-0 w-56
                  bg-gradient-to-br from-maroon to-darkblue
                  p-4 rounded-2xl
                  shadow-lg hover:shadow-xl
                  transition-all duration-300
                  text-center relative
                "
              >
                {/* PHOTO */}
                <div className="w-28 h-28 mx-auto rounded-full overflow-hidden border-2 border-yellow mb-3">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* NAME */}
                <h3 className="text-sm font-bold text-yellow leading-tight mb-1">
                  {member.name}
                </h3>

                {/* ROLE */}
                <span className="inline-block bg-yellow text-maroon font-semibold px-2 py-0.5 rounded-full text-[10px] mb-3">
                  {member.role}
                </span>

                {/* SOCIAL ICONS */}
                <div className="flex justify-center space-x-4 text-yellow/70">
                  <button aria-label="Facebook" className="hover:text-yellow transition">
                    <FaFacebookF size={14} />
                  </button>
                  <button aria-label="Instagram" className="hover:text-yellow transition">
                    <FaInstagram size={14} />
                  </button>
                  <button aria-label="Twitter" className="hover:text-yellow transition">
                    <FaTwitter size={14} />
                  </button>
                </div>

                {/* TYPE BADGE */}
                <div className="absolute top-0 right-0 bg-yellow text-maroon px-2 py-0.5 rounded-bl-md text-[10px] font-bold">
                  {member.type}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
