import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./index.css";

import ytlogo from "./assets/ytlogo.png";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <header style={{ maxWidth: 1200, justifyContent: "space-between", marginLeft: "auto", marginRight: "auto" }}>
      <div>
        <h1>Pan Jamnik - Galeria</h1>
      </div>
      <div>
        <a href="https://www.youtube.com/@panjamnik" target="_blank">
          <img src={ytlogo} alt="Logo" height={30} />
        </a>
      </div>
    </header>
    <main>
      <App />
    </main>
  </React.StrictMode>
);
