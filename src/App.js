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

/* ✅ NEW COMPONENTS */
import CookieConsent from "./components/CookieConsent";

function App() {
  return (
    <div className="font-sans text-gray-900">
      
      {/* 🔐 COOKIE CONSENT (GLOBAL) */}
      <CookieConsent />

      {/* 🔝 NAVIGATION */}
      <Navbar />

      {/* 🦸 HERO */}
      <Hero />

      {/* 📘 FLOATING ACCOMPLISHMENT BOOK */}
      <FloatingBooklet />

      {/* 💳 MEMBERSHIP */}
      <MembershipFee />

      {/* ℹ️ ABOUT SSC */}
      <About />

      {/* 📣 ANNOUNCEMENTS */}
      <Announcements />

      {/* 📅 UPCOMING EVENTS */}
      <Events />

      {/* 🏛️ SSC OFFICERS (CAROUSEL / HIGHLIGHT) */}
      <Officers />


      {/* 📬 CONTACT */}
      <Contact />

      {/* 🦶 FOOTER (LEGAL, PRIVACY, PDF, LOGOS, ETC.) */}
      <Footer />
    </div>
  );
}

export default App;
