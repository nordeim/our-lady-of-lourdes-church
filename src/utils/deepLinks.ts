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
  const path = pathname.replace(/\/$/, "");
  if (path === "" || path === "/" || hash.startsWith("#/")) return null;
  if (!(knownRoutePaths as readonly string[]).includes(path)) return null;
  const anchor = hash.startsWith("#") ? hash : "";
  return `/#${path}${anchor}`;
}
