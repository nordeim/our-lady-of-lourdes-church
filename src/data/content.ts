export interface TimelineEntry {
  year: string;
  title: string;
  description: string;
}

export interface GroundsPlace {
  id: string;
  title: string;
  description: string;
  image: string;
  imageFallback: string;
  imageAlt: string;
}

export interface Ministry {
  id: string;
  title: string;
  summary: string;
  description: string;
  image: string;
  imageFallback: string;
  imageAlt: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface EventItem {
  title: string;
  date: string;
  summary: string;
  category: "Parish" | "Devotion" | "Formation" | "Archdiocese";
  href?: string;
}

export interface GivingOption {
  title: string;
  description: string;
  icon: string;
}

export interface Priest {
  name: string;
  role: string;
  email?: string;
  bio: string;
}

export interface PpcMember {
  name: string;
  role: string;
}

export const images = {
  hero: "/images/hero-church.jpg",
  heroFallback: "/images/hero-church.jpg",
  chapel: "/images/grotto.jpg",
  sanctuary: "/images/sanctuary.jpg",
  garden: "/images/garden.jpg",
  hall: "/images/community.jpg",
  feast: "/images/grotto.jpg",
} as const;

export const priests: Priest[] = [
  {
    name: "Rev Fr Alphonsus Dominic",
    role: "Parish Priest",
    email: "colol.secretariat@catholic.org.sg",
    bio: "Appointed Parish Priest of Our Lady of Lourdes from 22 July 2026, shepherding a household that prays in English and Tamil at the heart of the city.",
  },
  {
    name: "Rev Fr Leo Justin HGN",
    role: "Assistant Parish Priest",
    bio: "Of the Heralds of Good News, reappointed Assistant Parish Priest from 1 November 2024. He serves at the altar and among the Tamil and English communities.",
  },
  {
    name: "Fr Joachim A. M. Meneuvrier, MEP",
    role: "Founding Missionary (1884)",
    bio: "The first missionary sent exclusively for Singapore's Catholic Indians. He obtained the Ophir Road site, raised the church, and saw it blessed on 13 May 1888.",
  },
];

export const ppcMembers: PpcMember[] = [
  { name: "Rev Fr Alphonsus Dominic", role: "Parish Priest (Ex-officio)" },
  { name: "Chairperson", role: "Chairperson, Parish Pastoral Council" },
  { name: "Vice Chairperson", role: "Vice Chairperson, PPC" },
  { name: "Secretary", role: "Secretary, PPC" },
  { name: "Treasurer", role: "Treasurer, PPC" },
  { name: "Member", role: "Member, PPC" },
];

export const lifeTimeline: TimelineEntry[] = [
  {
    year: "1884",
    title: "A Shepherd for the Indians",
    description:
      "Bishop Édouard Gasnier sends Fr Joachim Alexandre Marie Meneuvrier, MEP, to care exclusively for Singapore's Catholic Indians. The flock grows from some sixty souls to three hundred within two years.",
  },
  {
    year: "1885",
    title: "Land at the Rochor Bend",
    description:
      "After two unsuccessful applications, Governor Sir Frederick Weld grants a free plot at the bend of the Rochor River — a muddy swamp after the river was straightened into a canal. Hundreds of bullock carts of earth raise the ground.",
  },
  {
    year: "1886",
    title: "Cornerstone Laid",
    description:
      "On 1 August, Bishop Gasnier and Sir Frederick Weld lay the cornerstone. The church is to be dedicated to Our Lady of Lourdes, honouring the 1858 apparitions at Massabielle, France.",
  },
  {
    year: "1888",
    title: "A Basilica in Miniature",
    description:
      "Blessed and opened on 13 May — the first Tamil Catholic church in Singapore, modelled on the Basilica at Lourdes with pointed arches, buttresses and spires. Catholics, Protestants and non-Christians all contributed. A parish school opens in the compound.",
  },
  {
    year: "1942",
    title: "War at Ophir Road",
    description:
      "Two bombs fall within the premises, damaging school and presbytery. The nave itself stands. Under the Japanese Occupation the church is used as army headquarters — then returned to prayer.",
  },
  {
    year: "1974",
    title: "A Parish for All",
    description:
      "OLOL expands from ministering to Catholic Indians to serving every Catholic around Ophir Road — a shift from ethnic to territorial parish, without laying down the Tamil tongue that first called this house home.",
  },
  {
    year: "2005",
    title: "National Monument",
    description:
      "Gazetted on 14 January as Singapore's 52nd national monument. Restoration in 2009–2010 (S$1.75 million) returns the Neo-Gothic fabric to itself. The grotto still shows Our Lady appearing to Saint Bernadette.",
  },
];

export const grounds: GroundsPlace[] = [
  {
    id: "main-church",
    title: "Main Church",
    description:
      "A Neo-Gothic nave modelled on Lourdes: lancet windows, slender columns, and stained glass of the fifteen mysteries of the Rosary. National Monument No. 52.",
    image: "/images/hero-church.jpg",
    imageFallback: "/images/hero-church.jpg",
    imageAlt: "The cream Neo-Gothic facade of the Church of Our Lady of Lourdes on Ophir Road at dusk",
  },
  {
    id: "grotto",
    title: "Lourdes Grotto",
    description:
      "Life-sized statues of Our Lady appearing to Saint Bernadette — a Massabielle in the city, where Hindus and Catholics alike come to ask her intercession.",
    image: "/images/grotto.jpg",
    imageFallback: "/images/hero-church.jpg",
    imageAlt: "The Lourdes grotto with statues of Our Lady and Saint Bernadette in the church courtyard",
  },
  {
    id: "garden",
    title: "Parish Grounds",
    description:
      "A quiet compound at 50 Ophir Road, a short walk from Bugis — stone, frangipani, and the cream walls of a church that has stood since 1888.",
    image: "/images/garden.jpg",
    imageFallback: "/images/hero-church.jpg",
    imageAlt: "The tropical parish garden beside the Church of Our Lady of Lourdes",
  },
];

export const ministries: Ministry[] = [
  {
    id: "liturgical",
    title: "Liturgical Ministries",
    summary: "Altar servers, lectors, Communion ministers, choir, and hospitality.",
    description:
      "Our liturgical ministries serve at the heart of parish worship. Altar servers assist at Mass, lectors proclaim the Word in English and Tamil, Extraordinary Ministers of Holy Communion share the Body of Christ, our choirs lead the assembly in song, and hospitality welcomes every person who comes through the Ophir Road doors.",
    image: "/images/liturgical.jpg",
    imageFallback: "/images/hero-church.jpg",
    imageAlt: "The prepared altar of the Church of Our Lady of Lourdes",
  },
  {
    id: "faith-formation",
    title: "Faith Formation",
    summary: "Catechetical ministry, RCIA, and adult faith programmes.",
    description:
      "From children's catechism to the Rite of Christian Initiation of Adults, formation at Lourdes nurtures disciples of every age. The Catechetical Ministry walks with families toward First Holy Communion and Confirmation, while adult sessions deepen the faith first planted here in 1888.",
    image: "/images/faith-formation.jpg",
    imageFallback: "/images/hero-church.jpg",
    imageAlt: "Catechism materials and a rosary on a parish classroom table",
  },
  {
    id: "pastoral-care",
    title: "Pastoral Care",
    summary: "St Vincent de Paul, Legion of Mary, and care for the homebound.",
    description:
      "The Society of St Vincent de Paul and the Legion of Mary visit the sick and homebound, support the bereaved, and reach the poor around Rochor. We believe every person is a beloved child of God — including the migrant worker who kneels at the grotto after a long shift.",
    image: "/images/pastoral-care.jpg",
    imageFallback: "/images/hero-church.jpg",
    imageAlt: "A quiet pastoral care room with lilies and a crucifix",
  },
  {
    id: "family-life",
    title: "Family Life",
    summary: "Baptism, marriage preparation, and family enrichment.",
    description:
      "We accompany couples preparing for Holy Matrimony, celebrate infant and adult baptism, and offer programmes that strengthen the domestic church. Families of every language find a place at this font.",
    image: "/images/family-life.jpg",
    imageFallback: "/images/hero-church.jpg",
    imageAlt: "A stone baptismal font with white flowers in the parish courtyard",
  },
  {
    id: "youth",
    title: "Youth & Young Adults",
    summary: "Youth ministry, confirmation, and young adult fellowship.",
    description:
      "Youth and young adults gather for friendship, faith sharing, and service. From confirmation preparation to city-centre fellowship, we journey with the next generation as they discover God's call on Ophir Road.",
    image: "/images/youth.jpg",
    imageFallback: "/images/hero-church.jpg",
    imageAlt: "A parish youth gathering space with chairs in a circle",
  },
  {
    id: "community",
    title: "Community & Outreach",
    summary: "Tamil community, migrant welfare, and language Masses.",
    description:
      "This was Singapore's first Tamil Catholic church, and Tamil remains a living tongue of prayer here — Sunday 9:30 AM and 6:30 PM, weekday evenings at 7:00 PM. The Migrant Welfare Committee and language communities (including Sinhala on the first Sunday) welcome workers far from home. A skills centre for migrants opened on these grounds in 2000.",
    image: "/images/community.jpg",
    imageFallback: "/images/hero-church.jpg",
    imageAlt: "A parish community table prepared for a shared meal",
  },
];

export const faqs: FaqItem[] = [
  {
    question: "What are the Mass times?",
    answer:
      "Weekdays: 12:30 PM English and 7:00 PM Tamil. Saturday (English): 5:00 PM, 6:15 PM and 7:30 PM. Sunday: 8:00 AM English, 9:30 AM Tamil, 11:00 AM English, 12:30 PM English, 6:30 PM Tamil. Public holidays: 9:00 AM English and 10:00 AM Tamil. Rosary is prayed at 4:15 PM on Saturdays.",
  },
  {
    question: "When is confession available?",
    answer:
      "The Sacrament of Reconciliation is available 15 minutes before each Mass. You may also approach the priests via the parish office.",
  },
  {
    question: "How do I get there?",
    answer:
      "We are at 50 Ophir Road, Singapore 188690. Nearest MRT: Bugis (EW12 / DT14), Rochor (DT13) and Jalan Besar (DT22). Buses along Ophir Road and Victoria Street include 2, 7, 12, 32, 33, 51, 61, 63, 80, 130, 133, 145 and 197.",
  },
  {
    question: "Is there parking?",
    answer:
      "Street and nearby public car parks serve the Rochor / Bugis area. The compound is modest — please allow extra time on feast days and Sunday morning. Public transport is the surest way.",
  },
  {
    question: "How do I arrange a baptism or wedding?",
    answer:
      "Write to colol.secretariat@catholic.org.sg or call +65 6294 0624. Weddings should be arranged at least six months ahead. Baptism of infants and adults is celebrated after preparation with the parish.",
  },
  {
    question: "What should I wear when I visit?",
    answer:
      "Shoulders should be covered. Clothes that expose the knees — including shorts, short skirts and dresses — are not allowed in the Main Church. Ripped jeans, see-through clothing and visible offensive tattoos are discouraged. Hats and caps are removed on entry. No food, drink or laser pointers in the nave; phones on silent.",
  },
];

export const upcomingEvents: EventItem[] = [
  {
    title: "Parish Feast — Our Lady of Lourdes",
    date: "11 February",
    summary:
      "The parish feast of Our Lady of Lourdes, commemorating the apparitions at Massabielle. Triduum and feast Masses in English and Tamil — all are welcome at the grotto.",
    category: "Parish",
    href: "/worship",
  },
  {
    title: "Saturday Rosary",
    date: "Saturdays 4:15 PM",
    summary:
      "The Holy Rosary is prayed in the Main Church before the evening Masses. Come early; stay for 5:00, 6:15 or 7:30 PM.",
    category: "Devotion",
  },
  {
    title: "Divine Mercy Devotion",
    date: "Tuesdays 11:35 AM",
    summary:
      "The Divine Mercy chaplet is prayed before the 12:30 PM English Mass. A quiet midday hour in the city.",
    category: "Devotion",
  },
  {
    title: "Weekday Rosary",
    date: "Mon, Wed, Thu & Fri 11:35 AM",
    summary:
      "Join the midday Rosary before English Mass at 12:30 PM — a pause for office workers, caregivers, and anyone who can slip into the nave.",
    category: "Devotion",
  },
  {
    title: "Catechism & RCIA",
    date: "Sundays in term",
    summary:
      "Children's catechism and the Rite of Christian Initiation of Adults. Enquire at the parish office to begin.",
    category: "Formation",
    href: "/ministries#faith-formation",
  },
  {
    title: "Archdiocesan Feasts & Notices",
    date: "See catholic.sg",
    summary:
      "Holy days of obligation, Chrism Mass, and archdiocesan collections are announced from the pulpit and on the Archdiocese of Singapore site.",
    category: "Archdiocese",
    href: "https://www.catholic.sg",
  },
];

export const givingOptions: GivingOption[] = [
  {
    title: "PayNow",
    description:
      "Give via PayNow using the parish UEN. Please confirm the current UEN with the parish office at +65 6294 0624 or colol.secretariat@catholic.org.sg before transferring.",
    icon: "globe",
  },
  {
    title: "Weekend Collection",
    description:
      "The offertory at Saturday and Sunday Masses supports the daily life of this national monument and the poor it serves.",
    icon: "church",
  },
  {
    title: "Cheque",
    description:
      "Cheques payable to Church of Our Lady of Lourdes may be posted or left at the parish office, 50 Ophir Road, Singapore 188690.",
    icon: "book",
  },
  {
    title: "Cash at the Office",
    description:
      "Cash offerings are received at the parish office on weekdays, 9:00 AM – 5:00 PM.",
    icon: "heart",
  },
  {
    title: "Mass Offerings",
    description:
      "Request a Mass for a loved one — living or deceased — through the secretariat. Intentions are offered at English and Tamil Masses.",
    icon: "flame",
  },
  {
    title: "St Vincent de Paul",
    description:
      "Offerings directed to the Society of St Vincent de Paul reach families in need around Rochor. Mark your gift clearly or give through the conference.",
    icon: "sprout",
  },
];

export const serveRoles = [
  {
    title: "Liturgical Ministers",
    summary:
      "Lectors, altar servers, Extraordinary Ministers of Holy Communion, choir, and hospitality — in English and Tamil.",
  },
  {
    title: "Catechists & Facilitators",
    summary:
      "Walk with children, youth and adults toward the sacraments. Training is provided; a living faith is the only prerequisite.",
  },
  {
    title: "Pastoral Care",
    summary:
      "Visit with St Vincent de Paul or the Legion of Mary. Sit with the sick, the bereaved, and the migrant far from home.",
  },
  {
    title: "Hospitality & Grounds",
    summary:
      "Keep the grotto, nave and compound a place of welcome — ushers, cleaners, gardeners, and feast-day hands.",
  },
];

export const devotions = [
  {
    title: "Holy Rosary",
    when: "Mon, Wed, Thu & Fri 11:35 AM",
    where: "Main Church, before English Mass",
  },
  {
    title: "Divine Mercy",
    when: "Tuesdays 11:35 AM",
    where: "Main Church, before English Mass",
  },
  {
    title: "Saturday Rosary",
    when: "Saturdays 4:15 PM",
    where: "Main Church, before sunset Masses",
  },
  {
    title: "Reconciliation",
    when: "15 minutes before Mass",
    where: "Main Church",
  },
  {
    title: "Parish Feast",
    when: "11 February",
    where: "Our Lady of Lourdes — Triduum & feast Masses",
  },
  {
    title: "Grotto Prayer",
    when: "Daily, during open hours",
    where: "Courtyard grotto of Our Lady and St Bernadette",
  },
];

export const visitorGuidelines = {
  dress: [
    "Clothes that expose the knees — including shorts, skirts and dresses — are not allowed.",
    "Ripped jeans, T-shirts and see-through clothing are discouraged.",
    "Shoulders should always be covered during the visit.",
    "Any offensive tattoo or religious symbol should not be visible.",
    "Hats and caps are removed upon entry to the Main Church.",
  ],
  other: [
    { title: "Forbidden items", body: "Laser pointers of any type are not permitted in the Main Church." },
    { title: "Food & drink", body: "No food and drinks are allowed in the Main Church." },
    { title: "Phones", body: "Mobile phones are strongly discouraged inside the Main Church. Keep them on silent." },
    { title: "Smoking", body: "Smoking is only allowed at designated areas. Electronic cigarettes are not allowed." },
    { title: "Refuse", body: "Please dispose of refuse in the rubbish and recycling bins on the compound." },
    {
      title: "Lost & found",
      body: "Approach the Parish Office or email colol.secretariat@catholic.org.sg.",
    },
  ],
};
