import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const members = [
  { name: "Mr. Tristan Jorge Cuartero", role: "Adviser", photo: "/assets/adviser.jpg", type: "Adviser" },
  { name: "John Mark M. Espiritu", role: "President", photo: "/assets/jm.jpg", type: "Officer" },
  { name: "Regine Suarez Candido", role: "Internal Vice President", photo: "/assets/regine.jpg", type: "Officer" },
  { name: "Kathleen Thea D. Recede", role: "External Vice President", photo: "/assets/kthea.jpg", type: "Officer" },
  { name: "Vanessa Mendoza Sangalang", role: "Secretary", photo: "/assets/vanessa.jpg", type: "Officer" },
  { name: "Kathryne Anne Garcia Sapon", role: "Treasurer | Auditor", photo: "/assets/kath.jpg", type: "Officer" },
  { name: "Nadine G. De Guzman", role: "Board of Director", photo: "/assets/nadine.jpg", type: "Officer" },
  { name: "Marvin Paul Orozco", role: "Board of Director", photo: "/assets/marvin.jpg", type: "Officer" },
  { name: "Benji Alurin Maquina", role: "Committee Head – Gender and Development", photo: "/assets/benji.jpg", type: "Officer" },
  { name: "Charles Lois Neil Tan Viñalon", role: "Committee – Technical Operations", photo: "/assets/Charles.jpg", type: "Officer" },
  { name: "Bejay Allen G. Macatangay", role: "Committee Head – Technical Operations", photo: "/assets/bejay.jpg", type: "Officer" },
  { name: "Florencio John B. Fonte III", role: "Graphic Designer / Layout", photo: "/assets/fonte.jpg", type: "Officer" },
];

// duplicate for seamless looping
const loopMembers = [...members, ...members];

export default function Officers() {
  const controls = useAnimation();
  const trackRef = useRef(null);

  useEffect(() => {
    if (!trackRef.current) return;

    const width = trackRef.current.scrollWidth / 2;

    controls.start({
      x: [0, -width],
      transition: {
        x: {
          duration: 60,
          ease: "linear",
          repeat: Infinity,
        },
      },
    });
  }, [controls]);

  return (
    <section
      id="officers"
      className="py-20 px-4 bg-white text-darkblue overflow-hidden"
    >
      <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center tracking-wide">
        SSC Officers
      </h2>

      <div className="overflow-hidden">
        <motion.div
          ref={trackRef}
          className="flex space-x-6"
          animate={controls}
          drag="x"
          dragConstraints={{ left: -9999, right: 0 }}
          whileTap={{ cursor: "grabbing" }}
        >
          {loopMembers.map((member, i) => (
            <div
              key={i}
              className="
                flex-shrink-0 w-64
                bg-gradient-to-br from-maroon to-darkblue
                p-6 rounded-3xl
                shadow-xl hover:shadow-2xl
                hover:-translate-y-1
                transition-all duration-500
                text-center relative
              "
            >
              {/* PHOTO */}
              <div className="w-36 h-36 mx-auto rounded-full overflow-hidden border-4 border-yellow mb-4">
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* NAME */}
              <h3 className="text-lg font-bold text-yellow mb-1">
                {member.name}
              </h3>

              {/* ROLE */}
              <span className="inline-block bg-yellow text-maroon font-semibold px-3 py-1 rounded-full text-xs mb-4">
                {member.role}
              </span>

              {/* SOCIALS (buttons = ESLint safe) */}
              <div className="flex justify-center space-x-4 mt-2 text-yellow/80">
                <button
                  type="button"
                  aria-label="Facebook"
                  className="hover:text-yellow transition"
                >
                  <FaFacebookF />
                </button>
                <button
                  type="button"
                  aria-label="Instagram"
                  className="hover:text-yellow transition"
                >
                  <FaInstagram />
                </button>
                <button
                  type="button"
                  aria-label="Twitter"
                  className="hover:text-yellow transition"
                >
                  <FaTwitter />
                </button>
              </div>

              {/* BADGE */}
              <div className="absolute top-0 right-0 bg-yellow text-maroon px-2 py-1 rounded-bl-lg font-bold text-xs">
                {member.type}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
