// sscData.js

/* ============================================================
   SSC METADATA
============================================================ */

export const SSC_ANNOUNCEMENTS = {
  organization: "Supreme Student Council – FORTIS",
  academicYear: "AY 2025–2026",

  events: [
    {
      id: "lintech",
      title: "LinTECH na FEB-Ibig 2.0",
      date: "February 12, 2026",
      category: "Flagship Event",
      description:
        "A technology-driven celebration integrating innovation, student engagement, and community participation.",
    },
    {
      id: "educ-tour",
      title: "Educational Tour 2026",
      date: "February 26, 2026",
      category: "Academic Activity",
      description:
        "An off-campus learning experience designed to enhance academic exposure and real-world understanding.",
    },
  ],
};

/* ============================================================
   SSC ACCOMPLISHMENTS (E-MAGAZINE CONTENT)
============================================================ */

export const SSC_ACCOMPLISHMENTS = [
  {
    id: "teachers-month",
    title: "Teachers Month Celebration",
    subtitle: "Celebrating educators and leadership",
    text:
      "A tribute honoring educators through performances, appreciation messages, and student-led initiatives that strengthened unity and gratitude within the academic community.",

    cover: "/assets/img1.jpg",
    images: [
      "/assets/img1.jpg",
      "/assets/img2.jpg",
      "/assets/img3.jpg",
    ],

    relatedEvent: "lintech",
    tags: ["Teachers", "Recognition", "Leadership"],
  },

  {
    id: "nstp-collaboration",
    title: "NSTP Project Collaboration",
    subtitle: "Community & Environmental Outreach",
    text:
      "A joint outreach initiative fostering civic responsibility, sustainability, and teamwork among students through environmental and social engagement.",

    cover: "/assets/nstp1.jpg",
    images: [
      "/assets/nstp1.jpg",
      "/assets/nstp2.jpg",
      "/assets/nstp3.jpg",
    ],

    relatedEvent: null,
    tags: ["NSTP", "Community", "Environment"],
  },

  {
    id: "christmas-station-id",
    title: "Christmas Station ID 2025",
    subtitle: "Unity, Hope & Service",
    text:
      "A creative holiday production celebrating unity, hope, and service through student collaboration and multimedia storytelling.",

    cover: "/assets/id1.jpg",
    images: [
      "/assets/id1.jpg",
      "/assets/id2.jpg",
      "/assets/id3.jpg",
    ],

    relatedEvent: null,
    tags: ["Christmas", "Creativity", "Unity"],
  },
];
