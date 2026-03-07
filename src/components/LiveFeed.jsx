function LiveFeed() {
  const announcements = [
    "Educational Tour moved to March 12, 2026",
    "LinTECH competition winners posted",
    "SSC meeting this Friday",
    "New student feedback system launched"
  ];

  return (
    <div className="bg-maroon text-yellow rounded-2xl p-6 shadow-xl">
      <h3 className="text-xl font-bold mb-4">
        Live Announcements
      </h3>

      <ul className="space-y-2 text-sm">
        {announcements.map((a, i) => (
          <li key={i}>• {a}</li>
        ))}
      </ul>
    </div>
  );
}