function AcademicCalendar() {
  return (
    <div className="bg-darkblue text-yellow rounded-2xl p-6 shadow-xl">
      <h3 className="text-xl font-bold mb-2">
        Collegiate Calendar – Term 2563
      </h3>

      <p className="text-sm text-yellow/70 mb-4">
        View the official academic schedule for Term 2563.
      </p>

      <a
        href="/files/collegiate-calendar-term2563.pdf"
        target="_blank"
        className="bg-yellow text-maroon px-5 py-2 rounded-lg font-semibold"
      >
        Open Calendar PDF
      </a>
    </div>
  );
}