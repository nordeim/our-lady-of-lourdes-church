import { site } from "@/data/site";

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true" fill="currentColor">
      <path d="M14 8h3V4h-3c-2.8 0-5 2.2-5 5v2H7v4h2v8h4v-8h3l1-4h-4V9c0-.6.4-1 1-1z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true" fill="currentColor">
      <path d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm10 2H7a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm-5 3.2A3.8 3.8 0 1 1 8.2 12 3.8 3.8 0 0 1 12 8.2zm0 2A1.8 1.8 0 1 0 13.8 12 1.8 1.8 0 0 0 12 10.2zM17.4 6.3a.9.9 0 1 1-.9.9.9.9 0 0 1 .9-.9z" />
    </svg>
  );
}

export function SocialIcons({ className }: { className?: string }) {
  return (
    <div className={className}>
      {site.facebook && (
        <a
          href={site.facebook}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-bsc-cream/20 text-bsc-cream/80 transition hover:border-bsc-gold-400 hover:text-bsc-gold-300"
          aria-label="Facebook"
          target="_blank"
          rel="noreferrer"
        >
          <FacebookIcon />
        </a>
      )}
      {site.instagram && (
        <a
          href={site.instagram}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-bsc-cream/20 text-bsc-cream/80 transition hover:border-bsc-gold-400 hover:text-bsc-gold-300"
          aria-label="Instagram"
          target="_blank"
          rel="noreferrer"
        >
          <InstagramIcon />
        </a>
      )}
    </div>
  );
}
