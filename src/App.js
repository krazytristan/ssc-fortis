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
    <div className="min-h-screen w-full font-sans text-gray-900 bg-white overflow-x-hidden">
      
      {/* 🔐 COOKIE CONSENT */}
      <CookieConsent />

      {/* 🔝 NAVIGATION */}
      <Navbar />

      {/* 🦸 HERO */}
      <main className="relative">
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

        {/* 🏛️ SSC OFFICERS */}
        <Officers />

        {/* 📬 CONTACT */}
        <Contact />
      </main>

      {/* 🦶 FOOTER */}
      <Footer />
    </div>
  );
}

export default App;
