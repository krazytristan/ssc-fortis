{/* STORY + GALLERY – NEWSPAPER STYLE */}
{pages[page] === "story" && (
  <article
    className="
      newspaper
      text-gray-800
      leading-relaxed
      text-justify
    "
  >
    {/* FEATURE IMAGE */}
    {data.images?.[0] && (
      <img
        src={data.images[0]}
        alt={data.title}
        className="
          w-full md:w-1/2
          float-none md:float-right
          mb-4 md:ml-6
          rounded-lg
          object-cover
        "
      />
    )}

    {/* PARAGRAPHS */}
    <p>{data.text}</p>

    <p>
      This initiative reflects the Supreme Student Council’s
      commitment to leadership, collaboration, and meaningful
      service. Through coordinated efforts and student
      participation, the activity strengthened unity within
      the academic community while promoting shared values
      and institutional pride.
    </p>

    <p>
      The success of this accomplishment demonstrates how
      student-led initiatives can create lasting impact,
      inspire engagement, and reinforce the Council’s role
      as a catalyst for positive change.
    </p>
  </article>
)}
