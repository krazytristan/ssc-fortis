import FloatingBooklet from "./FloatingBooklet";
import { SSC_ANNOUNCEMENTS } from "./sscData";

export default function EMagazinePage() {
  return (
    <main
      className="
        relative isolate
        min-h-screen
        bg-gray-100
        overflow-x-hidden
        print:bg-white
      "
    >
      {/* HERO HEADER */}
      <header className="bg-maroon text-yellow py-14 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-wide">
          SSC FORTIS E-Magazine
        </h1>
        <p className="mt-2 text-sm tracking-widest opacity-90">
          {SSC_ANNOUNCEMENTS.academicYear}
        </p>
      </header>

      {/* MAGAZINE SECTION */}
      <section className="relative max-w-6xl mx-auto px-4 my-12 print:hidden">
        <FloatingBooklet forceOpen />
      </section>

      {/* PRINT FOOTER */}
      <footer className="hidden print:block text-center text-sm mt-12">
        © Supreme Student Council – FORTIS
      </footer>
    </main>
  );
}
