import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FloatingBooklet from "./components/FloatingBooklet";
import MembershipFee from "./components/MembershipFee";
import About from "./components/About";
import Announcements from "./components/Announcements";
import Events from "./components/Events";
import Officers from "./components/Officers";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

/* ✅ GLOBAL */
import CookieConsent from "./components/CookieConsent";

function App() {
  return (
    <div
      className="
        relative isolate
        min-h-screen w-full
        font-sans text-gray-900
        bg-white
        overflow-x-hidden
        print:bg-white
      "
    >
      {/* 🔐 COOKIE CONSENT (TOP LAYER) */}
      <CookieConsent />

      {/* 🔝 NAVIGATION */}
      <Navbar />

      {/* 🧠 MAIN CONTENT */}
      <main className="relative z-0">
        {/* 🦸 HERO */}
        <Hero />

        {/* 📘 FLOATING ACCOMPLISHMENT BOOK (GLOBAL MODAL) */}
        <FloatingBooklet />

        {/* 💳 MEMBERSHIP */}
        <section>
          <MembershipFee />
        </section>

        {/* ℹ️ ABOUT SSC */}
        <section>
          <About />
        </section>

        {/* 📣 ANNOUNCEMENTS */}
        <section>
          <Announcements />
        </section>

        {/* 📅 UPCOMING EVENTS */}
        <section>
          <Events />
        </section>

        {/* 🏛️ SSC OFFICERS */}
        <section>
          <Officers />
        </section>

        {/* 📬 CONTACT */}
        <section>
          <Contact />
        </section>
      </main>

      {/* 🦶 FOOTER */}
      <Footer />
    </div>
  );
}

export default App;
