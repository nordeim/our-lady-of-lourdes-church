export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="skip-link"
      onClick={(event) => {
        event.preventDefault();
        const main = document.getElementById("main-content");
        if (!main) return;
        main.setAttribute("tabindex", "-1");
        main.focus();
        main.scrollIntoView({ behavior: "auto" });
      }}
    >
      Skip to main content
    </a>
  );
}
