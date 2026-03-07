function SSCNews() {
  const news = [
    {
      title: "SSC Meeting with Student Leaders",
      date: "March 3, 2026",
      desc: "Discussion about upcoming academic and student activities."
    },
    {
      title: "Educational Tour Announcement",
      date: "March 12, 2026",
      desc: "Students will visit PAGASA, BSP Museum, and Enchanted Kingdom."
    },
    {
      title: "LinTECH Competition Winners",
      date: "February 12, 2026",
      desc: "Celebrating innovation and creativity among students."
    }
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {news.map((item, i) => (
        <div key={i} className="bg-darkblue text-yellow p-5 rounded-2xl shadow-xl">
          <h4 className="font-bold mb-1">{item.title}</h4>
          <p className="text-xs text-yellow/70">{item.date}</p>
          <p className="text-sm mt-2">{item.desc}</p>
        </div>
      ))}
    </div>
  );
}