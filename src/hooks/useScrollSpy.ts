import { useEffect, useState } from "react";

export function useScrollSpy(ids: string[]): string {
  const [active, setActive] = useState(ids[0] ?? "");

  useEffect(() => {
    if (ids.length === 0) return;

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const visible = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        const next = ids.find((id) => visible.has(id));
        if (next) setActive(next);
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0, 0.25, 0.5] },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
