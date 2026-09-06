export interface NavLink {
  label: string;
  to: string;
}

export interface NavItem {
  label: string;
  to?: string;
  description?: string;
  children?: NavLink[];
}

export const primaryNav: NavItem[] = [
  { label: "Home", to: "/" },
  {
    label: "About",
    description: "Our parish, our priests, and our story",
    children: [
      { label: "The Parish", to: "/about" },
      { label: "Our History", to: "/history" },
      { label: "FAQ", to: "/faq" },
    ],
  },
  {
    label: "Worship",
    description: "Mass times, sacraments, and how to find us",
    children: [
      { label: "Mass Times", to: "/worship#mass" },
      { label: "Confession & Devotions", to: "/worship#confession" },
      { label: "Find Us", to: "/worship#visit" },
    ],
  },
  {
    label: "Ministries",
    description: "Liturgical, pastoral, and community ministries",
    children: [
      { label: "Liturgical", to: "/ministries#liturgical" },
      { label: "Faith Formation", to: "/ministries#faith-formation" },
      { label: "Pastoral Care", to: "/ministries#pastoral-care" },
    ],
  },
  { label: "News & Events", to: "/news-events" },
  { label: "Serve", to: "/serve" },
];

export const footerNav: NavLink[] = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "History", to: "/history" },
  { label: "Worship", to: "/worship" },
  { label: "Ministries", to: "/ministries" },
  { label: "News & Events", to: "/news-events" },
  { label: "Serve", to: "/serve" },
  { label: "Give", to: "/give" },
  { label: "FAQ", to: "/faq" },
  { label: "Contact", to: "/worship#visit" },
];
