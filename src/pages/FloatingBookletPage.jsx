import FloatingBooklet from "../components/FloatingBooklet";

export default function FloatingBookletPage() {
  return (
    <div className="min-h-screen bg-gray-100 print:bg-white">
      {/* PRINT HEADER */}
      <div className="hidden print:block text-center my-6">
        <h1 className="text-3xl font-bold">SSC–FORTIS</h1>
        <p>Accomplishment Report | AY 2025–2026</p>
      </div>

      {/* FULL BOOKLET */}
      <FloatingBooklet />

      {/* PRINT FOOTER */}
      <div className="hidden print:block text-center text-sm mt-10">
        © Supreme Student Council – FORTIS
      </div>
    </div>
  );
}
