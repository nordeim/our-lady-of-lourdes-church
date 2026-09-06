const HONORIFICS =
  /^(fr|father|friar|rev|revd|reverend|msgr|monsignor|ofm|ss\.?cc\.?|mep|hgn|mr|ms|mrs|dr)\.?$/i;

export function monogram(name: string): string {
  const rawParts = name
    .replace(/,/g, " ")
    .split(/\s+/)
    .filter((part) => part.length > 0);
  if (rawParts.length === 0) return "";
  const parts = rawParts.filter((part) => !HONORIFICS.test(part));
  const effective = parts.length > 0 ? parts : rawParts;
  if (effective.length === 0) return "";
  if (effective.length === 1) return effective[0].slice(0, 2).toUpperCase();
  return `${effective[0][0]}${effective[effective.length - 1][0]}`.toUpperCase();
}
