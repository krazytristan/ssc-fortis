function EventGallery() {
  const images = [
    "/gallery/event1.jpg",
    "/gallery/event2.jpg",
    "/gallery/event3.jpg",
    "/gallery/event4.jpg"
  ];

  return (
    <div>
      <h3 className="text-2xl font-bold mb-6 text-center text-yellow">
        Event Gallery
      </h3>

      <div className="grid md:grid-cols-4 gap-4">
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            className="rounded-xl shadow-lg hover:scale-105 transition"
          />
        ))}
      </div>
    </div>
  );
}