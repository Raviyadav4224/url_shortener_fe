import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import "./index.css";
import App from "./App.jsx";
import { worker } from "./mocks/worker";
import { store } from "./store";

if (import.meta.env.DEV) {
  worker.start({
    onUnhandledRequest: "bypass",
  });
}
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}></Provider>
    <App />
  </StrictMode>
);
