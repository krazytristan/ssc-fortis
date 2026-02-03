import FloatingBooklet from "../components/FloatingBooklet";

export default function FloatingBookletPage() {
  return (
    <main
      className="
        relative isolate
        min-h-screen
        bg-gray-100
        print:bg-white
        overflow-x-hidden
      "
    >
      {/* PRINT HEADER */}
      <header className="hidden print:block text-center my-6">
        <h1 className="text-3xl font-bold">SSC–FORTIS</h1>
        <p className="text-sm">
          Accomplishment Report | AY 2025–2026
        </p>
      </header>

      {/* BOOKLET (SCREEN ONLY) */}
      <section className="print:hidden">
        <FloatingBooklet />
      </section>

      {/* PRINT FOOTER */}
      <footer className="hidden print:block text-center text-sm mt-10">
        © Supreme Student Council – FORTIS
      </footer>
    </main>
  );
}
