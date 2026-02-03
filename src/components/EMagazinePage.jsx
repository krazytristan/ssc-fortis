import FloatingBooklet from "./FloatingBooklet";
import { SSC_ANNOUNCEMENTS } from "./sscData";

export default function EMagazinePage() {
  return (
    <main className="min-h-screen bg-gray-100">
      <header className="bg-maroon text-yellow py-12 text-center">
        <h1 className="text-4xl font-extrabold">SSC FORTIS E-Magazine</h1>
        <p>{SSC_ANNOUNCEMENTS.academicYear}</p>
      </header>

      <section className="max-w-6xl mx-auto my-10">
        <FloatingBooklet forceOpen />
      </section>
    </main>
  );
}
