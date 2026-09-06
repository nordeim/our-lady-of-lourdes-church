export const knownRoutePaths = [
  "/",
  "/about",
  "/history",
  "/worship",
  "/mass-times",
  "/hours-location",
  "/visit",
  "/ministries",
  "/ministry",
  "/news-events",
  "/news-and-events",
  "/serve",
  "/volunteer",
  "/give",
  "/donate",
  "/faq",
] as const;

export function resolveHashRedirect(pathname: string, hash: string): string | null {
  if (pathname === "/" || hash.startsWith("#/")) return null;
  const match = knownRoutePaths.find((path) => path === pathname);
  if (!match) return null;
  const anchor = hash.startsWith("#") ? hash : "";
  return `/#${match}${anchor}`;
}
