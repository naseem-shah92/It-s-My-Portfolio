export interface ServiceItem {
  num: string;
  title: string;
  desc: string;
}

export const services: ServiceItem[] = [
  {
    num: "01",
    title: "Web Development",
    desc: "Fast, responsive, production-ready websites built with clean code.",
  },
  {
    num: "02",
    title: "UI / UX Design",
    desc: "Interfaces that look sharp and feel simple to use for real users.",
  },
  {
    num: "03",
    title: "Business Branding",
    desc: "A consistent look and feel that makes a business memorable.",
  },
  {
    num: "04",
    title: "Application Design",
    desc: "Product screens and dashboards, functional first, polished always.",
  },
  {
    num: "05",
    title: "AI Voice Agents",
    desc: "Conversational voice AI built into your site — like the one on this page.",
  },
];

export interface WorkItem {
  id: string;
  url: string;
  title: string;
  desc: string;
  tags: [string, string];
  thumbClass: string;
}

export const works: WorkItem[] = [
  {
    id: "solecraft",
    url: "https://solecraftly.netlify.app/",
    title: "SoleCraft",
    desc: "A sneaker store concept with a clean product grid and modern checkout flow.",
    tags: ["E-Commerce", "UI Design"],
    thumbClass: "w1",
  },
  {
    id: "aetherai",
    url: "https://aispecially.netlify.app/",
    title: "AetherAI",
    desc: "Landing page for an AI product startup — bold hero, feature sections, clear CTAs.",
    tags: ["SaaS", "Landing Page"],
    thumbClass: "w2",
  },
  {
    id: "rolex",
    url: "https://watcheshops.netlify.app/",
    title: "Luxury Watch Store",
    desc: "Full e-commerce build — product showcase, cart, and multi-step checkout.",
    tags: ["E-Commerce", "Checkout Flow"],
    thumbClass: "w3",
  },
  {
    id: "kolachi",
    url: "https://kolachii.netlify.app/",
    title: "Kolachi Do Darya",
    desc: "Restaurant website for a Karachi landmark — menu showcase and location details.",
    tags: ["Restaurant", "Business Site"],
    thumbClass: "w4",
  },
];
