import FloatingBooklet from "../components/FloatingBooklet";

export default function FloatingBookletPage() {
  return (
    <main
      className="
        relative isolate
        min-h-screen w-full
        bg-gray-100
        overflow-x-hidden
        print:bg-white
      "
    >
      {/* PRINT HEADER */}
      <header className="hidden print:block text-center py-6">
        <h1 className="text-3xl font-bold tracking-wide">
          SSC–FORTIS
        </h1>
        <p className="text-sm mt-1">
          Accomplishment Report | AY 2025–2026
        </p>
        <hr className="mt-4 border-gray-300 w-2/3 mx-auto" />
      </header>

      {/* SCREEN CONTENT */}
      <section
        className="
          relative
          flex justify-center
          print:hidden
        "
      >
        <FloatingBooklet />
      </section>

      {/* PRINT FOOTER */}
      <footer className="hidden print:block text-center text-sm mt-12 pb-6">
        <hr className="mb-4 border-gray-300 w-2/3 mx-auto" />
        © Supreme Student Council – FORTIS
      </footer>
    </main>
  );
}
