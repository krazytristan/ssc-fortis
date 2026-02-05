import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

/* ================= OFFICERS DATA ================= */

const members = [
  { name: "Mr. Tristan Jorge Cuartero", role: "Adviser", photo: "assets/adviser.jpg", type: "Adviser" },
  { name: "John Mark M. Espiritu", role: "President", photo: "assets/JohnMark.JPG", type: "Officer" },
  { name: "Regine Suarez Candido", role: "Internal Vice President", photo: "assets/Suarez.JPG", type: "Officer" },
  { name: "Kathleen Thea D. Recede", role: "External Vice President", photo: "assets/kthea.jpg", type: "Officer" },
  { name: "Vanessa Mendoza Sangalang", role: "Secretary", photo: "assets/vanessa.jpg", type: "Officer" },
  { name: "Kathryne Anne Garcia Sapon", role: "Treasurer | Auditor", photo: "assets/Kathsapon.JPG", type: "Officer" },
  { name: "Nadine G. De Guzman", role: "Board of Director", photo: "assets/nadine.jpg", type: "Officer" },
  { name: "Marvin Paul Orozco", role: "Board of Director", photo: "assets/marvin.jpg", type: "Officer" },
  { name: "Benji Alurin Maquiñana", role: "Committee Head – GAD", photo: "assets/benji.jpg", type: "Officer" },
  { name: "Rodolfo C. Guce III", role: "Committee Head – Health & Sports", photo: "assets/dither.JPG", type: "Officer" },
  { name: "Charles Lois Neil Tan Viñalon", role: "Committee Head – Tech Ops", photo: "assets/CharlesLois.JPG", type: "Officer" },
  { name: "Bejay Allen G. Macatangay", role: "Committee Head – Tech Ops", photo: "assets/bejay.jpg", type: "Officer" },
  { name: "Florencio John B. Fonte III", role: "Graphic Designer / Layout", photo: "assets/fonte.jpg", type: "Officer" },
];

// duplicate for seamless infinite scroll
const loopMembers = [...members, ...members];

/* ================= COMPONENT ================= */

export default function Officers() {
  const controls = useAnimation();
  const trackRef = useRef(null);
  const containerRef = useRef(null);

  const [maxDrag, setMaxDrag] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const autoSpeed = 55; // seconds

  /* AUTO SCROLL */
  const startAutoScroll = useCallback(
    (trackWidth, fromX = 0) => {
      controls.start({
        x: [fromX, -trackWidth],
        transition: {
          duration: autoSpeed,
          ease: "linear",
          repeat: Infinity,
        },
      });
    },
    [controls]
  );

  /* CALCULATE WIDTH */
  const calculate = useCallback(() => {
    if (!trackRef.current || !containerRef.current) return;

    const trackWidth = trackRef.current.scrollWidth / 2;
    const containerWidth = containerRef.current.offsetWidth;
    const limit = trackWidth - containerWidth;

    setMaxDrag(limit > 0 ? limit : 0);
    startAutoScroll(trackWidth, currentX);
  }, [currentX, startAutoScroll]);

  /* INIT + RESIZE */
  useEffect(() => {
    calculate();
    window.addEventListener("resize", calculate);
    return () => window.removeEventListener("resize", calculate);
  }, [calculate]);

  return (
    <section
      id="officers"
      className="relative py-20 px-4 overflow-hidden"
      style={{
        backgroundImage: "url(assets/ssc-bg2.jpg)",
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

        <div ref={containerRef} className="overflow-hidden">
          <motion.div
            ref={trackRef}
            className="flex space-x-5 cursor-grab active:cursor-grabbing touch-pan-x"
            animate={controls}
            drag="x"
            dragConstraints={{ left: -maxDrag, right: 0 }}
            dragElastic={0.12}
            dragMomentum
            whileTap={{ cursor: "grabbing" }}

            /* PAUSE AUTO */
            onMouseEnter={() => controls.stop()}
            onTouchStart={() => controls.stop()}
            onDragStart={() => controls.stop()}

            /* TRACK POSITION */
            onUpdate={(latest) => {
              if (latest.x !== undefined) setCurrentX(latest.x);
            }}

            /* RESUME AUTO */
            onMouseLeave={() =>
              startAutoScroll(trackRef.current.scrollWidth / 2, currentX)
            }
            onTouchEnd={() =>
              startAutoScroll(trackRef.current.scrollWidth / 2, currentX)
            }
            onDragEnd={() =>
              startAutoScroll(trackRef.current.scrollWidth / 2, currentX)
            }
          >
            {loopMembers.map((member, i) => (
              <div
                key={`${member.name}-${i}`}
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
                  <FaFacebookF size={14} />
                  <FaInstagram size={14} />
                  <FaTwitter size={14} />
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
