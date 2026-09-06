const HONORIFICS =
  /^(fr|friar|rev|revd|reverend|msgr|monsignor|ofm|ss\.?cc\.?|mep|hgn|mr|ms|mrs|dr)\.?$/i;

export function monogram(name: string): string {
  const parts = name
    .replace(/,/g, " ")
    .split(/\s+/)
    .filter((part) => part.length > 0 && !HONORIFICS.test(part));

  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}
