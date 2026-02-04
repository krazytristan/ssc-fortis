import FloatingBooklet from "../components/FloatingBooklet";

export default function FloatingBookletPage() {
  return (
    <main
      role="main"
      className="
        relative isolate
        min-h-screen w-full
        bg-gray-100
        overflow-x-hidden
        print:bg-white
      "
    >
      {/* ================= PRINT HEADER ================= */}
      <header className="hidden print:block text-center py-8">
        <h1 className="text-3xl font-bold tracking-wide">
          SSC–FORTIS
        </h1>
        <p className="text-sm mt-1">
          Official Accomplishment Report
        </p>
        <p className="text-xs text-gray-600">
          Academic Year 2025–2026
        </p>
        <hr className="mt-5 border-gray-300 w-2/3 mx-auto" />
      </header>

      {/* ================= SCREEN CONTENT ================= */}
      <section
        className="
          relative
          flex flex-col items-center
          justify-center
          py-20
          print:hidden
        "
      >
        {/* HERO / CONTEXT */}
        <div className="max-w-3xl text-center mb-10 px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-maroon">
            SSC–FORTIS
          </h1>
          <p className="mt-4 text-lg text-gray-700">
            A digital, magazine-style report highlighting the
            accomplishments, initiatives, and leadership efforts of
            the Supreme Student Council.
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Academic Year 2025–2026
          </p>
        </div>

        {/* FLOATING BOOKLET COMPONENT */}
        <FloatingBooklet />
      </section>

      {/* ================= PRINT FOOTER ================= */}
      <footer className="hidden print:block text-center text-sm mt-16 pb-8">
        <hr className="mb-4 border-gray-300 w-2/3 mx-auto" />
        <p>
          © Supreme Student Council – FORTIS
        </p>
        <p className="text-xs text-gray-500">
          Generated via SSC Digital Publication System
        </p>
      </footer>
    </main>
  );
}
