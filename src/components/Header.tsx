import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/utils/cn";
import { useScrolled } from "@/hooks/useScrolled";
import { primaryNav } from "@/data/nav";
import { site } from "@/data/site";
import type { NavItem } from "@/data/nav";

export function Header() {
  const { pathname, hash } = useLocation();
  const scrolled = useScrolled(16);
  const isHome = pathname === "/";
  const [desktopOpen, setDesktopOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const drawerWasOpenRef = useRef(false);

  const solid = scrolled || !isHome || mobileOpen;

  const isParentActive = (item: NavItem) =>
    Boolean(item.children?.some((child) => child.to.split("#")[0] === pathname));

  const closeMobile = () => setMobileOpen(false);

  useEffect(() => {
    closeMobile();
  }, [pathname, hash]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setDesktopOpen(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (mobileOpen) {
      drawerWasOpenRef.current = true;
      drawerRef.current?.focus();
      return;
    }
    if (drawerWasOpenRef.current) {
      toggleRef.current?.focus();
      drawerWasOpenRef.current = false;
    }
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onPointer = (event: PointerEvent) => {
      const target = event.target as Node;
      if (drawerRef.current?.contains(target)) return;
      if (toggleRef.current?.contains(target)) return;
      setMobileOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    return () => document.removeEventListener("pointerdown", onPointer);
  }, [mobileOpen]);

  const handleDrawerKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Tab" || !drawerRef.current) return;
    const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
          solid
            ? "bg-bsc-sapphire-950/92 shadow-bsc backdrop-blur-md"
            : "bg-transparent",
        )}
      >
        <div className="hidden border-b border-white/10 bg-bsc-sapphire-950/80 lg:block">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-1.5 text-xs tracking-wide text-bsc-cream/70">
            <p>
              {site.address.street} · {site.feast.name}
            </p>
            <Link to="/give" className="link-underline text-bsc-gold-300">
              Give
            </Link>
          </div>
        </div>

        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 sm:px-8">
          <Link to="/" className="flex items-center gap-3 text-bsc-cream">
            <span className="font-display text-lg font-semibold tracking-tight sm:text-xl">
              {site.shortName}
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {primaryNav.map((item) => {
              if (item.children) {
                const active = isParentActive(item);
                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => setDesktopOpen(item.label)}
                    onMouseLeave={() => setDesktopOpen(null)}
                    onFocusCapture={() => setDesktopOpen(item.label)}
                    onBlurCapture={(event) => {
                      const next = event.relatedTarget as HTMLElement | null;
                      if (next && event.currentTarget.contains(next)) return;
                      setDesktopOpen(null);
                    }}
                  >
                    <button
                      type="button"
                      aria-expanded={desktopOpen === item.label}
                      aria-current={active ? "true" : undefined}
                      className={cn(
                        "inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-bsc-cream/85 transition hover:text-bsc-gold-300",
                        active && "text-bsc-gold-300",
                      )}
                    >
                      {item.label}
                      <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                    {desktopOpen === item.label && (
                      <div
                        className="menu-in absolute left-0 top-full z-50 min-w-56 rounded-md border border-bsc-stone/40 bg-bsc-cream p-3 shadow-bsc-lg"
                        onClickCapture={() => setDesktopOpen(null)}
                      >
                        {item.description && (
                          <p className="mb-2 px-2 text-xs text-bsc-charcoal/70">{item.description}</p>
                        )}
                        {item.children.map((child) => (
                          <Link
                            key={child.to}
                            to={child.to}
                            aria-current={pathname + hash === child.to ? "page" : undefined}
                            className="block rounded px-2 py-2 text-sm text-bsc-sapphire-900 hover:bg-bsc-parchment"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
              return (
                <Link
                  key={item.label}
                  to={item.to ?? "/"}
                  aria-current={pathname === item.to ? "page" : undefined}
                  className={cn(
                    "px-3 py-2 text-sm font-medium text-bsc-cream/85 transition hover:text-bsc-gold-300",
                    pathname === item.to && "text-bsc-gold-300",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <button
            ref={toggleRef}
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-md text-bsc-cream lg:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      {mobileOpen && (
        <div
          ref={drawerRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          tabIndex={-1}
          className="drawer-in fixed inset-y-0 right-0 z-[70] flex w-[min(100%,22rem)] flex-col bg-bsc-sapphire-950 px-6 py-8 text-bsc-cream shadow-bsc-lg outline-none"
          onKeyDown={handleDrawerKeyDown}
          onClickCapture={(event) => {
            const target = event.target as HTMLElement;
            if (target.closest("a")) closeMobile();
          }}
        >
          <nav aria-label="Mobile" className="mt-10 flex flex-col gap-1">
            {primaryNav.map((item, index) => {
              const parentCurrent = item.children
                ? isParentActive(item)
                : pathname === item.to;
              return (
                <div
                  key={item.label}
                  className="drawer-item-in"
                  style={{ animationDelay: `${index * 40}ms` }}
                >
                  {item.to ? (
                    <Link
                      to={item.to}
                      aria-current={parentCurrent ? "page" : undefined}
                      className="block py-2.5 font-display text-lg"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <p
                      aria-current={parentCurrent ? "page" : undefined}
                      className="py-2.5 font-display text-lg"
                    >
                      {item.label}
                    </p>
                  )}
                  {item.children && (
                    <div className="mb-2 ml-3 flex flex-col border-l border-bsc-gold-400/30 pl-3">
                      {item.children.map((child) => (
                        <Link
                          key={child.to}
                          to={child.to}
                          className="py-1.5 text-sm text-bsc-cream/75"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
          <div className="mt-auto border-t border-white/10 pt-6">
            <Link
              to="/give"
              className="inline-flex w-full items-center justify-center rounded-md bg-bsc-gold-500 px-4 py-3 text-sm font-semibold text-bsc-sapphire-950"
            >
              Give
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
