import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { NuqsAdapter } from "nuqs/adapters/react";

import App from "./app.jsx";
import QueryProvider from "./context/query-provider.jsx";
import { Toaster } from "./components/ui/toaster";

import "./index.css";
import "./index.scss";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "select2/dist/js/select2.min.js";

import reportWebVitals from "./reportWebVitals";

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <QueryProvider>
        <NuqsAdapter>
          <BrowserRouter>
            <App />
            <Toaster />
          </BrowserRouter>
        </NuqsAdapter>
      </QueryProvider>
    </StrictMode>
  );

  reportWebVitals();
}