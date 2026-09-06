import type { EventItem } from "@/data/content";

const tones: Record<EventItem["category"], string> = {
  Parish: "border-bsc-sapphire-300 bg-bsc-sapphire-50 text-bsc-sapphire-700",
  Devotion: "border-bsc-gold-400 bg-bsc-gold-100 text-bsc-gold-700",
  Formation: "border-bsc-pine-300 bg-bsc-pine-50 text-bsc-pine-600",
  Archdiocese: "border-bsc-terracotta-300 bg-bsc-terracotta-50 text-bsc-terracotta-600",
};

export function categoryTone(category: EventItem["category"]): string {
  return tones[category];
}
