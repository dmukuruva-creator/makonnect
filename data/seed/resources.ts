import type { Resource } from "@/lib/types";

/**
 * SYNTHETIC seed data for the Resources Hub.
 *
 * Placeholder "advice" pieces so the hub does not launch empty. At launch these
 * are replaced by 15–30 real alumni pieces gathered with MakoZim (HANDOFF.md
 * §B). Content here is static and offline-readable by design (PWA cache-first).
 */
export const SEED_RESOURCES: Resource[] = [
  {
    slug: "starting-your-college-apps",
    title: "Starting your college applications early",
    category: "College Apps",
    summary:
      "A calm, month-by-month way to approach applications so deadlines never ambush you.",
    author: "Tafadzwa Moyo (2014)",
    readMinutes: 5,
    body: [
      "The single biggest advantage you can give yourself is time. Applications feel enormous when you start them three weeks before the deadline, and manageable when you start them three months before.",
      "Begin by listing every place you might apply and writing down each deadline in one document. Seeing them together turns a vague worry into a simple schedule.",
      "Draft your personal essay early and let it rest. The version you write in a panic is rarely the version that gets you in. Show it to an alumnus or teacher and revise calmly.",
      "Finally, keep copies of everything you submit. You will reuse essays and reference details across applications, and a tidy folder saves hours.",
    ],
  },
  {
    slug: "budgeting-on-a-student-stipend",
    title: "Budgeting on a student stipend",
    category: "Finances",
    summary:
      "Practical habits for stretching a small allowance without constant stress.",
    author: "Chiedza Mutasa (2016)",
    readMinutes: 4,
    body: [
      "A budget is not about restriction — it is about deciding in advance where your money goes so you are not anxious at the end of the month.",
      "Split what you receive into three buckets the day it arrives: essentials (transport, food, data), savings (even a tiny amount), and a small free-spending allowance so you do not feel deprived.",
      "Track spending for one month, honestly. Most people are surprised by where the money actually goes, and that surprise is where the savings hide.",
      "Build a small buffer for emergencies before anything else. A modest cushion turns a crisis into an inconvenience.",
    ],
  },
  {
    slug: "networking-without-it-feeling-fake",
    title: "Networking without it feeling fake",
    category: "Networking",
    summary:
      "How to reach out to people ahead of you in a way that is genuine and useful.",
    author: "Blessing Ndlovu (2015)",
    readMinutes: 4,
    body: [
      "Networking is just staying curious about people's journeys and being generous with your own. It does not require a suit or a script.",
      "When you reach out, be specific. 'Can I ask how you chose your degree?' lands far better than 'Can you help me?' because it is easy to answer.",
      "Follow up with thanks and a short note on what you did with their advice. People remember the ones who close the loop.",
      "Most importantly: the alumni in this directory want to hear from you. Being asked for guidance is a compliment, not an imposition.",
    ],
  },
  {
    slug: "looking-after-yourself-under-pressure",
    title: "Looking after yourself under pressure",
    category: "Relationships",
    summary:
      "Protecting your wellbeing and relationships during exam season and big transitions.",
    author: "Rumbidzai Chikwava (2012)",
    readMinutes: 5,
    body: [
      "High achievers often treat rest as something to be earned. It is not — rest is part of the work, the way sleep is part of training.",
      "Keep one or two relationships where you are not 'the clever one' — people you can simply be tired or unsure around. They steady you.",
      "When pressure spikes, shrink the task. 'Study everything' is paralysing; 'one past paper, this afternoon' is doable.",
      "If you are struggling more than usual, tell a trusted adult or staff member early. Reaching out is a strength, and the people around you would much rather know.",
    ],
  },
  {
    slug: "choosing-a-degree-that-fits",
    title: "Choosing a degree that fits you",
    category: "College Apps",
    summary:
      "Separating what you enjoy from what others expect, when picking a course.",
    author: "Tinashe Gumbo (2013)",
    readMinutes: 4,
    body: [
      "Pick the subject you would still read about if no one were grading you. Interest sustains you through the hard middle years far better than prestige does.",
      "Talk to people actually doing the job a degree leads to, not just people who hold the degree. The day-to-day reality is the real test.",
      "It is fine to choose a broad path now and specialise later. Few careers run in a straight line, and almost no one ends up exactly where they planned.",
    ],
  },
];
