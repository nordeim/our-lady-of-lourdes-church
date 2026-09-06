export const site = {
  name: "Church of Our Lady of Lourdes",
  shortName: "Our Lady of Lourdes",
  tamilName: "தூய லூர்து அன்னை ஆலயம்",
  tagline: "A grotto of welcome in the city.",
  vision:
    "To be a welcoming Marian household, drawing all to Christ through worship, formation, and service — in English, Tamil, and every tongue that finds a home at Ophir Road.",
  address: {
    street: "50 Ophir Road",
    city: "Singapore",
    zip: "188690",
    get full() {
      return `${this.street}, ${this.city} ${this.zip}`;
    },
    get query() {
      return encodeURIComponent(this.full);
    },
  },
  hours: {
    church: "Open for Mass and prayer; gates close 5:00 PM on public holidays",
    office: "Mon–Fri 9:00 AM – 5:00 PM (closed on public holidays)",
    reception: "Mon–Fri 9:00 AM – 5:00 PM",
    adoration: "Before weekday Mass — Rosary or Divine Mercy at 11:35 AM",
    confessionWeekday: "15 minutes before each Mass",
    confessionWeekend: "15 minutes before each Mass",
  },
  mass: {
    weekdayNoon: "Mon–Fri 12:30 PM (English)",
    weekdayEvening: "Mon–Fri 7:00 PM (Tamil)",
    saturday: "5:00 PM · 6:15 PM · 7:30 PM (English)",
    sunday: [
      { time: "8:00 AM", language: "English" },
      { time: "9:30 AM", language: "Tamil" },
      { time: "11:00 AM", language: "English" },
      { time: "12:30 PM", language: "English" },
      { time: "6:30 PM", language: "Tamil" },
    ],
    publicHoliday: "9:00 AM (English) · 10:00 AM (Tamil)",
    confession: "Sacrament of Reconciliation is available 15 minutes before Mass.",
    adoration: "Rosary Mon, Wed, Thu & Fri at 11:35 AM; Divine Mercy devotion Tuesday at 11:35 AM; Saturday Rosary at 4:15 PM.",
    note: "On public holidays the parish office is closed and church gates close at 5:00 PM. Mass: 9:00 AM English, 10:00 AM Tamil.",
  },
  contact: {
    officePhone: "+65 6294 0624",
    fax: "+65 6294 2686",
    email: "colol.secretariat@catholic.org.sg",
    connectEmail: "colol.secretariat@catholic.org.sg",
  },
  transport: {
    mrt: "Bugis (EW12 / DT14) · Rochor (DT13) · Jalan Besar (DT22)",
    buses: "Ophir Road / Victoria Street: 2, 7, 12, 32, 33, 51, 61, 63, 80, 130, 133, 145, 197",
  },
  feast: {
    name: "Our Lady of Lourdes",
    date: "11 February",
  },
  uen: "",
  chequePayee: "Church of Our Lady of Lourdes",
  facebook: "https://www.facebook.com/ChurchOfOurLadyOfLourdes/",
  instagram: "",
  youtube: "",
  archdiocese: "https://www.catholic.sg",
  mapsUrl: "https://www.google.com/maps?q=50+Ophir+Road,+Singapore+188690",
  mapsEmbedSrc:
    "https://www.google.com/maps?q=50+Ophir+Road,+Singapore+188690&output=embed",
  url: "https://ourladyoflourdes.sg/",
  ogImage: "https://ourladyoflourdes.sg/images/hero-church.jpg",
} as const;
