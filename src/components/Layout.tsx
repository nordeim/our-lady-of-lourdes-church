import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SkipLink } from "@/components/SkipLink";
import { BackToTop } from "@/components/BackToTop";
import { ScrollProgress } from "@/components/ScrollProgress";

export function Layout() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const resolveAnchor = () => {
      const raw = window.location.hash;
      const parts = raw.split("#").filter(Boolean);
      const anchor = parts.length > 1 ? parts[parts.length - 1] : null;
      if (anchor) {
        const el = document.getElementById(anchor);
        if (el) {
          const timer = setTimeout(() => {
            el.scrollIntoView({ behavior: "auto" });
          }, 80);
          return () => clearTimeout(timer);
        }
      }
      window.scrollTo({ top: 0, behavior: "auto" });
    };
    return resolveAnchor();
  }, [pathname, hash]);

  return (
    <>
      <SkipLink />
      <ScrollProgress />
      <Header />
      <main id="main-content" tabIndex={-1}>
        <div key={pathname} data-testid="page-container" data-route={pathname} className="page-in">
          <Outlet />
        </div>
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
