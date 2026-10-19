import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource-variable/fraunces";
import "@fontsource-variable/inter";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "./styles/global.css";
import App from "./App";

const container = document.getElementById("root");

if (container) {
  const initialPath = `${window.location.pathname}${window.location.hash}`;
  createRoot(container).render(
    <StrictMode>
      <App initialPath={initialPath} />
    </StrictMode>,
  );
}
