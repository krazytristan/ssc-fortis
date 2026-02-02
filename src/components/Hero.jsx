import { motion } from "framer-motion";
import sscVideo from "../assets/ssc-video.mp4";

const achievements = [
  "Empowering Student Leaders",
  "Promoting Community Involvement",
  "Organizing Annual Events",
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative h-screen flex flex-col items-center justify-center text-center text-yellow overflow-hidden"
    >
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={sscVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* White Overlay */}
      <div className="absolute inset-0 bg-white/70"></div>

      {/* Animated Floating Shapes */}
      <motion.div
        className="absolute w-64 h-64 bg-yellow/30 rounded-full top-10 left-10 mix-blend-multiply filter blur-3xl animate-blob"
        animate={{ y: [0, 20, 0], x: [0, 15, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-72 h-72 bg-darkblue/30 rounded-full bottom-20 right-20 mix-blend-multiply filter blur-3xl animate-blob"
        animate={{ y: [0, -15, 0], x: [0, -20, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Hero Content */}
      <motion.div
        className="relative z-10 max-w-3xl px-4 flex flex-col items-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 drop-shadow-lg bg-clip-text text-transparent bg-gradient-to-r from-yellow via-maroon to-darkblue animate-pulse">
          SUPREME STUDENT COUNCIL
        </h1>

        <p className="text-lg md:text-xl mb-8 drop-shadow">
          Empowering student leaders, promoting community involvement, and making campus life unforgettable.
        </p>

        {/* Floating Achievement Cards */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {achievements.map((item, index) => (
            <motion.div
              key={index}
              className="bg-yellow text-maroon px-4 py-2 rounded-xl font-semibold shadow-lg cursor-default hover:scale-105 transition"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.2 }}
            >
              {item}
            </motion.div>
          ))}
        </div>

        <a
          href="#about"
          className="bg-yellow text-maroon font-bold px-6 py-3 rounded-full hover:bg-darkblue hover:text-yellow transition transform hover:scale-105"
        >
          Learn More
        </a>
      </motion.div>

      {/* Scroll Down Arrow */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-yellow text-3xl animate-bounce"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        ⬇
      </motion.div>
    </section>
  );
}
