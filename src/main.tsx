import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { resolveHashRedirect } from "@/utils/deepLinks";

const { pathname, hash, search } = window.location;
if (pathname !== "/" && !hash.startsWith("#/")) {
  const redirect = resolveHashRedirect(pathname, hash);
  if (redirect) {
    window.location.replace(redirect + search);
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
