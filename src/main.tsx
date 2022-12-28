import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
  <div className="bg-neutral-200 dark:bg-neutral-800">
    <App />
  </div>
  </React.StrictMode>
);
