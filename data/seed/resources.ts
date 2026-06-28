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
  {
    slug: "personal-statement-that-sounds-like-you",
    title: "A personal statement that sounds like you",
    category: "College Apps",
    summary:
      "How to write an essay that an admissions officer remembers — without exaggerating.",
    author: "Nyasha Marufu (2014)",
    readMinutes: 5,
    body: [
      "Admissions officers read thousands of essays. The ones that stand out are not the grandest — they are the most specific and the most honestly yours.",
      "Start with a real moment, not a thesis. A single concrete scene from your life tells them more than a paragraph of adjectives about how hardworking you are.",
      "Cut every sentence that could appear in anyone else's essay. If a line would be true of half your class, it is not earning its place.",
      "Read the final version aloud. If it does not sound like how you actually talk about yourself, keep editing until it does.",
    ],
  },
  {
    slug: "managing-money-when-you-move-abroad",
    title: "Managing money when you move abroad",
    category: "Finances",
    summary:
      "Opening accounts, avoiding fees, and sending money home without losing a fortune.",
    author: "Chipo Nyathi (2011)",
    readMinutes: 5,
    body: [
      "The first month abroad is when costly money mistakes happen. A little setup beforehand saves you far more than it feels like at the time.",
      "Open a local student bank account as early as you can — many waive fees for students, and paying in the local currency avoids constant conversion charges.",
      "When you send money home, compare a couple of transfer services rather than defaulting to the first one. The difference in fees and rates adds up over a year.",
      "Keep a small emergency fund in the local currency. Being stranded without access to cash in a new country is stressful and avoidable.",
    ],
  },
  {
    slug: "finding-a-mentor-who-actually-helps",
    title: "Finding a mentor who actually helps",
    category: "Networking",
    summary:
      "Turning a one-off conversation into guidance you can come back to.",
    author: "Simbarashe Mhute (2013)",
    readMinutes: 4,
    body: [
      "A good mentor is rarely the most famous person you can find — it is someone a few steps ahead who remembers what your stage felt like.",
      "Ask for something small and specific first: fifteen minutes about one decision. It is easy to say yes to, and it lets both of you see if the fit is there.",
      "Come prepared and do what you said you would. Mentors invest more in people who act on advice than in people who only collect it.",
      "Keep them updated occasionally, even when you do not need anything. The relationships that last are the ones where you also share your wins.",
    ],
  },
  {
    slug: "staying-connected-to-home",
    title: "Staying connected to home while you study",
    category: "Relationships",
    summary:
      "Holding on to the people and identity that ground you when everything else changes.",
    author: "Ruvarashe Chiweshe (2015)",
    readMinutes: 4,
    body: [
      "Leaving for school or abroad can quietly loosen the ties that matter most. A little intention keeps them strong without much effort.",
      "Set one small, regular rhythm with home — a weekly call, a shared photo — rather than waiting for a 'good time' that never quite comes.",
      "Let the people back home in on the hard parts too, not just the highlights. Sharing the struggle is what keeps a relationship real across distance.",
      "Stay rooted in who you are. The point of getting ahead is not to leave the family behind — it is to be able to reach back.",
    ],
  },
];
