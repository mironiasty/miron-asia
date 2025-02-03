import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <header>
      <h1>Pan Jamnik - Galeria</h1>
      <a href="https://www.youtube.com/@panjamnik" target="_blank">
        YouTube
      </a>
    </header>
    <main>
      <App />
    </main>
  </React.StrictMode>
);
