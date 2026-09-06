export type MassDayKey = "weekdays" | "saturday" | "sunday";

export function massDayKey(date: Date): MassDayKey {
  switch (date.getDay()) {
    case 0:
      return "sunday";
    case 6:
      return "saturday";
    default:
      return "weekdays";
  }
}
