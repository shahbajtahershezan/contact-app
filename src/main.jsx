import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./style.css";
import { ContactProvider } from "./context/ContactContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ContactProvider>
        <App />
      </ContactProvider>
    </BrowserRouter>
  </React.StrictMode>
);
